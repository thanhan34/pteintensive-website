"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function CourseNotFound() {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#fedac2]/10 to-white">
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        {/* Logo */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-48 h-16">
            <Image
              src="/images/logo/orange-logo.png"
              alt="PTE Intensive Logo"
              fill
              className="object-contain"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Không Tìm Thấy Khóa Học
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Khóa học bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/courses"
                className="inline-block px-8 py-3 bg-[#fc5d01] text-white rounded-lg hover:bg-[#fd7f33] transition-colors"
              >
                Xem Tất Cả Khóa Học
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/"
                className="inline-block px-8 py-3 border-2 border-[#fc5d01] text-[#fc5d01] rounded-lg hover:bg-[#fedac2]/10 transition-colors"
              >
                Về Trang Chủ
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="mt-12 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="w-64 h-64 bg-[#fedac2]/20 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </div>
          <div className="relative z-10">
            <motion.div
              className="text-[200px] font-bold text-[#fc5d01]/10"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              404
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
