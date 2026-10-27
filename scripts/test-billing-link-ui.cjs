// Component regression tests with isolated hooks/API. No Firebase or live token rotation.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const path = require('node:path');
function reconciliationHarness(options) {
  let now = 0; let scheduled;
  const module = { exports: {} };
  const code = ts.transpileModule(fs.readFileSync(path.join(__dirname, '../lib/billing/auto-reconcile.ts'), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  vm.runInNewContext(code, { module, exports: module.exports, AbortController, Date: { now: () => now }, setTimeout: (fn, delay) => { scheduled = { fn, delay }; return 1; }, clearTimeout: () => { scheduled = null; } });
  const stop = module.exports.startAutoReconciliation(options);
  return { stop, pending: () => !!scheduled, advance: async (ms = scheduled?.delay || 0) => { now += ms; const task = scheduled; scheduled = null; if (task) await task.fn(); for (let i = 0; i < 20; i++) await Promise.resolve(); } };
}
test('automatic reconciliation queries pending orders, respects cooldown and stops on verified payment', async () => {
  let paid = false; let calls = 0;
  const h = reconciliationHarness({ read: async () => paid, query: async () => { if (++calls === 2) paid = true; }, onError: () => assert.fail('unexpected error'), onExhausted: () => assert.fail('unexpected deadline') });
  await h.advance(); assert.equal(calls, 1);
  await h.advance(5000); assert.equal(calls, 1);
  await h.advance(60000); assert.equal(calls, 2); assert.equal(h.pending(), false);
});
test('automatic reconciliation skips QueryDR when IPN already settled, and cancels timers', async () => {
  const h = reconciliationHarness({ read: async () => true, query: async () => assert.fail('already paid'), onError: () => {}, onExhausted: () => {} });
  await h.advance(); assert.equal(h.pending(), false);
  const cancelled = reconciliationHarness({ read: async () => assert.fail('cancelled'), query: async () => {}, onError: () => {}, onExhausted: () => {} });
  cancelled.stop(); assert.equal(cancelled.pending(), false);
});
test('automatic reconciliation retries query failures without settling and ends at ten minutes', async () => {
  let errors = 0; let exhausted = 0;
  const h = reconciliationHarness({ read: async () => false, query: async () => { throw Error('offline'); }, onError: () => errors++, onExhausted: () => exhausted++ });
  await h.advance(); assert.equal(errors, 1); assert.equal(h.pending(), true);
  await h.advance(600000); assert.equal(exhausted, 1); assert.equal(h.pending(), false);
});
test('billing errors create readable error toasts with stable duplicate-prevention IDs', () => {
  const calls = [];
  const file = path.join(__dirname, '../lib/hooks/useErrorToast.ts');
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const module = { exports: {} };
  const mocks = {
    react: { useEffect: (effect) => effect() },
    'react-toastify': { toast: { error: (message, options) => calls.push({ message, options }) } },
  };
  vm.runInNewContext(code, { module, exports: module.exports, require: (id) => mocks[id] || require(id) });
  module.exports.useErrorToast('');
  module.exports.useErrorToast('   ');
  assert.equal(calls.length, 0);
  const message = 'Khoản học phí đang gắn với đơn Nrqcuf1By8BHGkMYoRVu.';
  module.exports.useErrorToast(message);
  module.exports.useErrorToast(message);
  assert.equal(calls[0].message, message);
  assert.equal(calls[0].options.toastId, calls[1].options.toastId);
  assert.equal(calls[0].options.ariaLabel, `Lỗi: ${message}`);
});
test('toast host is mounted once with reading time, queue limit and pause support', () => {
  const file = path.join(__dirname, '../components/ui/toast-provider.tsx');
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS } }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(code, { module, exports: module.exports, require: (id) => id === 'react-toastify' ? { ToastContainer: 'toast-host' } : require(id) });
  const tree = module.exports.ToastProvider();
  assert.equal(tree.props.autoClose, 10000);
  assert.equal(tree.props.limit, 3);
  assert.equal(tree.props.pauseOnHover, true);
  assert.equal(tree.props.pauseOnFocusLoss, true);
  assert.equal(tree.props.closeOnClick, false);
  const providers = fs.readFileSync(path.join(__dirname, '../app/providers.tsx'), 'utf8');
  assert.equal((providers.match(/<ToastProvider\s*\/>/g) || []).length, 1);
});
test('admin billing has no manual settlement form or controls', () => {
  const source = fs.readFileSync(path.join(__dirname, '../components/billing/AdminBilling.tsx'), 'utf8');
  assert.doesNotMatch(source, /reconcile|name="outcome"|name="evidence"|Ghi nhận kết quả đối soát/);
  assert.match(source, /Đơn thanh toán/);
});
test('payment result notice reports success only for server-paid orders and labels sandbox explicitly', () => {
  const file = path.join(__dirname, '../components/billing/PaymentResultNotice.tsx');
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS } }).outputText;
  const module = { exports: {} };
  const paymentModule = { exports: {} };
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(path.join(__dirname, '../lib/billing/payment-state.ts'), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, { module: paymentModule, exports: paymentModule.exports, Date });
  const mocks = { '@/lib/billing/payment-state': paymentModule.exports, react: { useState: (initial) => [initial, () => {}] }, 'next/link': { default: 'a' }, '@/lib/billing/types': { money: String }, '@/components/ui/button': { Button: 'button' }, '@/components/ui/card': { Card: 'section' } };
  vm.runInNewContext(code, { module, exports: module.exports, require: (id) => mocks[id] || require(id) });
  const render = (order) => module.exports.PaymentResultNotice({ order, orderId: 'order1', busy: false, refresh: async () => {} });
  const base = { id: 'order1', total: 100000, environment: 'production', transactionNo: '15715005' };
  assert.match(panelText(render({ ...base, status: 'paid' })), /Thanh toán thành công/);
  assert.match(panelText(render({ ...base, status: 'paid', environment: 'sandbox' })), /không phải khoản thu tiền thật/);
  for (const order of [undefined, { ...base, status: 'pending' }, { ...base, status: 'failed' }]) {
    const tree = render(order);
    assert.doesNotMatch(panelText(tree), /Thanh toán thành công/);
    assert.ok(panelNodes(tree).some((node) => node.props.role === 'status'));
    assert.ok(panelNodes(tree).some((node) => node.type === 'button' && panelText(node).includes('Kiểm tra lại')));
  }
});
test('sandbox payment instructions show test details only in sandbox', () => {
  const file = path.join(__dirname, '../components/billing/SandboxPaymentGuide.tsx');
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS } }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(code, { module, exports: module.exports, require });
  assert.equal(module.exports.SandboxPaymentGuide({ environment: 'production' }), null);
  const tree = module.exports.SandboxPaymentGuide({ environment: 'sandbox' });
  assert.equal(tree.type, 'details');
  for (const text of ['9704198526191432198', 'NGUYEN VAN A', '07/15', '123456', 'Không nhập thẻ thật']) {
    assert.ok(JSON.stringify(tree).includes(text));
  }
});
test('admin assessment form requires written feedback separately from exam reference', () => {
  const file = path.join(__dirname, '../components/billing/AcademicApprovalFields.tsx');
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS } }).outputText;
  const module = { exports: {} };
  const mocks = { '@/lib/courseData': { courseData: {} }, '@/components/ui/input': { Input: 'input' } };
  vm.runInNewContext(code, { module, exports: module.exports, require: (id) => mocks[id] || require(id) });
  const nodes = panelNodes(module.exports.AcademicApprovalFields());
  const feedback = nodes.find((node) => node.type === 'textarea' && node.props.name === 'assessmentFeedback');
  assert.equal(feedback.props.required, true);
  assert.equal(feedback.props.minLength, 10);
  assert.equal(feedback.props.maxLength, 2000);
  assert.ok(nodes.some((node) => node.props.id === feedback.props['aria-describedby']));
  for (const name of ['assessmentReference', 'academicConfirmed', 'courseId']) {
    assert.equal(nodes.find((node) => node.props.name === name).props.required, true);
  }
});
function harness(fetcher) {
  const values = []; let cursor = 0;
  const hooks = {
    useState(initial) { const index = cursor++; if (!(index in values)) values[index] = initial; return [values[index], (next) => { values[index] = typeof next === 'function' ? next(values[index]) : next; }]; },
    useRef(initial) { const index = cursor++; if (!(index in values)) values[index] = { current: initial }; return values[index]; },
    useCallback: (fn) => fn, useEffect() {},
  };
  const mocks = {
    react: { ...require('react'), ...hooks },
    '@/lib/hooks/useErrorToast': { useErrorToast() {} },
    'next/link': { default: 'a' },
    '@/lib/auth/context': { useAuth: () => ({ user: { uid: 'admin' }, loading: false }) },
    '@/lib/billing/client': { billingFetch: fetcher },
    '@/lib/courseData': { courseData: {} },
    '@/lib/billing/types': { money: String, orderStatus: {} },
    '@/components/ui/button': { Button: 'button' }, '@/components/ui/input': { Input: 'input' },
    '@/components/ui/card': { Card: 'section' }, '@/components/ui/tabs': { Tabs: 'tabs', TabsList: 'nav', TabsTrigger: 'tab', TabsContent: 'content' },
    './PaymentLinkResult': { PaymentLinkResult: 'payment-link-result' },
    './FeeDeleteControl': { FeeDeleteControl: 'fee-delete-control' },
    './AcademicApprovalFields': { AcademicApprovalFields: 'academic-approval-fields' },
    './OrderPlacementNote': { OrderPlacementNote: 'order-placement-note' },
    './OrderArchiveControl': { OrderArchiveControl: 'order-archive-control' },
    './SandboxResetControl': { SandboxResetControl: 'sandbox-reset-control' },
    './SandboxCleanupControl': { SandboxCleanupControl: 'sandbox-cleanup-control' },
  };
  const file = path.join(__dirname, '../components/billing/AdminBilling.tsx');
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(code, { Error, module, exports: module.exports, require: (id) => mocks[id] || require(id), window: { location: { origin: 'https://example.test' } } });
  let tree;
  function render() { cursor = 0; tree = module.exports.default(); return tree; }
  render();
  values[0] = { prices: [], orders: [], fees: [{ id: 'fee1', title: 'Test fee', email: 'test@example.test', amount: 1000, status: 'unpaid' }] };
  render();
  function nodes(root, found = []) {
    if (Array.isArray(root)) root.forEach((child) => nodes(child, found));
    else if (root && typeof root === 'object' && root.props) { found.push(root); nodes(root.props.children, found); }
    return found;
  }
  const button = () => nodes(tree).find((node) => node.type === 'button' && node.props['aria-busy'] !== undefined);
  return { render, nodes: () => nodes(tree), button, click: () => button().props.onClick(), setOrders: (orders, sandboxResetAvailable = false) => { values[0].orders = orders; values[0].sandboxResetAvailable = sandboxResetAvailable; render(); } };
}
test('bulk sandbox cleanup is gated by server flag, follows cursors and refreshes after success', async () => {
  const calls = [];
  const h = harness(async (_user, _url, body) => {
    calls.push(body);
    if (!body) return { prices: [], fees: [], orders: [], sandboxResetAvailable: true };
    assert.equal(body.action, 'sandbox-cleanup'); assert.equal(body.confirmed, true);
    return { cleaned: 1, skipped: [], nextCursor: body.cursor ? null : 'next1' };
  });
  h.setOrders([], false);
  assert.equal(h.nodes().some((node) => node.type === 'sandbox-cleanup-control'), false);
  h.setOrders([], true);
  await h.nodes().find((node) => node.type === 'sandbox-cleanup-control').props.onCleanup();
  h.render();
  assert.equal(calls.length, 3); assert.equal(calls[1].cursor, 'next1'); assert.equal(calls[2], undefined);
  assert.match(panelText(h.render()), /Đã xử lý 2 đơn sandbox/);
});
test('failed orders archive only after API success and remain available in archived view', async () => {
  let finish;
  const h = harness(async (_user, _url, body) => {
    assert.equal(body.action, 'order-archive'); assert.equal(body.confirmed, true);
    return new Promise((resolve) => { finish = resolve; });
  });
  h.setOrders([{ id: 'failed1', email: 'test@example.test', status: 'failed', lines: [], total: 1000 }]);
  const pending = h.nodes().find((node) => node.type === 'order-archive-control').props.onArchive();
  h.render();
  assert.ok(h.nodes().some((node) => node.type === 'order-archive-control' && node.props.disabled));
  finish({ success: true }); await pending; h.render();
  assert.equal(h.nodes().some((node) => node.type === 'details'), false);
  h.nodes().find((node) => node.type === 'input' && node.props.type === 'checkbox' && node.props.checked === false).props.onChange({ target: { checked: true } });
  h.render();
  assert.ok(h.nodes().some((node) => node.type === 'details'));
  assert.equal(h.nodes().some((node) => node.type === 'order-archive-control'), false);
});
test('archive errors retain the order and pending/paid orders have no archive action', async () => {
  const h = harness(async () => { throw Error('Không thể lưu trữ'); });
  h.setOrders([{ id: 'failed1', status: 'failed', lines: [] }, { id: 'pending1', status: 'pending', lines: [] }, { id: 'paid1', status: 'paid', lines: [] }]);
  assert.equal(h.nodes().filter((node) => node.type === 'order-archive-control').length, 1);
  await assert.rejects(h.nodes().find((node) => node.type === 'order-archive-control').props.onArchive(), /Không thể/);
  h.render();
  assert.equal(h.nodes().filter((node) => node.type === 'details').length, 3);
});
test('archive control confirms, cancels, prevents duplicate submissions and permits retry on failure', async () => {
  const values = []; let cursor = 0;
  const file = path.join(__dirname, '../components/billing/OrderArchiveControl.tsx');
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS } }).outputText;
  const mocks = {
    react: { ...require('react'), useState: (initial) => { const i = cursor++; if (!(i in values)) values[i] = initial; return [values[i], (value) => { values[i] = value; }]; }, useRef: (initial) => { const i = cursor++; if (!(i in values)) values[i] = { current: initial }; return values[i]; } },
    '@/components/ui/button': { Button: 'button' },
  };
  const module = { exports: {} };
  vm.runInNewContext(code, { Error, module, exports: module.exports, require: (id) => mocks[id] || require(id) });
  let calls = 0; let fail;
  const props = { disabled: false, onArchive: () => { calls++; return new Promise((_resolve, reject) => { fail = reject; }); } };
  const nodes = () => { cursor = 0; return panelNodes(module.exports.OrderArchiveControl(props)); };
  const button = (text) => nodes().find((node) => node.type === 'button' && panelText(node).includes(text));
  button('Lưu trữ đơn thất bại').props.onClick();
  button('Hủy').props.onClick();
  assert.equal(calls, 0);
  button('Lưu trữ đơn thất bại').props.onClick();
  const submit = button('Xác nhận lưu trữ').props.onClick;
  const pending = submit(); await submit();
  assert.equal(calls, 1);
  assert.equal(button('Đang lưu trữ').props.disabled, true);
  fail(Error('Thử lại')); await pending;
  assert.ok(nodes().some((node) => node.props.role === 'alert'));
  assert.equal(button('Xác nhận lưu trữ').props.disabled, false);
  props.disabled = true;
  await button('Xác nhận lưu trữ').props.onClick();
  assert.equal(calls, 1);
});
test('sandbox reset only appears for pending sandbox orders on sandbox server and updates after success', async () => {
  let finish; let calls = 0;
  const h = harness(async (_user, _url, body) => {
    calls++; assert.equal(body.action, 'sandbox-reset'); assert.equal(body.confirmed, true);
    return new Promise((resolve) => { finish = resolve; });
  });
  const orders = [{ id: 'test1', status: 'pending', environment: 'sandbox', lines: [] }, { id: 'real1', status: 'pending', environment: 'production', lines: [] }, { id: 'paid1', status: 'paid', environment: 'sandbox', lines: [] }];
  h.setOrders(orders);
  assert.equal(h.nodes().some((node) => node.type === 'sandbox-reset-control'), false);
  h.setOrders(orders, true);
  assert.equal(h.nodes().filter((node) => node.type === 'sandbox-reset-control').length, 1);
  const reset = h.nodes().find((node) => node.type === 'sandbox-reset-control').props.onReset;
  const pending = reset(); await assert.rejects(reset(), /Vui lòng chờ/); h.render();
  assert.equal(calls, 1);
  assert.ok(h.nodes().some((node) => node.type === 'sandbox-reset-control' && node.props.disabled));
  finish({ success: true }); await pending; h.render();
  assert.equal(h.nodes().some((node) => node.type === 'sandbox-reset-control'), false);
  assert.ok(h.nodes().some((node) => node.type === 'order-archive-control'));
});
test('sandbox reset error keeps the order available for retry', async () => {
  const h = harness(async () => { throw Error('Không thể reset'); });
  h.setOrders([{ id: 'test1', status: 'pending', environment: 'sandbox', lines: [] }], true);
  await assert.rejects(h.nodes().find((node) => node.type === 'sandbox-reset-control').props.onReset(), /Không thể reset/);
  h.render();
  assert.ok(h.nodes().some((node) => node.type === 'sandbox-reset-control' && !node.props.disabled));
});
test('regenerate displays pending state, then inline link with correct token', async () => {
  let resolve;
  let calls = 0;
  const h = harness(() => { calls++; return new Promise((done) => { resolve = done; }); });
  const pending = h.click(); h.render();
  assert.equal(h.button().props['aria-busy'], true);
  await h.click(); assert.equal(calls, 1, 'duplicate clicks must not rotate twice');
  resolve({ feeId: 'fee1', accessToken: 'a'.repeat(64) }); await pending; h.render();
  assert.equal(h.button().props['aria-busy'], false);
  const inline = h.nodes().find((node) => node.props['aria-live'] === 'polite');
  assert.ok(inline);
  assert.ok(JSON.stringify(inline).includes('https://example.test/cart#fee=fee1&access='));
});
test('API errors are shown at the selected fee and permit retry', async () => {
  const h = harness(async () => { throw new Error('Permission denied'); });
  await h.click(); h.render();
  assert.ok(h.nodes().some((node) => node.props.role === 'alert' && node.props.children === 'Permission denied'));
  assert.equal(h.button().props.disabled, false);
});
test('unexpected successful API response does not create an undefined payment link', async () => {
  const h = harness(async () => ({ success: true }));
  await h.click(); h.render();
  assert.ok(h.nodes().some((node) => node.props.role === 'alert'));
  assert.equal(h.nodes().some((node) => node.type === 'payment-link-result'), false);
});

test('admin delete removes the row only after API success and clears the old payment link', async () => {
  const calls = [];
  let finish;
  const h = harness(async (_user, _url, body) => {
    calls.push(body);
    if (body.action === 'fee-link') return { feeId: 'fee1', accessToken: 'a'.repeat(64) };
    return new Promise((resolve) => { finish = resolve; });
  });
  await h.click(); h.render();
  const control = h.nodes().find((node) => node.type === 'fee-delete-control');
  const pending = control.props.onDelete(); h.render();
  assert.ok(h.nodes().some((node) => node.type === 'fee-delete-control'));
  assert.equal(h.nodes().find((node) => node.type === 'fee-delete-control').props.disabled, true);
  finish({ success: true }); await pending; h.render();
  assert.equal(h.nodes().some((node) => node.type === 'fee-delete-control'), false);
  assert.equal(h.nodes().some((node) => node.type === 'payment-link-result'), false);
  assert.deepEqual(JSON.parse(JSON.stringify(calls[1])), { action: 'fee-delete', feeId: 'fee1', confirmed: true });
});

test('admin deletion errors keep the fee row available for recovery', async () => {
  const h = harness(async () => { throw Error('Khoản thu đang có giao dịch'); });
  const control = h.nodes().find((node) => node.type === 'fee-delete-control');
  await assert.rejects(control.props.onDelete(), /đang có giao dịch/);
  h.render();
  assert.ok(h.nodes().some((node) => node.type === 'fee-delete-control' && !node.props.disabled));
});

test('delete control requires confirmation, supports cancel, blocks duplicate requests and allows retry', async () => {
  const values = []; let cursor = 0;
  const file = path.join(__dirname, '../components/billing/FeeDeleteControl.tsx');
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS } }).outputText;
  const mocks = {
    react: { ...require('react'), useState: (initial) => { const i = cursor++; if (!(i in values)) values[i] = initial; return [values[i], (value) => { values[i] = value; }]; }, useRef: (initial) => { const i = cursor++; if (!(i in values)) values[i] = { current: initial }; return values[i]; } },
    '@/components/ui/button': { Button: 'button' }, '@/lib/billing/types': { money: String },
  };
  const module = { exports: {} };
  vm.runInNewContext(code, { Error, module, exports: module.exports, require: (id) => mocks[id] || require(id) });
  let calls = 0; let reject;
  const props = { title: 'Tuition', amount: 1000, disabled: false, onDelete: () => { calls++; return new Promise((_resolve, fail) => { reject = fail; }); } };
  const render = () => { cursor = 0; return panelNodes(module.exports.FeeDeleteControl(props)); };
  const button = (text) => render().find((node) => node.type === 'button' && panelText(node).includes(text));
  button('Xóa khoản thu').props.onClick();
  assert.equal(calls, 0);
  button('Giữ lại').props.onClick();
  assert.ok(button('Xóa khoản thu'));
  button('Xóa khoản thu').props.onClick();
  const pending = button('Xác nhận xóa').props.onClick();
  await button('Đang xóa').props.onClick();
  assert.equal(calls, 1);
  reject(Error('Payment pending')); await pending;
  assert.ok(render().some((node) => node.props.role === 'alert' && panelText(node).includes('Payment pending')));
  assert.equal(button('Xác nhận xóa').props.disabled, false);
});

function tuitionPanels(initialState = []) {
  let cursor = 0;
  const state = [...initialState];
  const file = path.join(__dirname, '../components/billing/StudentTuitionPanels.tsx');
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const mocks = {
    react: { ...require('react'), useState: (initial) => { const index = cursor++; return [state[index] === undefined ? initial : state[index], (value) => { state[index] = value; }]; } },
    './PlacementSession': { usePlacementSession: () => { const index = cursor++; return { contact: state[index] || { name: '', email: '', phone: '' }, updateContact: (value) => { state[index] = value; } }; } },
    '@/lib/billing/checkout-guidance': (() => {
      const module = { exports: {} };
      const code = ts.transpileModule(fs.readFileSync(path.join(__dirname, '../lib/billing/checkout-guidance.ts'), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
      vm.runInNewContext(code, { module, exports: module.exports });
      return module.exports;
    })(),
    'next/link': { default: 'a' },
    '@/lib/billing/types': { money: (amount) => `${amount} VND` },
    '@/lib/billing/placement': { placementTestUrl: 'https://placementtest.pteintensive.com/' },
    '@/components/ui/button': { Button: 'button' },
    '@/components/ui/input': { Input: 'input' },
    '@/components/ui/card': { Card: 'section' },
  };
  const module = { exports: {} };
  vm.runInNewContext(code, { module, exports: module.exports, require: (id) => mocks[id] || require(id) });
  return { ...module.exports, TuitionCheckoutPanel: (props) => { cursor = 0; return module.exports.TuitionCheckoutPanel(props); } };
}
function panelNodes(root, found = []) {
  if (Array.isArray(root)) root.forEach((child) => panelNodes(child, found));
  else if (root && typeof root === 'object' && root.props) { found.push(root); panelNodes(root.props.children, found); }
  return found;
}

function placementJourney() {
  const file = path.join(__dirname, '../components/billing/PlacementJourney.tsx');
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const mocks = { 'next/link': { default: 'a' }, '@/components/ui/button': { Button: 'button' }, '@/lib/billing/placement': { placementTestUrl: 'https://placementtest.pteintensive.com/' } };
  const module = { exports: {} };
  vm.runInNewContext(code, { module, exports: module.exports, require: (id) => mocks[id] || require(id) });
  return module.exports.PlacementJourney;
}
test('placement onboarding highlights the next required step and keeps course selection locked until feedback exists', () => {
  const Journey = placementJourney();
  for (const [declaration, ready, step] of [[{ completed: false, feedback: '' }, false, 1], [{ completed: true, feedback: '' }, false, 2], [{ completed: true, feedback: 'Academic feedback recommends Foundation' }, true, 3]]) {
    let continued = false;
    let updated;
    const nodes = panelNodes(Journey({ declaration, ready, busy: false, onChange: (value) => { updated = value; }, onContinue: () => { continued = true; } }));
    assert.match(panelText(nodes.find((node) => node.type === 'h2')), /Mỗi mục tiêu lớn đều bắt đầu/);
    assert.match(panelText(nodes), /Hoàn thành cả bài kiểm tra và nhận xét trước khi thêm khóa vào giỏ/);
    const steps = nodes.filter((node) => node.type === 'li');
    assert.equal(steps[step - 1].props['aria-current'], 'step');
    assert.equal(steps.filter((node) => node.props['aria-current'] === 'step').length, 1);
    assert.equal(nodes.find((node) => node.type === 'textarea').props.disabled, !declaration.completed);
    const next = nodes.find((node) => node.type === 'button' && node.props.onClick);
    assert.equal(next.props.disabled, !ready);
    if (ready) { next.props.onClick(); assert.equal(continued, true); }
    const checkbox = nodes.find((node) => node.type === 'input');
    checkbox.props.onChange({ target: { checked: !declaration.completed } });
    assert.equal(updated.completed, !declaration.completed);
    assert.equal(updated.feedback, declaration.feedback);
    const contact = nodes.find((node) => node.type === 'a' && node.props.href === '/contact');
    assert.equal(contact.props.target, '_blank');
  }
});

test('course attention follows the sequence, never skips placement validation, and stops after cart opens', () => {
  const load = (name, mocks = {}) => {
    const code = ts.transpileModule(fs.readFileSync(path.join(__dirname, `../lib/billing/${name}.ts`), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
    const module = { exports: {} };
    vm.runInNewContext(code, { module, exports: module.exports, require: (id) => mocks[id] || require(id) });
    return module.exports;
  };
  const { courseGuidanceStep: step } = load('guidance', { './placement': load('placement') });
  const empty = { completed: false, feedback: '' };
  const confirmed = { completed: true, feedback: '' };
  const ready = { completed: true, feedback: 'Academic feedback recommends Foundation' };
  assert.equal(step(empty, false, false, false, false), 'start');
  assert.equal(step(empty, true, false, false, false), 'test');
  assert.equal(step(confirmed, true, false, false, false), 'feedback');
  for (const feedback of ['         ', 'short', 'x'.repeat(2001)]) {
    assert.equal(step({ completed: true, feedback }, true, true, true, true), 'feedback');
  }
  assert.equal(step(ready, true, false, false, false), 'continue');
  assert.equal(step(ready, true, true, false, false), 'courses');
  assert.equal(step(ready, true, true, true, false), 'cart');
  assert.equal(step(ready, true, true, true, true), 'done');
  assert.equal(step(empty, true, true, true, true), 'test');
});

test('placement attention moves between actionable targets and never highlights busy controls', () => {
  const Journey = placementJourney();
  for (const guidanceStep of ['test', 'feedback', 'continue', 'courses', 'cart']) {
    for (const busy of [false, true]) {
      const nodes = panelNodes(Journey({ declaration: { completed: guidanceStep !== 'test', feedback: '' }, ready: guidanceStep !== 'test' && guidanceStep !== 'feedback', busy, guidanceStep, onChange() {}, onContinue() {} }));
      const highlighted = nodes.filter((node) => node.props['data-guidance'] === true && node.type !== 'textarea');
      assert.equal(highlighted.length, busy ? 0 : guidanceStep === 'test' ? 2 : ['feedback', 'continue'].includes(guidanceStep) ? 1 : 0);
      assert.ok(highlighted.every((node) => !node.props.disabled));
    }
  }
});

test('legacy student links preserve secret fragments and payment callback query when redirecting to cart', () => {
  const file = path.join(__dirname, '../components/billing/LegacyStudentRedirect.tsx');
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  for (const [search, hash] of [['?tab=cart', ''], ['?order=order1', ''], ['', '#fee=fee1&access=' + 'a'.repeat(64)]]) {
    let destination;
    const module = { exports: {} };
    const mocks = { react: { useEffect: (effect) => effect() }, 'next/link': { default: 'a' } };
    vm.runInNewContext(code, { module, exports: module.exports, require: (id) => mocks[id] || require(id), window: { location: { search, hash, replace: (value) => { destination = value; } } } });
    module.exports.default();
    assert.equal(destination, `/cart${search}${hash}`);
  }
});
function panelText(root) {
  if (Array.isArray(root)) return root.map(panelText).join(' ');
  if (root && typeof root === 'object' && root.props) return panelText(root.props.children);
  return typeof root === 'string' || typeof root === 'number' ? String(root) : '';
}
test('personal tuition empty state explains private-link access without asking for login or email lookup', () => {
  const { PersonalTuitionPanel } = tuitionPanels();
  const tree = PersonalTuitionPanel({ fees: [], cart: [], placementReady: true, busy: false, add() {}, setTab() {} });
  assert.match(panelText(tree), /Kiểm tra đầu vào trước, thanh toán sau/);
  assert.match(panelText(tree), /Mở liên kết do trung tâm gửi/);
  assert.equal(panelNodes(tree).some((node) => node.type === 'input'), false);
});
test('personal tuition preserves paid/pending locks and offers selection only for unpaid fees', () => {
  const { PersonalTuitionPanel } = tuitionPanels();
  const added = [];
  const fees = ['unpaid', 'pending', 'paid'].map((status) => ({ id: status, title: `Fee ${status}`, status, academicApproved: true, dueDate: '2026-12-01', amount: 1000 }));
  const tree = PersonalTuitionPanel({ fees, cart: [], busy: false, add: (item) => added.push(item), setTab() {} });
  const buttons = panelNodes(tree).filter((node) => node.type === 'button');
  assert.equal(buttons.length, 1);
  buttons[0].props.onClick();
  assert.equal(JSON.stringify(added), JSON.stringify([{ kind: 'fee', id: 'unpaid' }]));
  assert.match(panelText(tree), /01\/12\/2026/);
  assert.match(panelText(tree), /Không thanh toán lại/);
});
test('empty selection guides users to courses and personal tuition without showing a payment form', () => {
  const { TuitionCheckoutPanel } = tuitionPanels();
  const selected = [];
  const tree = TuitionCheckoutPanel({ cart: [], placementReady: true, busy: false, total: 0, paymentAvailable: false, setTab: (tab) => selected.push(tab), changeCart() {}, resolve() {}, pay() {} });
  assert.equal(panelNodes(tree).some((node) => node.type === 'form' || node.type === 'input'), false);
  panelNodes(tree).filter((node) => node.type === 'button' && node.props.onClick).forEach((node) => node.props.onClick());
  assert.deepEqual(selected, ['fees']);
});
test('checkout requires contact fields, blocks unavailable payment and removes only the selected item', () => {
  const { TuitionCheckoutPanel } = tuitionPanels();
  const cart = [{ kind: 'course', id: 'same' }, { kind: 'fee', id: 'same' }];
  let remaining;
  const props = { cart, placementReady: true, busy: false, total: 2000, paymentAvailable: false, setTab() {}, changeCart: (next) => { remaining = next; }, resolve: () => ({ title: 'Tuition', amount: 1000 }), pay() {} };
  const nodes = panelNodes(TuitionCheckoutPanel(props));
  assert.equal(nodes.find((node) => node.type === 'button' && node.props.type === 'submit').props.disabled, true);
  assert.deepEqual(nodes.filter((node) => node.type === 'input').map((node) => [node.props.name, node.props.required]), [['checkoutReviewed', true], ['name', true], ['email', true], ['phone', true]]);
  nodes.find((node) => node.props['aria-label'] === 'Xóa Tuition').props.onClick();
  assert.equal(JSON.stringify(remaining), JSON.stringify([{ kind: 'fee', id: 'same' }]));
  const available = panelNodes(TuitionCheckoutPanel({ ...props, paymentAvailable: true }));
  assert.equal(available.find((node) => node.type === 'button' && node.props.type === 'submit').props.disabled, true, 'Contact and review are still required');
  const incomplete = panelNodes(TuitionCheckoutPanel({ ...props, paymentAvailable: true, placementReady: false }));
  assert.equal(incomplete.find((node) => node.type === 'button' && node.props.type === 'submit').props.disabled, true);
  const invalid = panelNodes(TuitionCheckoutPanel({ ...props, paymentAvailable: true, resolve: () => undefined }));
  assert.equal(invalid.find((node) => node.type === 'button' && node.props.type === 'submit').props.disabled, true);
});

test('checkout guides review, contact, payment and recovery without bypassing gates', () => {
  const cart = [{ kind: 'course', id: 'pre-pte' }];
  const selection = JSON.stringify([['course', 'pre-pte', 'Tuition', 1000, true]]);
  const validContact = { name: 'Nguyễn Văn An', email: 'an@example.com', phone: '+84912345678' };
  const props = { cart, placementReady: true, busy: false, total: 1000, paymentAvailable: true, setTab() {}, changeCart() {}, resolve: () => ({ title: 'Tuition', amount: 1000 }), pay() {} };
  const cases = [
    [{ name: '', email: '', phone: '' }, '', {}, 'review'],
    [{ name: '   ', email: '', phone: '' }, selection, {}, 'name'],
    [{ ...validContact, email: 'wrong' }, selection, {}, 'email'],
    [{ ...validContact, phone: '++++12345678' }, selection, {}, 'phone'],
    [validContact, selection, {}, 'pay'],
    [validContact, selection, { paymentAvailable: false }, 'unavailable'],
    [validContact, selection, { busy: true }, 'processing'],
    [validContact, selection, { placementReady: false }, 'placement'],
    [validContact, selection, { resolve: () => undefined }, 'items'],
    [validContact, selection, { resolve: () => ({ title: 'Tuition', amount: 2000 }) }, 'review'],
    [validContact, selection, { cart: [...cart, { kind: 'fee', id: 'fee2' }] }, 'review'],
  ];
  for (const [contact, reviewed, overrides, expected] of cases) {
    const { TuitionCheckoutPanel } = tuitionPanels([contact, reviewed]);
    let paid = 0; let prevented = 0;
    const tree = TuitionCheckoutPanel({ ...props, ...overrides, pay: () => { paid++; } });
    assert.equal(tree.props['data-checkout-step'], expected);
    const nodes = panelNodes(tree);
    const submit = nodes.find((node) => node.props.type === 'submit');
    assert.equal(submit.props.disabled, expected !== 'pay');
    const highlighted = nodes.filter((node) => node.props['data-guidance'] === true);
    assert.equal(highlighted.length, expected === 'processing' ? 0 : 1);
    tree.props.onSubmit({ preventDefault: () => { prevented++; } });
    assert.equal(paid, expected === 'pay' ? 1 : 0);
    assert.equal(prevented, expected === 'pay' ? 0 : 1);
  }
});