"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import CompanyIntro from '../components/CompanyIntro';
import FounderMessage from '../components/FounderMessage';
import CoFounderMessage from '../components/CoFounderMessage';
import MissionValues from '../components/MissionValues';
import TeachingMethodology from '../components/TeachingMethodology';
import TeamInformation from '../components/TeamInformation';
import ReviewCallToAction from '../components/ReviewCallToAction';

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-20">
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

        <div className="max-w-7xl mx-auto px-4 text-center relative">
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

          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Về Chúng Tôi
          </motion.h1>
          <motion.p 
            className="text-xl opacity-90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Khám phá hành trình của PTE INTENSIVE và đội ngũ giảng viên tận tâm của chúng tôi
          </motion.p>
        </div>
      </section>

      {/* Company Introduction */}
      <div className="bg-white">
        <CompanyIntro />
      </div>

      {/* Mission and Values */}
      <div className="bg-gradient-to-b from-white to-[#fedac2]/10">
        <MissionValues />
      </div>

      {/* Teaching Methodology */}
      <div className="bg-gradient-to-b from-[#fedac2]/10 to-white">
        <TeachingMethodology />
      </div>

      {/* Leadership Messages */}
      <div className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            className="space-y-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <FounderMessage />
            {/* <CoFounderMessage /> */}
          </motion.div>
        </div>
      </div>

      {/* Team Information */}
      <div className="bg-gradient-to-b from-white to-[#fedac2]/10">
        <TeamInformation />
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-b from-[#fedac2]/10 to-white">
        <ReviewCallToAction />
      </div>
    </main>
  );
}
