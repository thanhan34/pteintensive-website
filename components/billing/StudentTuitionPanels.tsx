'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, CalendarDays, Check, CreditCard, FileText, Info, Link2, LoaderCircle, LockKeyhole, Mail, ShieldCheck, Trash2 } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { checkoutStep, checkoutStepCopy } from '@/lib/billing/checkout-guidance';
import { money, type CartItem, type Price, type TuitionFee } from '@/lib/billing/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { usePlacementSession } from './PlacementSession';
import { placementTestUrl } from '@/lib/billing/placement';

type SelectionProps = {
  placementReady: boolean;
  cart: CartItem[];
  busy: boolean;
  setTab: (tab: string) => void;
};

const feeStatuses = {
  unpaid: { label: 'Chưa thanh toán', description: 'Có thể chọn để thanh toán cùng các khoản khác.' },
  pending: { label: 'Chờ xác nhận', description: 'Khoản thu đang được xử lý. Không thanh toán lại; liên hệ trung tâm nếu cần tra soát.' },
  paid: { label: 'Đã thanh toán', description: 'Khoản thu đã được xác nhận thanh toán.' },
};

function dueDateLabel(value: string) {
  const parts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  return parts ? `${parts[3]}/${parts[2]}/${parts[1]}` : value;
}

function TuitionSupport({ children }: { children: React.ReactNode }) {
  return <aside className="student-tuition-guide">
    <span className="student-guide-icon"><Link2 aria-hidden="true" /></span>
    <h3>Liên kết riêng, học phí của bạn</h3>
    {children}
    <ol className="student-guide-steps">
      <li><span>1</span><div><strong>Mở liên kết từ trung tâm</strong><p>Kiểm tra email hoặc tin nhắn có thông báo học phí.</p></div></li>
      <li><span>2</span><div><strong>Kiểm tra khoản thu</strong><p>Đối chiếu nội dung, số tiền và hạn thanh toán.</p></div></li>
      <li><span>3</span><div><strong>Chọn và thanh toán</strong><p>Điền thông tin học viên, sau đó chuyển đến VNPAY khi cổng thanh toán được mở.</p></div></li>
    </ol>
    <div className="student-guide-contact"><strong>Cần kiểm tra lại học phí?</strong><p>Trung tâm sẽ hỗ trợ xác nhận hoặc gửi lại liên kết.</p><Link href="/contact">Liên hệ trung tâm <ArrowRight aria-hidden="true" /></Link></div>
  </aside>;
}

export function PersonalTuitionPanel({ fees, cart, busy, add, setTab }: SelectionProps & { fees: TuitionFee[]; add: (item: CartItem) => void }) {
  return <div className="student-tuition-layout">
    <Card className="student-personal-fees">
      <div className="student-section-heading"><div><h2>Học phí cá nhân</h2><p>Các khoản thu được trung tâm gửi riêng qua liên kết.</p></div>{fees.length > 0 && <span>{fees.length} khoản thu</span>}</div>
      {!fees.length ? <div className="student-fees-empty">
        <div className="student-document-mark" aria-hidden="true"><FileText /><span><LockKeyhole /></span></div>
        <h3>Kiểm tra đầu vào trước, thanh toán sau</h3>
        <p>Bạn phải làm bài kiểm tra đầu vào và được đội học thuật đánh giá. Mở liên kết do trung tâm gửi sau khi khóa phù hợp đã được duyệt để xem học phí tại đây.</p>
        <div className="student-inbox-hint"><Mail aria-hidden="true" /><div><strong>Kiểm tra email hoặc tin nhắn</strong><p>Nếu chưa nhận được liên kết, hãy liên hệ trung tâm để được hỗ trợ.</p></div></div>
        <Button asChild size="lg"><Link href={placementTestUrl}>Làm bài kiểm tra đầu vào <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></Link></Button>
        <Button variant="ghost" size="lg" onClick={() => setTab('courses')}>Xem các khóa học</Button>
      </div> : <ul className="student-fee-list">{fees.map((fee) => {
        const selected = cart.some((item) => item.kind === 'fee' && item.id === fee.id);
        const status = feeStatuses[fee.status];
        return <li className="student-fee-entry" key={fee.id}>
          <div className="student-fee-entry-heading"><span className="student-cart-icon"><FileText aria-hidden="true" /></span><div><span className="student-status" data-status={fee.status}>{fee.status === 'paid' && <Check aria-hidden="true" />}{status.label}</span><h3>{fee.title}</h3></div></div>
          <dl className="student-fee-facts"><div><dt>Số tiền</dt><dd>{money(fee.amount)}</dd></div><div><dt><CalendarDays aria-hidden="true" />Hạn thanh toán</dt><dd>{fee.dueDate ? dueDateLabel(fee.dueDate) : 'Chưa có hạn cụ thể'}</dd></div></dl>
          {fee.courseTitle && <p className="mt-4 text-sm font-semibold">Khóa được đề xuất: {fee.courseTitle}</p>}
          <div className="student-fee-entry-footer"><p>{status.description}{fee.academicApproved ? ' Đã có xác nhận đầu vào; không cần nhập lại nhận xét.' : ' Trung tâm cần bổ sung xác nhận đầu vào.'}</p>{fee.status === 'unpaid' && (selected ? <Button variant="outline" size="lg" disabled={busy} onClick={() => setTab('cart')}><Check aria-hidden="true" className="mr-2 h-4 w-4" />Đã chọn · Xem lại</Button> : <Button size="lg" disabled={busy || !fee.academicApproved} onClick={() => add({ kind: 'fee', id: fee.id })}>Chọn thanh toán <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" /></Button>)}</div>
        </li>;
      })}</ul>}
      <p className="student-personal-security"><ShieldCheck aria-hidden="true" />Liên kết là quyền truy cập khoản thu. Chỉ chia sẻ với người thanh toán giúp bạn, không đăng công khai.</p>
    </Card>
    <TuitionSupport><p>Đăng nhập rồi mở liên kết từ trung tâm. Khoản thu được lưu theo tài khoản người thanh toán, không tra cứu công khai bằng email.</p></TuitionSupport>
  </div>;
}

type CheckoutProps = SelectionProps & {
  total: number;
  paymentAvailable: boolean;
  changeCart: (items: CartItem[]) => void;
  resolve: (item: CartItem) => Price | TuitionFee | undefined;
  pay: (event: FormEvent<HTMLFormElement>) => Promise<void>;
};

export function TuitionCheckoutPanel({ placementReady, cart, busy, total, paymentAvailable, setTab, changeCart, resolve, pay }: CheckoutProps) {
  const { contact, updateContact: setContact } = usePlacementSession();
  const [reviewedSelection, setReviewedSelection] = useState('');
  const selection = JSON.stringify(cart.map((item) => [item.kind, item.id, resolve(item)?.title, resolve(item)?.amount, !!resolve(item)]));
  const reviewed = reviewedSelection === selection;
  const invalidCount = cart.filter((item) => !resolve(item)).length;
  const step = checkoutStep({ placementReady, invalidCount, reviewed, contact, paymentAvailable, busy });
  const updateContact = (form: HTMLFormElement) => {
    const fields = new FormData(form);
    setContact({ name: String(fields.get('name') || ''), email: String(fields.get('email') || ''), phone: String(fields.get('phone') || '') });
  };
  const submit = (event: FormEvent<HTMLFormElement>) => {
    if (step !== 'pay') { event.preventDefault(); return; }
    void pay(event);
  };
  if (!cart.length) return <Card className="student-selection-empty">
    <div><span className="student-empty-icon"><FileText aria-hidden="true" /></span><h2>Chỉ thanh toán sau đánh giá đầu vào</h2><p>Bắt buộc làm bài kiểm tra đầu vào, chờ đội học thuật đề xuất khóa rồi mở liên kết học phí được duyệt. Chưa có khoản đã chọn? Hãy bắt đầu từ bước kiểm tra.</p><div className="student-selection-empty-actions"><Button asChild size="lg"><Link href={placementTestUrl}>Làm bài kiểm tra đầu vào <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" /></Link></Button><Button type="button" size="lg" variant="outline" onClick={() => setTab('fees')}>Xem học phí được duyệt</Button></div></div>
    <aside><h3>Trước khi thanh toán</h3><ul><li><Check aria-hidden="true" /><span>Kiểm tra đúng khóa học và số tiền.</span></li><li><Check aria-hidden="true" /><span>Chuẩn bị họ tên, email và số điện thoại học viên.</span></li><li><ShieldCheck aria-hidden="true" /><span>Thông tin thẻ chỉ nhập trên cổng VNPAY.</span></li></ul><Link className="billing-link" href="/contact">Cần tư vấn học phí?</Link></aside>
  </Card>;

  return <form onSubmit={submit} onInput={(event) => updateContact(event.currentTarget)} onChange={(event) => updateContact(event.currentTarget)} className="student-checkout-form" data-checkout-step={step}>
    <div className="student-checkout-intro"><div><h2>Kiểm tra & thanh toán</h2><p>Đối chiếu khoản thu và điền thông tin học viên trước khi tiếp tục.</p></div><span><LockKeyhole aria-hidden="true" />Lưu theo tài khoản</span></div>
    <p id="checkout-guidance" className="course-guidance-note" role="status" aria-atomic="true"><ArrowRight aria-hidden="true" /><span>{checkoutStepCopy[step]}</span></p>
    <div className="student-checkout-grid">
      <div className="student-checkout-main">
        <Card className="student-checkout-items"><div className="student-section-heading"><div><h3>Các khoản đã chọn</h3><p>{cart.length} khoản học phí · Mỗi khoản thanh toán một lần</p></div><Button type="button" size="lg" variant="ghost" onClick={() => setTab('courses')}>Chọn thêm <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" /></Button></div>
          <ul>{cart.map((item) => {
            const source = resolve(item);
            return <li className="student-cart-row" data-unavailable={!source || undefined} key={`${item.kind}:${item.id}`}>
              <span className="student-cart-icon">{item.kind === 'course' ? <BookOpen aria-hidden="true" /> : <FileText aria-hidden="true" />}</span>
              <div className="student-cart-item-copy"><span>{item.kind === 'course' ? 'Khóa học' : 'Học phí cá nhân'}</span><h4>{source?.title || 'Khoản thu không còn khả dụng'}</h4>{!source && <p>Vui lòng xóa khoản này và kiểm tra lại học phí trước khi tiếp tục.</p>}</div>
              <div className="student-cart-item-end"><strong>{source ? money(source.amount) : 'Cần kiểm tra'}</strong><Button type="button" variant="ghost" size="lg" className="student-remove-item" data-guidance={step === 'items' && !source} disabled={busy} aria-label={`Xóa ${source?.title || 'khoản học phí'}`} onClick={() => changeCart(cart.filter((entry) => entry.id !== item.id || entry.kind !== item.kind))}><Trash2 aria-hidden="true" />Xóa</Button></div>
            </li>;
          })}</ul>
          <label className="student-placement-checkbox" data-guidance={step === 'review'}><input name="checkoutReviewed" type="checkbox" checked={reviewed} disabled={busy || !placementReady || invalidCount > 0} onChange={(event) => setReviewedSelection(event.target.checked ? selection : '')} required /><span>Tôi đã kiểm tra đúng khóa, các khoản đã chọn và tổng tiền {money(total)}.</span></label>
        </Card>
        <Card className="student-checkout-contact">
          <div className="student-section-heading"><div><h3>Thông tin học viên</h3><p>Người được ghi nhận học phí; có thể khác người đăng nhập thanh toán giúp.</p></div></div>
          <fieldset disabled={busy} className="student-contact-fields"><legend className="sr-only">Thông tin liên hệ bắt buộc</legend>
            <label className="billing-label student-field-full">Họ và tên học viên <span className="course-guide-field" data-guidance={step === 'name'}><Input name="name" defaultValue={contact.name} aria-describedby="checkout-guidance" placeholder="Nhập đầy đủ họ và tên" autoComplete="name" minLength={2} maxLength={100} required /></span></label>
            <label className="billing-label">Email liên hệ <span className="course-guide-field" data-guidance={step === 'email'}><Input name="email" defaultValue={contact.email} aria-describedby="checkout-guidance" placeholder="ban@example.com" type="email" autoComplete="email" maxLength={254} required /></span></label>
            <label className="billing-label">Số điện thoại <span className="course-guide-field" data-guidance={step === 'phone'}><Input name="phone" defaultValue={contact.phone} aria-describedby="checkout-guidance" placeholder="Nhập số điện thoại" type="tel" autoComplete="tel" pattern="[+0-9 ()-]{8,25}" required /></span></label>
          </fieldset><p className="student-contact-caption">Tất cả thông tin trên đều bắt buộc. Vui lòng dùng thông tin của học viên được ghi nhận học phí.</p>
        </Card>
        <p className="student-checkout-footnote"><Info aria-hidden="true" />Thanh toán xác nhận đã thu học phí, không tự động ghi danh hoặc xếp lớp.</p>
      </div>
      <Card className="student-checkout-summary student-receipt"><h3>Tóm tắt thanh toán</h3><p>Kiểm tra lần cuối trước khi chuyển đến VNPAY.</p>
        <dl className="student-receipt-breakdown"><div><dt>Số khoản đã chọn</dt><dd>{cart.length} khoản</dd></div><div><dt>Học phí{invalidCount > 0 ? ' khả dụng' : ''}</dt><dd>{money(total)}</dd></div><div><dt>Đơn vị tiền tệ</dt><dd>VND</dd></div></dl>
        <div className="student-total"><span>Tổng thanh toán</span><strong>{money(total)}</strong><span>Giá được kiểm tra lại khi tạo đơn.</span></div>
        {!placementReady && <p className="student-payment-unavailable"><Info aria-hidden="true" /><span>Chưa đủ thông tin đầu vào. <Link data-guidance={step === 'placement'} href="/courses#placement-declaration" className="inline-block rounded-lg underline underline-offset-4">Quay lại khóa học để xác nhận đã làm bài và nhập nhận xét</Link> để tiếp tục.</span></p>}
        {invalidCount > 0 && <p role="alert" className="student-payment-unavailable"><Info aria-hidden="true" />Có {invalidCount} khoản không còn khả dụng. Xóa các khoản này để tiếp tục.</p>}
        {!paymentAvailable && <p id="student-payment-help" className="student-payment-unavailable"><Info aria-hidden="true" /><span><strong>Chưa mở thanh toán trực tuyến</strong>Liên hệ trung tâm để được hướng dẫn. Các khoản đã chọn vẫn được lưu trên trình duyệt này.</span></p>}
        <Button type="submit" size="lg" className="student-pay-button" data-guidance={step === 'pay'} aria-describedby={!paymentAvailable ? 'student-payment-help checkout-guidance' : 'checkout-guidance'} disabled={step !== 'pay'}>{busy ? <LoaderCircle aria-hidden="true" className="mr-2 h-4 w-4 animate-spin motion-reduce:animate-none" /> : <CreditCard aria-hidden="true" className="mr-2 h-4 w-4" />}{busy ? 'Đang xử lý…' : 'Thanh toán qua VNPAY'}{!busy && <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />}</Button>
        <p className="student-security-note"><ShieldCheck aria-hidden="true" />Website không lưu thông tin thẻ. Bạn sẽ nhập thông tin thanh toán tại VNPAY.</p>
        <div className="student-receipt-support"><span>Có thắc mắc về khoản thu?</span><Link data-guidance={step === 'unavailable'} className="rounded-lg" href="/contact">Liên hệ trung tâm <ArrowRight aria-hidden="true" /></Link></div>
      </Card>
    </div>
  </form>;
}