"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function CompanyIntro() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Logo */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative w-48 h-36">
              <Image
                src="/images/logo/white-logo.png"
                alt="PTE Intensive Logo"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Về PTE Intensive
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trung tâm luyện thi PTE Academic hàng đầu tại Việt Nam
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg text-gray-600">
              PTE Intensive được thành lập với sứ mệnh giúp học viên chinh phục bài thi PTE Academic một cách hiệu quả nhất. Chúng tôi tự hào là đơn vị tiên phong trong việc áp dụng công nghệ và phương pháp giảng dạy hiện đại vào quá trình đào tạo.
            </p>
            <p className="text-lg text-gray-600">
              Với đội ngũ giảng viên giàu kinh nghiệm và chương trình học được thiết kế chuyên biệt, chúng tôi cam kết mang đến cho học viên không chỉ kiến thức mà còn là sự tự tin và kỹ năng cần thiết để đạt được mục tiêu điểm số mong muốn.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="bg-[#fedac2]/10 p-6 rounded-xl">
                <div className="text-3xl font-bold text-[#FF4D00] mb-2">5000+</div>
                <div className="text-gray-600">Học viên thành công</div>
              </div>
              <div className="bg-[#fedac2]/10 p-6 rounded-xl">
                <div className="text-3xl font-bold text-[#FF4D00] mb-2">98%</div>
                <div className="text-gray-600">Đạt mục tiêu</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/trainers/an doan 1.jpg"
                alt="PTE Intensive Campus"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#FF4D00]/10 rounded-full blur-2xl" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#FF4D00]/10 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
