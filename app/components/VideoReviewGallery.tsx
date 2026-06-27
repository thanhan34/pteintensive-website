"use client";

import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { buildFacebookVideoEmbedUrl, getActiveVideoReviews } from '@/lib/videoReviews';
import type { VideoReview } from '@/types/videoReview';

export default function VideoReviewGallery() {
  const [videoReviews, setVideoReviews] = useState<VideoReview[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadVideoReviews() {
      try {
        setLoading(true);
        setError('');
        const data = await getActiveVideoReviews();

        if (isMounted) setVideoReviews(data);
      } catch (err) {
        console.error('Error loading video reviews:', err);
        if (isMounted) setError('Không thể tải video review. Vui lòng thử lại sau.');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadVideoReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  const selectedReview = useMemo(
    () => videoReviews.find((review) => review.id === selectedVideo),
    [selectedVideo, videoReviews]
  );

  const sliderSettings = {
    dots: true,
    infinite: videoReviews.length > 3,
    speed: 500,
    slidesToShow: Math.min(3, Math.max(videoReviews.length, 1)),
    slidesToScroll: 1,
    autoplay: videoReviews.length > 1,
    autoplaySpeed: 4500,
    arrows: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, Math.max(videoReviews.length, 1)),
          slidesToScroll: 1,
          infinite: videoReviews.length > 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          infinite: videoReviews.length > 1,
        },
      },
    ],
  };

  const openModal = (id?: string) => {
    if (id) setSelectedVideo(id);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#fedac2]/10 to-white py-24">
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute left-0 top-0 h-full w-full"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #fc5d01 0, #fc5d01 1px, transparent 0, transparent 50%)`,
            backgroundSize: '20px 20px',
          }}
        />
      </div>

      <motion.div
        className="absolute -right-10 top-1/4 h-96 w-96 rounded-full bg-[#fc5d01]/5 blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 9, repeat: Infinity }}
      />
      <motion.div
        className="absolute -left-10 bottom-1/4 h-72 w-72 rounded-full bg-[#fd7f33]/5 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, delay: 1 }}
      />

      <motion.div
        className="absolute left-16 top-32 text-[#fc5d01]/10"
        animate={{ y: [0, -15, 0], x: [0, 10, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <svg className="h-20 w-20" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-32 right-16 text-[#fd7f33]/10"
        animate={{ y: [0, 15, 0], x: [0, -10, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
      >
        <svg className="h-24 w-24" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
        </svg>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#fedac2] bg-[#fedac2]/20 px-4 py-2">
            <svg className="h-5 w-5 text-[#fc5d01]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
            </svg>
            <span className="font-semibold text-[#fc5d01]">VIDEO TESTIMONIALS</span>
          </div>

          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Học viên nói gì về
            <span className="block bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] bg-clip-text text-transparent">
              PTE Intensive?
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
            Những chia sẻ thực tế từ học viên đã đạt mục tiêu PTE và visa cùng PTE INTENSIVE.
          </p>
        </motion.div>

        {loading ? (
          <div className="rounded-3xl border border-[#fedac2] bg-white/80 p-10 text-center shadow-lg">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#fedac2] border-t-[#fc5d01]" />
            <p className="font-medium text-gray-600">Đang tải video review...</p>
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-red-100 bg-red-50 p-8 text-center text-red-600 shadow-lg">
            {error}
          </div>
        ) : videoReviews.length === 0 ? (
          <div className="rounded-3xl border border-[#fedac2] bg-white/80 p-8 text-center text-gray-600 shadow-lg">
            Chưa có video review nào được hiển thị.
          </div>
        ) : (
          <div className="video-review-slider-wrapper">
            <Slider {...sliderSettings} className="video-review-slider -mx-4">
              {videoReviews.map((review, index) => (
                <div key={review.id} className="px-4 pb-10">
                  <motion.div
                    className="group relative"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                  >
                    <motion.div
                      className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#fc5d01]/20 to-[#fd7f33]/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    />

                    <div
                      className="relative cursor-pointer overflow-hidden rounded-3xl border-2 border-gray-100 bg-white shadow-xl transition-all duration-500 hover:shadow-2xl group-hover:border-[#fc5d01]/30"
                      onClick={() => openModal(review.id)}
                    >
                      <div className="absolute left-4 top-4 z-20">
                        <div className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] px-3 py-1.5 text-xs font-bold text-white shadow-lg backdrop-blur-sm">
                          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span>{review.achievement}</span>
                        </div>
                      </div>

                      <div className="relative aspect-[9/16] overflow-hidden bg-gradient-to-br from-gray-900 to-black">
                        <iframe
                          src={review.embedUrl || buildFacebookVideoEmbedUrl(review.videoUrl)}
                          className="h-full w-full"
                          style={{ border: 'none', overflow: 'hidden' }}
                          scrolling="no"
                          frameBorder="0"
                          allowFullScreen={true}
                          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        />

                        <div className="pointer-events-none absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between">
                          <div className="flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 backdrop-blur-sm">
                            <motion.div
                              className="h-2 w-2 rounded-full bg-red-500"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            />
                            <span className="text-xs font-medium text-white">TESTIMONIAL</span>
                          </div>

                          <div className="flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 backdrop-blur-sm">
                            <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs font-medium text-white">9.{index + 1}M</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-[#fc5d01]">
                          {review.name}
                        </h3>

                        <div className="mb-4 flex items-center gap-2 text-gray-600">
                          <svg className="h-4 w-4 text-[#fc5d01]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          <span className="font-medium">{review.course}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-xs font-medium text-gray-500">5.0</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </Slider>
          </div>
        )}

        {selectedReview && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative w-full max-w-2xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute -top-12 right-0 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg transition-colors hover:bg-gray-100"
                onClick={closeModal}
                aria-label="Đóng video"
              >
                <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="aspect-[9/16] overflow-hidden rounded-2xl bg-black">
                <iframe
                  src={selectedReview.embedUrl || buildFacebookVideoEmbedUrl(selectedReview.videoUrl)}
                  className="h-full w-full"
                  style={{ border: 'none', overflow: 'hidden' }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                />
              </div>

              <div className="mt-4 text-center">
                <h3 className="text-2xl font-bold text-white">{selectedReview.name}</h3>
                <p className="mt-2 text-white/80">Học viên PTE INTENSIVE</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>

      <style jsx global>{`
        .video-review-slider-wrapper { margin: 0 -1rem; }
        .video-review-slider .slick-track { display: flex !important; align-items: stretch; }
        .video-review-slider .slick-slide { height: auto; }
        .video-review-slider .slick-slide > div { height: 100%; }
        .video-review-slider .slick-dots { bottom: -1.5rem; }
        .video-review-slider .slick-dots li button:before { color: #fc5d01; font-size: 10px; }
        .video-review-slider .slick-prev,
        .video-review-slider .slick-next {
          z-index: 20;
          width: 42px;
          height: 42px;
          border-radius: 9999px;
          background: white;
          box-shadow: 0 10px 25px rgba(15, 23, 42, 0.16);
        }
        .video-review-slider .slick-prev:hover,
        .video-review-slider .slick-next:hover,
        .video-review-slider .slick-prev:focus,
        .video-review-slider .slick-next:focus { background: #fff7f2; }
        .video-review-slider .slick-prev:before,
        .video-review-slider .slick-next:before { color: #fc5d01; font-size: 24px; opacity: 1; }
        .video-review-slider .slick-prev { left: -0.25rem; }
        .video-review-slider .slick-next { right: -0.25rem; }
      `}</style>
    </section>
  );
}