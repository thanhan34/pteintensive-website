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
      title: 'Course Not Found | PTE LIFE',
      description: 'The requested course could not be found.',
    };
  }

  return {
    title: `${course.title} | PTE LIFE`,
    description: course.description,
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

  return (
    <main className="min-h-screen">
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
