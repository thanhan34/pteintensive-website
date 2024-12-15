"use client";

import Image from 'next/image';

export default function TrainingPolicy() {
  const policies = [
    {
      id: 1,
      icon: "/images/icons/transfer.svg",
      text: "Học viên có thể sang nhượng khóa học cho bạn bè, đối tác (không hoàn tiền)"
    },
    {
      id: 2,
      icon: "/images/icons/support.svg",
      text: "Học viên được hỗ trợ thông tin học thuật 24/7"
    },
    {
      id: 3,
      icon: "/images/icons/save.svg",
      text: "Học viên có thể bảo lưu khóa học khi chưa sắp xếp được thời gian"
    },
    {
      id: 4,
      icon: "/images/icons/contract.svg",
      text: "Học viên được cam kết đầu ra bằng hợp đồng"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] bg-repeat opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        <h2 className="text-4xl font-bold text-center text-white mb-16">
          Chính Sách Cho Lớp Đào Tạo
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Policies */}
          <div className="space-y-8">
            {policies.map((policy) => (
              <div 
                key={policy.id}
                className="group flex items-center gap-6 bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src={policy.icon}
                    alt=""
                    width={32}
                    height={32}
                    className="text-[#fc5d01]"
                  />
                </div>
                <p className="text-white text-lg leading-relaxed">
                  {policy.text}
                </p>
              </div>
            ))}
          </div>

          {/* Right Column - Image */}
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/classroom.jpg"
              alt="PTE Training Class"
              fill
              className="object-cover"
            />
            {/* Decorative Corner */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/20 rounded-tl-3xl transform rotate-45 backdrop-blur-sm"></div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="#register"
            className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium rounded-lg text-[#fc5d01] bg-white hover:bg-gray-100 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Đăng Ký Ngay
            <svg
              className="ml-2 -mr-1 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
