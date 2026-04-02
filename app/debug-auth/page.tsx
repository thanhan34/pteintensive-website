import type { Metadata } from 'next';
import DebugAuthPageClient from './DebugAuthPageClient';

export const metadata: Metadata = {
  title: 'Debug Auth | PTE Intensive',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DebugAuthPage() {
  return <DebugAuthPageClient />;
}
