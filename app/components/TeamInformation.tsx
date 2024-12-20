"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function TeamInformation() {
  const [selectedTeacher, setSelectedTeacher] = useState<number | null>(null);

  const team = [
    {
      name: "An Doan",
      role: "Founder",
      expertise: "PTE Expert & Academic Director",
      image: "/images/trainers/an doan 1.jpg",
      achievements: [
        "10+ years of teaching experience",
        "Certified PTE Academic trainer",
        "Expert in test preparation strategies",
        "Trained 1000+ successful students"
      ],
      description: "Người sáng lập và dẫn dắt PTE LIFE với tầm nhìn và sứ mệnh rõ ràng."
    },
    {
      name: "Bach Yen",
      role: "Co-Founder",
      expertise: "Lead Academic Consultant",
      image: "/images/trainers/bach yen.jpg",
      achievements: [
        "Extensive experience in English education",
        "Specialized in curriculum development",
        "Expert in student mentoring",
        "Innovative teaching methodologies"
      ],
      description: "Đồng sáng lập và phát triển chương trình giảng dạy chất lượng cao."
    },
    {
      name: "Bích Diệp",
      role: "Senior Instructor",
      expertise: "Writing Skills Specialist",
      image: "/images/trainers/BichDiep.png",
      achievements: [
        "Expert in PTE Writing",
        "Developed writing improvement strategies",
        "Personalized teaching approach",
        "High student success rate"
      ],
      description: "Chuyên gia về kỹ năng Writing với phương pháp giảng dạy độc đáo."
    },
    {
      name: "Phương Tuyết",
      role: "Senior Instructor",
      expertise: "Speaking Skills Expert",
      image: "/images/trainers/PhuongTuyet.jpg",
      achievements: [
        "Specialized in pronunciation training",
        "Speaking skills enhancement expert",
        "Fluency development techniques",
        "Accent reduction specialist"
      ],
      description: "Chuyên gia về kỹ năng Speaking với phương pháp phát âm chuẩn."
    },
    {
      name: "Thanh Hương",
      role: "Lead Instructor",
      expertise: "Reading Comprehension Specialist",
      image: "/images/trainers/ThanhHuong.png",
      achievements: [
        "Reading strategies expert",
        "Comprehension skills trainer",
        "Speed reading techniques",
        "Advanced analysis methods"
      ],
      description: "Chuyên gia về kỹ năng Reading với phương pháp đọc hiểu hiệu quả."
    },
    {
      name: "Thanh Tâm",
      role: "Senior Instructor",
      expertise: "Listening Skills Expert",
      image: "/images/trainers/ThanhTam.png",
      achievements: [
        "Listening comprehension specialist",
        "Note-taking strategies expert",
        "Audio analysis techniques",
        "Pattern recognition training"
      ],
      description: "Chuyên gia về kỹ năng Listening với phương pháp nghe hiểu độc đáo."
    },
    {
      name: "Thu Hương",
      role: "Lead Instructor",
      expertise: "Integrated Skills Specialist",
      image: "/images/trainers/ThuHuong.png",
      achievements: [
        "Comprehensive skills trainer",
        "Integrated learning expert",
        "Strategic test preparation",
        "Student success mentor"
      ],
      description: "Chuyên gia toàn diện với phương pháp giảng dạy tích hợp."
    }
  ];

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
          {team.map((teacher, index) => (
            <motion.div
              key={index}
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
                  <p className="text-sm opacity-90">{teacher.expertise}</p>
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
                    src={team[selectedTeacher].image}
                    alt={team[selectedTeacher].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {team[selectedTeacher].name}
                  </h3>
                  <div className="text-[#fc5d01] font-medium mb-2">
                    {team[selectedTeacher].role}
                  </div>
                  <div className="text-gray-600 mb-4">
                    {team[selectedTeacher].expertise}
                  </div>
                  <p className="text-gray-600 mb-6">
                    {team[selectedTeacher].description}
                  </p>
                  <div className="space-y-3">
                    {team[selectedTeacher].achievements.map((achievement, idx) => (
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
