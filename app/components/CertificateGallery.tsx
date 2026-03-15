"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const certificates = [
  {
    id: 1,
    title: "Professional Trainer",
    image: "/images/certificate/Professional Trainer.jpg",
    description: "Chứng nhận giảng viên chuyên nghiệp",
    organization: "Pearson PTE",
    year: "2026"
  },
  {
    id: 2,
    title: "PTE Elite Partner Program",
    image: "/images/certificate/PTE Elite Partner Program.jpg",
    description: "Đối tác Elite của Pearson PTE",
    organization: "Pearson PTE",
    year: "2026"
  }
];

export default function CertificateGallery() {
  const [selectedCert, setSelectedCert] = useState<number | null>(null);

  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-[#fedac2]/10 to-white overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #fc5d01 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      {/* Decorative Background Elements with Animation */}
      <motion.div 
        className="absolute top-20 left-10 w-72 h-72 bg-[#fc5d01]/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-96 h-96 bg-[#fd7f33]/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
      />
      
      {/* Floating Icons */}
      <motion.div
        className="absolute top-40 right-20 text-[#fc5d01]/10"
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </motion.div>
      
      <motion.div
        className="absolute bottom-40 left-20 text-[#fd7f33]/10"
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity, delay: 0.5 }}
      >
        <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
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
              🏆 CHỨNG NHẬN UY TÍN
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
              Chứng Nhận Quốc Tế
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Được công nhận và chứng nhận bởi Pearson - Tổ chức giáo dục hàng đầu thế giới
          </motion.p>
        </motion.div>

        {/* Trust Indicators */}
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
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Chứng Nhận Chính Thức</p>
              <p className="text-xs text-gray-500">Từ Pearson PTE</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Đối Tác Elite</p>
              <p className="text-xs text-gray-500">Elite Partner 2026</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Uy Tín Quốc Tế</p>
              <p className="text-xs text-gray-500">Được công nhận toàn cầu</p>
            </div>
          </div>
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              className="group relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
            >
              {/* Decorative corner accent with animation */}
              <motion.div 
                className="absolute -top-3 -left-3 w-24 h-24 bg-gradient-to-br from-[#fc5d01]/20 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100"
                initial={false}
                animate={{ rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div 
                className="absolute -bottom-3 -right-3 w-24 h-24 bg-gradient-to-tl from-[#fd7f33]/20 to-transparent rounded-br-3xl opacity-0 group-hover:opacity-100"
                initial={false}
                animate={{ rotate: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              />
              
              {/* Ribbon Badge */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
                <div className="relative">
                  <div className="bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] text-white px-4 py-1 rounded-b-lg shadow-lg">
                    <span className="text-xs font-bold">#{index + 1}</span>
                  </div>
                  <div className="absolute -bottom-2 left-0 w-0 h-0 border-l-[10px] border-l-transparent border-t-[8px] border-t-[#fc5d01]/80" />
                  <div className="absolute -bottom-2 right-0 w-0 h-0 border-r-[10px] border-r-transparent border-t-[8px] border-t-[#fd7f33]/80" />
                </div>
              </div>
              
              <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 group-hover:border-[#fc5d01]/30">
                {/* Premium Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>VERIFIED</span>
                  </div>
                </div>

                {/* Certificate Image */}
                <div 
                  className="relative aspect-[4/3] cursor-pointer overflow-hidden bg-gradient-to-br from-gray-50 to-white"
                  onClick={() => setSelectedCert(cert.id)}
                >
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-contain p-6 group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center">
                    <motion.div
                      className="text-center"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-16 h-16 mx-auto mb-3 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/40">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                      <p className="text-white font-bold text-lg mb-1">Xem Chi Tiết</p>
                      <p className="text-white/80 text-sm">Nhấn để phóng to</p>
                    </motion.div>
                  </div>
                </div>

                {/* Certificate Info with Gradient */}
                <div className="relative p-6 bg-gradient-to-br from-white to-gray-50">
                  {/* Top Border Accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#fc5d01] via-[#fd7f33] to-[#fc5d01]" />
                  
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#fc5d01] transition-colors duration-300">
                        {cert.title}
                      </h3>
                      <p className="text-gray-600 mb-3 leading-relaxed">
                        {cert.description}
                      </p>
                      
                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1.5 text-gray-500">
                          <svg className="w-4 h-4 text-[#fc5d01]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          <span className="font-medium">{cert.year}</span>
                        </div>
                        
                        <div className="flex items-center gap-1.5 text-gray-500">
                          <svg className="w-4 h-4 text-[#fc5d01]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                          <span className="font-medium">{cert.organization}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Arrow Icon */}
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal for enlarged view */}
        {selectedCert !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              className="relative max-w-5xl w-full bg-white rounded-2xl overflow-hidden"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                onClick={() => setSelectedCert(null)}
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={certificates.find(c => c.id === selectedCert)?.image || ''}
                  alt={certificates.find(c => c.id === selectedCert)?.title || ''}
                  fill
                  className="object-contain p-8"
                />
              </div>

              <div className="p-6 bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] text-white">
                <h3 className="text-2xl font-bold mb-2">
                  {certificates.find(c => c.id === selectedCert)?.title}
                </h3>
                <p className="text-white/90">
                  {certificates.find(c => c.id === selectedCert)?.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
