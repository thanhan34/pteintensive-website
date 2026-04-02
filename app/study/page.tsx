import type { Metadata } from 'next';
import StudyPageClient from './StudyPageClient';

export const metadata: Metadata = {
  title: 'Du Học và Định Cư | PTE Intensive',
  description: 'Khám phá thông tin du học, định cư và lộ trình sử dụng chứng chỉ PTE cho mục tiêu học tập, việc làm và visa.',
  alternates: {
    canonical: 'https://pteintensive.com/study',
  },
  openGraph: {
    title: 'Du Học và Định Cư | PTE Intensive',
    description: 'Tìm hiểu cơ hội du học và định cư cùng lộ trình tiếng Anh phù hợp với mục tiêu của bạn.',
    url: 'https://pteintensive.com/study',
    type: 'website',
  },
};

export default function StudyPage() {
  return <StudyPageClient />;
}
