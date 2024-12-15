"use client";

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useSpring, Variants } from 'framer-motion';
import Image from 'next/image';
import BenefitsSection from '../components/BenefitsSection';
import GuaranteeSection from '../components/GuaranteeSection';
import CoursesOfferedSection from '../components/CoursesOfferedSection';
import CourseSchedule from '../components/CourseSchedule';
import LearningRoadmap from '../components/LearningRoadmap';
import RegistrationSteps from '../components/RegistrationSteps';
import FAQSection from '../components/FAQSection';
import GroupPricingPolicy from '../components/GroupPricingPolicy';
import TrainingPolicy from '../components/TrainingPolicy';

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        course: formData.get('course'),
        message: formData.get('message'),
      };

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }

      setSuccess(true);
      e.currentTarget.reset();
      
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#fc5d01] origin-left z-50"
        style={{ scaleX }}
      />

      {/* Hero Section with Registration Form */}
      <motion.div 
        className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Background Pattern */}
        <motion.div 
          className="absolute inset-0 opacity-10"
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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-white/50 to-transparent"></div>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          {/* Logo */}
          <motion.div
            className="flex justify-center m-20"
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

          <motion.div 
            className="grid md:grid-cols-2 gap-12 items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Left Column - Text */}
            <motion.div 
              className="text-white relative"
              variants={containerVariants}
            >
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-6"
                variants={itemVariants}
              >
                Đăng Ký Tư Vấn Khóa Học PTE
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl mb-8 text-white/90"
                variants={itemVariants}
              >
                Để lại thông tin để được tư vấn chi tiết về lộ trình học phù hợp với mục tiêu của bạn.
              </motion.p>
              {[
                "Cam kết đầu ra",
                "Giảng viên chuyên môn cao",
                "Lộ trình học tập cá nhân hóa"
              ].map((feature, index) => (
                <motion.div 
                  key={feature}
                  className="flex items-center gap-4 text-lg mt-4"
                  variants={itemVariants}
                  custom={index}
                >
                  <motion.svg 
                    className="w-6 h-6" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </motion.svg>
                  <span>{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Right Column - Form */}
            <motion.div 
              className="relative"
              variants={itemVariants}
            >
              <motion.div 
                className="bg-white rounded-2xl shadow-xl p-8"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#fc5d01] focus:border-[#fc5d01]"
                      placeholder="Nhập họ và tên của bạn"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#fc5d01] focus:border-[#fc5d01]"
                      placeholder="Nhập số điện thoại của bạn"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#fc5d01] focus:border-[#fc5d01]"
                      placeholder="Nhập địa chỉ email của bạn"
                    />
                  </div>

                  <div>
                    <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
                      Khóa học quan tâm
                    </label>
                    <select
                      name="course"
                      id="course"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#fc5d01] focus:border-[#fc5d01]"
                    >
                      <option value="">Chọn khóa học</option>
                      <option value="pre-pte">Khóa Học PRE-PTE</option>
                      <option value="pte-30-36">Khóa Học PTE 30-36</option>
                      <option value="pte-50">Khóa Học PTE 50+</option>
                      <option value="pte-1-1">Khóa Học PTE 1 kèm 1</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Tin nhắn (không bắt buộc)
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#fc5d01] focus:border-[#fc5d01]"
                      placeholder="Nhập tin nhắn của bạn"
                    />
                  </div>

                  {error && (
                    <div className="text-red-500 text-sm">
                      {error}
                    </div>
                  )}

                  {success && (
                    <div className="text-green-500 text-sm">
                      Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full px-6 py-3 bg-[#fc5d01] text-white rounded-lg hover:bg-[#fd7f33] transition-colors ${
                      isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isLoading ? 'Đang xử lý...' : 'Đăng Ký Ngay'}
                  </button>
                </form>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Other Sections */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <RegistrationSteps />
        </motion.div>

        <motion.div variants={itemVariants}>
          <CoursesOfferedSection />
        </motion.div>

        <motion.div variants={itemVariants}>
          <CourseSchedule />
        </motion.div>

        <motion.div variants={itemVariants}>
          <GroupPricingPolicy />
        </motion.div>

        <motion.div variants={itemVariants}>
          <TrainingPolicy />
        </motion.div>

        <motion.div variants={itemVariants}>
          <LearningRoadmap />
        </motion.div>

        <motion.div variants={itemVariants}>
          <FAQSection />
        </motion.div>

        <motion.div variants={itemVariants}>
          <BenefitsSection />
        </motion.div>

        <motion.div variants={itemVariants}>
          <GuaranteeSection />
        </motion.div>
      </motion.div>

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
