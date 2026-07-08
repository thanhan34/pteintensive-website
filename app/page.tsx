import type { Metadata } from 'next';
import Script from 'next/script';
import HeroSection from './components/HeroSection';
import BenefitsSection from './components/BenefitsSection';
import CourseSection from './components/CourseSection';
import CourseSchedule from './components/CourseSchedule';
import ReviewSection from './components/ReviewSection';
import TeacherSection from './components/TeacherSection';
import ReviewCallToAction from './components/ReviewCallToAction';
import CommonQuestions from './components/CommonQuestions';
import ScoreComparisonTable from './components/ScoreComparisonTable';
import GuaranteeSection from './components/GuaranteeSection';
import ScrollReveal from './components/ScrollReveal';

export const metadata: Metadata = {
  title: 'PTE Intensive - Trung Tâm Luyện Thi PTE Academic Hàng Đầu',
  description: 'Khóa học PTE Academic chất lượng cao với cam kết đầu ra, giảng viên chuyên nghiệp, và phương pháp học hiệu quả. Đạt điểm PTE mục tiêu nhanh chóng.',
  alternates: {
    canonical: 'https://www.pteintensive.com'
  }
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'PTE Intensive',
  description: 'Trung tâm luyện thi PTE Academic hàng đầu tại Việt Nam',
  url: 'https://www.pteintensive.com',
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: '48 Derwent Place',
      addressLocality: 'Riverhills',
      addressRegion: 'QLD',
      postalCode: '4074',
      addressCountry: 'AU'
    },
    {
      '@type': 'PostalAddress',
      streetAddress: '2C6 Nguyễn Khuyến',
      addressLocality: 'Phường Bình Đức',
      addressRegion: 'An Giang',
      addressCountry: 'VN'
    },
    {
      '@type': 'PostalAddress',
      streetAddress: 'Số 12 đường 25 KDC Thới Nhựt 1',
      addressLocality: 'Tân An, Cần Thơ',
      addressCountry: 'VN'
    },
    {
      '@type': 'PostalAddress',
      streetAddress: 'T4 0605A Tầng 6 Khu A, Chung cư Golden',
      addressLocality: 'Long Xuyên',
      addressRegion: 'An Giang',
      addressCountry: 'VN'
    }
  ],
  sameAs: [
    'https://facebook.com/pteintensive',
    'https://youtube.com/pteintensive'
  ],
  offers: {
    '@type': 'Offer',
    category: 'PTE Academic Preparation Courses'
  }
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Hero Section */}
      <HeroSection />

      {/* Benefits Section */}
      <ScrollReveal direction="up">
        <BenefitsSection />
      </ScrollReveal>

      {/* Score Comparison Table */}
      <ScrollReveal direction="scale">
        <section className="py-16 bg-white">
          <div className="container mx-auto">
            <ScoreComparisonTable />
          </div>
        </section>
      </ScrollReveal>

      {/* Guarantee Section */}
      <ScrollReveal direction="right">
        <GuaranteeSection />
      </ScrollReveal>

      {/* Course Section */}
      <ScrollReveal direction="up">
        <CourseSection />
      </ScrollReveal>

      {/* Course Schedule */}
      <ScrollReveal direction="left">
        <CourseSchedule />
      </ScrollReveal>

      {/* Review Section */}
      <ScrollReveal direction="up">
        <ReviewSection />
      </ScrollReveal>

      {/* Teacher Section */}
      <ScrollReveal direction="scale">
        <TeacherSection />
      </ScrollReveal>

      {/* Common Questions */}
      <ScrollReveal direction="up">
        <CommonQuestions />
      </ScrollReveal>

      {/* Call to Action */}
      <ScrollReveal direction="fade" duration={1.2}>
        <ReviewCallToAction />
      </ScrollReveal>
    </main>
  );
}
