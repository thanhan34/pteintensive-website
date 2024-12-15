'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      {/* Logo */}
      <motion.div
        className="relative w-48 h-16 mb-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src="/images/logo/orange-logo.png"
          alt="PTE Intensive Logo"
          fill
          className="object-contain"
        />
      </motion.div>

      {/* Loading Spinner */}
      <motion.div
        className="w-12 h-12 border-4 border-[#FF4D00]/20 border-t-[#FF4D00] rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
}
