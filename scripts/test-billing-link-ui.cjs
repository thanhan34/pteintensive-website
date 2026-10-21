// Component regression tests with isolated hooks/API. No Firebase or live token rotation.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const path = require('node:path');
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
  return { render, nodes: () => nodes(tree), button, click: () => button().props.onClick() };
}
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