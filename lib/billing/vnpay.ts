import { createHmac, timingSafeEqual } from 'node:crypto';
import { randomBytes } from 'node:crypto';
import { isIP } from 'node:net';

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

class PaymentConfigurationError extends Error {
  constructor(public readonly code: string, message: string) { super(message); }
}
function configError(code: string, message: string): never { throw new PaymentConfigurationError(code, message); }

export function paymentConfig() {
  if (process.env.VNPAY_ENABLED !== 'true') configError('VNPAY_DISABLED', 'Thanh toán trực tuyến chưa được bật. Vui lòng liên hệ trung tâm.');
  const environment = process.env.VNPAY_ENVIRONMENT;
  if (environment !== 'sandbox' && environment !== 'production') configError('VNPAY_ENVIRONMENT_INVALID', 'Chưa cấu hình môi trường thanh toán.');
  if (environment === 'production' && process.env.VNPAY_PRODUCTION_APPROVED !== 'true') configError('VNPAY_PRODUCTION_NOT_APPROVED', 'Thanh toán thật chưa được phê duyệt.');
  const tmnCode = process.env.VNPAY_TMN_CODE;
  const secret = process.env.VNPAY_HASH_SECRET;
  const base = process.env.BILLING_BASE_URL;
  if (!tmnCode) configError('VNPAY_TMN_CODE_MISSING', 'Chưa cấu hình mã kết nối VNPAY.');
  if (!secret) configError('VNPAY_SECRET_MISSING', 'Chưa cấu hình secret VNPAY.');
  if (!base) configError('BILLING_BASE_URL_MISSING', 'Chưa cấu hình địa chỉ website thanh toán.');
  if (!/^[A-Z0-9]{8}$/i.test(tmnCode)) configError('VNPAY_TMN_CODE_INVALID', 'Mã kết nối VNPAY phải gồm 8 ký tự chữ hoặc số được VNPAY cấp.');
  if (secret !== secret.trim() || /[<>\r\n]/.test(secret) || /^(your[_ -]|replace[_ -]|placeholder|changeme)/i.test(secret)) configError('VNPAY_SECRET_INVALID', 'Vui lòng nhập secret key được VNPAY cấp, không dùng giá trị mẫu.');
  if (environment === 'production' && tmnCode === 'PTETEST1') configError('VNPAY_PRODUCTION_TEST_CODE', 'Không được dùng mã kết nối TEST cho thanh toán thật.');
  let origin: URL;
  try { origin = new URL(base); }
  catch { configError('BILLING_BASE_URL_INVALID', 'BILLING_BASE_URL không phải URL hợp lệ.'); }
  const loopback = ['localhost', '127.0.0.1', '[::1]'].includes(origin.hostname);
  const localSandbox = environment === 'sandbox' && loopback;
  if ((!localSandbox && loopback) || (origin.protocol !== 'https:' && !(localSandbox && origin.protocol === 'http:')) || origin.username || origin.password || origin.pathname !== '/' || origin.search || origin.hash) configError('BILLING_BASE_URL_INVALID', 'BILLING_BASE_URL phải là origin HTTPS; chỉ sandbox được dùng HTTP localhost/loopback, không có đường dẫn.');
  return { environment, tmnCode, secret, origin: origin.origin,
    gateway: environment === 'sandbox' ? 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html' : 'https://pay.vnpay.vn/vpcpay.html' } as const;
}
export function paymentReadiness(): { available: boolean; code: string | null } {
  try { paymentConfig(); return { available: true, code: null }; }
  catch (error) {
    // Never return error.message: URL parser errors can contain configuration values.
    return { available: false, code: error instanceof PaymentConfigurationError ? error.code : 'VNPAY_CONFIG_INVALID' };
  }
}
export function paymentAvailable() { return paymentReadiness().available; }
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

// QueryDR uses a pipe-delimited checksum, NOT the sorted payment URL checksum.
export const queryResponseFields = ['vnp_ResponseId', 'vnp_Command', 'vnp_ResponseCode', 'vnp_Message', 'vnp_TmnCode', 'vnp_TxnRef', 'vnp_Amount', 'vnp_BankCode', 'vnp_PayDate', 'vnp_TransactionNo', 'vnp_TransactionType', 'vnp_TransactionStatus', 'vnp_OrderInfo'];
export function querySignature(params: Record<string, string>, fields: string[], secret: string) {
  return createHmac('sha512', secret).update(fields.map((key) => params[key] || '').join('|'), 'utf8').digest('hex');
}
export function verifyQueryResponse(params: Record<string, string>, secret: string) {
  const hash = params.vnp_SecureHash;
  return typeof hash === 'string' && /^[a-fA-F0-9]{128}$/.test(hash)
    && timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(querySignature(params, queryResponseFields, secret), 'hex'));
}
export async function queryTransaction(id: string, createdAt: string) {
  const config = paymentConfig();
  const ip = process.env.VNPAY_QUERY_IP;
  if (!ip || !isIP(ip)) throw new Error('PUBLIC:Tra cứu tự động chưa được cấu hình. Liên hệ trung tâm kèm mã đơn; không thanh toán lại nếu đã bị trừ tiền.');
  const params: Record<string, string> = {
    vnp_RequestId: randomBytes(16).toString('hex'), vnp_Version: '2.1.0', vnp_Command: 'querydr',
    vnp_TmnCode: config.tmnCode, vnp_TxnRef: id, vnp_TransactionDate: vnpDate(new Date(createdAt)),
    vnp_CreateDate: vnpDate(new Date()), vnp_IpAddr: ip, vnp_OrderInfo: `Truy van hoc phi ${id}`,
  };
  params.vnp_SecureHash = querySignature(params, ['vnp_RequestId', 'vnp_Version', 'vnp_Command', 'vnp_TmnCode', 'vnp_TxnRef', 'vnp_TransactionDate', 'vnp_CreateDate', 'vnp_IpAddr', 'vnp_OrderInfo'], config.secret);
  // Production endpoint is explicitly supplied/confirmed with the merchant's VNPAY team.
  const endpoint = config.environment === 'sandbox' ? 'https://sandbox.vnpayment.vn/merchant_webapi/api/transaction' : process.env.VNPAY_QUERY_URL;
  if (!endpoint || new URL(endpoint).protocol !== 'https:' || new URL(endpoint).hostname !== (config.environment === 'sandbox' ? 'sandbox.vnpayment.vn' : 'pay.vnpay.vn')) throw new Error('PUBLIC:Chưa cấu hình endpoint tra cứu VNPAY hợp lệ.');
  const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(params), cache: 'no-store', signal: AbortSignal.timeout(15000), redirect: 'error' });
  if (!response.ok) throw new Error('PUBLIC:VNPAY chưa trả kết quả tra cứu. Hãy thử kiểm tra lại sau; không thanh toán lại.');
  const raw: unknown = await response.json();
  if (!raw || typeof raw !== 'object' || Object.values(raw).some((value) => typeof value !== 'string')) throw new Error('Invalid QueryDR response');
  const result = raw as Record<string, string>;
  if (!verifyQueryResponse(result, config.secret) || result.vnp_TmnCode !== config.tmnCode || result.vnp_TxnRef !== id || (result.vnp_Command && result.vnp_Command !== 'querydr')) throw new Error('Invalid QueryDR signature/identity');
  return result;
}