"use client";

import { motion, useScroll, useSpring } from 'framer-motion';
import Image from 'next/image';
import { useScrollToTop } from '../../lib/hooks/useScrollToTop';
import ReviewStatsSection from '../components/ReviewStatsSection';
import StudentAchievements from '../components/StudentAchievements';
import ReviewSection from '../components/ReviewSection';
import ReviewImageGallery from '../components/ReviewImageGallery';
import ReviewCallToAction from '../components/ReviewCallToAction';

export default function ReviewsPage() {
  const scrollToTop = useScrollToTop();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] origin-left z-50"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <motion.div 
        className="relative bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] text-white pt-32 pb-24 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated Background Pattern */}
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

        {/* Decorative Elements */}
        <div className="absolute top-1/4 -left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 text-center relative py-10">
          <motion.div
            className="flex justify-center mb-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <div className="relative w-48 h-36">
              <Image
                src="/images/logo/orange-logo.png"
                alt="PTE Intensive Logo"
                fill
                className="object-contain drop-shadow-lg"
                priority
              />
            </div>
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Đánh Giá Từ Học Viên
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Những chia sẻ chân thực về trải nghiệm học tập tại PTE INTENSIVE
          </motion.p>

          {/* Decorative Lines */}
          <motion.div
            className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full"
            initial={{ height: 0 }}
            animate={{ height: 40 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="w-px h-full bg-gradient-to-b from-white to-transparent" />
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="space-y-24">
        {/* Stats Section */}
        <ReviewStatsSection />

        {/* Student Achievements */}
        <StudentAchievements />

        {/* Reviews Grid */}
        <ReviewSection />

        {/* Review Images */}
        <ReviewImageGallery />

        {/* Call to Action */}
        <ReviewCallToAction />
      </div>

      {/* Back to Top Button */}
      <motion.button
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] text-white rounded-full shadow-lg flex items-center justify-center group z-50"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
      >
        <div className="absolute inset-0 rounded-full bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
        <svg 
          className="w-6 h-6 transform group-hover:-translate-y-1 transition-transform" 
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
