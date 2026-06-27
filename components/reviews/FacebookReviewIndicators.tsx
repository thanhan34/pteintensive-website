'use client';

import type { FacebookReview } from '@/types/facebookReview';

type FacebookReviewIndicatorsProps = {
  reviews: FacebookReview[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export default function FacebookReviewIndicators({ reviews, activeIndex, onSelect }: FacebookReviewIndicatorsProps) {
  return (
    <div className="mt-7 flex flex-col items-center gap-4">
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {reviews.map((review, index) => (
          <button
            key={review.id || `${review.name}-${index}`}
            type="button"
            onClick={() => onSelect(index)}
            aria-label={`Xem review ${index + 1}`}
            className={`h-3.5 rounded-full transition-all duration-300 ${
              activeIndex === index
                ? 'w-9 bg-[#fc5d01] shadow-[0_8px_20px_rgba(252,93,1,0.32)]'
                : 'w-3.5 bg-[#fedac2] hover:bg-[#fd7f33]'
            }`}
          />
        ))}
      </div>
      <p className="text-center text-sm font-semibold text-gray-500">
        Đang xem {activeIndex + 1}/{reviews.length} review được chọn ngẫu nhiên
      </p>
    </div>
  );
}
