import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { courseData, type CourseSlug } from '../../../lib/courseData';
import CourseContent from './CourseContent';

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug as CourseSlug;
  const course = courseData[slug];

  if (!course) {
    return {
      title: 'Course Not Found | PTE Intensive',
      description: 'The requested course could not be found.',
    };
  }

  return {
    title: `${course.title} | PTE Intensive`,
    description: course.description,
    alternates: {
      canonical: `https://pteintensive.com/courses/${slug}`
    },
    openGraph: {
      title: course.title,
      description: course.description,
      url: `https://pteintensive.com/courses/${slug}`,
      type: 'website',
      images: [
        {
          url: course.image,
          width: 1200,
          height: 630,
          alt: `${course.title} - PTE Intensive`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: course.title,
      description: course.description,
      images: [course.image]
    }
  };
}

// Dynamic route page component
export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug as CourseSlug;
  const course = courseData[slug];

  if (!course) {
    notFound(); // Show 404 page
  }

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.description,
    provider: {
      '@type': 'Organization',
      name: 'PTE Intensive',
      sameAs: 'https://pteintensive.com'
    },
    educationalLevel: 'PTE Academic Preparation',
    courseCode: slug,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'mixed',
      duration: course.duration,
      maximumEnrollment: course.classSize
    }
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <CourseContent course={course} />
    </main>
  );
}

// Generate static paths for dynamic slugs
export async function generateStaticParams() {
  return Object.keys(courseData).map((slug) => ({
    slug,
  }));
}
