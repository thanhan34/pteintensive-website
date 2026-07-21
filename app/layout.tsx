import type { Metadata } from 'next';
import { Be_Vietnam_Pro, Noto_Serif } from 'next/font/google';
import './globals.css';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Providers from './providers';
import { Suspense } from 'react';
import MessengerChatWrapper from './components/MessengerChatWrapper';
import Script from 'next/script';
import { SITE_URL } from '@/lib/site';

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-be-vietnam-pro',
});

const notoSerif = Noto_Serif({
  subsets: ['latin', 'vietnamese'],
  weight: ['500', '600', '700'],
  variable: '--font-noto-serif',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
    url: SITE_URL,
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteUrl = SITE_URL;
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PTE Intensive',
    url: siteUrl,
    logo: `${siteUrl}/images/logo/pte-intensive-logo.png`,
    sameAs: ['https://facebook.com/pteintensive', 'https://youtube.com/pteintensive'],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'PTE Intensive',
    url: siteUrl,
    inLanguage: 'vi-VN',
  };

  return (
    <html lang="vi">
      <head />
      <body className={`${beVietnamPro.className} ${beVietnamPro.variable} ${notoSerif.variable}`}>
        <Script id="organization-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <Script id="website-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
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
