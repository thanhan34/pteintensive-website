"use client";

import Lottie from "lottie-react";
import { useRef, useEffect, useState } from "react";

interface StatCardProps {
  title: string;
  subtitle: string;
  animationSrc: string;
}

const statsData: StatCardProps[] = [
  {
    title: "5 Sao",
    subtitle: "Chất Lượng Đào Tạo Và Giảng Dạy",
    animationSrc: "/images/huychuong.json"
  },
  {
    title: "100%",
    subtitle: "Cam Kết Đầu Ra",
    animationSrc: "/images/laptop.json"
  },
  {
    title: "99%",
    subtitle: "Học Viên Hài Lòng Với Kết Quả Đạt Được",
    animationSrc: "/images/feedback.json"
  },
  {
    title: "10.000+",
    subtitle: "Học Viên Thi Đạt Ngay Từ Lần Đầu Tiên",
    animationSrc: "/images/people.json"
  }
];

const StatCard = ({ title, subtitle, animationSrc }: StatCardProps) => {
  const lottieRef = useRef(null);
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch(animationSrc)
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error('Error loading animation:', error));
  }, [animationSrc]);

  if (!animationData) {
    return <div className="w-32 h-32 mx-auto mb-4">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg text-center relative overflow-hidden">
      <div className="w-32 h-32 mx-auto mb-4">
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          loop={true}
          autoplay={true}
        />
      </div>
      <h3 className="text-3xl font-bold text-[#FF4D00] mb-2">{title}</h3>
      <p className="text-gray-600">{subtitle}</p>
    </div>
  );
};

export default function StatsSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-[#FFF3E7] to-[#FFE1D3]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          VÌ SAO CHỌN <span className="text-[#FF4D00]">PTE INTENSIVE</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
