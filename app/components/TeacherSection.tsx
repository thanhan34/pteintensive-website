"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { teacherData } from '../../lib/teacherData';

export default function TeacherSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setActiveIndex((prevIndex) => {
      let newIndex = prevIndex + newDirection;
      if (newIndex < 0) newIndex = teacherData.length - 1;
      if (newIndex >= teacherData.length) newIndex = 0;
      return newIndex;
    });
  };

  return (
    <section className="w-full py-20 bg-gradient-to-b from-white to-[#fedac2]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Đội Ngũ Giáo Viên
            <span className="text-[#fc5d01]"> Tận Tâm - Tâm Huyết</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Là những giáo viên giỏi kiến thức và giỏi truyền đạt. Rất tận tâm với học viên, 
            dạy vì cái tâm và luôn khát khao học viên đạt mục tiêu đề ra.
          </p>
        </motion.div>

        {/* Teacher Showcase */}
        <div className="relative h-[700px] max-w-6xl mx-auto">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full"
            >
              <div className="grid md:grid-cols-2 gap-12 items-start">
                {/* Image */}
                <motion.div 
                  className="relative h-[500px] rounded-3xl overflow-hidden shadow-xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Image
                    src={teacherData[activeIndex].image}
                    alt={teacherData[activeIndex].name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </motion.div>

                {/* Content */}
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-4xl font-bold text-gray-900 mb-3">
                      {teacherData[activeIndex].name}
                    </h3>
                    <p className="text-xl text-[#fc5d01] font-medium mb-2">
                      {teacherData[activeIndex].position}
                    </p>
                    <p className="text-lg text-gray-600 mb-2">
                      {teacherData[activeIndex].experience}
                    </p>
                    <p className="text-lg text-gray-600 mb-4">                      
                      {teacherData[activeIndex].location}
                    </p>

                    {/* Qualifications */}
                    {teacherData[activeIndex].qualifications.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Bằng cấp</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {teacherData[activeIndex].qualifications.map((qual, idx) => (
                            <li key={idx} className="text-gray-700">{qual}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Achievements */}
                    <div className="space-y-4">
                      {teacherData[activeIndex].achievements.map((achievement, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + idx * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-6 h-6 flex-shrink-0 bg-[#fc5d01]/10 rounded-full flex items-center justify-center mt-1">
                            <svg 
                              className="w-4 h-4 text-[#fc5d01]" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M5 13l4 4L19 7" 
                              />
                            </svg>
                          </div>
                          <p className="text-gray-700 text-lg">{achievement}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Quotes */}
                    {teacherData[activeIndex].quotes.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-8 text-gray-600 italic"
                      >
                        &quot;{teacherData[activeIndex].quotes[0]}&quot;
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-[#fc5d01] hover:bg-[#fc5d01] hover:text-white transition-colors shadow-lg z-10"
            onClick={() => paginate(-1)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-[#fc5d01] hover:bg-[#fc5d01] hover:text-white transition-colors shadow-lg z-10"
            onClick={() => paginate(1)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {teacherData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > activeIndex ? 1 : -1);
                setActiveIndex(idx);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === activeIndex 
                  ? 'bg-[#fc5d01] w-8' 
                  : 'bg-[#fc5d01]/20 hover:bg-[#fc5d01]/40'
              }`}
            />
          ))}
        </div>

        {/* Teacher Grid Preview */}
        <div className="grid grid-cols-4 gap-4 mt-12">
          {teacherData.map((teacher, idx) => (
            <motion.button
              key={idx}
              onClick={() => {
                setDirection(idx > activeIndex ? 1 : -1);
                setActiveIndex(idx);
              }}
              className={`relative h-24 rounded-lg overflow-hidden transition-all duration-300 ${
                idx === activeIndex ? 'ring-2 ring-[#fc5d01]' : 'opacity-60 hover:opacity-100'
              }`}
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src={teacher.image}
                alt={teacher.name}
                fill
                className="object-cover"
              />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
