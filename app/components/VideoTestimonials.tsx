"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { reviewData } from '../../lib/reviewData';
import Image from 'next/image';

interface Review {
  score?: string;
  comment: string;
  studentImage?: string;
  name: string;
  course: string;
}

interface Video {
  id: string;
  thumbnail: string;
  title: string;
  student: {
    name: string;
    image: string;
    score: string;
    course: string;
  };
  description: string;
  duration: string;
  views: number;
  category: string;
}

export default function VideoTestimonials() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // Get top reviews and categorize them
  const topReviews = reviewData
    .filter((review: Review) => review.score && review.comment.length > 200 && review.studentImage)
    .slice(0, 6);

  const videos: Video[] = topReviews.map((review: Review, index: number) => {
    const score = parseInt(review.score?.split(' ')[0] || '0');
    let category = 'other';
    if (score >= 79) category = 'expert';
    else if (score >= 65) category = 'advanced';
    
    return {
      id: `video${index + 1}`,
      thumbnail: review.studentImage || '/images/placeholder.jpg',
      title: `Hành trình chinh phục ${review.score || 'PTE'}`,
      student: {
        name: review.name,
        image: review.studentImage || '/images/placeholder.jpg',
        score: review.score || 'N/A',
        course: review.course
      },
      description: review.comment.slice(0, 150) + '...',
      duration: '5:30',
      views: 1200 + (index * 300),
      category
    };
  });

  // Rest of the component code remains exactly the same...
  const categories = [
    { id: 'all', name: 'Tất Cả' },
    { id: 'expert', name: 'PTE 79+' },
    { id: 'advanced', name: 'PTE 65+' },
    { id: 'other', name: 'Khác' }
  ];

  const filteredVideos = videos.filter(video => 
    selectedCategory === 'all' || video.category === selectedCategory
  );

  const handleVideoPlay = (video: Video) => {
    setIsLoading(true);
    setSelectedVideo(video);
    // Simulate loading time
    setTimeout(() => setIsLoading(false), 1500);
  };

  const getRelatedVideos = (currentVideo: Video) => {
    return videos
      .filter(v => v.id !== currentVideo.id && v.category === currentVideo.category)
      .slice(0, 3);
  };

  if (videos.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
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
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Lắng nghe những chia sẻ chân thực về hành trình học tập tại PTE INTENSIVE
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(category => (
              <motion.button
                key={category.id}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-[#fc5d01] text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video, index) => (
            <motion.div
              key={video.id}
              className="group relative bg-white rounded-xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              {/* Thumbnail */}
              <div 
                className="relative aspect-video cursor-pointer"
                onClick={() => handleVideoPlay(video)}
              >
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                
                {/* Play Button */}
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-[#fc5d01]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </motion.div>

                {/* Category Badge */}
                <div className="absolute top-2 left-2 px-3 py-1 bg-black/70 text-white text-sm rounded-full">
                  {categories.find(c => c.id === video.category)?.name}
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-sm px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={video.student.image}
                      alt={video.student.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-1">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-600">{video.student.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[#fc5d01] font-medium">{video.student.score}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-600 text-sm">{video.student.course}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2 mb-3">{video.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {video.views.toLocaleString()} lượt xem
                  </div>
                  <button 
                    className="text-[#fc5d01] hover:text-[#fd7f33] transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (typeof window !== 'undefined' && navigator.clipboard) {
                        navigator.clipboard.writeText(window.location.href)
                          .catch(err => {
                            console.error('Failed to copy URL:', err);
                          });
                      }
                    }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Modal */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVideo(null)}
            >
              <motion.div
                className="w-full max-w-6xl bg-white rounded-xl overflow-hidden my-8"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={e => e.stopPropagation()}
              >
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Main Video */}
                  <div className="md:col-span-2">
                    <div className="relative aspect-video bg-black">
                      {isLoading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 border-4 border-[#fc5d01] border-t-transparent rounded-full animate-spin" />
                        </div>
                      ) : (
                        <iframe
                          src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
                          title={selectedVideo.title}
                          className="absolute inset-0 w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={selectedVideo.student.image}
                            alt={selectedVideo.student.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{selectedVideo.title}</h3>
                          <p className="text-gray-600">{selectedVideo.student.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[#fc5d01] font-medium">{selectedVideo.student.score}</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-600">{selectedVideo.student.course}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600">{selectedVideo.description}</p>
                    </div>
                  </div>

                  {/* Related Videos */}
                  <div className="p-6 bg-gray-50">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Video Liên Quan</h4>
                    <div className="space-y-4">
                      {getRelatedVideos(selectedVideo).map((video) => (
                        <div
                          key={video.id}
                          className="flex gap-4 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors"
                          onClick={() => handleVideoPlay(video)}
                        >
                          <div className="relative w-32 aspect-video rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={video.thumbnail}
                              alt={video.title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/20" />
                            <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                              {video.duration}
                            </div>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900 line-clamp-2">{video.title}</h5>
                            <p className="text-sm text-gray-600 mt-1">{video.student.name}</p>
                            <div className="text-xs text-gray-500 mt-1">
                              {video.views.toLocaleString()} lượt xem
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
              <button
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
                onClick={() => setSelectedVideo(null)}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
