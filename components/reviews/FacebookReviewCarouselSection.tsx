'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Facebook } from 'lucide-react';
import type { FacebookReview } from '@/types/facebookReview';
import { getActiveFacebookReviews, getRandomReviews } from '@/lib/facebookReviews';
import FacebookReviewDetailCard from './FacebookReviewDetailCard';
import FacebookReviewIndicators from './FacebookReviewIndicators';
import FacebookReviewPreviewCard from './FacebookReviewPreviewCard';

const SLIDE_INTERVAL_MS = 12000;
const REFRESH_INTERVAL_MS = 5 * 60 * 1000;

function LoadingSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.35fr_0.85fr]">
      <div className="rounded-[28px] border border-gray-200 bg-white p-7 shadow-[0_24px_70px_rgba(17,24,39,0.08)]">
        <div className="flex gap-4">
          <div className="h-16 w-16 animate-pulse rounded-full bg-gray-200" />
          <div className="flex-1 space-y-3">
            <div className="h-5 w-48 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-64 animate-pulse rounded bg-gray-100" />
          </div>
        </div>
        <div className="mt-8 space-y-3">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="h-4 animate-pulse rounded bg-gray-100" style={{ width: `${95 - index * 7}%` }} />
          ))}
        </div>
      </div>
      <div className="min-h-[420px] animate-pulse rounded-[28px] border border-gray-200 bg-gray-100" />
    </div>
  );
}

export default function FacebookReviewCarouselSection() {
  const [allReviews, setAllReviews] = useState<FacebookReview[]>([]);
  const [selectedReviews, setSelectedReviews] = useState<FacebookReview[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const activeReview = selectedReviews[activeIndex];

  const loadReviews = useCallback(async () => {
    try {
      setError('');
      const activeReviews = await getActiveFacebookReviews();
      const nextReviews = getRandomReviews(activeReviews, 9);
      setAllReviews(activeReviews);
      setSelectedReviews(nextReviews);
      setActiveIndex(0);
    } catch (err) {
      console.error('Error loading Facebook reviews:', err);
      setError('Không thể tải review Facebook lúc này.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  useEffect(() => {
    if (!selectedReviews.length || isPaused) return;

    const slideInterval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % selectedReviews.length);
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(slideInterval);
  }, [selectedReviews.length, isPaused]);

  useEffect(() => {
    if (!allReviews.length) return;

    const refreshInterval = setInterval(() => {
      loadReviews();
    }, REFRESH_INTERVAL_MS);

    return () => clearInterval(refreshInterval);
  }, [allReviews.length, loadReviews]);

  const canNavigate = selectedReviews.length > 1;

  const goToPrevious = useCallback(() => {
    if (!selectedReviews.length) return;
    setActiveIndex((prev) => (prev - 1 + selectedReviews.length) % selectedReviews.length);
  }, [selectedReviews.length]);

  const goToNext = useCallback(() => {
    if (!selectedReviews.length) return;
    setActiveIndex((prev) => (prev + 1) % selectedReviews.length);
  }, [selectedReviews.length]);

  const sectionState = useMemo(() => {
    if (isLoading) return 'loading';
    if (error) return 'error';
    if (!selectedReviews.length) return 'empty';
    return 'ready';
  }, [error, isLoading, selectedReviews.length]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#fff7f2] to-white px-4 py-20 sm:py-24">
      <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fc5d01 1px, transparent 0)', backgroundSize: '34px 34px' }} />
      <div className="absolute -left-24 top-24 h-64 w-64 rounded-full bg-[#fc5d01]/10 blur-3xl" />
      <div className="absolute -right-24 bottom-24 h-72 w-72 rounded-full bg-[#fd7f33]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="mb-12 flex flex-col items-center gap-5 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#fc5d01]/15 bg-white px-5 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#fc5d01] shadow-[0_12px_30px_rgba(17,24,39,0.06)]">
              <Facebook className="h-4 w-4 fill-[#fc5d01]" /> FACEBOOK COMMUNITY
            </div>
            <h2 className="text-[30px] font-black leading-tight text-gray-950 md:text-[44px]">
              Review Từ Cộng Đồng <span className="text-[#fc5d01]">Facebook</span>
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-600 md:text-base">
              Những chia sẻ thật từ học viên trong group PTE Intensive sau quá trình học và thi PTE.
            </p>
          </div>

          <a
            href="#"
            className="inline-flex min-h-[48px] shrink-0 items-center gap-2 rounded-full border border-[#fc5d01] bg-white px-6 py-3 text-sm font-bold text-[#fc5d01] shadow-[0_12px_30px_rgba(252,93,1,0.10)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#fc5d01] hover:text-white"
          >
            <Facebook className="h-5 w-5 fill-current" /> Tham gia group PTE Intensive
          </a>
        </motion.div>

        {sectionState === 'loading' && <LoadingSkeleton />}

        {sectionState === 'error' && (
          <div className="rounded-[28px] border border-red-100 bg-white p-10 text-center text-base font-semibold text-red-600 shadow-[0_24px_70px_rgba(17,24,39,0.08)]">
            {error}
          </div>
        )}

        {sectionState === 'empty' && (
          <div className="rounded-[28px] border border-[#fc5d01]/10 bg-white p-10 text-center text-base font-semibold text-gray-600 shadow-[0_24px_70px_rgba(17,24,39,0.08)]">
            Chưa có review Facebook nào được thêm.
          </div>
        )}

        {sectionState === 'ready' && activeReview && (
          <>
            <div className="relative">
              {canNavigate && (
                <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 hidden items-center justify-between px-2 md:flex">
                  <button
                    type="button"
                    onClick={goToPrevious}
                    className="pointer-events-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#fc5d01]/20 bg-white text-[#fc5d01] shadow-lg transition-all duration-200 hover:bg-[#fc5d01] hover:text-white"
                    aria-label="Previous Facebook review"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={goToNext}
                    className="pointer-events-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#fc5d01]/20 bg-white text-[#fc5d01] shadow-lg transition-all duration-200 hover:bg-[#fc5d01] hover:text-white"
                    aria-label="Next Facebook review"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeReview.id || `${activeReview.name}-${activeIndex}`}
                  initial={{ opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -28 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="grid gap-6 lg:grid-cols-[1.35fr_0.85fr]"
                >
                  <FacebookReviewDetailCard
                    review={activeReview}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                  />
                  <div className="hidden lg:block">
                    <FacebookReviewPreviewCard review={activeReview} />
                  </div>
                </motion.div>
              </AnimatePresence>

              {canNavigate && (
                <div className="mt-5 flex items-center justify-center gap-3 md:hidden">
                  <button
                    type="button"
                    onClick={goToPrevious}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#fc5d01]/20 bg-white text-[#fc5d01] shadow-lg transition-all duration-200 active:scale-95"
                    aria-label="Previous Facebook review"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={goToNext}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#fc5d01]/20 bg-white text-[#fc5d01] shadow-lg transition-all duration-200 active:scale-95"
                    aria-label="Next Facebook review"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>
              )}
            </div>

            <FacebookReviewIndicators reviews={selectedReviews} activeIndex={activeIndex} onSelect={setActiveIndex} />
          </>
        )}
      </div>
    </section>
  );
}
