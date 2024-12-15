"use client";

import { motion } from 'framer-motion';

export default function OldLearningRoadmap() {
  const stages = [
    {
      number: "01",
      title: "GIAI ĐOẠN 1:",
      description: "Ôn luyện trong tâm, thủ thuật PTE nhanh chóng"
    },
    {
      number: "02",
      title: "GIAI ĐOẠN 2:",
      description: "Luyện đề + chữa bài + thi thử + Làm quen với cách ra đề của PTE + làm quen với cách chấm của đề"
    },
    {
      number: "03",
      title: "GIAI ĐOẠN 3:",
      description: "Luyện đề + thi thử + sửa lỗi + phân tích + thi thử + đánh giá + nhận xét + phân tích + luyện tập + thi thử + đánh giá + nhận xét"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
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
            LỘ TRÌNH HỌC PTE CẬN ĐÍCH THẦN TỐC
          </h2>
          <div className="w-full h-12 bg-[#fc5d01] rounded-lg flex items-center justify-center text-white text-lg font-medium mb-8">
            ÔN LUYỆN TRỌNG TÂM, THỦ THUẬT PTE NHANH CHÓNG
          </div>
        </motion.div>

        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stages.map((stage, index) => (
            <motion.div
              key={index}
              className="relative"
              variants={itemVariants}
            >
              {/* Timeline Line */}
              {index < stages.length - 1 && (
                <div className="absolute left-[45px] top-[80px] w-0.5 h-[calc(100%+24px)] bg-[#fc5d01]/20" />
              )}

              <div className="flex items-start gap-6">
                {/* Number Circle */}
                <div className="w-24 h-24 rounded-full bg-[#fc5d01] text-white flex items-center justify-center text-3xl font-bold flex-shrink-0">
                  {stage.number}
                </div>

                {/* Content Card */}
                <div className="flex-grow bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold text-[#fc5d01] mb-2">
                    {stage.title}
                  </h3>
                  <p className="text-gray-600">
                    {stage.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
