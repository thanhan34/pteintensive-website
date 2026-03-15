"use client";

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useMemo, useState } from 'react';

const studentReviews = Array.from({ length: 26 }, (_, index) => ({
  id: index + 1,
  src: `/images/studentreviews/${index + 1}.svg`,
  title: `Student Review ${index + 1}`,
}));

export default function StudentReviewsGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const featuredReviews = useMemo(() => studentReviews.slice(0, 26), []);

  return (
    <section className="relative overflow-hidden bg-white px-4 py-20 sm:py-24">

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="relative mb-14 overflow-hidden rounded-[28px] border border-[#fc5d01]/10 bg-white px-6 py-10 text-center shadow-[0_20px_60px_rgba(17,24,39,0.08)] sm:px-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#fc5d01]/30 to-transparent" />
          <div className="mb-5 inline-flex min-h-[44px] items-center rounded-full border border-[#fc5d01]/15 bg-[#fff7f2] px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#fc5d01]">
            Student Reviews
          </div>
          <h2 className="text-[28px] font-bold leading-tight text-gray-900 md:text-[36px]">
            Hình ảnh review từ học viên
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-gray-600 md:text-base">
            Tổng hợp review thực tế từ học viên tại PTE Intensive. Bạn có thể bấm vào từng ảnh để xem rõ hơn.
          </p>
          
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredReviews.map((review, index) => (
            <motion.button
              key={review.id}
              type="button"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              whileHover={{ y: -2 }}
              whileTap={{ y: 2 }}
              onClick={() => setSelectedImage(review.src)}
              className="group relative aspect-[4/5] overflow-hidden rounded-[26px] border border-gray-200 bg-white p-3 text-left shadow-[0_18px_45px_rgba(17,24,39,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#fc5d01]/25 hover:shadow-[0_28px_65px_rgba(17,24,39,0.12)] focus-visible:accent-ring"
            >
              <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#fc5d01]/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative h-full w-full overflow-hidden rounded-[20px] bg-[#fafafa]">
                <Image
                  src={review.src}
                  alt={review.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
                  <div className="rounded-full border border-white/20 bg-white/92 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-900 shadow-[0_10px_30px_rgba(17,24,39,0.18)] backdrop-blur-md">
                    Review học viên
                  </div>
                  <div className="rounded-full bg-[#fc5d01] px-3 py-2 text-xs font-semibold text-white shadow-[0_10px_24px_rgba(252,93,1,0.28)]">
                    Xem ảnh
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#05070d]/90 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/15 bg-white p-3 shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute right-4 top-4 z-10 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-[0_12px_30px_rgba(17,24,39,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#fc5d01]/25 hover:text-[#fc5d01] focus-visible:accent-ring"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[22px] bg-[#fafafa] sm:aspect-[16/10]">
                <Image
                  src={selectedImage}
                  alt="Student review enlarged"
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}