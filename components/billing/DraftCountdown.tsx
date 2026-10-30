'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Clock3 } from 'lucide-react';
import { draftCountdown } from '@/lib/billing/draft';
import { usePlacementSession } from './PlacementSession';

export function DraftCountdown({ onNavigate }: { onNavigate?: () => void }) {
  const { draftReviewAt } = usePlacementSession();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    if (draftReviewAt === null) return;
    const update = () => setNow(Date.now());
    update();
    const timer = setInterval(update, 1000);
    window.addEventListener('focus', update);
    document.addEventListener('visibilitychange', update);
    return () => {
      clearInterval(timer);
      window.removeEventListener('focus', update);
      document.removeEventListener('visibilitychange', update);
    };
  }, [draftReviewAt]);

  if (draftReviewAt === null || now === null) return null;
  const expired = now >= draftReviewAt;
  const urgent = !expired && draftReviewAt - now <= 5 * 60 * 1000;
  const Icon = Clock3;
  const label = expired ? 'Đang xóa…' : 'Tự xóa sau';
  const hint = 'Bản nháp tự xóa sau 30 phút không chỉnh sửa: giỏ hàng, thông tin liên hệ và thông tin đầu vào. Đơn thanh toán đã tạo không bị ảnh hưởng.';

  return <Link href="/cart" className="nav-draft-countdown" data-expired={expired} data-urgent={urgent} onClick={onNavigate} title={hint}>
    <Icon className="nav-draft-icon" aria-hidden="true" />
    <span className="nav-draft-label" aria-hidden="true">{label}</span>
    <span className="sr-only">Bản nháp — {label} </span>
    <span role="timer" aria-live="off" aria-label="Thời gian còn lại trước khi tự xóa bản nháp" className="nav-draft-time">{expired ? '00:00' : draftCountdown(draftReviewAt, now)}</span>
    <span className="sr-only" role="status" aria-atomic="true">{expired ? 'Đang xóa bản nháp hết hạn.' : ''}</span>
  </Link>;
}