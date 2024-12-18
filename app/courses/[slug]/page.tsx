import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { courseData, type CourseSlug } from '../../../lib/courseData';
import CourseContent from './CourseContent';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = params.slug as CourseSlug;
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

export default async function CourseDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug as CourseSlug;
  const course = courseData[slug];

  if (!course) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <CourseContent course={course} />
    </main>
  );
}

export async function generateStaticParams() {
  return Object.keys(courseData).map((slug) => ({
    slug,
  }));
}
