import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Providers from './providers';
import { Suspense } from 'react';
import MessengerChatWrapper from './components/MessengerChatWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://pteintensive.com'),
  title: {
    default: 'PTE Intensive - Luyện Thi PTE Academic',
    template: '%s | PTE Intensive'
  },
  description: 'Trung tâm luyện thi PTE Academic hàng đầu tại Việt Nam với đội ngũ giảng viên chuyên nghiệp, khóa học chất lượng và cam kết đầu ra',
  keywords: ['PTE Academic', 'luyện thi PTE', 'học PTE', 'PTE Việt Nam', 'trung tâm PTE', 'khóa học PTE'],
  authors: [{ name: 'PTE Intensive' }],
  creator: 'PTE Intensive',
  publisher: 'PTE Intensive',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://pteintensive.com',
    siteName: 'PTE Intensive',
    title: 'PTE Intensive - Luyện Thi PTE Academic',
    description: 'Trung tâm luyện thi PTE Academic hàng đầu tại Việt Nam với đội ngũ giảng viên chuyên nghiệp, khóa học chất lượng và cam kết đầu ra',
    images: [
      {
        url: '/images/logo/pte-intensive-logo.png',
        width: 1200,
        height: 630,
        alt: 'PTE Intensive Logo',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PTE Intensive - Luyện Thi PTE Academic',
    description: 'Trung tâm luyện thi PTE Academic hàng đầu tại Việt Nam với đội ngũ giảng viên chuyên nghiệp, khóa học chất lượng và cam kết đầu ra',
    images: ['/images/logo/pte-intensive-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head />
      <body className={inter.className}>
        <Providers>
          <Navigation />
          {children}
          <Footer />
          <Suspense>
            <MessengerChatWrapper />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
