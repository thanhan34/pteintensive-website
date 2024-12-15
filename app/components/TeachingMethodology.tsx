"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function TeachingMethodology() {
  const methods = [
    {
      title: "Phương Pháp Cá Nhân Hóa",
      description: "Chương trình học được thiết kế riêng dựa trên trình độ và mục tiêu của từng học viên, đảm bảo hiệu quả tối ưu.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      title: "Công Nghệ Hiện Đại",
      description: "Ứng dụng công nghệ AI và phần mềm mô phỏng bài thi, giúp học viên làm quen với môi trường thi thực tế.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Thực Hành Thường Xuyên",
      description: "Tập trung vào thực hành với các bài tập và đề thi thử, giúp học viên tự tin và quen thuộc với format bài thi.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      )
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

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
            Phương Pháp Giảng Dạy
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Áp dụng phương pháp giảng dạy hiện đại kết hợp với công nghệ tiên tiến
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/trainers/an doan 1.jpg"
                alt="Teaching Methodology"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#fc5d01]/10 rounded-full blur-2xl" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#fc5d01]/10 rounded-full blur-2xl" />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {methods.map((method, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex gap-6"
              >
                <div className="w-16 h-16 bg-[#fc5d01] text-white rounded-lg flex-shrink-0 flex items-center justify-center">
                  {method.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-gray-600">
                    {method.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Phương pháp giảng dạy của chúng tôi được thiết kế để tối ưu hóa thời gian học tập và đảm bảo kết quả tốt nhất cho học viên.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
