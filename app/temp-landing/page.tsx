import type { Metadata } from 'next';
import CinematicExperience from '@/components/cinematic/CinematicExperience';

export const metadata: Metadata = {
  title: 'PTE Intensive — Chinh phục PTE, mở cửa tương lai',
  description:
    'Luyện thi PTE Academic với lộ trình cá nhân hóa, sửa lỗi sát và theo dõi tiến độ theo mục tiêu điểm số.',
  openGraph: {
    title: 'PTE Intensive — Học đúng hơn, đến target rõ hơn',
    description:
      'Khám phá lộ trình PTE được xây dựng theo điểm đầu vào, kỹ năng và target của bạn.',
    images: [
      {
        url: '/media/master/an-doan-master.webp',
        width: 1280,
        height: 720,
        alt: 'PTE Intensive cinematic founder frame',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  robots: { index: false, follow: false },
};

export default function TempLandingPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'PTE Intensive',
    founder: { '@type': 'Person', name: 'An Doan' },
    inLanguage: 'vi-VN',
    description:
      'PTE Intensive xây dựng lộ trình luyện thi PTE Academic theo điểm đầu vào, kỹ năng và target của học viên.',
    url: 'https://www.pteintensive.com/temp-landing',
    logo: 'https://www.pteintensive.com/images/logo/white-logo.png',
    image: 'https://www.pteintensive.com/media/master/an-doan-master.webp',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <CinematicExperience />
    </>
  );
}