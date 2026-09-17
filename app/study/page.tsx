import type { Metadata } from 'next';
import StudyPageClient from './StudyPageClient';

export const metadata: Metadata = {
  title: 'Lộ Trình Học PTE Cá Nhân Hóa',
  description: 'Khám phá lộ trình học PTE cá nhân hóa từ đánh giá đầu vào, xây nền, luyện kỹ năng đến mock test và chinh phục điểm số mục tiêu.',
  alternates: {
    canonical: 'https://www.pteintensive.com/study',
  },
  openGraph: {
    title: 'Lộ Trình Học PTE Cá Nhân Hóa | PTE Intensive',
    description: 'Đi đúng lộ trình, tập trung đúng kỹ năng và chinh phục điểm PTE mục tiêu cùng PTE Intensive.',
    url: 'https://www.pteintensive.com/study',
    type: 'website',
  },
};

export default function StudyPage() {
  return <StudyPageClient />;
}
