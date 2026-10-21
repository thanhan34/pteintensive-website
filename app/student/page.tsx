import type { Metadata } from 'next';
import LegacyStudentRedirect from '@/components/billing/LegacyStudentRedirect';
export const metadata: Metadata = { title: 'Thanh toán học phí', referrer: 'no-referrer', robots: { index: false, follow: false } };
export default function StudentPage() { return <LegacyStudentRedirect />; }