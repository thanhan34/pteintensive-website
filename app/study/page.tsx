'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function StudyPage() {
  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative w-48 h-16">
              <Image
                src="/images/logo/orange-logo.png"
                alt="PTE Intensive Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Du Học và Định Cư</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Khám phá cơ hội du học và định cư tại các quốc gia nói tiếng Anh
          </p>
        </div>

        {/* Study Abroad Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Du Học</h2>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              PTE Intensive không chỉ là nơi giúp bạn đạt điểm cao trong kỳ thi PTE Academic, mà còn là đối tác đáng tin cậy trong hành trình du học của bạn. Chúng tôi cung cấp:
            </p>
            <ul className="list-disc pl-6 space-y-4 text-gray-600">
              <li>Tư vấn chọn trường và ngành học phù hợp</li>
              <li>Hỗ trợ hoàn thiện hồ sơ du học</li>
              <li>Hướng dẫn quy trình xin visa du học</li>
              <li>Định hướng nghề nghiệp và cơ hội việc làm</li>
            </ul>
          </div>
        </div>

        {/* Immigration Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Định Cư</h2>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Với kinh nghiệm và mạng lưới đối tác rộng khắp, chúng tôi cung cấp dịch vụ tư vấn định cư chuyên nghiệp:
            </p>
            <ul className="list-disc pl-6 space-y-4 text-gray-600">
              <li>Tư vấn lựa chọn chương trình định cư phù hợp</li>
              <li>Hỗ trợ đánh giá điều kiện và cơ hội</li>
              <li>Hướng dẫn quy trình và thủ tục pháp lý</li>
              <li>Tư vấn việc làm và hòa nhập văn hóa</li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-[#FF4D00] rounded-lg shadow-sm p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Bắt Đầu Hành Trình Của Bạn</h2>
          <p className="text-lg mb-8 opacity-90">
            Liên hệ với chúng tôi ngay hôm nay để được tư vấn chi tiết về du học và định cư
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-white text-[#FF4D00] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Tư Vấn Miễn Phí
          </Link>
        </div>
      </div>
    </div>
  );
}
