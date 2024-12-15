"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ReviewCallToAction() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] text-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Sẵn Sàng Chinh Phục PTE Academic?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-12">
            Đăng ký ngay hôm nay để nhận ưu đãi đặc biệt và bắt đầu hành trình của bạn
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/register"
                className="inline-block px-8 py-4 bg-white text-[#fc5d01] rounded-lg hover:bg-[#fedac2] transition-colors font-medium"
              >
                Đăng Ký Ngay
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contact"
                className="inline-block px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors font-medium"
              >
                Tư Vấn Miễn Phí
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="mt-12 flex flex-wrap justify-center gap-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div>
              <div className="text-3xl font-bold mb-2">1000+</div>
              <div className="opacity-90">Học viên thành công</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">95%</div>
              <div className="opacity-90">Đạt mục tiêu</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="opacity-90">Cam kết đầu ra</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Pattern */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        animate={{ 
          backgroundPosition: ["0% 0%", "100% 100%"],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      >
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10" />
      </motion.div>
    </section>
  );
}
