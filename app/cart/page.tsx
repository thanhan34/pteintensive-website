import type { Metadata } from 'next';
import StudentBilling from '@/components/billing/StudentBilling';

export const metadata: Metadata = { title: 'Giỏ hàng & Học phí', robots: { index: false, follow: false } };
export default function CartPage() { return <StudentBilling />; }