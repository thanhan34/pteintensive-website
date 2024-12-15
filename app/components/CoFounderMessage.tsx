"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function CoFounderMessage() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#fedac2]/10 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Message Column - Placed first for right-aligned layout */}
          <motion.div
            className="relative order-2 md:order-1"
            initial={{ opacity: 0, x: -50 }}
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
                Lời Nhắn Từ Co-Founder
              </motion.h2>

              <motion.div
                className="text-lg text-gray-600 leading-relaxed space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <p>
                  Đối với chúng tôi, tiếng Anh không phải là một tài năng bẩm sinh hay điều có thể đạt được trong một sớm một chiều.
                </p>
                <p>
                  Đó là một kỹ năng quan trọng, đòi hỏi sự nỗ lực không ngừng và rèn luyện thường xuyên. Chúng tôi tin rằng, bất kỳ ai, dù xuất phát điểm ở đâu, đều có thể chinh phục được tiếng Anh nếu có phương pháp học đúng đắn và sự kiên trì bền bỉ.
                </p>
                <p>
                  Tiếng Anh không chỉ là ngôn ngữ, mà còn là chìa khóa mở ra những cơ hội mới và chắp cánh cho ước mơ vươn xa.
                </p>
              </motion.div>

              <motion.div
                className="pt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="font-bold text-[#fc5d01]">Bach Yen</div>
                <div className="text-gray-600">Co-Founder, PTE Intensive</div>
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

          {/* Image Column - Placed second for right-aligned layout */}
          <motion.div
            className="relative order-1 md:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/trainers/bach yen.jpg"
                alt="Bach Yen - Co-Founder of PTE Intensive"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#fc5d01]/10 rounded-full blur-2xl" />
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#fc5d01]/10 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
