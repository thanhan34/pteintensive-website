"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const tabs = [
  { id: 'all', name: 'Tất Cả', count: 33 },
  { id: 'pte65', name: 'PTE 65+', count: 12 },
  { id: 'pte50', name: 'PTE 50+', count: 15 },
  { id: 'recent', name: 'Gần Đây', count: 6 }
];

const stats = [
  { label: 'Phản hồi', value: '33+', description: 'Học viên đã chia sẻ' },
  { label: 'Đạt mục tiêu', value: '90%', description: 'Tỷ lệ thành công' },
  { label: 'Học viên', value: '500+', description: 'Đã tin tưởng chúng tôi' }
];

export default function ReviewImageGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  
  const reviewImages = Array.from({ length: 33 }, (_, i) => ({
    id: i,
    src: `/images/reviews/${i + 52}.png`,
    category: i % 3 === 0 ? 'pte65' : i % 2 === 0 ? 'pte50' : 'recent',
    date: `${Math.floor(Math.random() * 28) + 1}/12/2023`,
    score: i % 3 === 0 ? '65+' : '50+'
  }));

  const filteredImages = reviewImages.filter(
    img => activeTab === 'all' || img.category === activeTab
  );

  return (
    <section className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#fc5d01] to-[#fd7f33]">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-white/10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />
        </div>

        {/* Main Content */}
        <div className="relative">
          {/* Hero Content */}
          <div className="max-w-7xl mx-auto px-4 pt-20 pb-24">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-white space-y-12 text-center"
              >
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span className="text-sm font-medium">Phản Hồi Từ Học Viên</span>
                  </div>
                  
                  <div className="space-y-6">
                    <h1 className="text-6xl font-bold leading-tight tracking-tight">
                      Hình Ảnh <br/>
                      <span className="text-white/90">Phản Hồi</span>
                    </h1>
                    
                    <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                      Những phản hồi chân thực từ học viên đã đạt được mục tiêu của mình
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                      >
                        <div className="text-3xl font-bold mb-2">{stat.value}</div>
                        <div className="text-sm text-white/80">{stat.label}</div>
                        <div className="text-xs text-white/60 mt-2">{stat.description}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap justify-center gap-3">
                  {tabs.map((tab) => (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`group relative px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'text-[#fc5d01]'
                          : 'text-white hover:text-white'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'bg-white'
                          : 'bg-white/10 group-hover:bg-white/20'
                      }`} />
                      <span className="relative flex items-center gap-2">
                        {tab.name}
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          activeTab === tab.id
                            ? 'bg-[#fc5d01]/10'
                            : 'bg-white/10'
                        }`}>
                          {tab.count}
                        </span>
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, index) => (
              <motion.div 
                key={img.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group cursor-pointer"
                onHoverStart={() => setHoveredImage(img.id)}
                onHoverEnd={() => setHoveredImage(null)}
                onClick={() => setSelectedImage(img.src)}
              >
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <Image
                    src={img.src}
                    alt={`Review ${img.id + 1}`}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                  {/* Hover Content */}
                  <motion.div 
                    className="absolute inset-0 p-4 flex flex-col justify-end"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredImage === img.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1.5 bg-[#fc5d01] rounded-lg text-white text-sm font-medium shadow-lg">
                          {img.score}
                        </span>
                        <span className="text-sm text-white bg-black/30 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                          {img.date}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-white">
                        Click để xem chi tiết
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Full Screen Preview */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl p-4 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 text-white/80 hover:text-white p-2 group"
              onClick={() => setSelectedImage(null)}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity">ESC</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </button>

            {/* Image Container */}
            <motion.div
              className="relative w-full max-w-6xl max-h-[90vh] flex items-center justify-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <Image
                src={selectedImage}
                alt="Selected review"
                width={1200}
                height={800}
                className="object-contain w-full h-full rounded-2xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>

            {/* Navigation */}
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between items-center">
              {['prev', 'next'].map((direction) => (
                <button
                  key={direction}
                  className="p-3 text-white hover:bg-white/10 rounded-full transition-all duration-300 group"
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIndex = reviewImages.findIndex(img => img.src === selectedImage);
                    const newIndex = direction === 'next'
                      ? (currentIndex + 1) % reviewImages.length
                      : (currentIndex - 1 + reviewImages.length) % reviewImages.length;
                    setSelectedImage(reviewImages[newIndex].src);
                  }}
                >
                  <svg 
                    className={`w-8 h-8 transform transition-transform group-hover:scale-110 ${
                      direction === 'next' ? 'rotate-180' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
