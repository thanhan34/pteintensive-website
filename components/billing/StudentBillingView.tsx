'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check, ChevronDown, Clock3, FileText, History, Info, LoaderCircle, LockKeyhole, RefreshCw, ShieldCheck, Users } from 'lucide-react';
import type { FormEvent } from 'react';
import { PlacementJourney } from './PlacementJourney';
import { usePlacementSession } from './PlacementSession';
import { courseGuidanceCopy } from '@/lib/billing/guidance';
import type { PlacementDeclaration } from '@/lib/billing/placement';
import { courseData } from '@/lib/courseData';
import { paymentState } from '@/lib/billing/payment-state';
import { money, type BillingOrder, type CartItem, type Price, type TuitionFee } from '@/lib/billing/types';
import { Button } from '@/components/ui/button';
import { PersonalTuitionPanel, TuitionCheckoutPanel } from './StudentTuitionPanels';
import { SandboxPaymentGuide } from './SandboxPaymentGuide';
import { PaymentResultNotice } from './PaymentResultNotice';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export type StudentBillingData = { prices: Price[]; fees: TuitionFee[]; orders: BillingOrder[]; paymentAvailable: boolean; environment: 'sandbox' | 'production' };
type Props = {
  embedded?: boolean;
  placementDeclaration: PlacementDeclaration; onPlacementChange: (value: PlacementDeclaration) => void; placementReady: boolean;
  data: StudentBillingData | null; cart: CartItem[]; busy: boolean; error: string; notice: string;
  tab: string; setTab: (tab: string) => void; selectedOrder: string; total: number; checkedAt: number;
  refresh: () => Promise<void>; add: (item: CartItem) => void; changeCart: (items: CartItem[]) => void;
  resolve: (item: CartItem) => Price | TuitionFee | undefined;
  pay: (event: FormEvent<HTMLFormElement>) => Promise<void>;
};

function EmptyState({ title, children }: { type: 'orders'; title: string; children: React.ReactNode }) {
  const Icon = History;
  return <div className="student-empty"><span className="student-empty-icon"><Icon aria-hidden="true" /></span><h3>{title}</h3><div className="student-empty-copy">{children}</div></div>;
}

export default function StudentBillingView({ embedded = false, placementDeclaration, onPlacementChange, placementReady, data, cart, busy, error, notice, tab, setTab, selectedOrder, total, checkedAt, refresh, add, changeCart, resolve, pay }: Props) {
  const { guidanceStep, startGuidance, continueGuidance } = usePlacementSession();
  const coursesUnlocked = placementReady && ['courses', 'cart', 'done'].includes(guidanceStep);
  const Shell = embedded ? 'section' : 'main';
  const tabs = embedded ? [] : [
    { value: 'cart', label: 'Khoản đã chọn', icon: FileText },
    { value: 'fees', label: 'Học phí cá nhân', icon: FileText },
    { value: 'orders', label: 'Lịch sử đơn', icon: History },
  ];
  const continueToCourses = () => {
    continueGuidance();
    setTab('courses');
    requestAnimationFrame(() => document.getElementById('student-course-selection')?.focus());
  };
  return <Shell aria-label={embedded ? 'Đăng ký khóa học và thanh toán học phí' : undefined} className={`billing-shell student-shell${embedded ? ' courses-billing-shell' : ''}`}><div className="billing-container">
    {!embedded && data && selectedOrder && <PaymentResultNotice order={data.orders.find((order) => order.id === selectedOrder)} orderId={selectedOrder} busy={busy} refresh={refresh} />}
    {embedded && <p className="course-guidance-note" role="status" aria-atomic="true"><ArrowRight aria-hidden="true" /><span>{courseGuidanceCopy[guidanceStep]}</span></p>}
    {!embedded && <header className="student-heading">
      <div><h1>Giỏ hàng <span>& Học phí.</span></h1><p>Xem khoản đã chọn, học phí cá nhân và lịch sử đơn.<br className="hidden sm:block" /> Tiến trình được lưu theo tài khoản, kể cả khi đổi thiết bị.</p><Link href="/courses#student-course-selection" className="billing-link">Tiếp tục chọn khóa <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></div>
      <div className="student-heading-note"><ShieldCheck aria-hidden="true" /><div><strong>Lưu theo tài khoản</strong><span>Thông tin thẻ chỉ nhập tại cổng VNPAY.</span></div></div>
    </header>}

    {error && <div role="alert" className="student-alert student-alert-error"><Info aria-hidden="true" /><p>{error}</p></div>}
    {notice && <div role="status" className="student-alert"><Check aria-hidden="true" /><p>{notice}</p>{cart.length > 0 && tab !== 'cart' && <Button variant="outline" size="lg" onClick={() => setTab('cart')}>Xem khoản đã chọn <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" /></Button>}</div>}

    <Tabs value={tab} onValueChange={setTab}>
      <div className="student-toolbar">
        {!embedded && <TabsList className="student-tabs" aria-label="Quản lý học phí">{tabs.map(({ value, label, icon: Icon }) => <TabsTrigger key={value} value={value}><Icon aria-hidden="true" /><span>{label}</span>{value === 'cart' && <span className="student-count">{cart.length}</span>}</TabsTrigger>)}</TabsList>}
        <Button className="student-refresh" variant="ghost" size="lg" disabled={busy} onClick={refresh} aria-label="Cập nhật trạng thái học phí"><RefreshCw aria-hidden="true" className={busy ? 'animate-spin motion-reduce:animate-none' : ''} /><span>{busy ? 'Đang tải' : 'Cập nhật'}</span></Button>
      </div>

      {!data && <Card className="student-loading" aria-busy={busy}>{busy ? <><LoaderCircle aria-hidden="true" className="animate-spin motion-reduce:animate-none" /><p role="status">Đang tải thông tin học phí…</p></> : <><Info aria-hidden="true" /><p>Chưa tải được dữ liệu. Vui lòng bấm cập nhật để thử lại.</p></>}</Card>}
      {data && <>
        {!data.paymentAvailable && <div className="student-availability"><Info aria-hidden="true" /><p><strong>Thanh toán trực tuyến chưa được mở.</strong> Bạn vẫn có thể xem học phí và chọn khóa; liên hệ trung tâm để được hướng dẫn thanh toán.</p><Link href="/contact">Liên hệ hỗ trợ <ArrowRight aria-hidden="true" /></Link></div>}
        {data.paymentAvailable && data.environment === 'sandbox' && <div className="student-alert" role="status"><Info aria-hidden="true" /><p>Môi trường thử nghiệm sandbox — không dùng thẻ thật và không ghi nhận học phí thực tế.</p></div>}
        {!embedded && <SandboxPaymentGuide environment={data.environment} />}

        {embedded && <TabsContent value="courses" className="student-panel">
          {!coursesUnlocked && <div className="student-course-gate"><LockKeyhole aria-hidden="true" /><div><strong>Khóa học chỉ mở chọn sau bài kiểm tra và nhận xét học thuật</strong><p>Bạn có thể tham khảo thông tin khóa học bên dưới. Học phí sẽ hiển thị sau khi bạn hoàn thành thông tin đầu vào và bấm “Tiếp tục chọn khóa”.</p></div><Button asChild variant="outline" size="lg"><a href="#placement-declaration" onClick={startGuidance} data-guidance={guidanceStep === 'start'}>{placementReady ? 'Tiếp tục đến bước chọn khóa' : placementDeclaration.completed ? 'Nhập nhận xét học thuật' : 'Bắt đầu kiểm tra đầu vào'}<ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" /></a></Button></div>}
          <div className="student-section-heading"><div><h2 id="student-course-selection" tabIndex={-1} className="scroll-mt-28">Chọn khóa theo nhận xét học thuật</h2><p>{coursesUnlocked ? 'Chọn đúng khóa được đề xuất trong nhận xét bạn đã nhận.' : 'Tham khảo khóa học trước, rồi hoàn thành form kiểm tra đầu vào và nhận xét bên dưới. Bấm “Tiếp tục chọn khóa” để xem học phí và thêm vào giỏ.'}</p></div><span>{Object.keys(courseData).length} khóa học</span></div>
          <div className="student-course-grid">{Object.entries(courseData).map(([id, course]) => {
            const price = data.prices.find((entry) => entry.id === id && entry.enabled);
            return <article className="student-course" key={id}>
              <Link className="student-course-image" href={`/courses/${id}`} tabIndex={-1} aria-hidden="true"><Image src={course.image} alt="" fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 380px" className="object-cover" /></Link>
              <div className="student-course-body"><h3><Link href={`/courses/${id}`}>{course.title}</Link></h3><p className="student-course-description">{course.description}</p><dl className="student-course-meta"><div><dt><Clock3 aria-hidden="true" /><span className="sr-only">Thời lượng</span></dt><dd>{course.duration}</dd></div><div><dt><Users aria-hidden="true" /><span className="sr-only">Sĩ số</span></dt><dd>{course.classSize}</dd></div></dl>
              <div className="student-course-action"><div>{coursesUnlocked ? <><span>Học phí</span><strong>{price ? money(price.amount) : 'Liên hệ tư vấn'}</strong></> : <><span>Học phí</span><span>Xem ở bước chọn khóa</span></>}</div>{price ? <span className="student-course-add" tabIndex={!coursesUnlocked ? 0 : undefined} aria-label={!coursesUnlocked ? `Thêm vào giỏ: ${course.title}` : undefined} aria-describedby={!coursesUnlocked ? `course-placement-hint-${id}` : undefined}>
                {!coursesUnlocked && <span role="tooltip" id={`course-placement-hint-${id}`} className="student-course-add-hint">Bạn cần làm bài kiểm tra đầu vào, nhập nhận xét học thuật trong form bên dưới danh sách khóa học và bấm “Tiếp tục chọn khóa” trước khi xem học phí và thêm vào giỏ.</span>}
                <Button size="lg" data-guidance={!busy && guidanceStep === 'courses' && coursesUnlocked && !cart.some((item) => item.kind === 'course' && item.id === id)} disabled={busy || !coursesUnlocked || cart.some((item) => item.kind === 'course' && item.id === id)} onClick={() => add({ kind: 'course', id })}>{cart.some((item) => item.kind === 'course' && item.id === id) ? 'Đã thêm vào giỏ' : 'Thêm vào giỏ'}</Button>
              </span> : <Button asChild size="lg" variant="outline"><Link href="/contact">Liên hệ tư vấn</Link></Button>}</div></div>
            </article>;
          })}</div>
          <div className="student-help-strip"><div><h3>Chưa chắc khóa học nào phù hợp?</h3><p>Trao đổi với trung tâm để được tư vấn lộ trình và học phí.</p></div><Button asChild size="lg" variant="outline"><Link href="/contact">Nhận tư vấn <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></Link></Button></div>
        </TabsContent>}

        {!embedded && <><TabsContent value="fees" className="student-panel"><PersonalTuitionPanel placementReady={placementReady} fees={data.fees} cart={cart} busy={busy} add={add} setTab={setTab} /></TabsContent>

        <TabsContent value="cart" className="student-panel"><TuitionCheckoutPanel placementReady={placementReady} cart={cart} busy={busy} total={total} paymentAvailable={data.paymentAvailable} setTab={setTab} changeCart={changeCart} resolve={resolve} pay={pay} /></TabsContent>

        <TabsContent value="orders" className="student-panel"><Card><div className="student-section-heading"><div><h2>Lịch sử đơn của bạn</h2><p>Kiểm tra kết quả đã được máy chủ xác nhận. Chọn đơn để tra cứu VNPAY và xem bước tiếp theo.</p></div><History aria-hidden="true" /></div>
          {!data.orders.length ? <EmptyState type="orders" title="Chưa có đơn thanh toán"><p>Các đơn thuộc tài khoản sẽ xuất hiện ở đây, kể cả khi đổi thiết bị. Giữ mã đơn để liên hệ trung tâm.</p><Button size="lg" variant="outline" onClick={() => setTab('courses')}>Xem khóa học</Button></EmptyState> : <><p className="student-alert text-sm"><Info className="shrink-0" aria-hidden="true" />Nếu đã bị trừ tiền nhưng đơn chưa xác nhận, không thanh toán lại. Gửi mã đơn cho trung tâm để tra soát.</p>{data.orders.map((order) => <details className="student-order" open={selectedOrder === order.id || undefined} key={order.id}><summary><div className="min-w-0"><span className="student-status">{paymentState(order, checkedAt).title}</span><h3 className="break-all font-bold mt-3">Đơn {order.id}</h3><p className="mt-2 text-sm text-gray-600">{new Date(order.createdAt).toLocaleString('vi-VN')}{order.environment === 'sandbox' && ' · Thử nghiệm'}</p></div><strong className="tabular-nums">{money(order.total)}</strong><ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0" /></summary><div className="space-y-4 pb-6">{order.lines.map((line) => <div className="flex flex-wrap justify-between gap-3" key={`${line.kind}:${line.id}`}><span>{line.title}</span><strong>{money(line.amount)}</strong></div>)}<Button asChild variant="outline"><a href={`/cart?order=${encodeURIComponent(order.id)}`}>Xem kết quả và bước tiếp theo</a></Button>{order.transactionNo && <p className="text-sm break-all">Mã giao dịch: {order.transactionNo}</p>}{order.status === 'pending' && <p className="billing-message">{paymentState(order, checkedAt).detail}</p>}{order.status === 'pending' && !order.reviewRequired && new Date(order.expiresAt).getTime() > checkedAt && <Button asChild size="lg"><a href={order.paymentUrl}>Tiếp tục thanh toán đơn này</a></Button>}</div></details>)}</>}
        </Card></TabsContent></>}
      </>}
    </Tabs>
    {embedded ? <div className="mt-8"><PlacementJourney guidanceStep={guidanceStep} onStart={startGuidance} declaration={placementDeclaration} onChange={onPlacementChange} ready={placementReady} busy={busy} onContinue={continueToCourses} /></div> : !placementReady && cart.some((item) => item.kind === 'course') && <div id="placement-declaration" className="student-course-gate mt-8 scroll-mt-28"><LockKeyhole aria-hidden="true" /><div><strong>Hoàn thành thông tin đầu vào để tiếp tục</strong><p>Quay lại trang khóa học để xác nhận đã làm bài và nhập nhận xét học thuật. Thông tin được lưu theo tài khoản; tải lại trang không cần nhập lại.</p></div><Button asChild variant="outline" size="lg"><Link href="/courses#placement-declaration">Hoàn thành thông tin đầu vào<ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" /></Link></Button></div>}
    <footer className="student-page-footer"><span><ShieldCheck aria-hidden="true" />Đăng nhập an toàn · Không lưu thông tin thẻ</span><Link className="billing-link" href="/contact">Trung tâm luôn sẵn sàng hỗ trợ <ArrowRight aria-hidden="true" /></Link></footer>
  </div></Shell>;
}