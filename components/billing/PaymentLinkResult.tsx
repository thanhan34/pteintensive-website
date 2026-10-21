'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function PaymentLinkResult({ link }: { link: string }) {
  const [feedback, setFeedback] = useState('');
  return <div className="w-full min-w-0 space-y-3" role="region" aria-label="Liên kết thanh toán vừa tạo">
    <label className="billing-label">Liên kết thanh toán bí mật
      <Input readOnly value={link} onFocus={(event) => event.target.select()} />
    </label>
    <div className="flex flex-wrap gap-3">
      <Button type="button" size="lg" variant="outline" onClick={async () => {
        try { await navigator.clipboard.writeText(link); setFeedback('Đã sao chép liên kết.'); }
        catch { setFeedback('Không thể sao chép tự động. Bấm vào ô liên kết để chọn toàn bộ, sau đó sao chép thủ công.'); }
      }}>Sao chép liên kết</Button>
      <Button asChild size="lg" variant="outline"><a href={link} target="_blank" rel="noopener noreferrer">Mở trang thanh toán</a></Button>
    </div>
    <p className="text-sm text-gray-600">Gửi riêng cho đúng học viên. Tạo lại liên kết sẽ vô hiệu mã cũ.</p>
    {feedback && <p className="text-sm" role="status">{feedback}</p>}
  </div>;
}