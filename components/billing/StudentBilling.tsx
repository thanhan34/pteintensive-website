'use client';
import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { usePlacementSession } from './PlacementSession';
import { guestFetch, guestToken, guestFeesKey, guestOrdersKey, savedValue, cartKey, readCart } from '@/lib/billing/client';
import type { BillingOrder, CartItem, Price, TuitionFee } from '@/lib/billing/types';

import StudentBillingView from './StudentBillingView';
import { validPlacementDeclaration } from '@/lib/billing/placement';

type Data = { prices: Price[]; fees: TuitionFee[]; orders: BillingOrder[]; paymentAvailable: boolean; environment: 'sandbox' | 'production' };
export default function StudentBilling({ embedded = false }: { embedded?: boolean }) {
  const router = useRouter();
  const [data, setData] = useState<Data | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [tab, updateTab] = useState(embedded ? 'courses' : 'cart');
  const setTab = (value: string) => {
    if (embedded && value !== 'courses') { router.push(`/cart?tab=${value}`); return; }
    if (!embedded && value === 'courses') { router.push('/courses#student-course-selection'); return; }
    updateTab(value);
  };
  const [selectedOrder, setSelectedOrder] = useState('');
  const [checkedAt, setCheckedAt] = useState(0);
  const { declaration: placementDeclaration, update: setPlacementDeclaration, addedToCart } = usePlacementSession();
  const placementReady = validPlacementDeclaration(placementDeclaration);
  const refresh = useCallback(async () => {
    setBusy(true); setError('');
    try { setData(await guestFetch<Data>()); setCheckedAt(Date.now()); }
    catch (err) { setError(err instanceof Error ? err.message : 'Không thể tải học phí.'); }
    finally { setBusy(false); }
  }, []);
  useEffect(() => {
    try {
    setData(null); setCart([]);
    guestToken();
    const saved = readCart('guest');
    const params = new URLSearchParams(window.location.search);
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    if (embedded && (['fees', 'cart', 'orders'].includes(params.get('tab') || '') || params.has('order') || params.has('callback') || fragment.has('fee'))) {
      router.replace(`/cart${window.location.search}${window.location.hash}`);
      return;
    }
    const fee = fragment.get('fee'); const access = fragment.get('access');
    if (fee && /^[a-zA-Z0-9_-]{1,100}$/.test(fee) && access && /^[a-f0-9]{64}$/.test(access)) {
      const tokens = savedValue<Record<string, string>>(guestFeesKey, {});
      tokens[fee] = access;
      localStorage.setItem(guestFeesKey, JSON.stringify(Object.fromEntries(Object.entries(tokens).slice(-20))));
      updateTab('fees');
    }
    const add = params.get('add');
    if (add) setNotice('Vui lòng xác nhận đã kiểm tra đầu vào và nhập nhận xét từ đội học thuật trong form bên dưới, sau đó chọn thêm khóa học.');
    setCart(saved);
    localStorage.setItem(cartKey('guest'), JSON.stringify(saved));
    if (!embedded && ['fees', 'cart', 'orders'].includes(params.get('tab') || '')) updateTab(params.get('tab')!);
    if (params.get('order')) { setSelectedOrder(params.get('order')!); updateTab('orders'); setNotice('Đã quay về từ thanh toán. Kết quả bên dưới chỉ thay đổi sau khi máy chủ xác nhận.'); }
    if (params.get('callback') === 'invalid') setError('Không thể xác thực đường dẫn quay về. Vui lòng kiểm tra lịch sử đơn.');
    // Consume the add-to-cart intent so a refresh cannot re-add a removed course.
    window.history.replaceState(null, '', `${embedded ? '/courses' : '/cart'}${!fee && window.location.hash ? window.location.hash : ''}`);
    void refresh();
    } catch { setError('Cần cho phép lưu trữ trên trình duyệt để bảo vệ phiên thanh toán.'); }
  }, [refresh, embedded, router]);
  const changeCart = (next: CartItem[]) => {
    setCart(next);
    localStorage.setItem(cartKey('guest'), JSON.stringify(next));
    window.dispatchEvent(new Event('pte-cart-updated'));
  };
  const add = (item: CartItem) => {
    if (!placementReady) { setError('Vui lòng xác nhận đã kiểm tra đầu vào và nhập nhận xét từ đội học thuật trước khi thêm vào giỏ.'); return; }
    if (item.kind === 'course' ? !data?.prices.some((price) => price.id === item.id && price.enabled) : !data?.fees.some((fee) => fee.id === item.id && fee.status === 'unpaid')) { setError('Khoản học phí không còn khả dụng. Vui lòng cập nhật dữ liệu.'); return; }
    if (cart.length >= 20) { setError('Bạn có thể chọn tối đa 20 khoản học phí.'); return; }
    if (!cart.some((entry) => entry.id === item.id && entry.kind === item.kind)) changeCart([...cart, item]);
    if (embedded) addedToCart();
    setNotice('Đã thêm vào giỏ hàng. Bạn có thể chọn thêm khóa hoặc mở giỏ hàng trên thanh điều hướng để tiếp tục.');
  };
  const resolve = (item: CartItem) => item.kind === 'fee' ? data?.fees.find((fee) => fee.id === item.id && fee.status === 'unpaid') : data?.prices.find((price) => price.id === item.id && price.enabled);
  const total = cart.reduce((sum, item) => sum + (resolve(item)?.amount || 0), 0);
  async function pay(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!placementReady) { setError('Vui lòng quay lại trang khóa học để xác nhận kiểm tra đầu vào và nhập nhận xét học thuật.'); return; }
    const fields = new FormData(event.currentTarget);
    setBusy(true); setError('');
    try {
      const result = await guestFetch<{ url: string; orderId: string }>({ items: cart, expectedTotal: total, name: fields.get('name'), email: fields.get('email'), phone: fields.get('phone'), placementDeclaration });
      localStorage.setItem(guestOrdersKey, JSON.stringify([...savedValue<string[]>(guestOrdersKey, []), result.orderId].slice(-50)));
      changeCart([]);
      window.location.assign(result.url);
    } catch (err) { await refresh(); setError(err instanceof Error ? err.message : 'Không thể tạo đơn.'); setBusy(false); }
  }
  return <StudentBillingView embedded={embedded} placementDeclaration={placementDeclaration} onPlacementChange={setPlacementDeclaration} placementReady={placementReady} checkedAt={checkedAt} data={data} cart={cart} busy={busy} error={error} notice={notice} tab={tab} setTab={setTab} selectedOrder={selectedOrder} total={total} refresh={refresh} add={add} changeCart={changeCart} resolve={resolve} pay={pay} />;
}
