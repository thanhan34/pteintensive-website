import { NextRequest, NextResponse } from 'next/server';
import { isIP } from 'node:net';
import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';
import { requireAdminFromRequest } from '@/lib/admin-auth';
import { courseData } from '@/lib/courseData';
import { createPaymentUrl, paymentAvailable, paymentConfig, verifySignature } from './vnpay';
import type { BillingOrder, BillingLine, CartItem } from './types';
import { academicallyApproved, validPlacementDeclaration } from './placement';

export async function billingUser(request: NextRequest) {
  const token = request.headers.get('authorization')?.match(/^Bearer (.+)$/)?.[1];
  if (!token) throw new Error('AUTH');
  try { return await getAdminAuth().verifyIdToken(token, true); } catch { throw new Error('AUTH'); }
}
export function billingError(error: unknown) {
  const message = error instanceof Error ? error.message : '';
  if (message === 'AUTH') return NextResponse.json({ error: 'Vui lòng đăng nhập lại.' }, { status: 401 });
  if (message === 'FORBIDDEN') return NextResponse.json({ error: 'Tài khoản không có quyền quản lý học phí.' }, { status: 403 });
  console.error('[billing]', error);
  return NextResponse.json({ error: message.startsWith('PUBLIC:') ? message.slice(7) : 'Không thể xử lý yêu cầu. Vui lòng thử lại hoặc liên hệ trung tâm.' }, { status: 400 });
}
async function billingAdmin(request: NextRequest) {
  await billingUser(request);
  try { return await requireAdminFromRequest(request); } catch { throw new Error('FORBIDDEN'); }
}
function reject(message: string): never { throw new Error(`PUBLIC:${message}`); }
export const capabilityHash = (token: string) => createHash('sha256').update(token).digest('hex');
function matchesCapability(token: unknown, hash: unknown) {
  return typeof token === 'string' && /^[a-f0-9]{64}$/.test(token) && typeof hash === 'string' && /^[a-f0-9]{64}$/.test(hash)
    && timingSafeEqual(Buffer.from(capabilityHash(token), 'hex'), Buffer.from(hash, 'hex'));
}
function guest(request: NextRequest) {
  const token = request.headers.get('x-billing-guest') || '';
  if (!/^[a-f0-9]{64}$/.test(token)) reject('Phiên thanh toán không hợp lệ. Vui lòng tải lại trang.');
  return capabilityHash(token);
}
function capabilities(request: NextRequest): Record<string, string> {
  const raw = request.headers.get('x-billing-fees') || '{}';
  if (raw.length > 4000) reject('Quá nhiều liên kết học phí.');
  const value = JSON.parse(raw);
  if (!value || typeof value !== 'object' || Array.isArray(value) || Object.keys(value).length > 20) reject('Liên kết học phí không hợp lệ.');
  for (const [id, token] of Object.entries(value)) if (!/^[a-zA-Z0-9_-]{1,100}$/.test(id) || typeof token !== 'string' || !/^[a-f0-9]{64}$/.test(token)) reject('Liên kết học phí không hợp lệ.');
  return value;
}
export function validAmount(value: unknown): value is number {
  return typeof value === 'number' && Number.isSafeInteger(value) && value > 0 && value <= 500_000_000;
}
export async function billingData(request: NextRequest) {
  const guestHash = guest(request);
  const feeTokens = capabilities(request);
  const db = getAdminDb();
  const [prices, fees, orders] = await Promise.all([
    db.collection('billingPrices').get(),
    Promise.all(Object.keys(feeTokens).map((id) => db.collection('tuitionFees').doc(id).get())),
    db.collection('billingOrders').where('guestHash', '==', guestHash).get(),
  ]);
  return {
    prices: prices.docs.map((doc) => ({ id: doc.id, title: doc.data().title, amount: doc.data().amount, enabled: doc.data().enabled })),
    fees: fees.filter((doc) => doc.exists && matchesCapability(feeTokens[doc.id], doc.data()?.accessHash))
      .map((doc) => { const fee = doc.data()!; return { id: doc.id, title: fee.title, amount: fee.amount, dueDate: fee.dueDate, status: fee.status, academicApproved: academicallyApproved(fee), courseTitle: courseData[fee.academicReview?.courseId]?.title || '' }; }),
    orders: orders.docs.filter((doc) => doc.data()?.guestHash === guestHash).map((doc) => {
      const order = doc.data() as BillingOrder;
      return { id: doc.id, lines: order.lines, total: order.total, status: order.status, createdAt: order.createdAt, expiresAt: order.expiresAt, paymentUrl: order.paymentUrl, environment: order.environment, transactionNo: order.transactionNo || '' };
    })
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 50),
    paymentAvailable: paymentAvailable(),
    environment: process.env.VNPAY_ENVIRONMENT === 'production' ? 'production' : 'sandbox',
  };
}
export async function checkout(request: NextRequest) {
  const guestHash = guest(request);
  const feeTokens = capabilities(request);
  const body = await request.json();
  if (!body || typeof body !== 'object') reject('Thông tin thanh toán không hợp lệ.');
  if (!validPlacementDeclaration(body.placementDeclaration)) reject('Vui lòng xác nhận đã làm bài kiểm tra đầu vào và nhập nhận xét từ đội học thuật (10–2000 ký tự) trước khi thanh toán.');
  const { name, email, phone } = body;
  if (typeof name !== 'string' || name.trim().length < 2 || name.length > 100 || typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || typeof phone !== 'string' || !/^\+?[\d ()-]{8,25}$/.test(phone)) reject('Vui lòng nhập họ tên, email và số điện thoại hợp lệ.');
  const user = { uid: `guest_${guestHash}`, email: email.trim().toLowerCase() };
  if (!Array.isArray(body.items) || !body.items.length || body.items.length > 20) reject('Vui lòng chọn từ 1 đến 20 khoản học phí.');
  const items: CartItem[] = body.items;
  const keys = new Set<string>();
  for (const item of items) {
    if (!item || !['course', 'fee'].includes(item.kind) || typeof item.id !== 'string' || !/^[a-zA-Z0-9_-]{1,100}$/.test(item.id)) reject('Khoản học phí không hợp lệ.');
    const key = `${item.kind}:${item.id}`;
    if (keys.has(key)) reject('Khoản học phí bị trùng.');
    keys.add(key);
  }
  let config;
  try { config = paymentConfig(); } catch (error) { reject(error instanceof Error ? error.message : 'Chưa bật thanh toán.'); }
  const db = getAdminDb();
  const orderRef = db.collection('billingOrders').doc();
  const now = new Date();
  // Only trust a proxy-provided address when deployment explicitly opts in.
  const address = process.env.BILLING_TRUST_PROXY === 'true' ? request.headers.get('x-forwarded-for')?.split(',')[0].trim() : '';
  const ip = address && isIP(address) ? address : '127.0.0.1';
  return db.runTransaction(async (tx) => {
    const lockRefs = items.map((item) => db.collection('billingLocks').doc(item.kind === 'fee' ? `fee_${item.id}` : `course_${user.uid}_${item.id}`));
    const sourceRefs = items.map((item) => db.collection(item.kind === 'fee' ? 'tuitionFees' : 'billingPrices').doc(item.id));
    const rateRef = db.collection('billingLimits').doc(`${guestHash}_${Math.floor(now.getTime() / 900000)}`);
    const [sources, locks, rate] = await Promise.all([tx.getAll(...sourceRefs), tx.getAll(...lockRefs), tx.get(rateRef)]);
    const attempts = rate.data()?.count || 0;
    if (attempts >= 5) reject('Phiên này đã tạo nhiều đơn. Vui lòng kiểm tra đơn hiện tại hoặc thử lại sau 15 phút.');
    const lines: BillingLine[] = [];
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      const source = sources[index].data();
      const lock = locks[index].data();
      if (lock) reject('Một khoản đã thanh toán hoặc đang có giao dịch chờ xác nhận. Kiểm tra lịch sử đơn hoặc liên hệ trung tâm.');
      if (!source || !validAmount(source.amount)) reject('Khoản học phí chưa có giá hợp lệ.');
      if (item.kind === 'fee' && (!matchesCapability(feeTokens[item.id], source.accessHash) || source.status !== 'unpaid')) reject('Liên kết học phí không hợp lệ hoặc khoản thu không còn được thanh toán.');
      if (item.kind === 'course' && (!source.enabled || !Object.hasOwn(courseData, item.id))) reject('Khóa học chưa mở thanh toán.');
      lines.push({ kind: item.kind, id: item.id, title: source.title, amount: source.amount });
    }
    const total = lines.reduce((sum, line) => sum + line.amount, 0);
    if (!validAmount(total)) reject('Tổng học phí vượt giới hạn hỗ trợ.');
    if (body.expectedTotal !== total) reject('Học phí đã thay đổi hoặc tổng tiền chưa được xác nhận. Vui lòng cập nhật giỏ và kiểm tra lại trước khi thanh toán.');
    const payment = createPaymentUrl(orderRef.id, total, now, ip);
    const order: BillingOrder = { id: orderRef.id, uid: user.uid, guestHash, name: name.trim(), phone: phone.trim(), email: user.email, lines, total, status: 'pending', createdAt: now.toISOString(), expiresAt: payment.expiresAt, paymentUrl: payment.url, environment: config!.environment };
    order.placementDeclaration = { completed: true, feedback: body.placementDeclaration.feedback.trim(), source: 'student-self-report', recordedAt: now.toISOString() };
    tx.create(orderRef, order);
    if (rate.exists) tx.update(rateRef, { count: attempts + 1 });
    else tx.create(rateRef, { count: 1, expiresAt: new Date(now.getTime() + 86400000) });
    lines.forEach((line, index) => {
      tx.create(lockRefs[index], { uid: user.uid, orderId: orderRef.id, status: 'pending' });
      if (line.kind === 'fee') tx.update(sourceRefs[index], { status: 'pending', orderId: orderRef.id });
    });
    return { orderId: order.id, url: payment.url };
  });
}

// Called ONLY after an authenticated provider callback or an independently verified reconciliation.
export async function settleOrder(id: string, outcome: 'paid' | 'failed', details: Record<string, string>, expected?: { total: number; environment: string }) {
  const db = getAdminDb();
  return db.runTransaction(async (tx) => {
    const ref = db.collection('billingOrders').doc(id);
    const snap = await tx.get(ref);
    if (!snap.exists) return '01';
    const order = snap.data() as BillingOrder;
    if (expected && (order.total !== expected.total || order.environment !== expected.environment)) return '04';
    if (order.status !== 'pending') return '02';
    const lockRefs = order.lines.map((line) => db.collection('billingLocks').doc(line.kind === 'fee' ? `fee_${line.id}` : `course_${order.uid}_${line.id}`));
    const locks = await tx.getAll(...lockRefs);
    if (locks.some((lock) => lock.data()?.orderId !== id)) throw new Error('Payment lock mismatch');
    tx.update(ref, { status: outcome, ...details, settledAt: new Date().toISOString() });
    order.lines.forEach((line, index) => {
      if (outcome === 'paid') tx.update(lockRefs[index], { status: 'paid' });
      else tx.delete(lockRefs[index]);
      if (line.kind === 'fee') tx.update(db.collection('tuitionFees').doc(line.id), { status: outcome === 'paid' ? 'paid' : 'unpaid', orderId: outcome === 'paid' ? id : '' });
    });
    return '00';
  });
}
export async function processIPN(params: Record<string, string>) {
  const config = paymentConfig();
  if (!verifySignature(params, config.secret) || params.vnp_TmnCode !== config.tmnCode) return { RspCode: '97', Message: 'Invalid signature' };
  if (!/^[a-zA-Z0-9_-]{1,100}$/.test(params.vnp_TxnRef || '') || !/^\d+$/.test(params.vnp_Amount || '') || !/^\d{2}$/.test(params.vnp_ResponseCode || '') || !/^\d{2}$/.test(params.vnp_TransactionStatus || '')) return { RspCode: '99', Message: 'Invalid parameters' };
  const amount = Number(params.vnp_Amount);
  if (!Number.isSafeInteger(amount) || amount <= 0 || amount % 100) return { RspCode: '04', Message: 'Invalid amount' };
  const paid = params.vnp_ResponseCode === '00' && params.vnp_TransactionStatus === '00';
  // Nonterminal statuses never unlock an outstanding payment.
  if (!paid && params.vnp_TransactionStatus !== '02') return { RspCode: '99', Message: 'Awaiting reconciliation' };
  const RspCode = await settleOrder(params.vnp_TxnRef, paid ? 'paid' : 'failed', {
    transactionNo: params.vnp_TransactionNo || '', responseCode: params.vnp_ResponseCode,
    transactionStatus: params.vnp_TransactionStatus, payDate: params.vnp_PayDate || '',
  }, { total: amount / 100, environment: config.environment });
  return { RspCode, Message: RspCode === '00' ? 'Confirm Success' : RspCode === '01' ? 'Order not found' : RspCode === '02' ? 'Order already confirmed' : 'Invalid amount' };
}

export async function adminData(request: NextRequest) {
  await billingAdmin(request);
  const db = getAdminDb();
  const [prices, fees, orders] = await Promise.all([db.collection('billingPrices').get(), db.collection('tuitionFees').orderBy('createdAt', 'desc').limit(100).get(), db.collection('billingOrders').orderBy('createdAt', 'desc').limit(100).get()]);
  return { prices: prices.docs.map((d) => ({ ...d.data(), id: d.id })), fees: fees.docs.map((d) => { const { accessHash: _secret, ...fee } = d.data(); void _secret; return { ...fee, id: d.id }; }), orders: orders.docs.map((d) => ({ ...d.data(), id: d.id })) };
}
export async function adminAction(request: NextRequest) {
  const admin = await billingAdmin(request);
  const body = await request.json();
  const db = getAdminDb();
  if (body.action === 'price') {
    if (typeof body.courseId !== 'string' || !Object.hasOwn(courseData, body.courseId) || !validAmount(body.amount) || typeof body.enabled !== 'boolean') reject('Giá khóa học không hợp lệ.');
    await db.collection('billingPrices').doc(body.courseId).set({ title: courseData[body.courseId].title, amount: body.amount, enabled: body.enabled, updatedBy: admin.uid, updatedAt: new Date().toISOString() });
  } else if (body.action === 'fee') {
    if (typeof body.assessmentFeedback !== 'string' || body.assessmentFeedback.trim().length < 10 || body.assessmentFeedback.length > 2000) reject('Bắt buộc nhập đánh giá bài kiểm tra đầu vào: từ 10 đến 2.000 ký tự, không chỉ mã bài thi.');
    if (body.academicConfirmed !== true || typeof body.assessmentReference !== 'string' || body.assessmentReference.trim().length < 10 || body.assessmentReference.length > 500 || typeof body.courseId !== 'string' || !Object.hasOwn(courseData, body.courseId)) reject('Chỉ tạo học phí sau khi đã kiểm tra bài đầu vào và được đội học thuật đánh giá. Cần khóa đề xuất, tham chiếu đánh giá và xác nhận của nhân sự.');
    if (typeof body.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email) || body.email.length > 254 || typeof body.title !== 'string' || !body.title.trim() || body.title.length > 200 || !validAmount(body.amount)) reject('Vui lòng kiểm tra email, nội dung và số tiền.');
    if (body.dueDate && (typeof body.dueDate !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(body.dueDate) || !Number.isFinite(Date.parse(body.dueDate)))) reject('Hạn thanh toán không hợp lệ.');
    const token = randomBytes(32).toString('hex');
    const ref = db.collection('tuitionFees').doc();
    await ref.set({ email: body.email.trim().toLowerCase(), title: body.title.trim(), amount: body.amount, dueDate: body.dueDate || '', status: 'unpaid', accessHash: capabilityHash(token), createdAt: new Date().toISOString(), createdBy: admin.uid, academicReview: { reference: body.assessmentReference.trim(), feedback: body.assessmentFeedback.trim(), courseId: body.courseId, reviewedBy: admin.uid, reviewedAt: new Date().toISOString() } });
    return { success: true, feeId: ref.id, accessToken: token };
  } else if (body.action === 'fee-link') {
    if (!/^[a-zA-Z0-9_-]{1,100}$/.test(body.feeId || '')) reject('Khoản thu không hợp lệ.');
    const token = randomBytes(32).toString('hex');
    await db.runTransaction(async (tx) => {
      const ref = db.collection('tuitionFees').doc(body.feeId);
      const fee = await tx.get(ref);
      if (!fee.exists || fee.data()?.status !== 'unpaid') reject('Chỉ tạo lại liên kết cho khoản chưa thanh toán.');
      tx.update(ref, { accessHash: capabilityHash(token), linkUpdatedBy: admin.uid, linkUpdatedAt: new Date().toISOString() });
    });
    return { success: true, feeId: body.feeId, accessToken: token };
  } else if (body.action === 'fee-delete') {
    if (typeof body.feeId !== 'string' || !/^[a-zA-Z0-9_-]{1,100}$/.test(body.feeId) || body.confirmed !== true) reject('Cần xác nhận khoản thu muốn xóa.');
    await db.runTransaction(async (tx) => {
      const ref = db.collection('tuitionFees').doc(body.feeId);
      const lockRef = db.collection('billingLocks').doc(`fee_${body.feeId}`);
      const [fee, lock] = await tx.getAll(ref, lockRef);
      if (!fee.exists) reject('Khoản thu không còn tồn tại. Vui lòng cập nhật danh sách.');
      const data = fee.data()!;
      if (data.status !== 'unpaid' || data.orderId || lock.exists) reject('Chỉ xóa khoản chưa thanh toán và không có giao dịch đang xử lý. Không được xóa khoản đang chờ hoặc đã thu.');
      // Preserve a minimal audit trail without keeping the secret access hash.
      tx.create(db.collection('billingFeeDeletions').doc(body.feeId), {
        feeId: body.feeId, title: data.title, amount: data.amount,
        deletedBy: admin.uid, deletedAt: new Date().toISOString(),
      });
      tx.delete(ref);
    });
  } else if (body.action === 'reconcile') {
    if (!/^[a-zA-Z0-9_-]{1,100}$/.test(body.orderId || '') || !['paid', 'failed'].includes(body.outcome) || typeof body.evidence !== 'string' || body.evidence.trim().length < 15 || body.evidence.length > 1000) reject('Cần mã đơn, kết quả và bằng chứng đối soát tối thiểu 15 ký tự.');
    const code = await settleOrder(body.orderId, body.outcome, { reconciledBy: admin.uid, reconciliationEvidence: body.evidence.trim() });
    if (code !== '00') reject('Đơn không tồn tại hoặc đã xác nhận.');
  } else reject('Thao tác không hợp lệ.');
  return { success: true };
}