"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function FounderMessage() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#fedac2]/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/trainers/an doan 1.jpg"
                alt="An Doan - Founder of PTE Intensive"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#fc5d01]/10 rounded-full blur-2xl" />
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#fc5d01]/10 rounded-full blur-2xl" />
          </motion.div>

          {/* Message Column */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="absolute -top-8 -left-8">
              <svg 
                className="w-16 h-16 text-[#fc5d01]/20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            <div className="space-y-6">
              <motion.h2
                className="text-3xl font-bold text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Lời Nhắn Từ Founder
              </motion.h2>

              <motion.div
                className="text-lg text-gray-600 leading-relaxed space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <p>
                  Tại PTE Intensive, chúng tôi không chỉ đơn thuần dạy ngôn ngữ, mà còn đồng hành cùng học viên trên hành trình mở ra cánh cửa tương lai.
                </p>
                <p>
                  Với đội ngũ giảng viên tận tâm và phương pháp đào tạo hiệu quả, chúng tôi tin rằng mọi học viên đều có thể chinh phục giấc mơ du học, làm việc quốc tế, và vượt qua mọi rào cản ngôn ngữ.
                </p>
                <p>
                  Đừng để bài thi PTE làm rào cản ước mơ của bạn. Hãy để chúng tôi giúp bạn biến điều không thể thành có thể, xây dựng bản lĩnh và tự tin bứt phá mọi giới hạn.
                </p>
              </motion.div>

              <motion.div
                className="pt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="font-bold text-[#fc5d01]">An Doan</div>
                <div className="text-gray-600">Founder, PTE Intensive</div>
              </motion.div>
            </div>

            <div className="absolute -bottom-8 -right-8 transform rotate-180">
              <svg 
                className="w-16 h-16 text-[#fc5d01]/20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
