// Isolated tests: never connect to Firebase, VNPAY, or production credentials.
const { test, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const vm = require('node:vm');
const path = require('node:path');
function load(file, mocks = {}, globals = {}) {
  const code = ts.transpileModule(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(code, { exports: module.exports, module, require: (id) => Object.hasOwn(mocks, id) ? mocks[id] : require(id), process, Buffer, URL, URLSearchParams, AbortSignal, console, ...globals });
  return module.exports;
}
const gateway = load('lib/billing/vnpay.ts');
const records = new Map();
let serial = 0;
let studentUid = 'student1';
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
  './student-auth': { studentIdentity: async (required = true) => { if (!studentUid && required) throw Error('AUTH'); return studentUid; } },
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
  studentUid = 'student1';
  Object.assign(process.env, { VNPAY_ENABLED: 'true', VNPAY_ENVIRONMENT: 'sandbox', VNPAY_TMN_CODE: 'TESTCODE', VNPAY_HASH_SECRET: 'isolated-test-secret', BILLING_BASE_URL: 'https://example.test', VNPAY_PRODUCTION_APPROVED: 'false' });
  records.set('billingPrices/course1', { title: 'PTE', enabled: true, amount: 100000 });
  records.set('tuitionFees/fee1', { payerUid: 'student1', title: 'Đợt 1', accessHash: billing.capabilityHash(feeSecret), status: 'unpaid', amount: 200000, academicReview: {reference: 'Placement assessment approved', courseId: 'course1', reviewedBy: 'admin1', reviewedAt: '2026-10-20T00:00:00Z'} });
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
test('payment readiness diagnoses configuration without exposing credentials or URLs', () => {
  const baseline = { ...process.env };
  const cases = [
    ['VNPAY_ENABLED', 'false', 'VNPAY_DISABLED'],
    ['VNPAY_ENVIRONMENT', 'invalid', 'VNPAY_ENVIRONMENT_INVALID'],
    ['VNPAY_TMN_CODE', '', 'VNPAY_TMN_CODE_MISSING'],
    ['VNPAY_TMN_CODE', 'bad', 'VNPAY_TMN_CODE_INVALID'],
    ['VNPAY_HASH_SECRET', '', 'VNPAY_SECRET_MISSING'],
    ['VNPAY_HASH_SECRET', 'private-secret\n', 'VNPAY_SECRET_INVALID'],
    ['BILLING_BASE_URL', '', 'BILLING_BASE_URL_MISSING'],
    ['BILLING_BASE_URL', 'private-invalid-url', 'BILLING_BASE_URL_INVALID'],
    ['BILLING_BASE_URL', 'https://example.test/cart', 'BILLING_BASE_URL_INVALID'],
    ['VNPAY_ENVIRONMENT', 'production', 'VNPAY_PRODUCTION_NOT_APPROVED'],
  ];
  for (const [key, value, code] of cases) {
    Object.assign(process.env, baseline, { [key]: value });
    const result = gateway.paymentReadiness();
    assert.equal(result.available, false); assert.equal(result.code, code);
    assert.deepEqual(Object.keys(result).sort(), ['available', 'code']);
    assert.doesNotMatch(JSON.stringify(result), /private-secret|private-invalid-url/);
  }
  Object.assign(process.env, baseline);
  assert.equal(gateway.paymentReadiness().available, true);
  assert.equal(gateway.paymentReadiness().code, null);
});
test('billing data exposes safe configuration code and recovers when environment is corrected', async () => {
  process.env.VNPAY_ENABLED = 'false';
  const disabled = await billing.billingData(request([]));
  assert.equal(disabled.paymentAvailable, false);
  assert.equal(disabled.paymentUnavailableCode, 'VNPAY_DISABLED');
  assert.equal(Object.hasOwn(disabled, 'secret'), false);
  process.env.VNPAY_ENABLED = 'true';
  const enabled = await billing.billingData(request([]));
  assert.equal(enabled.paymentAvailable, true);
  assert.equal(enabled.paymentUnavailableCode, null);
});
test('sandbox allows explicit loopback returns with ports and signed URLs', () => {
  for (const origin of ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://[::1]:3000']) {
    process.env.BILLING_BASE_URL = origin;
    assert.equal(gateway.paymentAvailable(), true);
    const url = new URL(gateway.createPaymentUrl('local-test', 100000, new Date(), '127.0.0.1').url);
    assert.equal(url.searchParams.get('vnp_ReturnUrl'), `${origin}/api/payments/vnpay/return`);
    assert.equal(gateway.verifySignature(gateway.parseCallback(url.searchParams), process.env.VNPAY_HASH_SECRET), true);
  }
});
test('callback origins reject non-loopback HTTP, malformed origins and all production loopback', () => {
  for (const origin of ['http://example.test', 'http://localhost.evil.test:3000', 'http://192.168.1.1:3000', 'ftp://localhost', 'http://user:pass@localhost:3000', 'http://localhost:3000/cart', 'http://localhost:3000?x=1', 'http://localhost:3000#x']) {
    process.env.BILLING_BASE_URL = origin;
    assert.equal(gateway.paymentAvailable(), false, origin);
  }
  process.env.VNPAY_ENVIRONMENT = 'production'; process.env.VNPAY_PRODUCTION_APPROVED = 'true';
  for (const origin of ['http://localhost:3000', 'https://localhost:3000', 'http://127.0.0.1:3000', 'https://[::1]:3000']) {
    process.env.BILLING_BASE_URL = origin;
    assert.equal(gateway.paymentAvailable(), false, origin);
  }
  process.env.BILLING_BASE_URL = 'https://example.test';
  assert.equal(gateway.paymentAvailable(), true);
});
test('local Return route redirects verified callbacks to local cart without settling payments', async () => {
  process.env.BILLING_BASE_URL = 'http://localhost:3000';
  const route = load('app/api/payments/vnpay/return/route.ts', { '@/lib/billing/vnpay': gateway });
  const { orderId } = await billing.checkout(request([{ kind: 'fee', id: 'fee1' }]));
  const response = await route.GET({ nextUrl: new URL(`http://localhost:3000/api/payments/vnpay/return?${new URLSearchParams(callback(orderId))}`) });
  assert.equal(response.status, 303);
  assert.equal(response.headers.get('location'), `http://localhost:3000/cart?order=${orderId}`);
  assert.equal(records.get(`billingOrders/${orderId}`).status, 'pending');
  const invalid = await route.GET({ nextUrl: new URL('http://localhost:3000/api/payments/vnpay/return?vnp_SecureHash=invalid') });
  assert.equal(invalid.headers.get('location'), 'http://localhost:3000/cart?callback=invalid');
});
test('issued PTE sandbox merchant uses the sandbox gateway and signed callback origin', () => {
  process.env.VNPAY_TMN_CODE = 'PTETEST1';
  process.env.BILLING_BASE_URL = 'https://www.pteintensive.com';
  const result = gateway.createPaymentUrl('pte-demo-1', 100000, new Date('2026-10-23T00:00:00Z'), '127.0.0.1');
  const url = new URL(result.url);
  assert.equal(url.origin, 'https://sandbox.vnpayment.vn');
  assert.equal(url.searchParams.get('vnp_TmnCode'), 'PTETEST1');
  assert.equal(url.searchParams.get('vnp_ReturnUrl'), 'https://www.pteintensive.com/api/payments/vnpay/return');
  assert.equal(url.searchParams.has('vnp_BankCode'), false);
  assert.equal(gateway.verifySignature(gateway.parseCallback(url.searchParams), process.env.VNPAY_HASH_SECRET), true);
});
test('placeholder credentials and TEST merchant in production fail closed', () => {
  for (const value of ['', '<mã sandbox được cấp>', 'BAD CODE']) {
    process.env.VNPAY_TMN_CODE = value;
    assert.equal(gateway.paymentAvailable(), false);
  }
  process.env.VNPAY_TMN_CODE = 'PTETEST1';
  for (const value of ['', '<secret sandbox được cấp>', 'your_secret', 'replace-me', ' key ']) {
    process.env.VNPAY_HASH_SECRET = value;
    assert.equal(gateway.paymentAvailable(), false);
  }
  process.env.VNPAY_HASH_SECRET = 'isolated-test-secret';
  process.env.VNPAY_ENVIRONMENT = 'production';
  process.env.VNPAY_PRODUCTION_APPROVED = 'true';
  assert.throws(gateway.paymentConfig, /TEST/);
});
test('approved tuition checkout calculates trusted total and locks all items', async () => {
  const result = await billing.checkout(request([{ kind: 'fee', id: 'fee1', amount: 1 }]));
  assert.equal(records.get(`billingOrders/${result.orderId}`).total, 200000);
  assert.equal(records.get('tuitionFees/fee1').status, 'pending');
  const retry = await billing.checkout(request([{ kind: 'fee', id: 'fee1' }]));
  assert.equal(retry.orderId, result.orderId);
  assert.equal(retry.url, result.url);
});
test('approved private tuition does not require a student self-declaration', async () => {
  const req = request([{ kind: 'fee', id: 'fee1' }]);
  const body = await req.json(); delete body.placementDeclaration;
  const { orderId } = await billing.checkout({ ...req, json: async () => body });
  const order = records.get(`billingOrders/${orderId}`);
  assert.equal(order.uid, 'student1');
  assert.equal(order.placementDeclaration, undefined);
});
test('Clerk identity is mandatory for checkout; posting another UID cannot override it', async () => {
  studentUid = null;
  await assert.rejects(billing.checkout(request([{ kind: 'fee', id: 'fee1' }])), /AUTH/);
  studentUid = 'student1';
  const req = request([{ kind: 'fee', id: 'fee1' }]);
  const body = { ...await req.json(), uid: 'attacker', academicApproved: true };
  const { orderId } = await billing.checkout({ ...req, json: async () => body });
  assert.equal(records.get(`billingOrders/${orderId}`).uid, 'student1');
});
test('public billing catalog discloses no private fees or orders when signed out', async () => {
  await billing.checkout(request([{ kind: 'fee', id: 'fee1' }]));
  studentUid = null;
  const data = await billing.billingData(request([]));
  assert.equal(data.prices.length, 1);
  assert.equal(data.fees.length, 0); assert.equal(data.orders.length, 0);
});
test('redeeming a private link binds one payer and persists access without the link', async () => {
  delete records.get('tuitionFees/fee1').payerUid;
  const first = await billing.billingData(request([]));
  assert.equal(first.fees.length, 1);
  const noLink = await billing.billingData({ headers: new Headers() });
  assert.equal(noLink.fees.length, 1);
  studentUid = 'other';
  assert.equal((await billing.billingData(request([]))).fees.length, 0);
  await assert.rejects(billing.checkout(request([{ kind: 'fee', id: 'fee1' }])), /PUBLIC:/);
});
test('legacy pending guest fees are not silently attached to a new Clerk payer', async () => {
  const fee = records.get('tuitionFees/fee1');
  delete fee.payerUid; fee.status = 'pending'; fee.orderId = 'legacy-order';
  await assert.rejects(billing.billingData(request([])), /PUBLIC:/);
  assert.equal(fee.payerUid, undefined); assert.equal(fee.orderId, 'legacy-order');
});
test('QueryDR checksum follows the documented pipe order and rejects tampering', () => {
  const { createHmac } = require('node:crypto');
  const result = Object.fromEntries(gateway.queryResponseFields.map((key, index) => [key, String(index)]));
  result.vnp_SecureHash = createHmac('sha512', 'key').update(gateway.queryResponseFields.map((key) => result[key]).join('|')).digest('hex');
  assert.equal(gateway.verifyQueryResponse(result, 'key'), true);
  result.vnp_Amount = '999';
  assert.equal(gateway.verifyQueryResponse(result, 'key'), false);
});
test('QueryDR request is signed correctly and verifies the gateway response before use', async () => {
  process.env.VNPAY_QUERY_IP = '127.0.0.1';
  let posted;
  const queryGateway = load('lib/billing/vnpay.ts', {}, { fetch: async (url, options) => {
    assert.equal(url, 'https://sandbox.vnpayment.vn/merchant_webapi/api/transaction');
    posted = JSON.parse(options.body);
    const fields = ['vnp_RequestId', 'vnp_Version', 'vnp_Command', 'vnp_TmnCode', 'vnp_TxnRef', 'vnp_TransactionDate', 'vnp_CreateDate', 'vnp_IpAddr', 'vnp_OrderInfo'];
    assert.equal(posted.vnp_SecureHash, gateway.querySignature(posted, fields, process.env.VNPAY_HASH_SECRET));
    const result = { vnp_ResponseId: 'response1', vnp_Command: 'querydr', vnp_ResponseCode: '00', vnp_Message: 'Success', vnp_TmnCode: 'TESTCODE', vnp_TxnRef: 'order1', vnp_Amount: '20000000', vnp_BankCode: 'NCB', vnp_TransactionNo: '123', vnp_TransactionType: '01', vnp_TransactionStatus: '00', vnp_OrderInfo: 'Test' };
    result.vnp_SecureHash = gateway.querySignature(result, gateway.queryResponseFields, process.env.VNPAY_HASH_SECRET);
    return { ok: true, json: async () => result };
  } });
  assert.equal((await queryGateway.queryTransaction('order1', '2026-10-27T00:00:00Z')).vnp_TransactionStatus, '00');
  assert.equal(posted.vnp_TransactionDate, '20261027070000');
  const invalid = load('lib/billing/vnpay.ts', {}, { fetch: async () => ({ ok: true, json: async () => ({ vnp_SecureHash: 'bad' }) }) });
  await assert.rejects(invalid.queryTransaction('order1', '2026-10-27T00:00:00Z'), /Invalid/);
});
test('QueryDR reconciliation checks account ownership, cooldown, uncertain status and late IPN', async () => {
  const { orderId } = await billing.checkout(request([{ kind: 'fee', id: 'fee1' }]));
  let calls = 0; let status = '01';
  const queryBilling = load('lib/billing/server.ts', {
    '@/lib/firebase-admin': { getAdminDb: () => db }, '@/lib/admin-auth': {}, '@/lib/courseData': { courseData: {} },
    './student-auth': { studentIdentity: async () => studentUid }, './placement': load('lib/billing/placement.ts'),
    './vnpay': { ...gateway, queryTransaction: async () => { calls++; return { vnp_TmnCode: 'TESTCODE', vnp_TxnRef: orderId, vnp_Amount: '20000000', vnp_ResponseCode: '00', vnp_TransactionType: '01', vnp_TransactionStatus: status }; } },
  });
  const req = { json: async () => ({ orderId }) };
  studentUid = 'other'; await assert.rejects(queryBilling.checkStudentOrder(req), /FORBIDDEN/); assert.equal(calls, 0);
  studentUid = 'student1'; await queryBilling.checkStudentOrder(req); assert.equal(calls, 1);
  assert.equal(records.get(`billingOrders/${orderId}`).status, 'pending');
  await assert.rejects(queryBilling.checkStudentOrder(req), /PUBLIC:/); assert.equal(calls, 1);
  records.get(`billingOrders/${orderId}`).lastQueryAt = 0; status = '00';
  await queryBilling.checkStudentOrder(req);
  assert.equal(records.get(`billingOrders/${orderId}`).status, 'paid');
  assert.equal((await billing.processIPN(callback(orderId))).RspCode, '02');
});
test('uncertain signed IPN validates merchant, order and amount before acknowledging', async () => {
  const { orderId } = await billing.checkout(request([{ kind: 'fee', id: 'fee1' }]));
  assert.equal((await billing.processIPN(callback('missing', '20000000', '07', '07'))).RspCode, '01');
  assert.equal((await billing.processIPN(callback(orderId, '10000000', '07', '07'))).RspCode, '04');
  const wrong = callback(orderId); wrong.vnp_TmnCode = 'WRONG123'; wrong.vnp_SecureHash = gateway.signature(wrong, process.env.VNPAY_HASH_SECRET);
  assert.equal((await billing.processIPN(wrong)).RspCode, '97');
  assert.equal(records.get(`billingOrders/${orderId}`).status, 'pending');
  assert.equal((await billing.processIPN(callback(orderId, '20000000', '07', '07'))).RspCode, '00');
  assert.equal(records.get('billingLocks/fee_fee1').status, 'pending');
  assert.equal((await billing.processIPN(callback(orderId))).RspCode, '00');
  assert.equal(records.get(`billingOrders/${orderId}`).status, 'paid');
});
test('draft API scopes persisted progress to Clerk account and preserves stale drafts for review', async () => {
  const draftLib = load('lib/billing/draft.ts');
  const route = load('app/api/billing/draft/route.ts', {
    '@/lib/billing/student-auth': { studentIdentity: async () => { if (!studentUid) throw Error('AUTH'); return studentUid; } },
    '@/lib/firebase-admin': { getAdminDb: () => db }, '@/lib/billing/server': { billingError: billing.billingError }, '@/lib/billing/draft': draftLib,
  });
  const draft = draftLib.emptyDraft();
  draft.declaration = { completed: true, feedback: 'Actual academic feedback' };
  draft.cart = [{ kind: 'course', id: 'course1' }];
  draft.contact = { name: 'Student', email: 'test@example.test', phone: '0912345678' };
  const draftRequest = { headers: new Headers({ 'x-billing-account': 'student1' }), json: async () => draft };
  assert.equal((await route.PUT(draftRequest)).status, 200);
  let result = await (await route.GET()).json();
  assert.equal(result.draft.declaration.feedback, draft.declaration.feedback); assert.equal(result.needsReview, false);
  records.get('billingDrafts/student1').updatedAt = Date.now() - draftLib.DRAFT_REVIEW_MS - 1;
  result = await (await route.GET()).json();
  assert.equal(result.needsReview, true); assert.equal(result.draft.cart.length, 1);
  studentUid = 'other';
  assert.equal((await (await route.GET()).json()).draft.cart.length, 0);
  assert.equal((await route.PUT(draftRequest)).status, 403);
  studentUid = null; assert.equal((await route.GET()).status, 401);
});
test('guest checkout rejects wrong fee capability, duplicate items, disabled courses, malformed session', async () => {
  records.get('tuitionFees/fee1').payerUid = 'other';
  await assert.rejects(billing.checkout(request([{ kind: 'fee', id: 'fee1' }])));
  await assert.rejects(billing.checkout(request([{ kind: 'course', id: 'course1' }, { kind: 'course', id: 'course1' }])));
  records.get('billingPrices/course1').enabled = false;
  await assert.rejects(billing.checkout(request([{ kind: 'course', id: 'course1' }])));
  await assert.rejects(billing.checkout(request([], 'wrong')));
  assert.equal(records.has('billingLocks/fee_fee1'), false);
});
test('checkout retries reuse the entire pending order without writes, even at the creation limit', async () => {
  const items = [{ kind: 'fee', id: 'fee1' }, { kind: 'course', id: 'course1' }];
  const first = await billing.checkout(request(items));
  for (const [key, value] of records) if (key.startsWith('billingLimits/')) value.count = 5;
  const before = JSON.stringify([...records]);
  const retry = await billing.checkout(request([...items].reverse()));
  assert.equal(retry.orderId, first.orderId);
  assert.equal(retry.url, first.url);
  assert.equal(JSON.stringify([...records]), before);
});
test('pending checkout refuses changed carts, totals, customer details, prices and environments without writes', async () => {
  const items = [{ kind: 'fee', id: 'fee1' }, { kind: 'course', id: 'course1' }];
  await billing.checkout(request(items));
  const before = JSON.stringify([...records]);
  await assert.rejects(billing.checkout(request(items.slice(0, 1))), /Lịch sử đơn/);
  await assert.rejects(billing.checkout(request(items, guestSecret, 1)), /Lịch sử đơn/);
  for (const changes of [{ name: 'Another Student' }, { email: 'another@example.test' }, { phone: '+84987654321' }]) {
    const req = request(items); const body = await req.json();
    await assert.rejects(billing.checkout({ ...req, json: async () => ({ ...body, ...changes }) }), /Lịch sử đơn/);
  }
  assert.equal(JSON.stringify([...records]), before);
  records.get('billingPrices/course1').amount++;
  await assert.rejects(billing.checkout(request(items)), /Lịch sử đơn/);
  records.get('billingPrices/course1').amount--;
  records.get('billingOrders/order1').environment = 'production';
  await assert.rejects(billing.checkout(request(items)), /Lịch sử đơn/);
});
test('expired pending and paid orders remain locked with specific recovery instructions', async () => {
  const items = [{ kind: 'fee', id: 'fee1' }];
  const { orderId } = await billing.checkout(request(items));
  records.get(`billingOrders/${orderId}`).expiresAt = '2000-01-01T00:00:00Z';
  const before = JSON.stringify([...records]);
  await assert.rejects(billing.checkout(request(items)), /hết hạn.*VNPAY/);
  assert.equal(JSON.stringify([...records]), before);
  await billing.settleOrder(orderId, 'paid', {});
  await assert.rejects(billing.checkout(request(items)), /đã được thanh toán/);
  assert.equal(records.get('billingLocks/fee_fee1').status, 'paid');
});
test('checkout conflicts identify the blocking order and exact reason without modifying financial records', async () => {
  const items = [{ kind: 'course', id: 'course1' }];
  const { orderId } = await billing.checkout(request(items));
  const before = JSON.stringify([...records]);
  for (const [changes, reason] of [
    [{ name: 'Another Student' }, /Thông tin học viên khác/],
    [{ expectedTotal: 1 }, /Giỏ hàng hoặc giá hiện tại khác/],
  ]) {
    const req = request(items); const body = await req.json();
    await assert.rejects(billing.checkout({ ...req, json: async () => ({ ...body, ...changes }) }), (error) => {
      assert.equal(error.orderId, orderId);
      assert.match(error.message, reason);
      return true;
    });
    assert.equal(JSON.stringify([...records]), before);
  }
});
test('pending order URLs are never returned to another session or an invalid fee capability', async () => {
  const items = [{ kind: 'fee', id: 'fee1' }];
  await billing.checkout(request(items));
  const before = JSON.stringify([...records]);
  studentUid = 'other';
  await assert.rejects(billing.checkout(request(items)), /PUBLIC:/);
  assert.equal(JSON.stringify([...records]), before);
});
test('checkout rejects stale totals without writing an order or lock', async () => {
  await assert.rejects(billing.checkout(request([{ kind: 'fee', id: 'fee1' }], 'valid', 1)));
  assert.equal([...records.keys()].some((key) => key.startsWith('billingLocks/')), false);
});
test('production course repurchase creates a new order, preserves paid history and ignores old callbacks', async () => {
  process.env.VNPAY_ENVIRONMENT = 'production';
  process.env.VNPAY_PRODUCTION_APPROVED = 'true';
  const items = [{ kind: 'course', id: 'course1' }];
  const first = await billing.checkout(request(items));
  assert.equal((await billing.processIPN(callback(first.orderId, '10000000'))).RspCode, '00');
  const original = JSON.stringify(records.get(`billingOrders/${first.orderId}`));
  const second = await billing.checkout(request(items));
  assert.notEqual(second.orderId, first.orderId);
  const lockKey = [...records.keys()].find((key) => key.startsWith('billingLocks/course_'));
  assert.equal(records.get(lockKey).orderId, second.orderId);
  assert.equal(records.get(lockKey).status, 'pending');
  assert.equal((await billing.checkout(request(items))).orderId, second.orderId);
  assert.equal((await billing.processIPN(callback(first.orderId, '10000000'))).RspCode, '02');
  assert.equal(records.get(lockKey).orderId, second.orderId);
  assert.equal((await billing.processIPN(callback(second.orderId, '10000000'))).RspCode, '00');
  assert.equal(JSON.stringify(records.get(`billingOrders/${first.orderId}`)), original);
  assert.equal(records.get(`billingOrders/${second.orderId}`).status, 'paid');
});
test('repurchase with a new private fee preserves the original paid fee and failed repurchase unlocks only the new order', async () => {
  const first = await billing.checkout(request([{ kind: 'course', id: 'course1' }, { kind: 'fee', id: 'fee1' }]));
  assert.equal((await billing.processIPN(callback(first.orderId, '30000000'))).RspCode, '00');
  const second = await billing.checkout(request([{ kind: 'course', id: 'course1' }]));
  assert.equal((await billing.processIPN(callback(second.orderId, '10000000', '24', '02'))).RspCode, '00');
  assert.equal(records.get('tuitionFees/fee1').status, 'paid');
  assert.equal(records.get('billingLocks/fee_fee1').orderId, first.orderId);
  await assert.rejects(billing.checkout(request([{ kind: 'course', id: 'course1' }, { kind: 'fee', id: 'fee1' }])), /đã được thanh toán/);
  assert.ok((await billing.checkout(request([{ kind: 'course', id: 'course1' }]))).url);
});
test('repurchase validates prior payment, current price and environment without modifying locks on rejection', async () => {
  const items = [{ kind: 'course', id: 'course1' }];
  const first = await billing.checkout(request(items));
  await billing.processIPN(callback(first.orderId, '10000000'));
  const before = JSON.stringify([...records]);
  await assert.rejects(billing.checkout(request(items, guestSecret, 1)), /Học phí đã thay đổi/);
  assert.equal(JSON.stringify([...records]), before);
  const previous = records.get(`billingOrders/${first.orderId}`);
  for (const [field, value] of [['status', 'pending'], ['guestHash', 'wrong'], ['environment', 'production']]) {
    const saved = previous[field]; previous[field] = value;
    const snapshot = JSON.stringify([...records]);
    await assert.rejects(billing.checkout(request(items)), /Không thể xác minh/);
    assert.equal(JSON.stringify([...records]), snapshot);
    previous[field] = saved;
  }
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
  assert.equal((await billing.processIPN(callback(orderId, '20000000', '07', '07'))).RspCode, '00');
  assert.equal(records.get(`billingOrders/${orderId}`).reviewRequired, true);
  assert.equal(records.get('tuitionFees/fee1').status, 'pending');
  assert.equal((await billing.processIPN(callback(orderId, '20000000', '24', '02'))).RspCode, '00');
  assert.equal(records.get('tuitionFees/fee1').status, 'unpaid');
  assert.equal(records.has('billingLocks/fee_fee1'), false);
});
test('archive preserves failed order evidence, supports retries and allows a new checkout', async () => {
  const { orderId } = await billing.checkout(request([{ kind: 'fee', id: 'fee1' }]));
  assert.equal((await billing.processIPN(callback(orderId, '20000000', '24', '02'))).RspCode, '00');
  const req = { headers: new Headers({ authorization: 'Bearer valid' }), json: async () => ({ action: 'order-archive', orderId, confirmed: true }) };
  const before = { ...records.get(`billingOrders/${orderId}`) };
  await billing.adminAction(req);
  const archived = { ...records.get(`billingOrders/${orderId}`) };
  assert.equal(archived.archivedBy, 'admin1');
  assert.ok(archived.archivedAt);
  for (const [key, value] of Object.entries(before)) assert.deepEqual(archived[key], value);
  await billing.adminAction(req);
  assert.deepEqual(records.get(`billingOrders/${orderId}`), archived);
  assert.equal((await billing.billingData(request([]))).orders[0].id, orderId);
  assert.ok((await billing.checkout(request([{ kind: 'fee', id: 'fee1' }]))).orderId);
});
test('archive rejects unauthorized, unconfirmed, missing, pending and paid orders without writes', async () => {
  const { orderId } = await billing.checkout(request([{ kind: 'fee', id: 'fee1' }]));
  const call = (body, token = 'valid') => billing.adminAction({ headers: new Headers({ authorization: `Bearer ${token}` }), json: async () => ({ action: 'order-archive', orderId, confirmed: true, ...body }) });
  await assert.rejects(call({}), /Chỉ lưu trữ/);
  await assert.rejects(call({ confirmed: false }), /Cần xác nhận/);
  await assert.rejects(call({ orderId: '../invalid' }), /Cần xác nhận/);
  await assert.rejects(call({ orderId: 'missing' }), /Chỉ lưu trữ/);
  await assert.rejects(call({}, 'invalid'), /AUTH/);
  await billing.settleOrder(orderId, 'paid', {});
  await assert.rejects(call({}), /Chỉ lưu trữ/);
  assert.equal(records.get(`billingOrders/${orderId}`).archivedAt, undefined);
  assert.equal(records.get('billingLocks/fee_fee1').status, 'paid');
});
test('sandbox reset releases mixed checkout locks, keeps audit, allows retry and ignores old callbacks', async () => {
  const items = [{ kind: 'fee', id: 'fee1' }, { kind: 'course', id: 'course1' }];
  const { orderId } = await billing.checkout(request(items));
  const req = { headers: new Headers({ authorization: 'Bearer valid' }), json: async () => ({ action: 'sandbox-reset', orderId, confirmed: true }) };
  await billing.adminAction(req);
  const reset = { ...records.get(`billingOrders/${orderId}`) };
  assert.equal(reset.status, 'failed');
  assert.equal(reset.sandboxResetBy, 'admin1'); assert.ok(reset.sandboxResetAt);
  assert.equal(records.get('tuitionFees/fee1').status, 'unpaid');
  assert.equal(records.get('tuitionFees/fee1').orderId, '');
  assert.equal([...records.keys()].some((key) => key.startsWith('billingLocks/')), false);
  const next = await billing.checkout(request(items));
  const locks = JSON.stringify([...records.entries()].filter(([key]) => key.startsWith('billingLocks/')));
  await billing.adminAction(req);
  assert.deepEqual(records.get(`billingOrders/${orderId}`), reset);
  assert.equal(await billing.settleOrder(orderId, 'paid', {}), '02');
  assert.equal(JSON.stringify([...records.entries()].filter(([key]) => key.startsWith('billingLocks/'))), locks);
  assert.equal(records.get(`billingOrders/${next.orderId}`).status, 'pending');
});
test('sandbox reset rejects production, unauthorized, unconfirmed, settled and mismatched records without writes', async () => {
  const { orderId } = await billing.checkout(request([{ kind: 'fee', id: 'fee1' }]));
  const call = (changes = {}, token = 'valid') => billing.adminAction({ headers: new Headers({ authorization: `Bearer ${token}` }), json: async () => ({ action: 'sandbox-reset', orderId, confirmed: true, ...changes }) });
  const original = JSON.stringify([...records]);
  for (const environment of ['production', '', undefined]) {
    if (environment === undefined) delete process.env.VNPAY_ENVIRONMENT; else process.env.VNPAY_ENVIRONMENT = environment;
    await assert.rejects(call(), /môi trường sandbox/);
  }
  process.env.VNPAY_ENVIRONMENT = 'sandbox';
  await assert.rejects(call({}, 'invalid'), /AUTH/);
  await assert.rejects(call({ confirmed: false }), /Cần xác nhận/);
  await assert.rejects(call({ orderId: '../invalid' }), /Cần xác nhận/);
  await assert.rejects(call({ orderId: 'missing' }), /không tồn tại/);
  assert.equal(JSON.stringify([...records]), original);
  const order = records.get(`billingOrders/${orderId}`);
  order.environment = 'production'; await assert.rejects(call(), /thanh toán thật/); order.environment = 'sandbox';
  order.status = 'paid'; await assert.rejects(call(), /đang chờ/);
  order.status = 'failed'; await assert.rejects(call(), /đang chờ/); order.status = 'pending';
  records.get('billingLocks/fee_fee1').orderId = 'other';
  await assert.rejects(call(), /đã thay đổi/);
  records.get('billingLocks/fee_fee1').orderId = orderId;
  records.get('tuitionFees/fee1').orderId = 'other';
  await assert.rejects(call(), /đã thay đổi/);
  assert.equal(order.status, 'pending'); assert.equal(order.sandboxResetAt, undefined);
});
test('verified IPN cannot change a settled order', async () => {
  const { orderId } = await billing.checkout(request([{ kind: 'fee', id: 'fee1' }]));
  assert.equal((await billing.processIPN(callback(orderId))).RspCode, '00');
  assert.equal(await billing.settleOrder(orderId, 'failed', {}), '02');
  assert.equal(records.get('tuitionFees/fee1').status, 'paid');
});
test('removed manual reconciliation API rejects both outcomes without changing pending or paid orders', async () => {
  const { orderId } = await billing.checkout(request([{ kind: 'fee', id: 'fee1' }]));
  for (const status of ['pending', 'paid']) {
    if (status === 'paid') assert.equal((await billing.processIPN(callback(orderId))).RspCode, '00');
    const before = JSON.stringify([...records]);
    for (const outcome of ['paid', 'failed']) {
      await assert.rejects(billing.adminAction({ headers: new Headers({ authorization: 'Bearer valid' }), json: async () => ({ action: 'reconcile', orderId, outcome, evidence: 'Previously accepted manual evidence' }) }), /Thao tác không hợp lệ/);
      assert.equal(JSON.stringify([...records]), before);
    }
  }
});
test('guest reads expose only authorized fees and this session orders, never contact data or hashes', async () => {
  await billing.checkout(request([{ kind: 'fee', id: 'fee1' }]));
  const owner = await billing.billingData(request([]));
  assert.equal(owner.orders.length, 1); assert.equal(owner.fees.length, 1);
  assert.equal(Object.hasOwn(owner.orders[0], 'guestHash'), false);
  assert.equal(Object.hasOwn(owner.orders[0], 'email'), false);
  assert.equal(Object.hasOwn(owner.fees[0], 'accessHash'), false);
  studentUid = 'other';
  const other = await billing.billingData({ headers: new Headers() });
  assert.equal(other.orders.length, 0); assert.equal(other.fees.length, 0);
});
test('guest checkout validates contact information without Firebase login', async () => {
  const req = request([{ kind: 'course', id: 'course1' }]);
  const body = await req.json(); body.email = 'bad';
  await assert.rejects(billing.checkout({ ...req, json: async () => body }));
  const result = await billing.checkout(request([{ kind: 'fee', id: 'fee1' }]));
  assert.equal(records.get(`billingOrders/${result.orderId}`).name, 'Test Student');
});
test('rotating a link keeps existing account ownership and rejects another payer', async () => {
  const result = await billing.adminAction({ headers: new Headers({ authorization: 'Bearer valid' }), json: async () => ({ action: 'fee-link', feeId: 'fee1' }) });
  assert.equal(result.accessToken.length, 64);
  studentUid = 'other';
  await assert.rejects(billing.checkout(request([{ kind: 'fee', id: 'fee1' }])));
  studentUid = 'student1';
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
test('private fee requires staff approval even when student supplied a declaration', async () => {
  delete records.get('tuitionFees/fee1').academicReview;
  const req = request([{ kind: 'fee', id: 'fee1' }]);
  req.headers.set('x-billing-fees', '{}');
  await assert.rejects(billing.checkout(req), /PUBLIC:/);
  await assert.rejects(billing.checkout(request([{ kind: 'fee', id: 'fee1' }])), /PUBLIC:/);
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