// Isolated tests: never connect to Firebase, VNPAY, or production credentials.
const { test, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const vm = require('node:vm');
const path = require('node:path');
function load(file, mocks = {}) {
  const code = ts.transpileModule(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(code, { exports: module.exports, module, require: (id) => Object.hasOwn(mocks, id) ? mocks[id] : require(id), process, Buffer, URL, URLSearchParams, console });
  return module.exports;
}
const gateway = load('lib/billing/vnpay.ts');
const records = new Map();
let serial = 0;
const ref = (key) => ({ key, id: key.split('/')[1] });
const snap = (reference) => ({ id: reference.id, exists: records.has(reference.key), data: () => records.get(reference.key) });
const db = {
  collection: (name) => ({
    doc: (id = `order${++serial}`) => ({ ...ref(`${name}/${id}`), get: async () => snap(ref(`${name}/${id}`)), set: async (data) => { records.set(`${name}/${id}`, data); } }),
    get: async () => ({ docs: [...records.keys()].filter((key) => key.startsWith(`${name}/`)).map((key) => snap(ref(key))) }),
    where: (field, op, value) => ({ get: async () => ({ docs: [...records.keys()].filter((key) => key.startsWith(`${name}/`) && records.get(key)[field] === value).map((key) => snap(ref(key))) }) }),
  }),
  runTransaction: async (work) => {
    const writes = [];
    const tx = {
      get: async (reference) => snap(reference), getAll: async (...refs) => refs.map(snap),
      create: (reference, data) => { if (records.has(reference.key)) throw Error('exists'); writes.push(() => records.set(reference.key, data)); },
      update: (reference, data) => { if (!records.has(reference.key)) throw Error('missing'); writes.push(() => records.set(reference.key, { ...records.get(reference.key), ...data })); },
      delete: (reference) => writes.push(() => records.delete(reference.key)),
    };
    const result = await work(tx); writes.forEach((write) => write()); return result;
  },
};
const billing = load('lib/billing/server.ts', {
  '@/lib/firebase-admin': { getAdminDb: () => db, getAdminAuth: () => ({ verifyIdToken: async (token) => { if (token !== 'valid') throw Error('invalid'); return { uid: 'student1', email: 'student@example.test' }; } }) },
  '@/lib/admin-auth': { requireAdminFromRequest: async (request) => { if (request.headers.get('authorization') !== 'Bearer valid') throw Error('denied'); return { uid: 'admin1' }; } },
  '@/lib/courseData': { courseData: { course1: { title: 'PTE' } } },
  './vnpay': gateway,
  './placement': load('lib/billing/placement.ts'),
});
const guestSecret = 'a'.repeat(64);
const feeSecret = 'b'.repeat(64);
const request = (items, token = guestSecret, expectedTotal = items.reduce((total, item) => total + (records.get(`${item.kind === 'fee' ? 'tuitionFees' : 'billingPrices'}/${item.id}`)?.amount || 0), 0)) => ({ headers: new Headers({ 'x-billing-guest': token === 'valid' ? guestSecret : token, 'x-billing-fees': JSON.stringify({ fee1: feeSecret }) }), json: async () => ({ items, expectedTotal, placementDeclaration: { completed: true, feedback: 'Academic feedback recommending course1' }, name: 'Test Student', email: 'student@example.test', phone: '+84912345678' }) });
beforeEach(() => {
  records.clear(); serial = 0;
  Object.assign(process.env, { VNPAY_ENABLED: 'true', VNPAY_ENVIRONMENT: 'sandbox', VNPAY_TMN_CODE: 'TESTCODE', VNPAY_HASH_SECRET: 'isolated-test-secret', BILLING_BASE_URL: 'https://example.test', VNPAY_PRODUCTION_APPROVED: 'false' });
  records.set('billingPrices/course1', { title: 'PTE', enabled: true, amount: 100000 });
  records.set('tuitionFees/fee1', { title: 'Đợt 1', accessHash: billing.capabilityHash(feeSecret), status: 'unpaid', amount: 200000, academicReview: {reference: 'Placement assessment approved', courseId: 'course1', reviewedBy: 'admin1', reviewedAt: '2026-10-20T00:00:00Z'} });
});
function callback(id, amount = '20000000', code = '00', status = '00') {
  const params = { vnp_TmnCode: 'TESTCODE', vnp_TxnRef: id, vnp_Amount: amount, vnp_ResponseCode: code, vnp_TransactionStatus: status, vnp_TransactionNo: '12345' };
  return { ...params, vnp_SecureHash: gateway.signature(params, process.env.VNPAY_HASH_SECRET) };
}
test('canonical encoding sorts keys and encodes spaces with +', () => {
  assert.equal(gateway.canonicalize({ z: 'a b+c', a: 'https://x.test/', vnp_SecureHash: 'ignored' }), 'a=https%3A%2F%2Fx.test%2F&z=a+b%2Bc');
});
test('signatures reject tampering, malformed hashes, and duplicate parameters', () => {
  const params = callback('order1'); assert.equal(gateway.verifySignature(params, process.env.VNPAY_HASH_SECRET), true);
  assert.equal(gateway.verifySignature({ ...params, vnp_Amount: '1' }, process.env.VNPAY_HASH_SECRET), false);
  assert.equal(gateway.verifySignature({ ...params, vnp_SecureHash: 'xyz' }, process.env.VNPAY_HASH_SECRET), false);
  assert.throws(() => gateway.parseCallback(new URLSearchParams('vnp_Amount=1&vnp_Amount=2')));
});
test('Vietnam time, expiry, amount multiplication, hosted return URL', () => {
  assert.equal(gateway.vnpDate(new Date('2026-10-20T18:00:00Z')), '20261021010000');
  const result = gateway.createPaymentUrl('order1', 100000, new Date('2026-10-20T00:00:00Z'), '127.0.0.1');
  const url = new URL(result.url); assert.equal(url.searchParams.get('vnp_Amount'), '10000000');
  assert.equal(url.searchParams.get('vnp_ExpireDate'), '20261020071500');
  assert.equal(url.searchParams.get('vnp_ReturnUrl'), 'https://example.test/api/payments/vnpay/return');
});
test('disabled / unapproved production / insecure origin fail closed', () => {
  process.env.VNPAY_ENABLED = 'false'; assert.throws(gateway.paymentConfig);
  process.env.VNPAY_ENABLED = 'true'; process.env.VNPAY_ENVIRONMENT = 'production'; assert.throws(gateway.paymentConfig);
  process.env.VNPAY_ENVIRONMENT = 'sandbox'; process.env.BILLING_BASE_URL = 'http://example.test'; assert.throws(gateway.paymentConfig);
});
test('approved tuition checkout calculates trusted total and locks all items', async () => {
  const result = await billing.checkout(request([{ kind: 'fee', id: 'fee1', amount: 1 }]));
  assert.equal(records.get(`billingOrders/${result.orderId}`).total, 200000);
  assert.equal(records.get('tuitionFees/fee1').status, 'pending');
  await assert.rejects(billing.checkout(request([{ kind: 'fee', id: 'fee1' }])));
});
test('guest checkout rejects wrong fee capability, duplicate items, disabled courses, malformed session', async () => {
  records.get('tuitionFees/fee1').accessHash = billing.capabilityHash('c'.repeat(64));
  await assert.rejects(billing.checkout(request([{ kind: 'fee', id: 'fee1' }])));
  await assert.rejects(billing.checkout(request([{ kind: 'course', id: 'course1' }, { kind: 'course', id: 'course1' }])));
  records.get('billingPrices/course1').enabled = false;
  await assert.rejects(billing.checkout(request([{ kind: 'course', id: 'course1' }])));
  await assert.rejects(billing.checkout(request([], 'wrong')));
  assert.equal(records.has('billingLocks/fee_fee1'), false);
});
test('checkout rejects stale totals without writing an order or lock', async () => {
  await assert.rejects(billing.checkout(request([{ kind: 'fee', id: 'fee1' }], 'valid', 1)));
  assert.equal([...records.keys()].some((key) => key.startsWith('billingLocks/')), false);
});
test('IPN wrong amount and signature never settle; success settles once', async () => {
  const { orderId } = await billing.checkout(request([{ kind: 'fee', id: 'fee1' }]));
  assert.equal((await billing.processIPN(callback(orderId, '100'))).RspCode, '04');
  assert.equal((await billing.processIPN({ ...callback(orderId), vnp_SecureHash: 'bad' })).RspCode, '97');
  assert.equal(records.get(`billingOrders/${orderId}`).status, 'pending');
  assert.equal((await billing.processIPN(callback(orderId))).RspCode, '00');
  assert.equal((await billing.processIPN(callback(orderId))).RspCode, '02');
  assert.equal(records.get('tuitionFees/fee1').status, 'paid');
  assert.equal(records.get('billingLocks/fee_fee1').status, 'paid');
});
test('ambiguous or expired payments stay locked; definitive failure unlocks', async () => {
  const { orderId } = await billing.checkout(request([{ kind: 'fee', id: 'fee1' }]));
  assert.equal((await billing.processIPN(callback(orderId, '20000000', '07', '07'))).RspCode, '99');
  assert.equal(records.get('tuitionFees/fee1').status, 'pending');
  assert.equal((await billing.processIPN(callback(orderId, '20000000', '24', '02'))).RspCode, '00');
  assert.equal(records.get('tuitionFees/fee1').status, 'unpaid');
  assert.equal(records.has('billingLocks/fee_fee1'), false);
});
test('manual reconciliation cannot change a settled order', async () => {
  const { orderId } = await billing.checkout(request([{ kind: 'fee', id: 'fee1' }]));
  assert.equal(await billing.settleOrder(orderId, 'paid', { reconciliationEvidence: 'Verified in merchant portal' }), '00');
  assert.equal(await billing.settleOrder(orderId, 'failed', {}), '02');
  assert.equal(records.get('tuitionFees/fee1').status, 'paid');
});
test('guest reads expose only authorized fees and this session orders, never contact data or hashes', async () => {
  await billing.checkout(request([{ kind: 'fee', id: 'fee1' }]));
  const owner = await billing.billingData(request([]));
  assert.equal(owner.orders.length, 1); assert.equal(owner.fees.length, 1);
  assert.equal(Object.hasOwn(owner.orders[0], 'guestHash'), false);
  assert.equal(Object.hasOwn(owner.orders[0], 'email'), false);
  assert.equal(Object.hasOwn(owner.fees[0], 'accessHash'), false);
  const other = await billing.billingData({ headers: new Headers({ 'x-billing-guest': 'c'.repeat(64) }) });
  assert.equal(other.orders.length, 0); assert.equal(other.fees.length, 0);
});
test('guest checkout validates contact information without Firebase login', async () => {
  const req = request([{ kind: 'course', id: 'course1' }]);
  const body = await req.json(); body.email = 'bad';
  await assert.rejects(billing.checkout({ ...req, json: async () => body }));
  const result = await billing.checkout(request([{ kind: 'fee', id: 'fee1' }]));
  assert.equal(records.get(`billingOrders/${result.orderId}`).name, 'Test Student');
});
test('rotating a fee link revokes the old token without requiring a student account', async () => {
  const result = await billing.adminAction({ headers: new Headers({ authorization: 'Bearer valid' }), json: async () => ({ action: 'fee-link', feeId: 'fee1' }) });
  assert.equal(result.accessToken.length, 64);
  await assert.rejects(billing.checkout(request([{ kind: 'fee', id: 'fee1' }])));
  const newRequest = request([{ kind: 'fee', id: 'fee1' }]);
  newRequest.headers.set('x-billing-fees', JSON.stringify({ fee1: result.accessToken }));
  const order = await billing.checkout(newRequest);
  assert.ok(order.orderId);
});

const deleteFeeRequest = (body = {}, token = 'valid') => ({ headers: new Headers({ authorization: `Bearer ${token}` }), json: async () => ({ action: 'fee-delete', feeId: 'fee1', confirmed: true, ...body }) });
test('admin creates an unpaid private fee with a hashed link and can delete it before checkout', async () => {
  const result = await billing.adminAction({ headers: new Headers({ authorization: 'Bearer valid' }), json: async () => ({ action: 'fee', academicConfirmed: true, assessmentReference: 'Academic assessment reference 123', assessmentFeedback: '  Needs reading practice; recommend course1.  ', courseId: 'course1', email: 'student@example.test', title: 'Tuition installment 2', amount: 3000000, dueDate: '2026-12-01' }) });
  const fee = records.get(`tuitionFees/${result.feeId}`);
  assert.equal(fee.status, 'unpaid');
  assert.equal(fee.amount, 3000000);
  assert.equal(fee.accessHash, billing.capabilityHash(result.accessToken));
  assert.equal(fee.academicReview.reviewedBy, 'admin1');
  assert.equal(fee.academicReview.feedback, 'Needs reading practice; recommend course1.');
  await billing.adminAction(deleteFeeRequest({ feeId: result.feeId }));
  assert.equal(records.has(`tuitionFees/${result.feeId}`), false);
});
test('admin deletion revokes fee access and records audit without deleting orders', async () => {
  records.set('billingOrders/historical', { status: 'failed', lines: [{ kind: 'fee', id: 'fee1' }] });
  await billing.adminAction(deleteFeeRequest());
  assert.equal(records.has('tuitionFees/fee1'), false);
  assert.equal(records.has('billingOrders/historical'), true);
  const audit = records.get('billingFeeDeletions/fee1');
  assert.equal(audit.deletedBy, 'admin1');
  assert.ok(audit.deletedAt);
  assert.equal(Object.hasOwn(audit, 'accessHash'), false);
  assert.equal((await billing.billingData(request([]))).fees.length, 0);
  await assert.rejects(billing.checkout(request([{ kind: 'fee', id: 'fee1' }])));
});
test('fee deletion requires admin, explicit confirmation and a valid existing id', async () => {
  for (const req of [deleteFeeRequest({}, 'guest'), deleteFeeRequest({ confirmed: false }), deleteFeeRequest({ feeId: '../fee1' }), deleteFeeRequest({ feeId: 'missing' })]) {
    await assert.rejects(billing.adminAction(req));
    assert.ok(records.has('tuitionFees/fee1'));
    assert.equal(records.has('billingFeeDeletions/fee1'), false);
  }
});
test('pending, paid, order-linked or locked fees cannot be deleted', async () => {
  const original = { ...records.get('tuitionFees/fee1') };
  for (const status of ['pending', 'paid']) {
    records.set('tuitionFees/fee1', { ...original, status });
    await assert.rejects(billing.adminAction(deleteFeeRequest()));
  }
  records.set('tuitionFees/fee1', { ...original, orderId: 'unresolved' });
  await assert.rejects(billing.adminAction(deleteFeeRequest()));
  records.set('tuitionFees/fee1', original);
  records.set('billingLocks/fee_fee1', { orderId: 'pending-order', status: 'pending' });
  await assert.rejects(billing.adminAction(deleteFeeRequest()));
  assert.ok(records.has('tuitionFees/fee1'));
  assert.ok(records.has('billingLocks/fee_fee1'));
});
test('checkout lock blocks deletion; definitive failed settlement allows deletion without losing order history', async () => {
  const { orderId } = await billing.checkout(request([{ kind: 'fee', id: 'fee1' }]));
  await assert.rejects(billing.adminAction(deleteFeeRequest()));
  await billing.settleOrder(orderId, 'failed', {});
  await billing.adminAction(deleteFeeRequest());
  assert.equal(records.has('tuitionFees/fee1'), false);
  assert.equal(records.get(`billingOrders/${orderId}`).status, 'failed');
});
test('guest endpoints do not grant admin privileges and malformed contact cannot create financial records', async () => {
  await assert.rejects(billing.adminAction(request([])));
  const req = request([{ kind: 'course', id: 'course1' }]);
  const body = await req.json(); body.phone = 'invalid';
  await assert.rejects(billing.checkout({ ...req, json: async () => body }));
  assert.equal([...records.keys()].some((key) => key.startsWith('billingOrders/')), false);
});
test('direct course checkout cannot bypass required placement assessment, even with a client approval flag', async () => {
  const req = request([{ kind: 'course', id: 'course1' }]);
  const body = await req.json(); body.academicConfirmed = true; delete body.placementDeclaration;
  await assert.rejects(billing.checkout({ ...req, json: async () => body }), /PUBLIC:/);
  assert.equal([...records.keys()].some((key) => key.startsWith('billingOrders/')), false);
});
test('self-report allows a private fee without staff approval but still requires its secret', async () => {
  delete records.get('tuitionFees/fee1').academicReview;
  const req = request([{ kind: 'fee', id: 'fee1' }]);
  req.headers.set('x-billing-fees', '{}');
  await assert.rejects(billing.checkout(req), /PUBLIC:/);
  const result = await billing.checkout(request([{ kind: 'fee', id: 'fee1' }]));
  assert.equal(records.get(`billingOrders/${result.orderId}`).placementDeclaration.source, 'student-self-report');
  const data = await billing.billingData(request([]));
  assert.equal(data.fees[0].academicApproved, false);
});
test('admin cannot create tuition without placement review reference and explicit confirmation', async () => {
  const req = { headers: new Headers({ authorization: 'Bearer valid' }), json: async () => ({ action: 'fee', email: 'test@example.test', title: 'Tuition', amount: 1000 }) };
  await assert.rejects(billing.adminAction(req), /PUBLIC:/);
});
test('admin fee creation rejects missing, blank, short, oversized and non-text assessment feedback without writes', async () => {
  const valid = { action: 'fee', academicConfirmed: true, assessmentReference: 'Exam assessment reference 123', courseId: 'course1', email: 'test@example.test', title: 'Tuition', amount: 1000 };
  const initialSize = records.size;
  for (const assessmentFeedback of [undefined, '', ' '.repeat(20), 'short', '   short   ', 'x'.repeat(2001), {}, null, 12345]) {
    await assert.rejects(billing.adminAction({ headers: new Headers({ authorization: 'Bearer valid' }), json: async () => ({ ...valid, assessmentFeedback }) }), /đánh giá bài kiểm tra đầu vào/);
    assert.equal(records.size, initialSize);
  }
});
test('valid feedback cannot bypass required reference, recommended course or staff confirmation', async () => {
  const valid = { action: 'fee', academicConfirmed: true, assessmentReference: 'Exam assessment reference 123', assessmentFeedback: 'Reading needs improvement; recommend course1.', courseId: 'course1', email: 'test@example.test', title: 'Tuition', amount: 1000 };
  for (const changes of [{ academicConfirmed: false }, { assessmentReference: '' }, { courseId: 'unknown' }]) {
    await assert.rejects(billing.adminAction({ headers: new Headers({ authorization: 'Bearer valid' }), json: async () => ({ ...valid, ...changes }) }), /PUBLIC:/);
  }
});
test('course checkout accepts self-confirmed placement and records feedback without marking staff approval', async () => {
  const result = await billing.checkout(request([{ kind: 'course', id: 'course1' }]));
  const order = records.get(`billingOrders/${result.orderId}`);
  assert.equal(order.placementDeclaration.completed, true);
  assert.equal(order.placementDeclaration.source, 'student-self-report');
  assert.equal(order.placementDeclaration.feedback, 'Academic feedback recommending course1');
  assert.equal(order.status, 'pending');
});
test('placement self-report rejects missing confirmation, whitespace, short, oversized or malformed feedback', async () => {
  const req = request([{ kind: 'course', id: 'course1' }]);
  for (const declaration of [undefined, { completed: false, feedback: 'Academic feedback' }, { completed: 'true', feedback: 'Academic feedback' }, { completed: true, feedback: ' '.repeat(20) }, { completed: true, feedback: 'short' }, { completed: true, feedback: 'x'.repeat(2001) }, { completed: true, feedback: {} }]) {
    const body = await req.json(); body.placementDeclaration = declaration;
    await assert.rejects(billing.checkout({ ...req, json: async () => body }), /PUBLIC:/);
  }
  assert.equal([...records.keys()].some((key) => key.startsWith('billingOrders/')), false);
});