"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaUsers, FaClock, FaVideo, FaBook } from 'react-icons/fa';
import { type Course } from '../../../lib/courseData';

interface CourseDetailClientProps {
  course: Course;
}

export default function CourseDetailClient({ course }: CourseDetailClientProps) {
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
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] text-white py-20 overflow-hidden">
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

        <div className="max-w-7xl mx-auto px-4">
          {/* Logo */}
          <motion.div
            className="flex justify-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-48 h-16">
              <Image
                src="/images/logo/white-logo.png"
                alt="PTE Intensive Logo"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="relative"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-6"
                variants={itemVariants}
              >
                {course.title}
              </motion.h1>
              <motion.p 
                className="text-xl mb-8 opacity-90"
                variants={itemVariants}
              >
                {course.description}
              </motion.p>
              <motion.div 
                className="flex flex-wrap gap-4"
                variants={itemVariants}
              >
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>{course.classSize}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>{course.guarantee}</span>
                </div>
              </motion.div>

              <motion.div 
                className="mt-8 flex flex-wrap gap-4"
                variants={itemVariants}
              >
                <Link
                  href="/register"
                  className="inline-flex items-center px-6 py-3 bg-white text-[#fc5d01] rounded-lg hover:bg-[#fedac2] transition-colors"
                >
                  <span>Đăng Ký Ngay</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors"
                >
                  Tư Vấn Miễn Phí
                </Link>
              </motion.div>
            </motion.div>

            <motion.div 
              className="relative"
              variants={itemVariants}
            >
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>
              {/* Hot News Badge */}
              {course.isHot && (
                <motion.div
                  className="absolute -top-8 -right-8 w-32 h-32"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <Image
                    src="/images/HOT NEWS.png"
                    alt="Hot News"
                    fill
                    className="object-contain"
                  />
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Details Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 gap-12"
          >
            {/* Target Students */}
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-[#fc5d01]">Đối tượng học viên</h2>
              <ul className="space-y-4">
                {course.targetStudents?.map((target, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-[#fc5d01] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{target}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Course Information */}
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-[#fc5d01]">Thông tin khóa học</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FaClock className="w-6 h-6 text-[#fc5d01]" />
                  <div>
                    <span className="font-semibold">Thời lượng:</span>
                    <p>{course.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaVideo className="w-6 h-6 text-[#fc5d01]" />
                  <div>
                    <span className="font-semibold">Hình thức:</span>
                    <p>{course.format}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaUsers className="w-6 h-6 text-[#fc5d01]" />
                  <div>
                    <span className="font-semibold">Số lượng học viên:</span>
                    <p>{course.classSize}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaBook className="w-6 h-6 text-[#fc5d01]" />
                  <div>
                    <span className="font-semibold">Tài liệu học tập:</span>
                    <p>{course.materials}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Course Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-12"
          >
            <h2 className="text-2xl font-bold mb-8 text-center text-[#fc5d01]">Nội dung khóa học</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {course.phases?.map((phase, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white p-6 rounded-xl shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#fc5d01] text-white flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <h3 className="font-semibold">Giai đoạn {index + 1}</h3>
                  </div>
                  <p className="text-gray-600">{phase}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Course Benefits */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-12 bg-white p-8 rounded-xl shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-6 text-[#fc5d01]">Ưu đãi đặc biệt của khóa học</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {course.benefits?.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-start gap-3"
                >
                  <svg className="w-6 h-6 text-[#fc5d01] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
