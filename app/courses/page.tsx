import type { Metadata } from 'next';
import { getCanonicalUrl } from '@/lib/site';
import CoursesClient from './CoursesClient';

export const metadata: Metadata = {
  alternates: { canonical: getCanonicalUrl('/courses') },
  openGraph: { url: getCanonicalUrl('/courses') },
};

export default function CoursesPage() {
  return <CoursesClient />;
}
