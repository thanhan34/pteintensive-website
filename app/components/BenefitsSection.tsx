"use client";

import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from './AnimationWrapper';

export default function BenefitsSection() {
  const benefits = [
    {
      id: 1,
      title: "Học Nhanh - Lộ Trình Ngắn",
      subtitle: "Tập Trung 20% Nội Dung, Tạo Ra 80% Kết Quả"
    },
    {
      id: 2,
      title: "Sĩ Số Lớp Nhỏ",
      subtitle: "Chỉ Từ 5 - 10 Học Viên/Lớp | Tối Đa Hiệu Quả Tiếp Thu"
    },
    {
      id: 3,
      title: "Hỗ Trợ 1 - 1 Sau Mỗi Buổi Học",
      subtitle: "Giải Đáp - Học Tập - Luyện Đề, Chữa Đề"
    },
    {
      id: 4,
      title: "Tặng APEuni - Tài Khoản Học",
      subtitle: "Luyện Đề Có Độ Chính Xác Đến 99,5%"
    },
    {
      id: 5,
      title: "Lệ Phí Rẻ - Không Phát Sinh Chi Phí",
      subtitle: "Lịch Học Tối Ưu Nhất"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#fedac2]/10">
      <motion.div 
        className="max-w-7xl mx-auto px-4"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div 
          className="text-center mb-16"
          variants={fadeIn}
        >
          <motion.h2 
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] inline-block mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            LUYỆN THI PTELIFE TRỰC TUYẾN VỚI
          </motion.h2>
          <motion.div 
            className="text-3xl font-bold text-[#fc5d01]"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            #5_LỢI ÍCH KHÔNG THỂ CHỐI TỪ
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
        >
          {benefits.map((benefit, index) => (
            <motion.div 
              key={benefit.id}
              variants={fadeIn}
              whileHover={{ 
                scale: 1.05,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Gradient Border Effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] rounded-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
                animate={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
              <div className="absolute inset-[1px] bg-white rounded-2xl -z-5" />

              <div className="relative p-8">
                {/* Number Badge */}
                <motion.div 
                  className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] rounded-full flex items-center justify-center text-white font-bold"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {benefit.id}
                </motion.div>

                {/* Content */}
                <div>
                  <motion.h3 
                    className="text-xl font-bold text-gray-900 mb-2"
                    variants={fadeIn}
                  >
                    {benefit.title}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-600"
                    variants={fadeIn}
                  >
                    {benefit.subtitle}
                  </motion.p>
                </div>

                {/* Hover Effect Line */}
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  initial={false}
                  animate={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div 
          className="mt-12 text-center"
          variants={fadeIn}
        >
          <motion.p 
            className="text-gray-600 mb-6"
            variants={fadeIn}
          >
            Đăng ký ngay để trải nghiệm những lợi ích tuyệt vời này
          </motion.p>
          <motion.a 
            href="#register" 
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] hover:from-[#fc5d01] hover:to-[#fc5d01] shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Đăng Ký Ngay
            <motion.svg 
              className="ml-2 -mr-1 w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </motion.svg>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
