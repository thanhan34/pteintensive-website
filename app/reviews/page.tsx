import type { Metadata } from 'next';
import ReviewsPageClient from './ReviewsPageClient';

export const metadata: Metadata = {
  title: 'Đánh Giá Học Viên | PTE Intensive',
  description: 'Xem review, phản hồi thực tế, kết quả học viên và các câu chuyện thành công từ học viên PTE Intensive.',
  alternates: {
    canonical: 'https://pteintensive.com/reviews',
  },
  openGraph: {
    title: 'Đánh Giá Học Viên | PTE Intensive',
    description: 'Khám phá kết quả và đánh giá chân thực từ học viên đã học tại PTE Intensive.',
    url: 'https://pteintensive.com/reviews',
    type: 'website',
  },
};

export default function ReviewsPage() {
  return <ReviewsPageClient />;
}
