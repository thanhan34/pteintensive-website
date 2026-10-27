'use client';
import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/context';
import { billingFetch } from '@/lib/billing/client';
import { courseData } from '@/lib/courseData';
import { money, orderStatus, type BillingOrder, type Price, type TuitionFee } from '@/lib/billing/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { AcademicApprovalFields } from './AcademicApprovalFields';
import { OrderPlacementNote } from './OrderPlacementNote';
import { PaymentLinkResult } from './PaymentLinkResult';
import { FeeDeleteControl } from './FeeDeleteControl';
import { OrderArchiveControl } from './OrderArchiveControl';
import { SandboxResetControl } from './SandboxResetControl';
import { useErrorToast } from '@/lib/hooks/useErrorToast';
type Data = { prices: Price[]; fees: (TuitionFee & { email: string })[]; orders: BillingOrder[]; sandboxResetAvailable?: boolean };
export default function AdminBilling() {
  const { user, loading } = useAuth();
  const [data, setData] = useState<Data | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [search, setSearch] = useState('');
  const [showArchived, setShowArchived] = useState(false);
  const [paymentLink, setPaymentLink] = useState('');
  const [linkFeeId, setLinkFeeId] = useState('');
  const [linkError, setLinkError] = useState('');
  useErrorToast(error);
  useErrorToast(linkError);
  const [creatingLinkId, setCreatingLinkId] = useState('');
  const creatingLink = useRef(false);
  const linkResult = useRef<HTMLDivElement>(null);
  const deletingFee = useRef(false);
  const archivingOrder = useRef(false);
  const resettingOrder = useRef(false);
  async function resetSandboxOrder(orderId: string) {
    if (!user || resettingOrder.current || busy) throw new Error('Vui lòng chờ thao tác hiện tại hoàn tất.');
    resettingOrder.current = true; setBusy(true); setError(''); setNotice('');
    try {
      await billingFetch(user, '/api/admin/billing', { action: 'sandbox-reset', orderId, confirmed: true });
      setData((current) => current ? {
        ...current,
        orders: current.orders.map((order) => order.id === orderId ? { ...order, status: 'failed', sandboxResetAt: new Date().toISOString(), sandboxResetBy: user.uid } : order),
        fees: current.fees.map((fee) => fee.orderId === orderId ? { ...fee, status: 'unpaid', orderId: '' } : fee),
      } : current);
      setNotice('Đã reset đơn sandbox và giải phóng khóa. Đóng trang VNPay cũ, sau đó cập nhật giỏ hàng để tạo đơn test mới.');
    } finally { resettingOrder.current = false; setBusy(false); }
  }
  async function archiveOrder(orderId: string) {
    if (!user || archivingOrder.current || busy) throw new Error('Vui lòng chờ thao tác hiện tại hoàn tất.');
    archivingOrder.current = true; setBusy(true); setError(''); setNotice('');
    try {
      await billingFetch(user, '/api/admin/billing', { action: 'order-archive', orderId, confirmed: true });
      setData((current) => current ? { ...current, orders: current.orders.map((order) => order.id === orderId ? { ...order, archivedAt: new Date().toISOString(), archivedBy: user.uid } : order) } : current);
      setNotice('Đã lưu trữ đơn thất bại. Bật “Xem đơn đã lưu trữ” để tra cứu lại.');
    } finally { archivingOrder.current = false; setBusy(false); }
  }
  async function deleteFee(feeId: string) {
    if (!user || deletingFee.current || creatingLink.current) throw new Error('Vui lòng chờ thao tác hiện tại hoàn tất.');
    deletingFee.current = true; setBusy(true); setError(''); setNotice('');
    try {
      await billingFetch(user, '/api/admin/billing', { action: 'fee-delete', feeId, confirmed: true });
      setData((current) => current ? { ...current, fees: current.fees.filter((fee) => fee.id !== feeId) } : current);
      if (linkFeeId === feeId) { setPaymentLink(''); setLinkFeeId(''); setLinkError(''); }
      setNotice('Đã xóa khoản thu. Liên kết cũ không còn sử dụng được.');
    } finally { deletingFee.current = false; setBusy(false); }
  }
  useEffect(() => {
    if (paymentLink && !creatingLinkId) linkResult.current?.scrollIntoView({ block: 'nearest', behavior: 'auto' });
  }, [paymentLink, creatingLinkId]);
  async function createLink(feeId: string) {
    if (!user || creatingLink.current) return;
    creatingLink.current = true;
    setLinkFeeId(feeId); setCreatingLinkId(feeId); setLinkError(''); setPaymentLink('');
    setBusy(true); setError(''); setNotice('');
    try {
      const result = await billingFetch<{ feeId: string; accessToken: string }>(user, '/api/admin/billing', { action: 'fee-link', feeId });
      if (result.feeId !== feeId || !/^[a-f0-9]{64}$/.test(result.accessToken || '')) throw new Error('Máy chủ chưa trả về liên kết hợp lệ. Vui lòng cập nhật trang và thử lại.');
      setPaymentLink(`${window.location.origin}/cart#fee=${result.feeId}&access=${result.accessToken}`);
      setNotice('Liên kết cũ đã bị vô hiệu. Gửi liên kết mới cho đúng học viên.');
    } catch (err) { setLinkError(err instanceof Error ? err.message : 'Không thể tạo liên kết.'); }
    finally { setBusy(false); setCreatingLinkId(''); creatingLink.current = false; }
  }
  const load = useCallback(async () => {
    if (!user) return;
    setBusy(true); setError('');
    try { setData(await billingFetch<Data>(user, '/api/admin/billing')); }
    catch (err) { setData(null); setError(err instanceof Error ? err.message : 'Không có quyền truy cập.'); }
    finally { setBusy(false); }
  }, [user]);
  useEffect(() => { setData(null); void load(); }, [load]);
  async function submit(event: FormEvent<HTMLFormElement>, action: string) {
    event.preventDefault(); if (!user) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    const body: Record<string, unknown> = { action };
    fields.forEach((value, key) => { body[key] = value; });
    if (fields.has('amount')) body.amount = Number(fields.get('amount'));
    if (action === 'price') body.enabled = fields.get('enabled') === 'on';
    if (action === 'fee') body.academicConfirmed = fields.get('academicConfirmed') === 'on';
    setBusy(true); setError(''); setNotice('');
    if (action === 'fee') { setPaymentLink(''); setLinkFeeId(''); setLinkError(''); }
    try {
      const result = await billingFetch<{ feeId?: string; accessToken?: string }>(user, '/api/admin/billing', body);
      if (result.feeId && result.accessToken) { setLinkFeeId(result.feeId); setPaymentLink(`${window.location.origin}/cart#fee=${result.feeId}&access=${result.accessToken}`); }
      setNotice('Đã lưu thay đổi.');
      await load();
      if (action !== 'price') form.reset();
    } catch (err) { setError(err instanceof Error ? err.message : 'Không thể lưu.'); }
    finally { setBusy(false); }
  }
  return <main className="billing-shell"><div className="billing-container">
    {paymentLink && <div ref={linkResult} className="mb-6 scroll-mt-28"><Card><p className="font-semibold mb-4" role="status">Đã tạo liên kết cho khoản thu {linkFeeId}.</p><PaymentLinkResult key={paymentLink} link={paymentLink} /></Card></div>}
    <header className="mb-8 flex flex-wrap justify-between gap-4"><div><h1 className="text-3xl font-extrabold">Quản lý học phí</h1><p className="mt-3 text-gray-600">Giá niêm yết, khoản thu riêng và kết quả thanh toán từ VNPAY.</p></div><Link href="/admin" className="billing-link">Về quản trị</Link></header>
    {error && <p className="billing-message mb-6" role="alert">{error}</p>}{notice && <p className="billing-message mb-6" role="status">{notice}</p>}
    {loading ? <p>Đang kiểm tra tài khoản…</p> : !user ? <Card><p>Vui lòng đăng nhập tài khoản quản trị.</p><Link href="/login" className="billing-link">Đăng nhập admin</Link></Card> : <><Button variant="outline" size="lg" onClick={load} disabled={busy} className="mb-6">{busy ? 'Đang tải…' : 'Cập nhật dữ liệu'}</Button>{data && <Tabs defaultValue="fees">
      <TabsList className="billing-tabs" aria-label="Quản trị học phí"><TabsTrigger value="fees">Khoản thu riêng</TabsTrigger><TabsTrigger value="prices">Giá khóa học</TabsTrigger><TabsTrigger value="orders">Đơn thanh toán</TabsTrigger></TabsList>
      <TabsContent value="fees"><div className="grid gap-6 lg:grid-cols-[360px_1fr]"><Card><h2 className="text-xl font-bold mb-4">Tạo khoản học phí</h2><form className="space-y-4" onSubmit={(e) => submit(e, 'fee')}><AcademicApprovalFields /><label className="billing-label">Email liên hệ học viên<Input type="email" name="email" required /></label><p className="text-sm text-gray-600">Không cần tài khoản. Sau khi tạo, sao chép liên kết riêng để gửi cho học viên. Ai có liên kết đều có thể xem và thanh toán khoản này.</p><label className="billing-label">Nội dung<Input name="title" required maxLength={200} /></label><label className="billing-label">Số tiền (VND)<Input name="amount" type="number" min={1} max={500000000} step={1} required /></label><label className="billing-label">Hạn thanh toán (tùy chọn)<Input name="dueDate" type="date" /></label><Button size="lg" disabled={busy}>Tạo khoản thu</Button></form></Card><Card><h2 className="text-xl font-bold mb-4">100 khoản thu gần nhất</h2><p className="mb-4 text-sm text-gray-600">Chỉ xóa khoản chưa thu, không có giao dịch đang xử lý. Khoản đang chờ hoặc đã thu được giữ lại để đối soát.</p>{!data.fees.length && <p className="text-gray-600">Chưa có khoản thu.</p>}{data.fees.map((fee) => <div key={fee.id} className="billing-row"><div><h3 className="font-bold">{fee.title}</h3><p className="text-sm break-all">{fee.email}</p><p className="text-sm text-gray-600">{fee.status === 'paid' ? 'Đã thu' : fee.status === 'pending' ? 'Đang xác nhận' : 'Chưa thu'}{fee.dueDate && ` · ${fee.dueDate}`}</p></div><div className="flex flex-wrap items-center gap-3"><strong>{money(fee.amount)}</strong><Button size="lg" variant="outline" disabled={busy || fee.status !== 'unpaid'} type="button" aria-busy={creatingLinkId === fee.id} onClick={() => createLink(fee.id)}>{creatingLinkId === fee.id ? "Đang tạo…" : "Tạo lại liên kết"}</Button><FeeDeleteControl title={fee.title} amount={fee.amount} disabled={busy || fee.status !== 'unpaid' || !!fee.orderId} onDelete={() => deleteFee(fee.id)} /></div>{linkFeeId === fee.id && <div className="w-full min-w-0" aria-live="polite">{creatingLinkId === fee.id && <p role="status">Đang tạo liên kết…</p>}{linkError && <p role="alert" className="billing-message">{linkError}</p>}{paymentLink && <PaymentLinkResult key={paymentLink} link={paymentLink} />}</div>}</div>)}</Card></div></TabsContent>
      <TabsContent value="prices"><Card><h2 className="text-xl font-bold mb-4">Thiết lập giá niêm yết</h2><p className="text-gray-600 mb-4">Chưa thiết lập giá hoặc chưa bật bán: học viên được hướng dẫn liên hệ tư vấn.</p>{Object.entries(courseData).map(([id, course]) => { const price = data.prices.find((p) => p.id === id); return <form key={`${id}:${price?.amount}:${price?.enabled}`} className="billing-row" onSubmit={(e) => submit(e, 'price')}><h3 className="font-semibold max-w-sm">{course.title}</h3><input type="hidden" name="courseId" value={id} /><div className="flex flex-wrap items-end gap-4"><label className="billing-label">Giá (VND)<Input name="amount" type="number" min={1} max={500000000} step={1} required defaultValue={price?.amount} /></label><label className="flex items-center gap-2 min-h-11"><input className="h-5 w-5 accent-primary" name="enabled" type="checkbox" defaultChecked={price?.enabled} />Mở thanh toán</label><Button size="lg" disabled={busy}>Lưu giá</Button></div></form>; })}</Card></TabsContent>
      <TabsContent value="orders"><Card><h2 className="text-xl font-bold mb-4">100 đơn gần nhất</h2><label className="billing-label mb-6">Lọc theo mã đơn hoặc email<Input value={search} onChange={(e) => setSearch(e.target.value)} type="search" /></label><label className="mb-4 flex min-h-11 items-center gap-3"><input type="checkbox" className="h-5 w-5 accent-primary" checked={showArchived} onChange={(event) => setShowArchived(event.target.checked)} />Xem đơn đã lưu trữ</label><p className="mb-4 text-sm text-gray-600">Danh sách giới hạn 100 đơn gần nhất, bao gồm đơn đã lưu trữ. Dữ liệu giao dịch vẫn được giữ lại.</p>{!data.orders.some((order) => (showArchived || !order.archivedAt) && `${order.id} ${order.email}`.toLowerCase().includes(search.toLowerCase())) && <p>Không có đơn phù hợp trong 100 đơn gần nhất.</p>}{data.orders.filter((order) => (showArchived || !order.archivedAt) && `${order.id} ${order.email}`.toLowerCase().includes(search.toLowerCase())).map((order) => <details key={order.id} className="billing-order"><summary className="cursor-pointer py-4"><strong className="break-all">{order.id}</strong><span className="block mt-2 text-sm break-all">{order.email} · {money(order.total)} · {orderStatus[order.status]} · {order.environment}</span></summary><div className="space-y-3 pb-4"><OrderPlacementNote order={order} />{order.sandboxResetAt && <p className="billing-message">Đơn test đã được reset: {new Date(order.sandboxResetAt).toLocaleString('vi-VN')} · Người thực hiện: {order.sandboxResetBy}. Không sử dụng lại đường dẫn thanh toán cũ.</p>}{data.sandboxResetAvailable && order.environment === 'sandbox' && order.status === 'pending' && <SandboxResetControl disabled={busy} onReset={() => resetSandboxOrder(order.id)} />}{order.archivedAt ? <p className="text-sm text-gray-600">Đã lưu trữ: {new Date(order.archivedAt).toLocaleString('vi-VN')} · Người thực hiện: {order.archivedBy}</p> : order.status === 'failed' && <OrderArchiveControl disabled={busy} onArchive={() => archiveOrder(order.id)} />}{order.lines.map((line) => <p key={`${line.kind}:${line.id}`}>{line.title} — {money(line.amount)}</p>)}<p className="text-sm">Học viên: {order.name || '—'} · Điện thoại: {order.phone || '—'}</p><p className="text-sm">Tạo: {order.createdAt} · Hết hạn URL: {order.expiresAt}</p><p className="text-sm">Giao dịch: {order.transactionNo || 'Chưa có'} · Response: {order.responseCode || '—'} · Status: {order.transactionStatus || '—'}</p></div></details>)}</Card></TabsContent>
    </Tabs>}</>}
  </div></main>;
}