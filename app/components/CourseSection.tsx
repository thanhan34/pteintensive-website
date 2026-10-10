import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { courseData } from '../../lib/courseData';

export default function CourseSection() {
  const courses = Object.entries(courseData).map(([slug, course]) => ({
    id: slug,
    slug,
    ...course
  }));

  return (
    <section id="home-courses" tabIndex={-1} aria-labelledby="home-courses-title" className="home-course-anchor home-focus home-content py-16 bg-gray-50 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="home-courses-title" className="text-2xl font-bold leading-tight text-gray-900 md:text-4xl">
          Khai giảng khóa học <span className="text-primary">hàng tuần</span>
        </h2>
        <div className="mb-8 mt-4 flex flex-col gap-4 md:mb-12 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-base leading-7 text-gray-600">Khám phá nội dung, thời gian và lịch học để tìm khóa học phù hợp với bạn.</p>
          <Link href="/courses" className="home-focus inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition hover:-translate-y-0.5 hover:border-primary hover:shadow-sm active:translate-y-0.5">
            Xem tất cả khóa học <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link 
              key={course.id}
              href={`/courses/${course.slug}`}
              className="home-focus group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg active:translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none"
            >
              <div className="relative aspect-[2/1] overflow-hidden border-b border-gray-100 bg-gray-100">
                {course.isHot && (
                  <div className="absolute top-3 right-3 z-10 bg-peach-light text-secondary px-3 py-1 rounded-full text-xs font-bold">
                    HOT
                  </div>
                )}
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-bold leading-7 text-gray-900 mb-3">{course.title}</h3>
                <p className="text-gray-600 text-sm leading-6 mb-6">{course.description}</p>
                <div className="mt-auto space-y-3 border-t border-gray-100 pt-4">
                  <div className="text-sm leading-6 text-gray-600">
                    <span className="font-medium mr-2">Thời gian:</span>
                    {course.duration}
                  </div>
                  <div className="text-sm leading-6 text-gray-600">
                    <span className="font-medium mr-2">Lịch học:</span>
                    {course.schedule}
                  </div>
                  <div className="text-sm leading-6 text-gray-600">
                    <span className="font-medium mr-2">Sĩ số:</span>
                    {course.classSize}
                  </div>
                </div>
                <span className="mt-6 inline-flex items-center justify-between gap-2 border-t border-gray-100 pt-4 text-sm font-bold text-gray-900">
                  Xem chi tiết khóa học <ArrowRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-4 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-6 text-gray-600">Chưa biết bắt đầu từ đâu? Nhận tư vấn về lộ trình học phù hợp.</p>
          <Link href="/register" className="home-focus inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:translate-y-0.5">
            Nhận lộ trình miễn phí <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
