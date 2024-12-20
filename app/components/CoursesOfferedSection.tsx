"use client";

import Link from 'next/link';
import { courseData } from '@/lib/courseData';
import { FaUsers, FaClock, FaVideo, FaBook } from 'react-icons/fa';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CoursesOfferedSection() {
  const courses = Object.entries(courseData).map(([slug, course]) => ({
    slug,
    ...course
  }));

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section className="py-20 bg-[#fff]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#fc5d01] mb-4">
            CÁC KHÓA LUYỆN THI PTE
          </h2>
          <p className="text-lg text-gray-600">
            Chọn khóa học phù hợp với mục tiêu của bạn
          </p>
        </div>

        <div className="course-slider-wrapper">
          <Slider {...settings} className="course-slider -mx-4">
            {courses.map((course) => (
              <div key={course.slug} className="h-full px-4">
                <Link 
                  href={`/courses/${course.slug}`}
                  className="group bg-white rounded-2xl border border-[#fedac2] shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 block h-full flex flex-col"
                >
                  {/* Course Header */}
                  <div className="bg-[#fc5d01] p-6 text-center relative overflow-hidden flex-shrink-0">
                    <h3 className="text-2xl font-bold text-white mb-2">{course.title}</h3>
                    <div className="flex items-center justify-center gap-2 text-white/90">
                      <FaClock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    {course.isHot && (
                      <div className="absolute -top-6 -right-6 w-24 h-24 rotate-45">
                        <div className="absolute bottom-8 right-1 text-xs font-bold text-[#fc5d01] bg-white px-2 py-1 rounded-sm">
                          HOT
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Course Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-gray-600 mb-6 line-clamp-2 flex-shrink-0">{course.description}</p>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-[#fc5d01]">THÔNG TIN KHÓA HỌC:</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <FaUsers className="w-4 h-4 text-[#fc5d01] flex-shrink-0" />
                              <span>{course.classSize}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FaVideo className="w-4 h-4 text-[#fc5d01] flex-shrink-0" />
                              <span className="line-clamp-1">{course.format}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FaBook className="w-4 h-4 text-[#fc5d01] flex-shrink-0" />
                              <span>{course.materials}</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-semibold text-[#fc5d01]">ĐỐI TƯỢNG HỌC VIÊN:</h4>
                          <ul className="space-y-2">
                            {course.targetStudents?.slice(0, 3).map((target, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <svg className="w-4 h-4 text-[#fc5d01] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-gray-700 line-clamp-2">{target}</span>
                              </li>
                            ))}
                            {course.targetStudents?.length > 3 && (
                              <li className="text-sm text-[#fc5d01] pl-6">
                                + {course.targetStudents.length - 3} đối tượng khác
                              </li>
                            )}
                          </ul>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-semibold text-[#fc5d01]">ƯU ĐÃI ĐẶC BIỆT:</h4>
                          <ul className="space-y-2">
                            {course.benefits?.slice(0, 2).map((benefit, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <svg className="w-4 h-4 text-[#fc5d01] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-gray-700 line-clamp-2">{benefit}</span>
                              </li>
                            ))}
                            {course.benefits?.length > 2 && (
                              <li className="text-sm text-[#fc5d01] pl-6">
                                + {course.benefits.length - 2} ưu đãi khác
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>

                      {/* Course Footer - Now sticks to bottom */}
                      <div className="mt-6 pt-6 border-t border-[#fedac2]">
                        <button className="w-full px-6 py-3 text-white bg-[#fc5d01] rounded-lg hover:bg-[#fd7f33] transition-colors">
                          XEM CHI TIẾT
                          <svg className="inline-block w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/register"
            className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium rounded-lg text-white bg-[#fc5d01] hover:bg-[#fd7f33] transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            ĐĂNG KÝ TƯ VẤN CHỌN LỚP PHÙ HỢP
            <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>

      <style jsx global>{`
        .course-slider-wrapper {
          margin: 0 -1rem;
        }
        .course-slider .slick-track {
          display: flex !important;
          margin-left: 0;
          margin-right: 0;
        }
        .course-slider .slick-slide {
          height: inherit !important;
          padding: 1rem;
        }
        .course-slider .slick-slide > div {
          height: 100%;
        }
        .course-slider .slick-dots {
          bottom: -2.5rem;
        }
        .course-slider .slick-dots li button:before {
          color: #fc5d01;
        }
        .course-slider .slick-dots li.slick-active button:before {
          color: #fc5d01;
        }
        .course-slider .slick-prev:before,
        .course-slider .slick-next:before {
          color: #fc5d01;
          font-size: 24px;
        }
        .course-slider .slick-prev {
          left: -30px;
          z-index: 1;
        }
        .course-slider .slick-next {
          right: -30px;
          z-index: 1;
        }
      `}</style>
    </section>
  );
}
