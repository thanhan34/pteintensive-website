"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function TeamInformation() {
  const team = [
    {
      name: "An Doan",
      role: "Founder",
      expertise: "PTE Expert & Academic Director",
      image: "/images/trainers/an doan 1.jpg",
      achievements: [
        "10+ years of teaching experience",
        "Certified PTE Academic trainer",
        "Expert in test preparation strategies"
      ]
    },
    {
      name: "Bach Yen",
      role: "Co-Founder",
      expertise: "Lead Academic Consultant",
      image: "/images/trainers/bach yen.jpg",
      achievements: [
        "Extensive experience in English education",
        "Specialized in curriculum development",
        "Expert in student mentoring"
      ]
    }
  ];

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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Đội Ngũ Giảng Viên
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Những chuyên gia hàng đầu với kinh nghiệm và tâm huyết trong giảng dạy PTE Academic
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {team.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gradient-to-br from-white to-[#fedac2]/10 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="relative w-48 h-48 flex-shrink-0">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
                <div className="flex-grow text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <div className="text-[#fc5d01] font-medium mb-2">
                    {member.role}
                  </div>
                  <div className="text-gray-600 mb-4">
                    {member.expertise}
                  </div>
                  <ul className="space-y-2">
                    {member.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#fc5d01] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Đội ngũ giảng viên của chúng tôi không chỉ là những người thầy, mà còn là những người bạn đồng hành, luôn sẵn sàng hỗ trợ và truyền cảm hứng cho học viên trên con đường chinh phục PTE Academic.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
