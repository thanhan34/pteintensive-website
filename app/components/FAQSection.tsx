"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQSection() {
  const faqs = [
    {
      question: "Khóa học có phù hợp với người mới bắt đầu không?",
      answer: "Có, khóa học được thiết kế phù hợp với mọi trình độ. Đối với người mới bắt đầu, chúng tôi có khóa PRE-PTE giúp xây dựng nền tảng vững chắc trước khi bước vào các khóa học chuyên sâu."
    },
    {
      question: "Thời gian học tập kéo dài bao lâu?",
      answer: "Thời gian học tập trung bình là 3 tháng, với 2 buổi học mỗi tuần. Tuy nhiên, thời gian có thể linh hoạt tùy thuộc vào mục tiêu và trình độ của từng học viên."
    },
    {
      question: "Có cam kết đầu ra không?",
      answer: "Có, chúng tôi cam kết đầu ra cho học viên dựa trên mục tiêu điểm số đã đăng ký. Nếu không đạt mục tiêu, học viên sẽ được học lại miễn phí."
    },
    {
      question: "Lớp học có bao nhiêu học viên?",
      answer: "Mỗi lớp học có từ 8-10 học viên để đảm bảo chất lượng giảng dạy và sự tương tác giữa giáo viên và học viên."
    },
    {
      question: "Có được học thử không?",
      answer: "Có, chúng tôi có buổi học thử miễn phí để học viên có thể trải nghiệm phương pháp giảng dạy và đánh giá sự phù hợp trước khi đăng ký khóa học chính thức."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
            Câu Hỏi Thường Gặp
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Giải đáp những thắc mắc phổ biến về khóa học PTE Academic
          </p>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="mb-4"
              variants={itemVariants}
            >
              <button
                className={`w-full text-left p-6 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow ${
                  openIndex === index ? 'bg-[#fedac2]/10' : ''
                }`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">
                    {faq.question}
                  </h3>
                  <svg
                    className={`w-5 h-5 text-[#fc5d01] transform transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 text-gray-600">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600">
            Bạn có câu hỏi khác? {" "}
            <a href="/contact" className="text-[#fc5d01] hover:underline">
              Liên hệ với chúng tôi
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
