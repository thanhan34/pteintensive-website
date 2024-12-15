"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen pt-20 overflow-hidden bg-gradient-to-br from-[#fc5d01] to-[#fd7f33]">
      {/* Background Pattern */}
      <motion.div 
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] bg-repeat opacity-10" />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"
          animate={{ 
            opacity: [0.2, 0.3, 0.2],
            y: [0, 10, 0]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-36">
        {/* Logo */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-64 h-32">
            <Image
              src="/images/logo/orange-logo.png"
              alt="PTE Intensive Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div 
            className="text-white z-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Chinh Phục PTE
              <br />
              <span className="text-[#fedac2]">Mở Cửa Tương Lai</span>
            </motion.h1>

            <motion.p 
              className="text-xl mb-8 text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Khóa học PTE chất lượng cao với cam kết đầu ra và phương pháp học tập hiệu quả.
            </motion.p>

            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {[
                "Giảng viên chuyên môn cao",
                "Lộ trình học tập cá nhân hóa",
                "Cam kết đầu ra",
                "Hỗ trợ 24/7"
              ].map((feature, index) => (
                <motion.div 
                  key={feature}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                >
                  <motion.div 
                    className="w-5 h-5 bg-white rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.2 }}
                  >
                    <svg className="w-3 h-3 text-[#fc5d01]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <span>{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className="mt-10 flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <motion.a
                href="/register"
                className="px-8 py-3 bg-white text-[#fc5d01] rounded-lg font-medium hover:bg-[#fedac2] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Đăng Ký Ngay
              </motion.a>
              <motion.a
                href="#learn-more"
                className="px-8 py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Tìm Hiểu Thêm
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Column - Image/Animation */}
          <motion.div 
            className="relative z-10"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div 
              className="relative h-[600px]"
              animate={{ 
                y: [0, -20, 0],
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Image
                src="/images/hero.png"
                alt="PTE Learning"
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Floating Elements */}
            <motion.div 
              className="absolute top-20 right-20 w-20 h-20 bg-white/10 rounded-full backdrop-blur-sm"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.div 
              className="absolute bottom-20 left-20 w-16 h-16 bg-white/10 rounded-full backdrop-blur-sm"
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [360, 180, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ 
          y: [0, 10, 0],
          opacity: [1, 0.5, 1]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity
        }}
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}
