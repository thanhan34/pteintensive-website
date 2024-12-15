"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function RegistrationSteps() {
  const steps = [
    {
      icon: "/images/registration/mobile-icon.svg",
      title: "Đăng Ký Tư Vấn",
      description: "Điền thông tin để nhận tư vấn miễn phí từ đội ngũ chuyên gia"
    },
    {
      icon: "/images/registration/test-icon.svg",
      title: "Kiểm Tra Đầu Vào",
      description: "Làm bài kiểm tra để đánh giá trình độ và xếp lớp phù hợp"
    },
    {
      icon: "/images/registration/class-icon.svg",
      title: "Xếp Lớp & Học Tập",
      description: "Bắt đầu học tập với lộ trình được cá nhân hóa"
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
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Quy Trình Đăng Ký
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            3 bước đơn giản để bắt đầu hành trình chinh phục PTE Academic
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              variants={itemVariants}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 left-1/2 w-full h-0.5 bg-[#fedac2]" />
              )}
              
              {/* Step Content */}
              <div className="relative bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 mb-6 relative">
                    <Image
                      src={step.icon}
                      alt={step.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="w-10 h-10 bg-[#fc5d01] text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 mb-8">
            Bắt đầu hành trình của bạn ngay hôm nay
          </p>
          <motion.button
            className="inline-flex items-center px-8 py-4 bg-[#fc5d01] text-white rounded-lg hover:bg-[#fd7f33] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="font-medium">Đăng Ký Ngay</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
