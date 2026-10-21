'use client';

import { useRef, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { money } from '@/lib/billing/types';

export function FeeDeleteControl({ title, amount, disabled, onDelete }: {
  title: string; amount: number; disabled: boolean; onDelete: () => Promise<void>;
}) {
  const [confirming, setConfirming] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const deleting = useRef(false);
  const remove = async () => {
    if (disabled || deleting.current) return;
    deleting.current = true; setPending(true); setError('');
    try { await onDelete(); setConfirming(false); }
    catch (err) { setError(err instanceof Error ? err.message : 'Không thể xóa khoản thu. Vui lòng thử lại.'); }
    finally { deleting.current = false; setPending(false); }
  };
  return <div className="min-w-0 max-w-full">
    {!confirming ? <Button type="button" size="lg" variant="outline" disabled={disabled} onClick={() => { setError(''); setConfirming(true); }}><Trash2 className="mr-2 h-4 w-4" aria-hidden="true" />Xóa khoản thu</Button> : <div className="space-y-3 rounded-xl border border-orange-200 bg-orange-50 p-4" role="group" aria-label="Xác nhận xóa khoản thu">
      <p className="break-words text-sm text-gray-900">Xóa <strong>{title}</strong> — {money(amount)}? Liên kết đã gửi sẽ không còn dùng được. Không thể hoàn tác.</p>
      <div className="flex flex-wrap gap-3"><Button type="button" size="lg" disabled={disabled || pending} aria-busy={pending} onClick={remove}>{pending ? 'Đang xóa…' : 'Xác nhận xóa'}</Button><Button type="button" variant="outline" size="lg" disabled={pending} onClick={() => setConfirming(false)}>Giữ lại</Button></div>
    </div>}
    {error && <p className="mt-3 text-sm text-gray-900" role="alert">{error}</p>}
  </div>;
}