"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ExtendedLearningRoadmap() {
  const steps = [
    {
      title: "Đánh Giá Trình Độ",
      description: "Kiểm tra và đánh giá trình độ hiện tại của học viên",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Xây Dựng Lộ Trình",
      description: "Thiết kế lộ trình học tập phù hợp với mục tiêu",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: "Học Tập & Thực Hành",
      description: "Tham gia lớp học và thực hành với giáo viên",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      title: "Kiểm Tra & Đánh Giá",
      description: "Đánh giá tiến độ và điều chỉnh phương pháp",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      )
    }
  ];

  const detailedSteps = [
    {
      title: "Speaking",
      items: [
        "Read Aloud",
        "Repeat Sentence",
        "Describe Image",
        "Re-tell Lecture",
        "Answer Short Question"
      ]
    },
    {
      title: "Writing",
      items: [
        "Summarize Written Text",
        "Write Essay",
        "Grammar & Vocabulary",
        "Structure & Coherence"
      ]
    },
    {
      title: "Reading",
      items: [
        "Multiple Choice",
        "Re-order Paragraphs",
        "Fill in the Blanks",
        "Reading & Writing"
      ]
    },
    {
      title: "Listening",
      items: [
        "Summarize Spoken Text",
        "Multiple Choice",
        "Fill in the Blanks",
        "Highlight Correct Summary"
      ]
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
            Lộ Trình Học Tập
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Quy trình học tập được thiết kế khoa học, giúp học viên đạt kết quả tốt nhất
          </p>
        </motion.div>

        {/* New Style - Steps */}
        <motion.div
          className="grid md:grid-cols-4 gap-8 mb-20"
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
                <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-[#fedac2]" />
              )}
              
              {/* Step Content */}
              <div className="relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-[#fc5d01] text-white rounded-full flex items-center justify-center mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Old Style - Detailed Steps */}
        <motion.div
          className="grid md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {detailedSteps.map((section, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-[#fc5d01] text-white p-4">
                <h3 className="text-xl font-bold text-center">{section.title}</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#fc5d01] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
