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

export const metadata: Metadata = {
  title: 'PTE Intensive - Trung Tâm Luyện Thi PTE Academic Hàng Đầu',
  description: 'Khóa học PTE Academic chất lượng cao với cam kết đầu ra, giảng viên chuyên nghiệp, và phương pháp học hiệu quả. Đạt điểm PTE mục tiêu nhanh chóng.',
  alternates: {
    canonical: 'https://pteintensive.com'
  }
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'PTE Intensive',
  description: 'Trung tâm luyện thi PTE Academic hàng đầu tại Việt Nam',
  url: 'https://pteintensive.com',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'VN',
    addressLocality: 'Ho Chi Minh City'
  },
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
      <BenefitsSection />

      {/* Score Comparison Table */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <ScoreComparisonTable />
        </div>
      </section>

      {/* Guarantee Section */}
      <GuaranteeSection />

      {/* Course Section */}
      <CourseSection />

      {/* Course Schedule */}
      <CourseSchedule />

      {/* Review Section */}
      <ReviewSection />

      {/* Teacher Section */}
      <TeacherSection />

      {/* Common Questions */}
      <CommonQuestions />

      {/* Call to Action */}
      <ReviewCallToAction />
    </main>
  );
}
