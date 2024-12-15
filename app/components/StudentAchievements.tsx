"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function StudentAchievements() {
  const achievements = [
    {
      score: "PTE 90",
      name: "Nguyễn Văn A",
      image: "/images/pte-score-90.png",
      description: "Từ IELTS 6.5 đến PTE 90 trong 2 tháng"
    },
    {
      score: "PTE 85",
      name: "Trần Thị B",
      image: "/images/pte-score-85.png",
      description: "Chinh phục PTE Academic chỉ sau 6 tuần"
    },
    {
      score: "PTE 79",
      name: "Lê Văn C",
      image: "/images/pte-score-79.png",
      description: "Đạt mục tiêu du học với PTE 79+"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Thành Tích Nổi Bật
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Khám phá những thành công đáng kinh ngạc của học viên PTE INTENSIVE
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] p-[2px] rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="bg-white p-6 rounded-2xl h-full">
                <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                  <Image
                    src={achievement.image}
                    alt={`${achievement.name} PTE Score`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#fc5d01] mb-2">
                    {achievement.score}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {achievement.name}
                  </h3>
                  <p className="text-gray-600">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
