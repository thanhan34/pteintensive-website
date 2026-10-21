'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { placementTestUrl } from '@/lib/billing/placement';
export function CoursePurchase() {
  return <div className="space-y-3"><Button asChild size="lg" variant="outline" className="bg-white text-gray-900"><Link href="/courses#placement-declaration">Đăng ký khóa & thanh toán học phí</Link></Button><p className="text-sm">Bắt buộc kiểm tra đầu vào và có nhận xét học thuật trước khi thêm khóa vào giỏ. <Link href={placementTestUrl} className="underline underline-offset-4">Làm bài kiểm tra đầu vào</Link></p></div>;
}