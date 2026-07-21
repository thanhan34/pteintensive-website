import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Khóa Học PTE Academic | PTE Intensive',
  description: 'Khám phá các khóa học PTE Academic chất lượng cao tại PTE Intensive. Từ khóa cơ bản đến nâng cao, cam kết đầu ra và phương pháp học hiệu quả.',
  openGraph: {
    title: 'Khóa Học PTE Academic | PTE Intensive',
    description: 'Khám phá các khóa học PTE Academic chất lượng cao tại PTE Intensive. Từ khóa cơ bản đến nâng cao, cam kết đầu ra và phương pháp học hiệu quả.',
    type: 'website'
  }
};

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
