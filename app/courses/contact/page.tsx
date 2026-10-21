import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Clock3, Mail, MapPin, Phone } from 'lucide-react';
import ContactFormClient from '../../components/ContactFormClient';
import ContactInfo from '../../components/ContactInfo';
import CommunityLinks from '../../components/CommunityLinks';
import Map from '../../components/Map';

export const metadata: Metadata = {
  title: 'Liên Hệ | PTE Intensive',
  description: 'Liên hệ với PTE Intensive để được tư vấn về khóa học PTE Academic. Đội ngũ tư vấn chuyên nghiệp luôn sẵn sàng hỗ trợ bạn.',
  alternates: {
    canonical: 'https://www.pteintensive.com/contact'
  },
  openGraph: {
    title: 'Liên Hệ | PTE Intensive',
    description: 'Liên hệ với PTE Intensive để được tư vấn về khóa học PTE Academic. Đội ngũ tư vấn chuyên nghiệp luôn sẵn sàng hỗ trợ bạn.',
    type: 'website',
    url: 'https://www.pteintensive.com/contact',
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
    title: 'Liên Hệ | PTE Intensive',
    description: 'Liên hệ với PTE Intensive để được tư vấn về khóa học PTE Academic. Đội ngũ tư vấn chuyên nghiệp luôn sẵn sàng hỗ trợ bạn.',
    images: ['/images/logo/pte-intensive-logo.png'],
  }
};

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Liên Hệ PTE Intensive',
  description: 'Liên hệ với PTE Intensive để được tư vấn về khóa học PTE Academic',
  url: 'https://www.pteintensive.com/contact',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+84-349-213-852',
    contactType: 'customer service',
    areaServed: ['VN', 'AU'],
    availableLanguage: ['Vietnamese', 'English']
  },
  location: [
    {
      '@type': 'Place',
      name: 'PTE Intensive - Cơ sở 1',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '48 Derwent Place',
        addressLocality: 'Riverhills',
        addressRegion: 'QLD',
        postalCode: '4074',
        addressCountry: 'AU'
      }
    },
    {
      '@type': 'Place',
      name: 'PTE Intensive - TRỤ SỞ',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '2C6 Nguyễn Khuyến',
        addressLocality: 'Phường Bình Đức',
        addressRegion: 'An Giang',
        addressCountry: 'VN'
      }
    },
    {
      '@type': 'Place',
      name: 'PTE Intensive - Cơ sở 3',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Số 12 đường 25 KDC Thới Nhựt 1',
        addressLocality: 'Tân An, Cần Thơ',
        addressCountry: 'VN'
      }
    },
    {
      '@type': 'Place',
      name: 'PTE Intensive - Cơ sở 4',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'T4 0605A Tầng 6 Khu A, Chung cư Golden',
        addressLocality: 'Long Xuyên',
        addressRegion: 'An Giang',
        addressCountry: 'VN'
      }
    }
  ]
};

const supportHighlights = [
  'Tư vấn lộ trình theo điểm mục tiêu',
  'Giải đáp về lịch học và học phí',
  'Hỗ trợ học viên tại Việt Nam & Australia',
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#fffaf7] pt-36">
      <Script
        id="contact-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <section className="relative isolate overflow-hidden border-b border-orange-100 bg-gradient-to-br from-white via-[#fff8f2] to-[#fedac2]/55 text-gray-900">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-[#fc5d01]/15 blur-[100px]" />
          <div className="absolute -right-16 bottom-0 h-96 w-96 rounded-full bg-[#fd7f33]/20 blur-[120px]" />
          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, #fc5d01 1px, transparent 0)',
              backgroundSize: '28px 28px',
            }}
          />
        </div>

        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-8 lg:py-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-sm font-semibold text-[#d94f00] shadow-sm backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-[#fc5d01] shadow-[0_0_12px_rgba(252,93,1,0.9)]" />
              Đội ngũ tư vấn luôn sẵn sàng
            </div>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
              Cùng bạn bắt đầu hành trình{' '}
              <span className="text-[#fc5d01]">chinh phục PTE</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
              Chia sẻ mục tiêu của bạn, PTE Intensive sẽ tư vấn lộ trình học phù hợp và giải đáp mọi thắc mắc trong thời gian sớm nhất.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#contact-form"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#fc5d01] px-6 py-3 font-semibold text-white shadow-[0_14px_30px_rgba(252,93,1,0.28)] transition hover:-translate-y-0.5 hover:bg-[#e95500] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb180]"
              >
                Nhận tư vấn miễn phí
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href="tel:+84349213852"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-orange-200 bg-white px-6 py-3 font-semibold text-[#e45500] shadow-sm transition hover:-translate-y-0.5 hover:border-[#fc5d01] hover:bg-orange-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fc5d01]/30"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                0349 213 852
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-orange-100 bg-white/90 p-6 shadow-[0_24px_70px_rgba(252,93,1,0.14)] backdrop-blur-md sm:p-8">
              <div className="flex items-center justify-between border-b border-orange-100 pb-5">
                <div>
                  <p className="text-sm font-semibold text-[#fc5d01]">Bạn cần hỗ trợ?</p>
                  <p className="mt-1 text-xl font-bold">Chúng tôi có thể giúp bạn</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fc5d01] shadow-lg shadow-[#fc5d01]/25">
                  <Mail className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
              </div>
              <ul className="mt-6 space-y-4">
                {supportHighlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 text-sm leading-6 text-gray-700 sm:text-base">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#fc5d01]" aria-hidden="true" />
                    {highlight}
                  </li>
                ))}
              </ul>
              <div className="mt-7 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4">
                  <Clock3 className="mb-2 h-5 w-5 text-[#fc5d01]" aria-hidden="true" />
                  <p className="text-xs text-gray-500">Phản hồi dự kiến</p>
                  <p className="mt-1 font-semibold text-gray-900">Trong 24 giờ</p>
                </div>
                <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4">
                  <MapPin className="mb-2 h-5 w-5 text-[#fc5d01]" aria-hidden="true" />
                  <p className="text-xs text-gray-500">Hệ thống</p>
                  <p className="mt-1 font-semibold text-gray-900">4 cơ sở</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 sm:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(252,93,1,0.10) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:px-8">
          <div className="space-y-6">
            <ContactInfo />
            <CommunityLinks />
          </div>
          <div id="contact-form" className="scroll-mt-40 lg:sticky lg:top-40">
            <ContactFormClient />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#fc5d01]">Ghé thăm chúng tôi</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Trụ sở PTE Intensive</h2>
              <p className="mt-3 max-w-2xl leading-7 text-gray-600">
                Tìm chúng tôi tại 2C6 Nguyễn Khuyến, Phường Bình Đức, An Giang.
              </p>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=2C6%20Nguyễn%20Khuyến%2C%20Phường%20Bình%20Đức%2C%20An%20Giang"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 shadow-sm transition hover:border-[#fc5d01]/30 hover:text-[#fc5d01] md:self-auto"
            >
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Mở Google Maps
            </a>
          </div>
          <Map />
        </div>
      </section>
    </main>
  );
}
