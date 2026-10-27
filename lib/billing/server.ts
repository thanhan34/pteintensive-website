import { NextRequest, NextResponse } from 'next/server';
import { isIP } from 'node:net';
import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';
import { requireAdminFromRequest } from '@/lib/admin-auth';
import { courseData } from '@/lib/courseData';
import { createPaymentUrl, paymentReadiness, paymentConfig, verifySignature, queryTransaction } from './vnpay';
import type { BillingOrder, BillingLine, CartItem } from './types';
import { academicallyApproved, validPlacementDeclaration } from './placement';
import { studentIdentity } from './student-auth';

export async function billingUser(request: NextRequest) {
  const token = request.headers.get('authorization')?.match(/^Bearer (.+)$/)?.[1];
  if (!token) throw new Error('AUTH');
  try { return await getAdminAuth().verifyIdToken(token, true); } catch { throw new Error('AUTH'); }
}
export function billingError(error: unknown) {
  const message = error && typeof error === 'object' && 'message' in error && typeof error.message === 'string' ? error.message : '';
  if (message === 'AUTH') return NextResponse.json({ error: 'Vui lòng đăng nhập lại.' }, { status: 401 });
  if (message === 'FORBIDDEN') return NextResponse.json({ error: 'Tài khoản không có quyền quản lý học phí.' }, { status: 403 });
  if (error instanceof BillingOrderConflict) return NextResponse.json({ error: message.slice(7), code: 'BILLING_ORDER_CONFLICT', orderId: error.orderId }, { status: 409 });
  console.error('[billing]', error);
  return NextResponse.json({ error: message.startsWith('PUBLIC:') ? message.slice(7) : 'Không thể xử lý yêu cầu. Vui lòng thử lại hoặc liên hệ trung tâm.' }, { status: 400 });
}
async function billingAdmin(request: NextRequest) {
  await billingUser(request);
  try { return await requireAdminFromRequest(request); } catch { throw new Error('FORBIDDEN'); }
}
function reject(message: string): never { throw new Error(`PUBLIC:${message}`); }
class BillingOrderConflict extends Error {
  constructor(public readonly orderId: string, reason: string) {
    super(`PUBLIC:Đơn ${orderId}: ${reason} Mở Lịch sử đơn để kiểm tra đơn cũ. Không thanh toán lại nếu đã bị trừ tiền.`);
  }
}
export const capabilityHash = (token: string) => createHash('sha256').update(token).digest('hex');
function matchesCapability(token: unknown, hash: unknown) {
  return typeof token === 'string' && /^[a-f0-9]{64}$/.test(token) && typeof hash === 'string' && /^[a-f0-9]{64}$/.test(hash)
    && timingSafeEqual(Buffer.from(capabilityHash(token), 'hex'), Buffer.from(hash, 'hex'));
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
  const readiness = paymentReadiness();
  if (!readiness.available) console.warn('[billing] payment unavailable', { code: readiness.code });
  const uid = await studentIdentity(false);
  const feeTokens = capabilities(request);
  const db = getAdminDb();
  // Redeem a private link once for a signed-in payer. Never claim by email alone.
  if (uid) for (const id of Object.keys(feeTokens)) {
    await db.runTransaction(async (tx) => {
      const ref = db.collection('tuitionFees').doc(id);
      const snapshot = await tx.get(ref);
      const fee = snapshot.data();
      if (fee && matchesCapability(feeTokens[id], fee.accessHash) && !fee.payerUid) {
        if (fee.status !== 'unpaid' || fee.orderId) reject('Khoản thu cũ đang có giao dịch hoặc đã thanh toán. Liên hệ trung tâm kèm mã đơn để tra cứu; không tạo thanh toán mới.');
        tx.update(ref, { payerUid: uid });
      }
    });
  }
  const [prices, fees, orders] = await Promise.all([
    db.collection('billingPrices').get(),
    uid ? db.collection('tuitionFees').where('payerUid', '==', uid).get().then((result) => result.docs) : [],
    uid ? db.collection('billingOrders').where('uid', '==', uid).get() : { docs: [] },
  ]);
  return {
    prices: prices.docs.map((doc) => ({ id: doc.id, title: doc.data().title, amount: doc.data().amount, enabled: doc.data().enabled })),
    fees: fees.filter((doc) => doc.exists && doc.data()?.payerUid === uid)
      .map((doc) => { const fee = doc.data()!; return { id: doc.id, title: fee.title, amount: fee.amount, dueDate: fee.dueDate, status: fee.status, academicApproved: academicallyApproved(fee), courseTitle: courseData[fee.academicReview?.courseId]?.title || '' }; }),
    orders: orders.docs.filter((doc) => doc.data()?.uid === uid).map((doc) => {
      const order = doc.data() as BillingOrder;
      return { id: doc.id, lines: order.lines, total: order.total, status: order.status, createdAt: order.createdAt, expiresAt: order.expiresAt, paymentUrl: order.paymentUrl, environment: order.environment, transactionNo: order.transactionNo || '', responseCode: order.responseCode || '', transactionStatus: order.transactionStatus || '', reviewRequired: !!order.reviewRequired };
    })
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 50),
    paymentAvailable: readiness.available,
    paymentUnavailableCode: readiness.code,
    environment: process.env.VNPAY_ENVIRONMENT === 'production' ? 'production' : 'sandbox',
  };
}
export async function checkout(request: NextRequest) {
  const uid = (await studentIdentity())!;
  const guestHash = capabilityHash(uid);
  const body = await request.json();
  if (!body || typeof body !== 'object') reject('Thông tin thanh toán không hợp lệ.');
  const { name, email, phone } = body;
  if (typeof name !== 'string' || name.trim().length < 2 || name.length > 100 || typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || typeof phone !== 'string' || !/^\+?[\d ()-]{8,25}$/.test(phone)) reject('Vui lòng nhập họ tên, email và số điện thoại hợp lệ.');
  const user = { uid, email: email.trim().toLowerCase() };
  if (!Array.isArray(body.items) || !body.items.length || body.items.length > 20) reject('Vui lòng chọn từ 1 đến 20 khoản học phí.');
  const items: CartItem[] = body.items;
  const keys = new Set<string>();
  for (const item of items) {
    if (!item || !['course', 'fee'].includes(item.kind) || typeof item.id !== 'string' || !/^[a-zA-Z0-9_-]{1,100}$/.test(item.id)) reject('Khoản học phí không hợp lệ.');
    const key = `${item.kind}:${item.id}`;
    if (keys.has(key)) reject('Khoản học phí bị trùng.');
    keys.add(key);
  }
  if (items.some((item) => item.kind === 'course') && !validPlacementDeclaration(body.placementDeclaration)) reject('Vui lòng xác nhận bài kiểm tra đầu vào và nhập nhận xét học thuật trước khi mua khóa.');
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
    // Course locks serialize pending checkouts, not lifetime ownership. A paid
    // course can be purchased again; private tuition fees remain single-use.
    const repeatIndexes = items.flatMap((item, index) => item.kind === 'course' && locks[index].data()?.status === 'paid' ? [index] : []);
    for (const index of repeatIndexes) {
      const previousId = locks[index].data()?.orderId;
      if (typeof previousId !== 'string' || !/^[a-zA-Z0-9_-]{1,100}$/.test(previousId)) reject('Khóa thanh toán cần được kiểm tra. Vui lòng liên hệ trung tâm.');
      const previous = (await tx.get(db.collection('billingOrders').doc(previousId))).data() as BillingOrder | undefined;
      if (!previous || previous.status !== 'paid' || previous.uid !== user.uid || previous.guestHash !== guestHash
        || previous.environment !== config!.environment || !previous.lines.some((line) => line.kind === 'course' && line.id === items[index].id)) reject('Không thể xác minh lần mua khóa học trước. Vui lòng liên hệ trung tâm.');
    }
    const blocksCheckout = (index: number) => locks[index].exists && !repeatIndexes.includes(index);
    // A retry after a lost response must resume the same payment, not create
    // another order or release a lock whose payment outcome is still unknown.
    if (items.some((_, index) => blocksCheckout(index))) {
      for (let index = 0; index < items.length; index++) {
        if (items[index].kind === 'fee' && sources[index].data()?.payerUid !== uid) reject('Bạn không có quyền thanh toán khoản học phí này.');
      }
      const existingId = locks.find((_, index) => blocksCheckout(index))?.data()?.orderId;
      if (typeof existingId !== 'string' || !/^[a-zA-Z0-9_-]{1,100}$/.test(existingId)) reject('Khóa thanh toán cần được kiểm tra. Vui lòng liên hệ trung tâm.');
      const existingSnapshot = await tx.get(db.collection('billingOrders').doc(existingId));
      const existing = existingSnapshot.data() as BillingOrder | undefined;
      if (!existing || existing.guestHash !== guestHash || existing.uid !== user.uid) reject('Khoản học phí đang gắn với giao dịch khác. Vui lòng liên hệ trung tâm để kiểm tra.');
      if (locks.some((snapshot, index) => blocksCheckout(index) && snapshot.data()?.status === 'paid') || existing.status === 'paid') reject(`Khoản học phí đã được thanh toán trong đơn ${existingId}. Vui lòng kiểm tra lịch sử đơn, không thanh toán lại.`);
      const sameItems = existing.lines.length === items.length && items.every((item, index) => {
        const source = sources[index].data();
        return locks[index].data()?.orderId === existingId && locks[index].data()?.status === 'pending'
          && existing.lines.some((line) => line.kind === item.kind && line.id === item.id && line.amount === source?.amount)
          && (item.kind === 'fee' ? source?.status === 'pending' && source.orderId === existingId : source?.enabled && Object.hasOwn(courseData, item.id));
      });
      if (existing.status !== 'pending') throw new BillingOrderConflict(existingId, 'Trạng thái đơn và khóa giao dịch không khớp; vui lòng liên hệ trung tâm.');
      if (existing.environment !== config!.environment) throw new BillingOrderConflict(existingId, 'Đơn được tạo ở môi trường thanh toán khác; vui lòng liên hệ trung tâm.');
      if (!(new Date(existing.expiresAt).getTime() > now.getTime())) throw new BillingOrderConflict(existingId, 'Liên kết đã hết hạn nhưng chưa nhận được kết quả từ VNPAY; vui lòng liên hệ trung tâm.');
      if (!sameItems || existing.total !== body.expectedTotal) throw new BillingOrderConflict(existingId, 'Giỏ hàng hoặc giá hiện tại khác với đơn đang chờ. Không thể gộp thay đổi vào liên kết thanh toán đã tạo.');
      if (existing.name !== name.trim() || existing.email !== user.email || existing.phone !== phone.trim()) throw new BillingOrderConflict(existingId, 'Thông tin học viên khác với đơn đang chờ. Đơn cũ vẫn giữ thông tin đã nhập lúc tạo đơn; vui lòng kiểm tra trước khi tiếp tục.');
      return { orderId: existingId, url: existing.paymentUrl };
    }
    if (attempts >= 5) reject('Phiên này đã tạo nhiều đơn. Vui lòng kiểm tra đơn hiện tại hoặc thử lại sau 15 phút.');
    const lines: BillingLine[] = [];
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      const source = sources[index].data();
      if (!source || !validAmount(source.amount)) reject('Khoản học phí chưa có giá hợp lệ.');
      if (item.kind === 'fee' && (source.payerUid !== uid || source.status !== 'unpaid')) reject('Khoản học phí không thuộc tài khoản này hoặc không còn được thanh toán.');
      if (item.kind === 'fee' && !academicallyApproved(source)) reject('Khoản thu chưa có xác nhận đầu vào. Vui lòng liên hệ trung tâm bổ sung, không cần tự nhập lại nhận xét.');
      if (item.kind === 'course' && (!source.enabled || !Object.hasOwn(courseData, item.id))) reject('Khóa học chưa mở thanh toán.');
      lines.push({ kind: item.kind, id: item.id, title: source.title, amount: source.amount });
    }
    const total = lines.reduce((sum, line) => sum + line.amount, 0);
    if (!validAmount(total)) reject('Tổng học phí vượt giới hạn hỗ trợ.');
    if (body.expectedTotal !== total) reject('Học phí đã thay đổi hoặc tổng tiền chưa được xác nhận. Vui lòng cập nhật giỏ và kiểm tra lại trước khi thanh toán.');
    const payment = createPaymentUrl(orderRef.id, total, now, ip);
    const order: BillingOrder = { id: orderRef.id, uid: user.uid, guestHash, name: name.trim(), phone: phone.trim(), email: user.email, lines, total, status: 'pending', createdAt: now.toISOString(), expiresAt: payment.expiresAt, paymentUrl: payment.url, environment: config!.environment };
    if (items.some((item) => item.kind === 'course')) order.placementDeclaration = { completed: true, feedback: body.placementDeclaration.feedback.trim(), source: 'student-self-report', recordedAt: now.toISOString() };
    tx.create(orderRef, order);
    if (rate.exists) tx.update(rateRef, { count: attempts + 1 });
    else tx.create(rateRef, { count: 1, expiresAt: new Date(now.getTime() + 86400000) });
    lines.forEach((line, index) => {
      const lock = { uid: user.uid, orderId: orderRef.id, status: 'pending' };
      if (repeatIndexes.includes(index)) tx.update(lockRefs[index], lock);
      else tx.create(lockRefs[index], lock);
      if (line.kind === 'fee') tx.update(sourceRefs[index], { status: 'pending', orderId: orderRef.id });
    });
    return { orderId: order.id, url: payment.url };
  });
}

// Called only after an authenticated provider callback.
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
    tx.update(ref, { status: outcome, ...details, reviewRequired: false, settledAt: new Date().toISOString() });
    order.lines.forEach((line, index) => {
      if (outcome === 'paid') tx.update(lockRefs[index], { status: 'paid' });
      else tx.delete(lockRefs[index]);
      if (line.kind === 'fee') tx.update(db.collection('tuitionFees').doc(line.id), { status: outcome === 'paid' ? 'paid' : 'unpaid', orderId: outcome === 'paid' ? id : '' });
    });
    return '00';
  });
}
export async function processIPN(params: Record<string, string>, trustedQuery = false) {
  const config = paymentConfig();
  if (!trustedQuery && !verifySignature(params, config.secret)) return { RspCode: '97', Message: 'Invalid signature' };
  if (params.vnp_TmnCode !== config.tmnCode) return { RspCode: '97', Message: 'Invalid merchant' };
  if (!/^[a-zA-Z0-9_-]{1,100}$/.test(params.vnp_TxnRef || '') || !/^\d+$/.test(params.vnp_Amount || '') || !/^\d{2}$/.test(params.vnp_ResponseCode || '') || !/^\d{2}$/.test(params.vnp_TransactionStatus || '')) return { RspCode: '99', Message: 'Invalid parameters' };
  const amount = Number(params.vnp_Amount);
  if (!Number.isSafeInteger(amount) || amount <= 0 || amount % 100) return { RspCode: '04', Message: 'Invalid amount' };
  const paid = params.vnp_ResponseCode === '00' && params.vnp_TransactionStatus === '00';
  // Persist uncertain evidence without releasing locks or declaring failure.
  if (!paid && (params.vnp_ResponseCode === '07' || params.vnp_TransactionStatus !== '02')) {
    const RspCode = await getAdminDb().runTransaction(async (tx) => {
      const ref = getAdminDb().collection('billingOrders').doc(params.vnp_TxnRef);
      const snapshot = await tx.get(ref);
      if (!snapshot.exists) return '01';
      const order = snapshot.data() as BillingOrder;
      if (order.total * 100 !== amount || order.environment !== config.environment) return '04';
      if (order.status !== 'pending') return '02';
      tx.update(ref, { responseCode: params.vnp_ResponseCode, transactionStatus: params.vnp_TransactionStatus, reviewRequired: true });
      return '00';
    });
    return { RspCode, Message: RspCode === '00' ? 'Confirm Success' : RspCode === '01' ? 'Order not found' : RspCode === '02' ? 'Order already confirmed' : 'Invalid amount' };
  }
  const RspCode = await settleOrder(params.vnp_TxnRef, paid ? 'paid' : 'failed', {
    transactionNo: params.vnp_TransactionNo || '', responseCode: params.vnp_ResponseCode,
    transactionStatus: params.vnp_TransactionStatus, payDate: params.vnp_PayDate || '',
  }, { total: amount / 100, environment: config.environment });
  return { RspCode, Message: RspCode === '00' ? 'Confirm Success' : RspCode === '01' ? 'Order not found' : RspCode === '02' ? 'Order already confirmed' : 'Invalid amount' };
}

export async function checkStudentOrder(request: NextRequest) {
  const uid = (await studentIdentity())!;
  const body = await request.json();
  if (typeof body.orderId !== 'string' || !/^[a-zA-Z0-9_-]{1,100}$/.test(body.orderId)) reject('Mã đơn không hợp lệ.');
  const db = getAdminDb();
  const ref = db.collection('billingOrders').doc(body.orderId);
  const order = await db.runTransaction(async (tx) => {
    const snapshot = await tx.get(ref);
    const current = snapshot.data() as BillingOrder | undefined;
    if (!current || current.uid !== uid) throw new Error('FORBIDDEN');
    if (current.status !== 'pending') return null;
    // Merchant-side cooldown is a safety policy, not a claimed VNPAY guarantee.
    if (current.lastQueryAt && Date.now() - current.lastQueryAt < 60000) reject('Đơn vừa được kiểm tra. Vui lòng chờ một phút rồi thử lại.');
    tx.update(ref, { lastQueryAt: Date.now() });
    return current;
  });
  if (!order) return { success: true };
  const result = await queryTransaction(body.orderId, order.createdAt);
  if (result.vnp_ResponseCode !== '00') return { success: false, message: 'VNPAY chưa xác nhận kết quả. Không thanh toán lại; kiểm tra sau hoặc liên hệ trung tâm.' };
  if (result.vnp_Amount !== String(order.total * 100) || result.vnp_TransactionType !== '01') throw new Error('QueryDR amount/type mismatch');
  const acknowledgement = await processIPN(result, true);
  if (!['00', '02'].includes(acknowledgement.RspCode)) throw new Error('Unable to reconcile QueryDR');
  return { success: true };
}

export async function adminData(request: NextRequest) {
  await billingAdmin(request);
  const db = getAdminDb();
  const [prices, fees, orders] = await Promise.all([db.collection('billingPrices').get(), db.collection('tuitionFees').orderBy('createdAt', 'desc').limit(100).get(), db.collection('billingOrders').orderBy('createdAt', 'desc').limit(100).get()]);
  return { sandboxResetAvailable: process.env.VNPAY_ENVIRONMENT === 'sandbox', prices: prices.docs.map((d) => ({ ...d.data(), id: d.id })), fees: fees.docs.map((d) => { const { accessHash: _secret, ...fee } = d.data(); void _secret; return { ...fee, id: d.id }; }), orders: orders.docs.map((d) => ({ ...d.data(), id: d.id })) };
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
  } else if (body.action === 'sandbox-reset') {
    if (process.env.VNPAY_ENVIRONMENT !== 'sandbox') reject('Chỉ được reset đơn test khi server ở môi trường sandbox.');
    if (typeof body.orderId !== 'string' || !/^[a-zA-Z0-9_-]{1,100}$/.test(body.orderId) || body.confirmed !== true) reject('Cần xác nhận hủy/reset đơn test.');
    await db.runTransaction(async (tx) => {
      const ref = db.collection('billingOrders').doc(body.orderId);
      const snapshot = await tx.get(ref);
      if (!snapshot.exists) reject('Đơn test không tồn tại.');
      const order = snapshot.data() as BillingOrder;
      if (order.environment !== 'sandbox') reject('Không được reset đơn thanh toán thật.');
      if (order.status === 'failed' && order.sandboxResetAt) return;
      if (order.status !== 'pending') reject('Chỉ reset đơn sandbox đang chờ xác nhận.');
      const lockRefs = order.lines.map((line) => db.collection('billingLocks').doc(line.kind === 'fee' ? `fee_${line.id}` : `course_${order.uid}_${line.id}`));
      const feeRefs = order.lines.filter((line) => line.kind === 'fee').map((line) => db.collection('tuitionFees').doc(line.id));
      const locks = await tx.getAll(...lockRefs);
      const fees = feeRefs.length ? await tx.getAll(...feeRefs) : [];
      if (locks.some((lock) => lock.data()?.orderId !== body.orderId || lock.data()?.status !== 'pending') || fees.some((fee) => !fee.exists || fee.data()?.orderId !== body.orderId || fee.data()?.status !== 'pending')) reject('Khóa hoặc khoản thu đã thay đổi. Vui lòng cập nhật và kiểm tra lại đơn test.');
      const now = new Date().toISOString();
      tx.update(ref, { status: 'failed', settledAt: now, sandboxResetAt: now, sandboxResetBy: admin.uid });
      lockRefs.forEach((lockRef) => tx.delete(lockRef));
      feeRefs.forEach((feeRef) => tx.update(feeRef, { status: 'unpaid', orderId: '' }));
    });
  } else if (body.action === 'order-archive') {
    if (typeof body.orderId !== 'string' || !/^[a-zA-Z0-9_-]{1,100}$/.test(body.orderId) || body.confirmed !== true) reject('Cần xác nhận đơn thất bại muốn lưu trữ.');
    await db.runTransaction(async (tx) => {
      const ref = db.collection('billingOrders').doc(body.orderId);
      const order = await tx.get(ref);
      if (!order.exists || order.data()?.status !== 'failed') reject('Chỉ lưu trữ đơn đã xác nhận thanh toán thất bại.');
      // Idempotent retries preserve the original audit actor and timestamp.
      if (!order.data()?.archivedAt) tx.update(ref, { archivedAt: new Date().toISOString(), archivedBy: admin.uid });
    });
  } else reject('Thao tác không hợp lệ.');
  return { success: true };
}