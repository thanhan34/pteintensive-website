'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

export function OrderArchiveControl({ disabled, onArchive }: { disabled: boolean; onArchive: () => Promise<void> }) {
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const pending = useRef(false);

  async function archive() {
    if (disabled || pending.current) return;
    pending.current = true; setBusy(true); setError('');
    try { await onArchive(); setConfirming(false); }
    catch (err) { setError(err instanceof Error ? err.message : 'Không thể lưu trữ. Vui lòng thử lại.'); }
    finally { pending.current = false; setBusy(false); }
  }

  return <div className="space-y-3">
    {confirming ? <>
      <p className="text-sm text-gray-600">Ẩn đơn này khỏi danh sách đang xử lý? Dữ liệu giao dịch vẫn được giữ để tra cứu. Thao tác này không thay đổi học phí hoặc khóa thanh toán.</p>
      <div className="flex flex-wrap gap-3">
        <Button type="button" size="lg" variant="outline" disabled={disabled || busy} aria-busy={busy} onClick={archive}>{busy ? 'Đang lưu trữ…' : 'Xác nhận lưu trữ'}</Button>
        <Button type="button" size="lg" variant="outline" disabled={disabled || busy} onClick={() => { setConfirming(false); setError(''); }}>Hủy</Button>
      </div>
    </> : <Button type="button" size="lg" variant="outline" disabled={disabled} onClick={() => setConfirming(true)}>Lưu trữ đơn thất bại</Button>}
    {error && <p className="billing-message" role="alert">{error}</p>}
  </div>;
}