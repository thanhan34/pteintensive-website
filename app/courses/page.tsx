import type { Metadata } from 'next';
import { getCanonicalUrl } from '@/lib/site';
import CoursesClient from './CoursesClient';

export const metadata: Metadata = {
  title: 'Khóa học PTE Academic & Học phí',
  description: 'Khám phá khóa học PTE Academic, hoàn thành kiểm tra đầu vào, nhập nhận xét học thuật và đăng ký khóa phù hợp tại PTE Intensive.',
  referrer: 'no-referrer',
  alternates: { canonical: getCanonicalUrl('/courses') },
  openGraph: { url: getCanonicalUrl('/courses') },
};

export default function CoursesPage() {
  return <CoursesClient />;
}
