'use client';

import Script from 'next/script';
import Image from 'next/image';
import Link from 'next/link';
import heroImage from '@/public/images/courses/hero.webp';
import { ArrowRight } from 'lucide-react';
import { courseData } from '@/lib/courseData';
import StudentBilling from '@/components/billing/StudentBilling';
import { usePlacementSession } from '@/components/billing/PlacementSession';

// Convert courseData object to array with slugs
const courses = Object.entries(courseData).map(([slug, course]) => ({
  ...course,
  slug
}));

const courseListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: courses.map((course, index) => ({
    '@type': 'Course',
    '@id': `https://www.pteintensive.com/courses/${course.slug}`,
    position: index + 1,
    name: course.title,
    description: course.description,
    provider: {
      '@type': 'Organization',
      name: 'PTE Intensive',
      sameAs: 'https://www.pteintensive.com'
    },
    educationalLevel: 'PTE Academic Preparation',
    courseCode: course.slug
  }))
};


export default function CoursesClient() {
  const { guidanceStep, startGuidance } = usePlacementSession();
  return <main className="min-h-screen pt-24">
    <Script id="course-list-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseListSchema) }} />
    <header className="courses-registration-hero">
      <Image src={heroImage} alt="" fill priority sizes="100vw" className="courses-hero-image" />
      <div className="billing-container">
        <div className="courses-hero-copy">
          <div className="courses-hero-eyebrow">Khóa học PTE<span aria-hidden="true" /></div>
          <h1>Hành trình PTE<br />bắt đầu từ<br /><span>đúng trình độ.</span></h1>
          <p className="courses-hero-motto">Hiểu mình, tiến xa.</p>
          <p className="courses-hero-description">Hoàn thành bài kiểm tra đầu vào để xác định trình độ hiện tại và định hướng lộ trình học PTE phù hợp.</p>
          <div className="courses-hero-actions">
            <a className="courses-hero-primary" data-guidance={guidanceStep === 'start'} onClick={startGuidance} href="#placement-declaration">Bắt đầu kiểm tra đầu vào<ArrowRight aria-hidden="true" /></a>
            <Link className="courses-hero-secondary" href="#student-course-selection">Khám phá các khóa học <ArrowRight aria-hidden="true" /></Link>
          </div>
          <p className="courses-hero-note">Bắt buộc trước khi tham gia khóa học</p>
          <ol className="courses-hero-steps" aria-label="Các bước bắt đầu lộ trình PTE">
            <li><span aria-hidden="true">01</span><span>Kiểm tra<br />đầu vào</span></li>
            <li><span aria-hidden="true">02</span><span>Nhận xét<br />học thuật</span></li>
            <li><span aria-hidden="true">03</span><span>Bắt đầu<br />lộ trình</span></li>
          </ol>
        </div>
      </div>
    </header>
    <StudentBilling embedded />
  </main>;
}
