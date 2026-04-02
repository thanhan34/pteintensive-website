import type { Metadata } from 'next';
import RegisterPageClient from './RegisterPageClient';

export const metadata: Metadata = {
  title: 'Đăng Ký Tư Vấn Khóa Học PTE | PTE Intensive',
  description: 'Đăng ký tư vấn miễn phí để nhận lộ trình học PTE phù hợp với mục tiêu điểm số, visa hoặc du học của bạn.',
  alternates: {
    canonical: 'https://pteintensive.com/register',
  },
  openGraph: {
    title: 'Đăng Ký Tư Vấn Khóa Học PTE | PTE Intensive',
    description: 'Nhận tư vấn khóa học PTE phù hợp, lộ trình cá nhân hóa và hỗ trợ đăng ký nhanh chóng.',
    url: 'https://pteintensive.com/register',
    type: 'website',
  },
};

export default function RegisterPage() {
  return <RegisterPageClient />;
}
