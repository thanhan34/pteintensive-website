import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'Về Chúng Tôi | PTE Intensive',
  description: 'Tìm hiểu về PTE Intensive, đội ngũ giảng viên, phương pháp đào tạo và sứ mệnh giúp học viên chinh phục mục tiêu PTE hiệu quả.',
  alternates: {
    canonical: 'https://pteintensive.com/about',
  },
  openGraph: {
    title: 'Về Chúng Tôi | PTE Intensive',
    description: 'Khám phá hành trình phát triển, đội ngũ giảng viên và phương pháp đào tạo tại PTE Intensive.',
    url: 'https://pteintensive.com/about',
    type: 'website',
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
