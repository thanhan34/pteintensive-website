'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

export function SandboxResetControl({ disabled, onReset }: { disabled: boolean; onReset: () => Promise<void> }) {
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const pending = useRef(false);

  async function reset() {
    if (disabled || pending.current) return;
    pending.current = true; setBusy(true); setError('');
    try { await onReset(); setConfirming(false); }
    catch (err) { setError(err instanceof Error ? err.message : 'Không thể reset đơn test. Vui lòng thử lại.'); }
    finally { pending.current = false; setBusy(false); }
  }

  return <div className="space-y-3">
    {confirming ? <>
      <p className="billing-message">Chỉ dùng cho thử nghiệm sandbox. Đơn này sẽ chuyển sang thất bại và mở khóa để tạo đơn test mới, không cần đối soát thủ công. Không hủy hoặc hoàn tiền ở VNPay. Hãy đóng trang thanh toán cũ và không dùng lại đường dẫn cũ sau khi reset.</p>
      <div className="flex flex-wrap gap-3">
        <Button type="button" size="lg" variant="outline" disabled={disabled || busy} aria-busy={busy} onClick={reset}>{busy ? 'Đang reset…' : 'Xác nhận reset đơn test'}</Button>
        <Button type="button" size="lg" variant="outline" disabled={disabled || busy} onClick={() => { setConfirming(false); setError(''); }}>Hủy</Button>
      </div>
    </> : <Button type="button" size="lg" variant="outline" disabled={disabled} onClick={() => setConfirming(true)}>Hủy/reset đơn test</Button>}
    {error && <p className="billing-message" role="alert">{error}</p>}
  </div>;
}