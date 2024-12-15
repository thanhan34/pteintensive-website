"use client";

import Link from 'next/link';
import Image from 'next/image';

export default function GuaranteeSection() {
  const scoreRanges = [
    {
      id: 1,
      range: "PTE 30 - 36+",
      image: "/images/pte-score-30.png",
      features: ["Đủ điều kiện du học", "Phù hợp cho người mới bắt đầu"]
    },
    {
      id: 2,
      range: "PTE 36 - 42+",
      image: "/images/pte-score-36.png",
      features: ["Đủ điều kiện định cư", "Dành cho người có nền tảng"]
    },
    {
      id: 3,
      range: "PTE 50+",
      image: "/images/pte-score-50.png",
      features: ["Đủ điều kiện làm việc", "Cho người muốn điểm cao"]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#fedac2]/10 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] mb-8">
          LUYỆN THI ĐẠT CHỨNG CHỈ TIẾNG ANH PTE
        </h2>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] py-6 px-8">
            <h3 className="text-2xl font-bold text-center text-white">
              CAM KẾT ĐẦU RA
            </h3>
          </div>
          
          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-8">
              {scoreRanges.map((score) => (
                <div key={score.id} className="group">
                  <div className="bg-white rounded-xl border border-[#fedac2] p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="text-2xl font-bold text-center text-[#fc5d01] mb-4 bg-[#fedac2]/20 py-2 rounded-lg">
                      {score.range}
                    </div>
                    <div className="relative h-[200px] mb-4">
                      <Image
                        src={score.image}
                        alt={`PTE Score ${score.range}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <ul className="space-y-2">
                      {score.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <svg className="w-5 h-5 text-[#fc5d01] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-xl font-semibold text-[#fc5d01] mb-8">
                ĐỦ ĐIỀU KIỆN XIN VISA DU HỌC - LÀM VIỆC - ĐỊNH CƯ
              </p>
              <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-[#fc5d01] font-bold">LIÊN HỆ TƯ VẤN NGAY</span>
                  <span className="text-[#fc5d01] font-bold text-2xl">0782.116.448</span>
                </div>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-lg text-white bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] hover:from-[#fc5d01] hover:to-[#fc5d01] transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
                >
                  ĐĂNG KÝ NGAY
                  <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
