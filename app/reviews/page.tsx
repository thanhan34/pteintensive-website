"use client";

import { motion, useScroll, useSpring, Variants } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import ReviewStatsSection from '../components/ReviewStatsSection';
import StudentAchievements from '../components/StudentAchievements';
import VideoTestimonials from '../components/VideoTestimonials';
import ReviewCallToAction from '../components/ReviewCallToAction';

interface Review {
  id: number;
  name: string;
  avatar: string;
  score: string;
  course: string;
  content: string;
  date: string;
}

export default function ReviewsPage() {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const reviews: Review[] = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      avatar: "/images/students/student1.jpg",
      score: "PTE 79",
      course: "PTE 50+",
      content: "Tôi đã đạt được mục tiêu PTE của mình sau 3 tháng học tập tại PTE INTENSIVE. Giảng viên nhiệt tình, tài liệu phong phú và phương pháp học hiệu quả.",
      date: "15/12/2023"
    },
    {
      id: 2,
      name: "Trần Thị B",
      avatar: "/images/students/student2.jpg",
      score: "PTE 65",
      course: "PTE 30-36",
      content: "Từ một người mất gốc tiếng Anh, tôi đã đạt được điểm số mơ ước. Cảm ơn PTE INTENSIVE đã đồng hành cùng tôi trong hành trình này.",
      date: "20/12/2023"
    },
    {
      id: 3,
      name: "Lê Văn C",
      avatar: "/images/students/student3.jpg",
      score: "PTE 82",
      course: "PTE 50+",
      content: "Phương pháp học tập tại PTE INTENSIVE rất hiệu quả. Tôi đã cải thiện điểm số một cách nhanh chóng và đạt được mục tiêu du học của mình.",
      date: "25/12/2023"
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#fc5d01] origin-left z-50"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <motion.div 
        className="relative bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] text-white py-20 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="absolute inset-0"
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

        <div className="max-w-7xl mx-auto px-4 text-center relative">
          {/* Logo */}
          <motion.div
            className="flex justify-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-48 h-36">
              <Image
                src="/images/logo/orange-logo.png"
                alt="PTE Intensive Logo"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Câu Chuyện Thành Công
          </motion.h1>
          <motion.p 
            className="text-xl opacity-90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Khám phá những chia sẻ chân thực từ các học viên đã thành công cùng PTE INTENSIVE
          </motion.p>
        </div>
      </motion.div>

      {/* Stats Section */}
      <ReviewStatsSection />

      {/* Student Achievements */}
      <StudentAchievements />

      {/* Reviews Grid */}
      <section className="py-20 bg-gradient-to-b from-[#fedac2]/10 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Đánh Giá Từ Học Viên
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Những phản hồi chân thực từ các học viên về trải nghiệm học tập tại PTE INTENSIVE
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
                variants={itemVariants}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedReview(review)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{review.name}</h3>
                    <div className="text-[#fc5d01] font-medium">{review.score}</div>
                    <div className="text-sm text-gray-500">{review.course}</div>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{review.content}</p>
                <div className="text-sm text-gray-500">{review.date}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Video Testimonials */}
      <VideoTestimonials />

      {/* Call to Action */}
      <ReviewCallToAction />

      {/* Review Modal */}
      {selectedReview && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedReview(null)}
        >
          <motion.div
            className="bg-white rounded-xl p-6 max-w-2xl w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-20 h-20 rounded-full overflow-hidden">
                <Image
                  src={selectedReview.avatar}
                  alt={selectedReview.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedReview.name}</h3>
                <div className="text-[#fc5d01] font-medium">{selectedReview.score}</div>
                <div className="text-gray-500">{selectedReview.course}</div>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{selectedReview.content}</p>
            <div className="text-sm text-gray-500">{selectedReview.date}</div>
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedReview(null)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Back to Top Button */}
      <motion.button
        className="fixed bottom-8 right-8 w-12 h-12 bg-[#fc5d01] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#fd7f33] transition-colors"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 10l7-7m0 0l7 7m-7-7v18" 
          />
        </svg>
      </motion.button>
    </div>
  );
}
