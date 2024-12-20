import type { Metadata } from 'next';
import Script from 'next/script';
import Image from 'next/image';
import ContactFormClient from '../components/ContactFormClient';
import ContactInfo from '../components/ContactInfo';
import CommunityLinks from '../components/CommunityLinks';
import Map from '../components/Map';

export const metadata: Metadata = {
  title: 'Liên Hệ | PTE Intensive',
  description: 'Liên hệ với PTE Intensive để được tư vấn về khóa học PTE Academic. Đội ngũ tư vấn chuyên nghiệp luôn sẵn sàng hỗ trợ bạn.',
  alternates: {
    canonical: 'https://pteintensive.com/contact'
  },
  openGraph: {
    title: 'Liên Hệ | PTE Intensive',
    description: 'Liên hệ với PTE Intensive để được tư vấn về khóa học PTE Academic. Đội ngũ tư vấn chuyên nghiệp luôn sẵn sàng hỗ trợ bạn.',
    type: 'website',
    url: 'https://pteintensive.com/contact',
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
  url: 'https://pteintensive.com/contact',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+84-349-213-852',
    contactType: 'customer service',
    areaServed: ['VN', 'AU'],
    availableLanguage: ['Vietnamese', 'English']
  },
  location: {
    '@type': 'Place',
    name: 'PTE Intensive',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '48 Derwent PlacePlace',
      addressLocality: 'Riverhills',
      addressRegion: 'TP.HCM',
      addressCountry: 'VN'
    }
  }
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Script
        id="contact-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'url("/images/pattern.png")',
              backgroundSize: '200px 200px'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 text-center pt-24">
          <div className="relative w-40 h-32 mx-auto mb-8">
            <Image
              src="/images/logo/orange-logo.png"
              alt="PTE Intensive Logo"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain"
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">
            Liên Hệ Với Chúng Tôi
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
            Chúng tôi luôn sẵn sàng hỗ trợ và giải đáp mọi thắc mắc của bạn
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white relative -mt-8">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-50">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #f0f0f0 1px, transparent 0)',
            backgroundSize: '20px 20px'
          }}/>
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left Column */}
            <div className="space-y-6">
              <ContactInfo />
              <CommunityLinks />
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:col-span-1 lg:sticky lg:top-8">
              <ContactFormClient />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative mt-12">
        <Map />
      </section>
    </div>
  );
}
