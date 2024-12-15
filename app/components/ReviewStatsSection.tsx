"use client";

import { motion } from 'framer-motion';
import { useRef } from 'react';

export default function ReviewStatsSection() {
  const statsRef = useRef(null);

  const stats = [
    { number: "1000+", label: "Học viên thành công" },
    { number: "95%", label: "Tỷ lệ đạt mục tiêu" },
    { number: "4.9/5", label: "Đánh giá trung bình" },
    { number: "98%", label: "Học viên hài lòng" }
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
    <div className="py-16 bg-white" ref={statsRef}>
      <motion.div 
        className="max-w-7xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="text-center"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="text-4xl font-bold bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] bg-clip-text text-transparent mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {stat.number}
              </motion.div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
