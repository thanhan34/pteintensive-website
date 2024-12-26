"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { reviewData } from '../../lib/reviewData';

interface Review {
  id: string;
  name: string;
  course: string;
  rating: number;
  comment: string;
  studentImage: string;
  scoreImage: string;
  score?: string;
  date?: string;
  platform?: string;
  achievement?: string;
  beforeScore?: string;
  afterScore?: string;
  studyDuration?: string;
  facebookLink: string;
}

export default function ReviewSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

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
    <section className="py-20 bg-gradient-to-b from-[#fedac2]/10 to-white relative">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Đánh Giá Từ Học Viên
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Những chia sẻ chân thực về trải nghiệm học tập tại PTE INTENSIVE
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-max"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {reviewData.map((review: Review) => {
            const isSelected = selectedId === review.id;

            return (
              <motion.div
                key={review.id}
                className={`${isSelected ? 'md:col-span-2 lg:col-span-3' : ''}`}
                layout
              >
                <motion.div
                  layoutId={`card-container-${review.id}`}
                  className={`relative ${isSelected ? 'h-[500px]' : 'h-[400px]'} rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all duration-500 ${
                    selectedId ? 'hover:transform-none' : 'hover:-translate-y-2'
                  } group`}
                  onClick={() => setSelectedId(selectedId === review.id ? null : review.id)}
                >
                  {/* Background Image */}
                  <motion.div layoutId={`card-image-${review.id}`} className="absolute inset-0">
                    <Image
                      src={review.studentImage}
                      alt={review.name}
                      fill
                      className={`object-cover transition-transform duration-500 ${isSelected ? 'object-center' : 'object-top'}`}
                      priority={true}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent group-hover:via-black/60 transition-all duration-300" />
                  </motion.div>

                  {/* Content */}
                  <motion.div 
                    layoutId={`card-content-${review.id}`} 
                    className="absolute inset-0 p-6 flex flex-col justify-end text-white transform group-hover:scale-[1.02] transition-transform duration-300"
                  >
                    <div className={`${isSelected ? 'max-w-3xl mx-auto w-full' : ''}`}>
                      <motion.h3 
                        className="text-2xl font-bold mb-2 transform group-hover:translate-y-[-4px] transition-transform duration-300"
                      >
                        {review.name}
                      </motion.h3>
                      <div className="flex items-center gap-2 mb-3 transform group-hover:translate-y-[-2px] transition-transform duration-300">
                        {review.score && <div className="text-[#fc5d01] font-semibold">{review.score}</div>}
                        <div className="text-[#fc5d01]/90">{review.course}</div>
                      </div>

                      {/* Rating Stars */}
                      <div className="flex mb-3 transform group-hover:scale-110 transition-transform duration-300 origin-left">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-400'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>

                      {/* Preview Comment with line breaks */}
                      <div className={`text-white/90 ${isSelected ? 'line-clamp-3' : 'line-clamp-2'} mb-4 text-sm whitespace-pre-line leading-relaxed transform group-hover:translate-y-[-1px] transition-all duration-300`}>
                        {review.comment}
                      </div>

                      <div className="flex items-center justify-between text-sm transform group-hover:translate-y-[-1px] transition-transform duration-300">
                        {review.date && (
                          <div className="text-white/80 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {review.date}
                          </div>
                        )}
                        {review.studyDuration && (
                          <div className="text-white/80 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {review.studyDuration}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-b-2xl shadow-lg overflow-hidden"
                    >
                      <div className="p-8 max-w-4xl mx-auto">
                        {/* Before/After Scores */}
                        {(review.beforeScore || review.afterScore) && (
                          <div className="bg-gray-50 rounded-xl p-6 mb-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">Tiến Độ Học Tập</h4>
                            <div className="flex items-center justify-between">
                              <div className="text-center">
                                <div className="text-sm text-gray-500 mb-1">Trước</div>
                                <div className="text-2xl font-bold">{review.beforeScore || 'N/A'}</div>
                              </div>
                              <div className="flex-1 px-6">
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <motion.div 
                                    className="h-full bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ 
                                      width: `${Math.min(100, (parseInt(review.afterScore?.split(' ')[0] || review.score?.split(' ')[0] || '0') / 90) * 100)}%`
                                    }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                  />
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="text-sm text-gray-500 mb-1">Sau</div>
                                <div className="text-2xl font-bold text-[#fc5d01]">
                                  {review.afterScore || review.score}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Full Comment */}
                        <div className="prose prose-lg max-w-none">
                          {review.comment.split('\n').map((paragraph: string, index: number) => (
                            <p key={index} className="text-gray-600 mb-4 leading-relaxed whitespace-pre-line">{paragraph}</p>
                          ))}
                        </div>

                        {/* Footer */}
                        {review.facebookLink && (
                          <div className="mt-6 pt-6 border-t border-gray-100">
                            <Link 
                              href={review.facebookLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#fc5d01] hover:text-[#fd7f33] font-medium flex items-center gap-1 hover:translate-x-1 transition-all"
                            >
                              <span>Xem trên Facebook</span>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </Link>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
