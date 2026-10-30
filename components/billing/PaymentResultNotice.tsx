'use client';

import Link from 'next/link';
import { Check, Clock3, Info } from 'lucide-react';
import { money, type BillingOrder } from '@/lib/billing/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { paymentState } from '@/lib/billing/payment-state';

export function PaymentResultNotice({ order, orderId, busy, refresh }: { order?: BillingOrder; orderId: string; busy: boolean; refresh: () => Promise<void> }) {
  const paid = order?.status === 'paid';
  const [checking, setChecking] = useState(false);
  const [message, setMessage] = useState('');
  const checkGateway = async () => {
    setChecking(true); setMessage('');
    try {
      const response = await fetch('/api/billing/check', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ orderId }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Chưa kiểm tra được kết quả.');
      setMessage(result.message || 'Đã kiểm tra với VNPAY. Xem trạng thái đơn đã cập nhật bên dưới.');
      await refresh();
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Không kết nối được. Không thanh toán lại nếu đã bị trừ tiền.'); }
    finally { setChecking(false); }
  };
  const failed = order?.status === 'failed';
  const Icon = paid ? Check : failed ? Info : Clock3;
  return <Card className="mb-6">
    <div role="status" aria-live="polite" aria-atomic="true" className="space-y-4">
      <div className="student-section-heading"><div>
        <h2>{paid ? 'Thanh toán thành công' : failed ? 'Thanh toán không thành công' : order ? 'Đang chờ xác nhận thanh toán' : 'Chưa tìm thấy đơn trong tài khoản này'}</h2>
        <p>{paid ? 'Máy chủ đã xác nhận kết quả giao dịch cho đơn này. Liên hệ trung tâm kèm mã đơn để kiểm tra khoản học phí và nhận hướng dẫn tiếp theo.' : failed ? 'Máy chủ ghi nhận đơn không thành công. Nếu đã bị trừ tiền, hãy liên hệ trung tâm trước khi thanh toán lại.' : order ? 'Hệ thống tự động tra cứu VNPAY trong tối đa 10 phút khi bạn mở trang này. Kết quả sẽ tự cập nhật khi máy chủ xác nhận, không cần bấm tra cứu. Không thanh toán lại nếu đã bị trừ tiền; hết hạn liên kết không có nghĩa giao dịch thất bại.' : 'Hãy đăng nhập đúng tài khoản đã tạo đơn. Mã đơn không tự cấp quyền xem giao dịch; liên hệ trung tâm nếu cần khôi phục đơn cũ.'}</p>
      </div><Icon aria-hidden="true" /></div>
      <p className="break-all text-sm">Mã đơn: <strong>{orderId}</strong></p>
      {order && <p>Số tiền: <strong className="tabular-nums">{money(order.total)}</strong></p>}
      {order?.transactionNo && <p className="break-all text-sm">Mã giao dịch: {order.transactionNo}</p>}
      {order && !paid && <p className="billing-message">{paymentState(order, Date.now()).title}: {paymentState(order, Date.now()).detail}</p>}
      {paid && <div className="space-y-3 text-sm text-gray-600"><p>Kết quả giao dịch không tự động ghi danh hoặc xếp lớp.</p><ol className="list-decimal space-y-2 pl-5"><li>Giữ mã đơn và kiểm tra thông tin khoản học phí.</li><li>Liên hệ trung tâm, gửi mã đơn để được hướng dẫn lịch học và xếp lớp.</li><li>Bạn có thể xem lại giao dịch trong Lịch sử đơn khi đăng nhập trên thiết bị khác.</li></ol><Button asChild variant="outline"><Link href="/contact">Nhận hướng dẫn vào lớp</Link></Button></div>}
      {message && !paid && !failed && <p role="status" className="billing-message">{message}</p>}
    </div>
    {!paid && <div className="mt-4 flex flex-wrap gap-3"><Button type="button" size="lg" variant="outline" disabled={busy} onClick={() => void refresh()}>Kiểm tra lại kết quả</Button><Button asChild size="lg" variant="outline"><Link href="/contact">Liên hệ trung tâm</Link></Button></div>}
    {order?.status === 'pending' && <div className="mt-3"><Button disabled={checking || busy} variant="outline" onClick={() => void checkGateway()}>{checking ? 'Đang tra cứu…' : 'Tra cứu với VNPAY'}</Button></div>}
  </Card>;
}