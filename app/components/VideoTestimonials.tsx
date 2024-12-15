"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';

interface Video {
  id: string;
  thumbnail: string;
  title: string;
  student: string;
  score: string;
}

export default function VideoTestimonials() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const videos: Video[] = [
    {
      id: "video1",
      thumbnail: "/images/testimonials/video1-thumb.jpg",
      title: "Hành trình chinh phục PTE 79+",
      student: "Nguyễn Văn A",
      score: "PTE 85"
    },
    {
      id: "video2",
      thumbnail: "/images/testimonials/video2-thumb.jpg",
      title: "Chia sẻ kinh nghiệm học PTE",
      student: "Trần Thị B",
      score: "PTE 82"
    },
    {
      id: "video3",
      thumbnail: "/images/testimonials/video3-thumb.jpg",
      title: "Từ mất gốc đến PTE 79+",
      student: "Lê Văn C",
      score: "PTE 79"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#fedac2]/10 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Video Chia Sẻ Từ Học Viên
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Lắng nghe những chia sẻ chân thực về hành trình học tập tại PTE LIFE
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              className="group relative cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelectedVideo(video)}
            >
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <svg className="w-8 h-8 text-[#fc5d01]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </motion.div>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{video.title}</h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{video.student}</span>
                  <span className="text-[#fc5d01] font-medium">{video.score}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              className="w-full max-w-4xl bg-black rounded-xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.id}`}
                  title={selectedVideo.title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedVideo.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{selectedVideo.student}</span>
                  <span className="text-[#fc5d01] font-medium">{selectedVideo.score}</span>
                </div>
              </div>
            </motion.div>
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300"
              onClick={() => setSelectedVideo(null)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
