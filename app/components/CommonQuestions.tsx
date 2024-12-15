"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Question {
  id: number;
  question: string;
  answer: string;
}

export default function CommonQuestions() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const questions: Question[] = [
    {
      id: 1,
      question: "PTE có nghĩa là gì?",
      answer: "PTE (Pearson Test of English) là bài thi đánh giá khả năng tiếng Anh học thuật được công nhận toàn cầu, được phát triển bởi tập đoàn giáo dục Pearson."
    },
    {
      id: 2,
      question: "Kết quả của bài thi PTE được sử dụng để làm gì?",
      answer: "Kết quả PTE được sử dụng để xin visa du học, định cư, làm việc tại các quốc gia nói tiếng Anh như Úc, New Zealand, Canada, và nhiều quốc gia khác."
    },
    {
      id: 3,
      question: "Sự khác biệt giữa bài thi IELTS và PTE là gì?",
      answer: "PTE là bài thi hoàn toàn trên máy tính, chấm điểm bằng AI, có kết quả nhanh (2-5 ngày). IELTS có phần thi Speaking trực tiếp với giám khảo, chấm điểm thủ công, thời gian có kết quả lâu hơn."
    },
    {
      id: 4,
      question: "Kết quả thi PTE có được chấp nhận ở tất cả các quốc gia không?",
      answer: "PTE được chấp nhận rộng rãi tại hơn 3,000 tổ chức giáo dục và chính phủ trên toàn thế giới, đặc biệt là Úc, New Zealand, và nhiều quốc gia khác."
    },
    {
      id: 5,
      question: "Chứng chỉ PTE có giá trị trong bao lâu?",
      answer: "Chứng chỉ PTE có giá trị trong vòng 2 năm kể từ ngày thi."
    },
    {
      id: 6,
      question: "Có giới hạn số lần tham gia bài thi PTE hay không?",
      answer: "Không có giới hạn số lần thi PTE. Tuy nhiên, bạn phải chờ ít nhất 5 ngày giữa hai lần thi."
    },
    {
      id: 7,
      question: "Có tất cả bao nhiêu câu hỏi trong bài thi PTE?",
      answer: "Bài thi PTE gồm 20 dạng câu hỏi khác nhau, chia thành 3 phần chính: Speaking & Writing, Reading, và Listening."
    },
    {
      id: 8,
      question: "Tại sao nên lựa chọn PTE INTENSIVE?",
      answer: "PTE INTENSIVE cung cấp phương pháp học hiệu quả, đội ngũ giảng viên giàu kinh nghiệm, và cam kết đầu ra cho học viên."
    },
    {
      id: 9,
      question: "Trung tâm có hỗ trợ gì cho học viên trước khi thi không?",
      answer: "Trung tâm cung cấp tài liệu ôn tập, mock test, tư vấn chiến lược làm bài và hỗ trợ 1-1 cho học viên trước khi thi."
    },
    {
      id: 10,
      question: "Tôi có được học thử không?",
      answer: "Có, trung tâm có buổi học thử miễn phí để học viên trải nghiệm phương pháp giảng dạy và đánh giá trình độ."
    }
  ];

  const toggleQuestion = (id: number) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

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
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#fedac2]/10 to-white overflow-hidden">
      <motion.div 
        className="max-w-4xl mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.h2 
          className="text-4xl font-bold text-center text-[#fc5d01] mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          NHỮNG CÂU HỎI THƯỜNG GẶP
        </motion.h2>

        <motion.div 
          className="space-y-4"
          variants={containerVariants}
        >
          {questions.map((q) => (
            <motion.div
              key={q.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
                openQuestion === q.id ? 'ring-2 ring-[#fc5d01]' : 'hover:shadow-lg'
              }`}
            >
              <motion.button
                onClick={() => toggleQuestion(q.id)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
                whileTap={{ scale: 0.98 }}
              >
                <span className="font-medium text-gray-900">{q.question}</span>
                <motion.span
                  animate={{ rotate: openQuestion === q.id ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg className="w-6 h-6 text-[#fc5d01]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </motion.span>
              </motion.button>
              <AnimatePresence>
                {openQuestion === q.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="px-6 pb-4"
                  >
                    <motion.p 
                      className="text-gray-600"
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {q.answer}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
