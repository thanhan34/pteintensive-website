"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface ReviewGalleryProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReviewGallery({ isOpen, onClose }: ReviewGalleryProps) {
  // Generate array of review image paths
  const reviewImages = Array.from({ length: 33 }, (_, i) => `/images/reviews/${i + 52}.png`);

  return (
    <>
      {/* Preview Grid */}
      <motion.div 
        className="relative w-full h-[300px] rounded-2xl overflow-hidden mb-16 cursor-pointer group"
        onClick={() => onClose()}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 grid grid-cols-4 gap-2 p-2">
          {reviewImages.slice(0, 8).map((src, index) => (
            <div key={index} className="relative w-full h-full">
              <Image
                src={src}
                alt={`Review ${index + 1}`}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <p className="text-white text-xl font-semibold">Xem tất cả hình ảnh</p>
        </div>
      </motion.div>

      {/* Full Gallery Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 p-4 overflow-y-auto"
          >
            <div className="absolute top-4 right-4 z-50">
              <button
                onClick={onClose}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <motion.div 
              className="columns-2 md:columns-3 lg:columns-4 gap-4 max-w-7xl mx-auto pt-16"
              variants={{
                show: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              animate="show"
            >
              {reviewImages.map((src, index) => (
                <motion.div
                  key={index}
                  className="relative mb-4 break-inside-avoid group"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 }
                  }}
                >
                  <Image
                    src={src}
                    alt={`Review ${index + 1}`}
                    width={400}
                    height={600}
                    className="rounded-lg w-full transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
