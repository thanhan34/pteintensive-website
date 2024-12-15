"use client";

import Link from 'next/link';

export default function CoursesOfferedSection() {
  const courses = [
    {
      id: 1,
      name: "PRE - PTE",
      subtitle: "Khóa bổ túc kiến thức căn bản, trọng tâm cho các bạn đang mất gốc hoặc yếu tiếng Anh",
      lessons: "10 buổi học",
      price: "3.000.000Đ",
      features: [
        "Học từ tuyệt nghĩa tiếng Anh cơ bản",
        "Học từ vựng theo chủ đề",
        "Cấu trúc ngữ pháp cơ bản",
        "Phát âm chuẩn"
      ]
    },
    {
      id: 2,
      name: "PTE 30-36",
      subtitle: "Đủ điều kiện xin visa du học, định cư",
      price: "3.000.000Đ",
      features: [
        "Học trọng tâm, tối ưu thời gian",
        "Cam kết đầu ra và đồng hành trọn khóa học",
        "Chuyên viên hỗ trợ giải đáp mọi khóa học 1-1",
        "Hỗ trợ làm bài tập, luyện đề thi PTE miễn phí"
      ]
    },
    {
      id: 3,
      name: "PTE 36-42",
      subtitle: "Đủ điều kiện xin visa du học, định cư",
      price: "3.000.000Đ",
      features: [
        "Học trọng tâm, tối ưu thời gian",
        "Cam kết đầu ra và đồng hành trọn khóa học",
        "Chuyên viên hỗ trợ giải đáp mọi khóa học 1-1",
        "Hỗ trợ làm bài tập, luyện đề thi PTE miễn phí"
      ]
    },
    {
      id: 4,
      name: "PTE 50+",
      subtitle: "Đủ điều kiện xin visa du học, định cư",
      price: "3.000.000Đ",
      features: [
        "Học trọng tâm, tối ưu thời gian",
        "Cam kết đầu ra và đồng hành trọn khóa học",
        "Chuyên viên hỗ trợ giải đáp mọi khóa học 1-1",
        "Hỗ trợ làm bài tập, luyện đề thi PTE miễn phí"
      ]
    }
  ];

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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course) => (
            <div 
              key={course.id} 
              className="group bg-white rounded-2xl border border-[#fedac2] shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Course Header */}
              <div className="bg-[#fc5d01] p-6 text-center">
                <h3 className="text-2xl font-bold text-white mb-2">{course.name}</h3>
                {course.lessons && (
                  <p className="text-white/90">{course.lessons}</p>
                )}
              </div>

              {/* Course Content */}
              <div className="p-6">
                <p className="text-gray-600 mb-6">{course.subtitle}</p>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-[#fc5d01]">KHÓA HỌC BAO GỒM:</h4>
                  <ul className="space-y-3">
                    {course.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-[#fc5d01] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {course.price && (
                  <div className="mt-6 py-3 px-4 bg-[#fedac2] rounded-lg text-center">
                    <span className="text-[#fc5d01] font-bold">Học phí: {course.price}</span>
                  </div>
                )}
              </div>

              {/* Course Footer */}
              <div className="p-6 bg-gray-50 border-t border-[#fedac2]">
                <div className="text-center space-y-2">
                  <p className="text-sm font-semibold text-gray-700">TUYỂN SINH LIÊN TỤC</p>
                  <p className="text-sm font-semibold text-gray-700">KHAI GIẢNG MỖI NGÀY</p>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <span className="text-gray-700">TỔNG ĐÀI TƯ VẤN:</span>
                    <span className="text-[#fc5d01] font-bold">0782.116.448</span>
                  </div>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#fc5d01] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>
          ))}
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
    </section>
  );
}
