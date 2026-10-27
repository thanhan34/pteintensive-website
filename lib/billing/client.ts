'use client';
import type { User } from 'firebase/auth';
import type { CartItem } from './types';
export async function billingFetch<T>(user: User, path: string, body?: unknown): Promise<T> {
  const token = await user.getIdToken();
  let response: Response;
  try {
    response = await fetch(path, { signal: AbortSignal.timeout(20000), method: body ? 'POST' : 'GET', cache: 'no-store', headers: { Authorization: `Bearer ${token}`, ...(body ? { 'Content-Type': 'application/json' } : {}) }, ...(body ? { body: JSON.stringify(body) } : {}) });
  } catch {
    throw new Error('Không nhận được phản hồi trong thời gian chờ hoặc mất kết nối. Vui lòng kiểm tra mạng và thử lại. Nếu vừa tạo liên kết, mã cũ có thể đã bị vô hiệu.');
  }
  let data;
  try { data = await response.json(); }
  catch { throw new Error('Máy chủ trả về phản hồi không hợp lệ. Vui lòng tải lại trang hoặc kiểm tra bản triển khai.'); }
  if (!response.ok) throw new Error(data.error || 'Không thể kết nối. Vui lòng thử lại.');
  return data;
}
export const cartKey = (uid: string) => `pte-cart:${uid}`;
export function readCart(uid: string): CartItem[] {
  try {
    const value = JSON.parse(localStorage.getItem(cartKey(uid)) || '[]');
    return Array.isArray(value) ? value.filter((item): item is CartItem => item && ['course', 'fee'].includes(item.kind) && typeof item.id === 'string').slice(0, 20) : [];
  } catch { return []; }
}

const guestKey = 'pte-billing-guest';
export function guestToken() {
  let token = localStorage.getItem(guestKey);
  if (!token || !/^[a-f0-9]{64}$/.test(token)) {
    token = Array.from(crypto.getRandomValues(new Uint8Array(32)), (byte) => byte.toString(16).padStart(2, '0')).join('');
    localStorage.setItem(guestKey, token);
  }
  return token;
}
export function savedValue<T>(key: string, fallback: T): T {
  try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; } catch { return fallback; }
}
export const guestFeesKey = 'pte-billing-fees';
export const guestOrdersKey = 'pte-billing-orders';
export class BillingRequestError extends Error {
  constructor(message: string, public readonly orderId?: string) { super(message); }
}
export async function guestFetch<T>(body?: unknown, uid?: string | null): Promise<T> {
  const response = await fetch('/api/billing', {
    method: body ? 'POST' : 'GET', cache: 'no-store',
    headers: { 'Content-Type': 'application/json', 'x-billing-fees': JSON.stringify(uid ? savedValue(`${guestFeesKey}:${uid}`, {}) : {}) },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const data = await response.json();
  if (!response.ok) throw new BillingRequestError(data.error || 'Không thể tải học phí. Vui lòng thử lại.', data.code === 'BILLING_ORDER_CONFLICT' && typeof data.orderId === 'string' && /^[a-zA-Z0-9_-]{1,100}$/.test(data.orderId) ? data.orderId : undefined);
  return data;
}