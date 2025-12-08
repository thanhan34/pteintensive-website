"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';

const videoReviews = [
  {
    id: 1,
    name: "Du Nguyễn",
    videoUrl: "https://www.facebook.com/reel/1544208246479839",
    embedUrl: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1544208246479839&show_text=false&width=267&t=0",
    achievement: "PTE24 - Visa 407",
    course: "Lớp 30-36"
  },
  {
    id: 2,
    name: "Hà Thị Mỹ Linh",
    videoUrl: "https://www.facebook.com/reel/1846982872581132",
    embedUrl: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1846982872581132&show_text=false&width=267&t=0",
    achievement: "PTE50 - Visa 500",
    course: "Lớp Nhóm Online 50+"
  },
  {
    id: 3,
    name: "Hương Quỳnh",
    videoUrl: "https://www.facebook.com/reel/1697383781219962",
    embedUrl: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1697383781219962&show_text=false&width=267&t=0",
    achievement: "PTE36 - Visa 482",
    course: "Lớp 30-36"
  }
];

export default function VideoReviewGallery() {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  const openModal = (id: number) => {
    setSelectedVideo(id);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-[#fedac2]/10 to-white overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `repeating-linear-gradient(45deg, #fc5d01 0, #fc5d01 1px, transparent 0, transparent 50%)`,
          backgroundSize: '20px 20px'
        }} />
      </div>
      
      {/* Decorative Background Elements with Animation */}
      <motion.div 
        className="absolute top-1/4 -right-10 w-96 h-96 bg-[#fc5d01]/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 9, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-1/4 -left-10 w-72 h-72 bg-[#fd7f33]/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 7, repeat: Infinity, delay: 1 }}
      />
      
      {/* Floating Video Icons */}
      <motion.div
        className="absolute top-32 left-16 text-[#fc5d01]/10"
        animate={{ 
          y: [0, -15, 0],
          x: [0, 10, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
        </svg>
      </motion.div>
      
      <motion.div
        className="absolute bottom-32 right-16 text-[#fd7f33]/10"
        animate={{ 
          y: [0, 15, 0],
          x: [0, -10, 0],
          rotate: [0, -10, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
      >
        <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
        </svg>
      </motion.div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-[#fc5d01]" />
            <span className="bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] text-white px-6 py-2.5 rounded-full text-sm font-bold tracking-wide shadow-lg">
              🎥 VIDEO ĐÁNH GIÁ
            </span>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-[#fd7f33]" />
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-[#fc5d01] via-[#fd7f33] to-[#fc5d01] bg-clip-text text-transparent">
              Học Viên Chia Sẻ
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Trải nghiệm thực tế và câu chuyện thành công từ các học viên PTE INTENSIVE
          </motion.p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8 mb-16 pb-16 border-b-2 border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">100+ Video Reviews</p>
              <p className="text-xs text-gray-500">Thật và chân thực</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">5.0 Rating</p>
              <p className="text-xs text-gray-500">Từ học viên</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Verified Success</p>
              <p className="text-xs text-gray-500">Kết quả đạt mục tiêu</p>
            </div>
          </div>
        </motion.div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videoReviews.map((review, index) => (
            <motion.div
              key={review.id}
              className="group relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
            >
              {/* Glow Effect on Hover */}
              <motion.div 
                className="absolute -inset-1 bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] rounded-3xl opacity-0 group-hover:opacity-20 blur-xl"
                animate={{ opacity: [0, 0.1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Corner Decoration */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-l-4 border-t-4 border-[#fc5d01] rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-4 border-b-4 border-[#fd7f33] rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div 
                className="relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 group-hover:border-[#fc5d01]/30 cursor-pointer"
                onClick={() => openModal(review.id)}
              >
                {/* Achievement Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <div className="bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>{review.achievement}</span>
                  </div>
                </div>

                {/* Video Container - Portrait Format 9:16 */}
                <div className="relative aspect-[9/16] bg-gradient-to-br from-gray-900 to-black overflow-hidden">
                  {/* Facebook Embedded Video */}
                  <iframe
                    src={review.embedUrl}
                    className="w-full h-full"
                    style={{ border: 'none', overflow: 'hidden' }}
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div
                      className="relative"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.15 }}
                    >
                      {/* Pulsing Ring */}
                      <motion.div
                        className="absolute inset-0 w-24 h-24 bg-[#fc5d01]/30 rounded-full"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      
                      {/* Play Button */}
                      <div className="relative w-24 h-24 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] rounded-full flex items-center justify-center shadow-2xl">
                        <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse" />
                        <svg className="w-12 h-12 text-white ml-1.5 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </motion.div>
                  </div>

                  {/* Video Duration & Views Indicator */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-15 pointer-events-none">
                    <div className="bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1.5">
                      <motion.div 
                        className="w-2 h-2 bg-red-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      <span className="text-white text-xs font-medium">TESTIMONIAL</span>
                    </div>
                    
                    <div className="bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-white text-xs font-medium">9.{index + 1}M</span>
                    </div>
                  </div>
                </div>

                {/* Student Info with Enhanced Design */}
                <div className="relative p-6 bg-gradient-to-br from-white to-gray-50">
                  {/* Top Border Accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#fc5d01] via-[#fd7f33] to-[#fc5d01]" />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1.5 group-hover:text-[#fc5d01] transition-colors duration-300">
                        {review.name}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <svg className="w-4 h-4 text-[#fc5d01]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">{review.course}</span>
                      </div>
                      
                      <div className="flex items-center gap-1.5">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 font-medium">5.0</span>
                      </div>
                    </div>
                    
                    {/* Play Icon */}
                    <motion.div 
                      className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] rounded-full flex items-center justify-center shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal for fullscreen video */}
        {selectedVideo !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative max-w-2xl w-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute -top-12 right-0 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
                onClick={closeModal}
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Video Player */}
              <div className="bg-black rounded-2xl overflow-hidden aspect-[9/16]">
                <iframe
                  src={videoReviews.find(v => v.id === selectedVideo)?.embedUrl}
                  className="w-full h-full"
                  style={{ border: 'none', overflow: 'hidden' }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                />
              </div>

              {/* Student Name */}
              <div className="mt-4 text-center">
                <h3 className="text-2xl font-bold text-white">
                  {videoReviews.find(v => v.id === selectedVideo)?.name}
                </h3>
                <p className="text-white/80 mt-2">
                  Học viên PTE INTENSIVE
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
