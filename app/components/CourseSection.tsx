"use client";

import Image from 'next/image';
import Link from 'next/link';
import { courseData } from '../../lib/courseData';

export default function CourseSection() {
  const courses = Object.entries(courseData).map(([slug, course]) => ({
    id: slug,
    slug,
    ...course
  }));

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          KHAI GIẢNG KHÓA HỌC <span className="text-[#FF4D00]">HÀNG TUẦN</span> 
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link 
              key={course.id}
              href={`/courses/${course.slug}`}
              className="bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition-transform hover:scale-105"
            >
              <div className="relative">
                {course.isHot && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    HOT
                  </div>
                )}
                <Image
                  src={course.image}
                  alt={course.title}
                  width={400}
                  height={300}
                  className="w-full h-[200px] object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium mr-2">Thời gian:</span>
                    {course.duration}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium mr-2">Lịch học:</span>
                    {course.schedule}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium mr-2">Sĩ số:</span>
                    {course.classSize}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
