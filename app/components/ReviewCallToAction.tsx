"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { reviewData } from '../../lib/reviewData';
import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';

export default function ReviewCallToAction() {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  // Calculate statistics
  const stats = {
    totalStudents: reviewData.length,
    successRate: Math.round((reviewData.filter(r => r.rating >= 4).length / reviewData.length) * 100),
    averageImprovement: Math.round(
      reviewData
        .filter(r => r.beforeScore && r.afterScore)
        .reduce((acc, r) => {
          const before = parseInt(r.beforeScore?.split(' ')[0] || '0');
          const after = parseInt(r.afterScore?.split(' ')[0] || '0');
          return acc + (after - before);
        }, 0) / reviewData.filter(r => r.beforeScore && r.afterScore).length
    ),
    quickestSuccess: Math.min(
      ...reviewData
        .filter(r => r.studyDuration)
        .map(r => parseInt(r.studyDuration?.split(' ')[0] || '999'))
    )
  };

  // Get top testimonials using useMemo to prevent unnecessary recalculations
  const topTestimonials = useMemo(() => 
    reviewData
      .filter(r => r.rating === 5 && r.comment.length > 200)
      .sort((a, b) => b.comment.length - a.comment.length)
      .slice(0, 3),
    []  // Empty dependency array since reviewData is static
  );

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prev) => 
        prev === topTestimonials.length - 1 ? 0 : prev + 1
      );
    }, 10000);
    return () => clearInterval(interval);
  }, [topTestimonials.length]);  // Added topTestimonials.length as dependency

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Rest of the component code remains exactly the same...
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
    <section className="relative py-20 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10" />
      
      <motion.div 
        className="relative max-w-7xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main CTA */}
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Sẵn Sàng Chinh Phục<br />PTE Academic?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Hãy để chúng tôi đồng hành cùng bạn trong hành trình chinh phục mục tiêu PTE
            </p>

            {/* Promotion Timer */}
            <div className="bg-white/10 rounded-lg p-6 mb-8">
              <div className="text-lg font-medium mb-4">
                Ưu đãi đặc biệt kết thúc trong:
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">{timeLeft.days}</div>
                  <div className="text-sm opacity-80">Ngày</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{timeLeft.hours}</div>
                  <div className="text-sm opacity-80">Giờ</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{timeLeft.minutes}</div>
                  <div className="text-sm opacity-80">Phút</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{timeLeft.seconds}</div>
                  <div className="text-sm opacity-80">Giây</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-white text-[#fc5d01] rounded-lg hover:bg-[#fedac2] transition-all font-medium group"
                >
                  <span>Đăng Ký Ngay</span>
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-all font-medium"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>Tư Vấn Miễn Phí</span>
                </Link>
              </motion.div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div variants={itemVariants} className="bg-white/10 rounded-lg p-4">
                <div className="text-3xl font-bold mb-2">1000+</div>
                <div className="opacity-90 text-sm">Học viên thành công</div>
              </motion.div>
              <motion.div variants={itemVariants} className="bg-white/10 rounded-lg p-4">
                <div className="text-3xl font-bold mb-2">{stats.successRate}%</div>
                <div className="opacity-90 text-sm">Đạt mục tiêu</div>
              </motion.div>
              <motion.div variants={itemVariants} className="bg-white/10 rounded-lg p-4">
                <div className="text-3xl font-bold mb-2">+20</div>
                <div className="opacity-90 text-sm">Điểm tăng trung bình</div>
              </motion.div>
              <motion.div variants={itemVariants} className="bg-white/10 rounded-lg p-4">
                <div className="text-3xl font-bold mb-2">1.5</div>
                <div className="opacity-90 text-sm">Tháng học ngắn nhất</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Testimonial Carousel */}
          <motion.div 
            variants={itemVariants}
            className="relative"
          >
            {topTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className={`absolute inset-0 transition-all duration-500 ${
                  index === currentTestimonialIndex ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                }`}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.studentImage}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">{testimonial.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{testimonial.score}</span>
                        <span>•</span>
                        <span className="opacity-90">{testimonial.course}</span>
                      </div>
                      {testimonial.studyDuration && (
                        <div className="text-sm opacity-80 mt-1">
                          Thời gian học: {testimonial.studyDuration}
                        </div>
                      )}
                    </div>
                  </div>

                  <blockquote className="relative">
                    <svg className="absolute top-0 left-0 transform -translate-x-6 -translate-y-8 h-16 w-16 text-white/20" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <p className="relative text-lg opacity-90 line-clamp-6 pl-4">
                      {testimonial.comment}
                    </p>
                  </blockquote>

                  {testimonial.facebookLink && (
                    <Link
                      href={testimonial.facebookLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-4 text-sm hover:opacity-80 transition-opacity"
                    >
                      Xem đánh giá trên Facebook
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Carousel Navigation */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
              {topTestimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentTestimonialIndex ? 'bg-white w-6' : 'bg-white/50'
                  }`}
                  onClick={() => setCurrentTestimonialIndex(index)}
                />
              ))}
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/5 rounded-full blur-xl" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full blur-xl" />
          </motion.div>
        </div>

        {/* Trust Badges */}
        <motion.div
          className="mt-20 flex flex-wrap justify-center gap-8"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center">
            <div className="w-16 h-16 mx-auto mb-2">
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="text-sm opacity-90">Cam Kết Chất Lượng</div>
          </motion.div>
          <motion.div variants={itemVariants} className="text-center">
            <div className="w-16 h-16 mx-auto mb-2">
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-sm opacity-90">Lộ Trình Tối Ưu</div>
          </motion.div>
          <motion.div variants={itemVariants} className="text-center">
            <div className="w-16 h-16 mx-auto mb-2">
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="text-sm opacity-90">Giảng Viên Chuyên Nghiệp</div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
