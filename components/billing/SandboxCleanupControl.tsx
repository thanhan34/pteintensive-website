'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

export function SandboxCleanupControl({ disabled, onCleanup }: { disabled: boolean; onCleanup: () => Promise<void> }) {
  const [confirming, setConfirming] = useState(false);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState('');
  const pending = useRef(false);
  async function cleanup() {
    if (disabled || pending.current) return;
    pending.current = true; setRunning(true); setError('');
    try { await onCleanup(); setConfirming(false); }
    catch (err) { setError(err instanceof Error ? err.message : 'Chưa dọn xong. Cập nhật danh sách và thử lại; các đơn đã xử lý vẫn được giữ.'); }
    finally { pending.current = false; setRunning(false); }
  }
  return <div className="mb-6 space-y-3">
    {confirming ? <>
      <p className="billing-message">Reset tất cả đơn sandbox đang chờ và ẩn lịch sử test, không chỉ các đơn đang lọc. Giữ bản ghi kiểm toán; không tác động đơn thật, không hoàn tiền hoặc hủy giao dịch tại VNPay. Đơn đã thanh toán chỉ được ẩn, không mở lại khoản thu đã trả. Đóng mọi trang thanh toán test cũ trước khi xác nhận; không dùng lại liên kết cũ.</p>
      <div className="flex flex-wrap gap-3">
        <Button type="button" size="lg" variant="outline" disabled={disabled || running} aria-busy={running} onClick={() => void cleanup()}>{running ? 'Đang dọn đơn sandbox…' : 'Xác nhận dọn tất cả đơn sandbox'}</Button>
        <Button type="button" size="lg" variant="ghost" disabled={disabled || running} onClick={() => setConfirming(false)}>Hủy</Button>
      </div>
    </> : <Button type="button" size="lg" variant="outline" disabled={disabled} onClick={() => setConfirming(true)}>Dọn tất cả đơn sandbox</Button>}
    {error && <p className="billing-message" role="alert">{error}</p>}
  </div>;
}