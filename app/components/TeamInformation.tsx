"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { teacherData } from '@/lib/teacherData';

export default function TeamInformation() {
  const [selectedTeacher, setSelectedTeacher] = useState<number | null>(null);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Đội Ngũ Giảng Viên
            <span className="text-[#fc5d01]"> Chuyên Môn Cao</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Những chuyên gia hàng đầu với kinh nghiệm và tâm huyết trong giảng dạy PTE Academic
          </p>
        </motion.div>

        {/* Teacher Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {teacherData.map((teacher, index) => (
            <motion.div
              key={teacher.id}
              className={`relative group cursor-pointer ${
                selectedTeacher === index ? 'ring-2 ring-[#fc5d01]' : ''
              }`}
              onClick={() => setSelectedTeacher(index)}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                <Image
                  src={teacher.image}
                  alt={teacher.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold">{teacher.name}</h3>
                  <p className="text-sm opacity-90">{teacher.position}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected Teacher Details */}
        <AnimatePresence mode="wait">
          {selectedTeacher !== null && (
            <motion.div
              key={selectedTeacher}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto"
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative aspect-square rounded-xl overflow-hidden">
                  <Image
                    src={teacherData[selectedTeacher].image}
                    alt={teacherData[selectedTeacher].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {teacherData[selectedTeacher].name}
                  </h3>
                  <div className="text-[#fc5d01] font-medium mb-2">
                    {teacherData[selectedTeacher].position}
                  </div>
                  <div className="text-gray-600 mb-4">
                    {teacherData[selectedTeacher].location}
                  </div>
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-800 mb-1">Qualifications</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      {teacherData[selectedTeacher].qualifications.map((qual, idx) => (
                        <li key={idx}>{qual}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-3">
                    {teacherData[selectedTeacher].achievements.map((achievement, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-5 h-5 bg-[#fc5d01]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <svg className="w-3 h-3 text-[#fc5d01]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-600">{achievement}</span>
                      </motion.div>
                    ))}
                  </div>
                  {teacherData[selectedTeacher].quotes.length > 0 && (
                    <div className="mt-6 pt-4 border-t">
                      <div className="space-y-2">
                        {teacherData[selectedTeacher].quotes.map((quote, idx) => (
                          <p key={idx} className="text-sm italic text-gray-600">"{quote}"</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Đội ngũ giảng viên của chúng tôi không chỉ là những người thầy, mà còn là những người bạn đồng hành, 
            luôn sẵn sàng hỗ trợ và truyền cảm hứng cho học viên trên con đường chinh phục PTE Academic.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
