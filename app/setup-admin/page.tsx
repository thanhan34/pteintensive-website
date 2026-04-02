import type { Metadata } from 'next';
import SetupAdminPageClient from './SetupAdminPageClient';

export const metadata: Metadata = {
  title: 'Setup Admin | PTE Intensive',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SetupAdminPage() {
  return <SetupAdminPageClient />;
}
