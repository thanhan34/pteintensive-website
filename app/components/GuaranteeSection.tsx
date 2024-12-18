"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function GuaranteeSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scoreRanges = [
    {
      id: 1,
      range: "PTE 30 - 36+",
      image: "/images/lotrinh/30-36.png",
      features: ["Đủ điều kiện du học", "Phù hợp cho người mới bắt đầu"]
    },
    {
      id: 2,
      range: "PTE 42 - 50+",
      image: "/images/lotrinh/50+.png",
      features: ["Đủ điều kiện định cư", "Dành cho người có nền tảng"]
    },
    {
      id: 3,
      range: "PTE 1-1",
      image: "/images/lotrinh/1-1.png",
      features: ["Đủ điều kiện làm việc", "Cho người muốn điểm cao"]
    }
  ];

  if (!mounted) {
    return null;
  }

  return (
    <section className="py-24 bg-gradient-to-b from-[#fedac2]/20 via-white to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] inline-block">
            LUYỆN THI ĐẠT CHỨNG CHỈ TIẾNG ANH PTE
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Chương trình đào tạo chuyên sâu với cam kết đầu ra rõ ràng
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-16">
          <div className="bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] py-8 px-8">
            <div className="flex items-center justify-center gap-3">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-3xl font-bold text-white">
                CAM KẾT ĐẦU RA
              </h3>
            </div>
          </div>
          
          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {scoreRanges.map((score) => (
                <div key={score.id} className="group">
                  <div className="flex flex-col bg-white rounded-2xl border-2 border-[#fedac2] shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:border-[#fc5d01] overflow-hidden">
                    {/* Score Range */}
                    <div className="text-2xl font-bold text-center text-[#fc5d01] py-4 px-6 bg-[#fedac2]/30 group-hover:bg-[#fc5d01]/10 transition-colors duration-300">
                      {score.range}
                    </div>

                    {/* Image Container */}
                    <div className="relative w-full h-[400px]">
                      <Image
                        src={score.image}
                        alt={`PTE Score ${score.range}`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={score.id === 1}
                      />
                    </div>

                    {/* Features */}
                    <div className="p-6 bg-white">
                      <ul className="space-y-4">
                        {score.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                            <svg className="w-7 h-7 text-[#fc5d01] mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="font-medium text-lg">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 pt-8 border-t border-gray-100">
              <div className="text-center space-y-8">
                <p className="text-2xl font-bold text-[#fc5d01] bg-[#fedac2]/20 py-4 px-8 rounded-xl inline-block transform hover:scale-105 transition-transform duration-300">
                  ĐỦ ĐIỀU KIỆN XIN VISA DU HỌC - LÀM VIỆC - ĐỊNH CƯ
                </p>
                
                <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                  <div className="flex items-center gap-4 bg-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="p-3 bg-[#fedac2]/30 rounded-full">
                      <svg className="w-8 h-8 text-[#fc5d01]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-gray-600 font-medium text-lg">LIÊN HỆ TƯ VẤN NGAY</div>
                      <div className="text-[#fc5d01] font-bold text-2xl">0349.218.352</div>
                    </div>
                  </div>
                  
                  <Link
                    href="/register"
                    className="group inline-flex items-center justify-center px-8 py-4 rounded-xl text-white bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] hover:from-[#fc5d01] hover:to-[#fc5d01] transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-2xl font-bold text-xl min-w-[200px]"
                  >
                    ĐĂNG KÝ NGAY
                    <svg className="ml-2 w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
