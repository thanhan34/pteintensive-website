'use client';
import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { SignInButton, useAuth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { usePlacementSession } from './PlacementSession';
import { BillingRequestError, guestFetch, guestFeesKey, savedValue } from '@/lib/billing/client';
import type { BillingOrder, CartItem, Price, TuitionFee } from '@/lib/billing/types';

import StudentBillingView from './StudentBillingView';
import { validPlacementDeclaration } from '@/lib/billing/placement';
import { useErrorToast } from '@/lib/hooks/useErrorToast';
import { startAutoReconciliation } from '@/lib/billing/auto-reconcile';

type Data = { prices: Price[]; fees: TuitionFee[]; orders: BillingOrder[]; paymentAvailable: boolean; environment: 'sandbox' | 'production' };
export default function StudentBilling({ embedded = false }: { embedded?: boolean }) {
  const router = useRouter();
  const { isLoaded, isSignedIn, userId } = useAuth();
  const [data, setData] = useState<Data | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  useErrorToast(error);
  const [notice, setNotice] = useState('');
  const [tab, updateTab] = useState(embedded ? 'courses' : 'cart');
  const setTab = (value: string) => {
    if (embedded && value !== 'courses') { router.push(`/cart?tab=${value}`); return; }
    if (!embedded && value === 'courses') { router.push('/courses#student-course-selection'); return; }
    updateTab(value);
  };
  const [selectedOrder, setSelectedOrder] = useState('');
  const [checkedAt, setCheckedAt] = useState(0);
  const { declaration: placementDeclaration, update: setPlacementDeclaration, addedToCart, cart, changeCart, loaded, flush, needsReview, confirmReview, saveMessage } = usePlacementSession();
  const declarationReady = validPlacementDeclaration(placementDeclaration);
  const placementReady = embedded ? declarationReady : cart.length > 0 && cart.every((item) => item.kind === 'fee' ? data?.fees.some((fee) => fee.id === item.id && fee.academicApproved) : declarationReady);
  const refresh = useCallback(async () => {
    setBusy(true); setError('');
    try { setData(await guestFetch<Data>(undefined, userId)); setCheckedAt(Date.now()); }
    catch (err) { setError(err instanceof Error ? err.message : 'Không thể tải học phí.'); }
    finally { setBusy(false); }
  }, [userId]);
  useEffect(() => {
    if (!isLoaded) return;
    try {
    setData(null); setSelectedOrder('');
    const params = new URLSearchParams(window.location.search);
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    if (embedded && (['fees', 'cart', 'orders'].includes(params.get('tab') || '') || params.has('order') || params.has('callback') || fragment.has('fee'))) {
      router.replace(`/cart${window.location.search}${window.location.hash}`);
      return;
    }
    const fee = fragment.get('fee'); const access = fragment.get('access');
    if (fee && /^[a-zA-Z0-9_-]{1,100}$/.test(fee) && access && /^[a-f0-9]{64}$/.test(access)) {
      const tokens = savedValue<Record<string, string>>(`${guestFeesKey}:${userId || 'pending'}`, {});
      tokens[fee] = access;
      localStorage.setItem(`${guestFeesKey}:${userId || 'pending'}`, JSON.stringify(Object.fromEntries(Object.entries(tokens).slice(-20))));
      updateTab('fees');
    }
    const add = params.get('add');
    if (add) setNotice('Vui lòng xác nhận đã kiểm tra đầu vào và nhập nhận xét từ đội học thuật trong form bên dưới, sau đó chọn thêm khóa học.');
    if (userId) {
      const pending = savedValue<Record<string, string>>(`${guestFeesKey}:pending`, {});
      const key = `${guestFeesKey}:${userId}`;
      localStorage.setItem(key, JSON.stringify({ ...savedValue(key, {}), ...pending }));
      localStorage.removeItem(`${guestFeesKey}:pending`);
      if (Object.keys(pending).length) updateTab('fees');
    }
    if (!embedded && ['fees', 'cart', 'orders'].includes(params.get('tab') || '')) updateTab(params.get('tab')!);
    if (params.get('order')) { setSelectedOrder(params.get('order')!); updateTab('orders'); setNotice('Đã quay về từ thanh toán. Kết quả bên dưới chỉ thay đổi sau khi máy chủ xác nhận.'); }
    if (params.get('callback') === 'invalid') setError('Không thể xác thực đường dẫn quay về. Vui lòng kiểm tra lịch sử đơn.');
    // Consume the add-to-cart intent so a refresh cannot re-add a removed course.
    window.history.replaceState(null, '', `${embedded ? '/courses' : '/cart'}${window.location.search}${!fee && window.location.hash ? window.location.hash : ''}`);
    void refresh();
    } catch { setError('Cần cho phép lưu trữ trên trình duyệt để bảo vệ phiên thanh toán.'); }
  }, [refresh, embedded, router, isLoaded, userId]);
  const returnedOrderStatus = data?.orders.find((order) => order.id === selectedOrder)?.status;
  useEffect(() => {
    if (embedded || !userId || !selectedOrder || returnedOrderStatus !== 'pending') return;
    let cancelled = false;
    const stop = startAutoReconciliation({
      read: async () => {
        const next = await guestFetch<Data>(undefined, userId);
        if (cancelled) return true;
        setData(next); setCheckedAt(Date.now());
        const confirmed = next.orders.find((order) => order.id === selectedOrder);
        if (confirmed?.status === 'paid') setNotice(confirmed.environment === 'sandbox' ? 'Giao dịch thử nghiệm thành công; đây không phải khoản thu tiền thật.' : 'Máy chủ đã xác nhận giao dịch thành công. Xem chi tiết kết quả thanh toán bên trên.');
        return next.orders.find((order) => order.id === selectedOrder)?.status !== 'pending';
      },
      query: async (signal) => {
        const response = await fetch('/api/billing/check', {
          method: 'POST', cache: 'no-store', signal: AbortSignal.any([signal, AbortSignal.timeout(20000)]),
          headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ orderId: selectedOrder }),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Chưa thể tra cứu VNPAY.');
      },
      onError: () => setNotice('Chưa nhận được xác nhận mới. Hệ thống sẽ thử lại trong phiên kiểm tra 10 phút; không thanh toán lại nếu đã bị trừ tiền.'),
      onExhausted: () => setNotice('Đã hết phiên tự động kiểm tra 10 phút nhưng chưa có kết quả cuối cùng. Đơn vẫn chờ xác nhận. Bạn có thể tra cứu lại hoặc liên hệ trung tâm kèm mã đơn; không thanh toán lại nếu đã bị trừ tiền.'),
    });
    return () => { cancelled = true; stop(); };
  }, [embedded, selectedOrder, returnedOrderStatus, userId]);
  const add = (item: CartItem) => {
    if (!isSignedIn) { setError('Đăng nhập để lưu tiến trình và thanh toán.'); return; }
    if (item.kind === 'course' ? !declarationReady : !data?.fees.some((fee) => fee.id === item.id && fee.academicApproved)) { setError('Cần hoàn thành đánh giá đầu vào. Khoản thu riêng cần được trung tâm xác nhận.'); return; }
    if (item.kind === 'course' ? !data?.prices.some((price) => price.id === item.id && price.enabled) : !data?.fees.some((fee) => fee.id === item.id && fee.status === 'unpaid')) { setError('Khoản học phí không còn khả dụng. Vui lòng cập nhật dữ liệu.'); return; }
    if (cart.length >= 20) { setError('Bạn có thể chọn tối đa 20 khoản học phí.'); return; }
    if (!cart.some((entry) => entry.id === item.id && entry.kind === item.kind)) changeCart([...cart, item]);
    if (embedded) addedToCart();
    setNotice('Đã thêm vào giỏ hàng. Bạn có thể chọn thêm khóa hoặc mở giỏ hàng trên thanh điều hướng để tiếp tục.');
  };
  // Keep pending amounts visible after a lost checkout response so a retry can
  // confirm the original total. The server alone decides whether it can resume.
  const resolve = (item: CartItem) => item.kind === 'fee' ? data?.fees.find((fee) => fee.id === item.id && fee.status !== 'paid') : data?.prices.find((price) => price.id === item.id && price.enabled);
  const total = cart.reduce((sum, item) => sum + (resolve(item)?.amount || 0), 0);
  async function pay(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!placementReady || needsReview || !isSignedIn) { setError('Vui lòng quay lại trang khóa học để xác nhận kiểm tra đầu vào và nhập nhận xét học thuật.'); return; }
    const fields = new FormData(event.currentTarget);
    setBusy(true); setError('');
    try {
      await flush();
      const result = await guestFetch<{ url: string; orderId: string }>({ items: cart, expectedTotal: total, name: fields.get('name'), email: fields.get('email'), phone: fields.get('phone'), placementDeclaration }, userId);
      // Keep selection for recovery; server locks prevent duplicate payments.
      window.location.assign(result.url);
    } catch (err) {
      await refresh();
      if (err instanceof BillingRequestError && err.orderId) {
        setSelectedOrder(err.orderId); updateTab('orders'); setNotice('Đã mở đơn đang chặn thanh toán. Giỏ hàng của bạn vẫn được giữ nguyên.');
      }
      setError(err instanceof Error ? err.message : 'Không thể tạo đơn.'); setBusy(false);
    }
  }
  if (!isLoaded || !loaded) return <section className="billing-shell"><div className="billing-container"><Card><p role="status">{saveMessage || 'Đang khôi phục tiến trình…'}</p></Card></div></section>;
  return <><section className={`billing-shell${embedded ? ' courses-billing-shell' : ''}`}><div className="billing-container">
    {!isSignedIn ? <Card><h2 className="text-xl font-bold">Đăng nhập để tiếp tục</h2><p className="my-4">Lưu tiến trình đầu vào, học phí và lịch sử thanh toán vào tài khoản.</p><SignInButton mode="modal"><Button size="lg">Đăng nhập / Tạo tài khoản</Button></SignInButton></Card> : <p className="text-sm text-gray-600" role="status">{saveMessage || 'Tiến trình được lưu theo tài khoản. Bản nháp quá 30 phút cần kiểm tra lại, không cần làm lại bài kiểm tra.'}</p>}
    {needsReview && <Card className="mt-4"><h2 className="font-bold">Kiểm tra lại bản nháp</h2><p className="my-4">Bạn quay lại sau hơn 30 phút. Thông tin vẫn còn; kiểm tra lại khoản thu và thông tin học viên, không cần làm lại bài kiểm tra.</p><Button onClick={confirmReview}>Tôi sẽ kiểm tra lại thông tin</Button></Card>}
  </div></section>{(embedded || isSignedIn) && <StudentBillingView embedded={embedded} placementDeclaration={placementDeclaration} onPlacementChange={setPlacementDeclaration} placementReady={placementReady} checkedAt={checkedAt} data={data} cart={cart} busy={busy || !isSignedIn || needsReview} error={error} notice={notice} tab={tab} setTab={setTab} selectedOrder={selectedOrder} total={total} refresh={refresh} add={add} changeCart={changeCart} resolve={resolve} pay={pay} />}</>;
}
