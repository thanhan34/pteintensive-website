import { createHmac, timingSafeEqual } from 'node:crypto';

export function canonicalize(params: Record<string, string>) {
  const encode = (value: string) => encodeURIComponent(value).replace(/%20/g, '+');
  return Object.keys(params).filter((key) => key !== 'vnp_SecureHash' && key !== 'vnp_SecureHashType')
    .sort().map((key) => `${encode(key)}=${encode(params[key])}`).join('&');
}
export function signature(params: Record<string, string>, secret: string) {
  return createHmac('sha512', secret).update(canonicalize(params), 'utf8').digest('hex');
}
export function verifySignature(params: Record<string, string>, secret: string) {
  const hash = params.vnp_SecureHash;
  if (!hash || !/^[a-fA-F0-9]{128}$/.test(hash)) return false;
  return timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(signature(params, secret), 'hex'));
}
export function parseCallback(search: URLSearchParams): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of search) {
    if (!key.startsWith('vnp_') || Object.hasOwn(result, key)) throw new Error('Invalid callback parameters');
    result[key] = value;
  }
  return result;
}
export function vnpDate(date: Date) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Ho_Chi_Minh', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
  }).formatToParts(date).filter((part) => part.type !== 'literal')
    .reduce<Record<string, string>>((parts, part) => ({ ...parts, [part.type]: part.value }), {});
  return DateParts(parts);
}
function DateParts(parts: Record<string, string>) { return `${parts.year}${parts.month}${parts.day}${parts.hour}${parts.minute}${parts.second}`; }

export function paymentConfig() {
  if (process.env.VNPAY_ENABLED !== 'true') throw new Error('Thanh toán trực tuyến chưa được bật. Vui lòng liên hệ trung tâm.');
  const environment = process.env.VNPAY_ENVIRONMENT;
  if (environment !== 'sandbox' && environment !== 'production') throw new Error('Chưa cấu hình môi trường thanh toán.');
  if (environment === 'production' && process.env.VNPAY_PRODUCTION_APPROVED !== 'true') throw new Error('Thanh toán thật chưa được phê duyệt.');
  const tmnCode = process.env.VNPAY_TMN_CODE;
  const secret = process.env.VNPAY_HASH_SECRET;
  const base = process.env.BILLING_BASE_URL;
  if (!tmnCode || !secret || !base) throw new Error('Chưa cấu hình đầy đủ kết nối VNPAY.');
  const origin = new URL(base);
  if (origin.protocol !== 'https:' || origin.username || origin.password || origin.pathname !== '/' || origin.search || origin.hash) throw new Error('BILLING_BASE_URL phải là tên miền HTTPS, không có đường dẫn.');
  return { environment, tmnCode, secret, origin: origin.origin,
    gateway: environment === 'sandbox' ? 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html' : 'https://pay.vnpay.vn/vpcpay.html' } as const;
}
export function paymentAvailable() { try { paymentConfig(); return true; } catch { return false; } }
export function createPaymentUrl(id: string, total: number, now: Date, ip: string) {
  const config = paymentConfig();
  const expires = new Date(now.getTime() + 15 * 60 * 1000);
  const params: Record<string, string> = {
    vnp_Version: '2.1.0', vnp_Command: 'pay', vnp_TmnCode: config.tmnCode,
    vnp_Amount: String(total * 100), vnp_CurrCode: 'VND', vnp_TxnRef: id,
    vnp_OrderInfo: `Thanh toan hoc phi ${id}`, vnp_OrderType: 'other',
    vnp_Locale: 'vn', vnp_ReturnUrl: `${config.origin}/api/payments/vnpay/return`,
    vnp_IpAddr: ip, vnp_CreateDate: vnpDate(now), vnp_ExpireDate: vnpDate(expires),
  };
  // Omit BankCode: the hosted gateway shows methods enabled for this merchant.
  return { url: `${config.gateway}?${canonicalize(params)}&vnp_SecureHash=${signature(params, config.secret)}`, expiresAt: expires.toISOString(), environment: config.environment };
}