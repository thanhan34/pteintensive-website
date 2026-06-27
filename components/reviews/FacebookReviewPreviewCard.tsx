'use client';

import { Trophy } from 'lucide-react';
import type { FacebookReview } from '@/types/facebookReview';

type FacebookReviewPreviewCardProps = {
  review: FacebookReview;
};

export default function FacebookReviewPreviewCard({ review }: FacebookReviewPreviewCardProps) {
  return (
    <aside className="relative h-full overflow-hidden rounded-[28px] border border-[#fc5d01]/10 bg-white p-4 shadow-[0_24px_70px_rgba(17,24,39,0.10)] sm:p-5">
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#fc5d01]/35 to-transparent" />

      {review.screenshotUrl ? (
        <div className="flex h-full flex-col">
          <div className="relative flex min-h-[360px] flex-1 items-center justify-center overflow-hidden rounded-[22px] bg-gradient-to-br from-[#fff7f2] to-white p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={review.screenshotUrl} alt={`Screenshot review của ${review.name}`} className="max-h-[640px] w-full rounded-[18px] object-contain shadow-lg" />
          </div>

          {(review.score || review.target) && (
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {review.score && (
                <div className="rounded-2xl border border-[#fc5d01]/15 bg-[#fff7f2] px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#fc5d01]">Overall Score</p>
                  <p className="mt-1 text-2xl font-black text-gray-950">{review.score}</p>
                </div>
              )}
              {review.target && (
                <div className="rounded-2xl border border-[#fc5d01]/15 bg-white px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#fc5d01]">Target</p>
                  <p className="mt-1 text-lg font-black text-gray-950">{review.target}</p>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[22px] bg-gradient-to-br from-[#fff7f2] via-white to-[#fedac2]/35 p-8 text-center">
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] text-white shadow-[0_18px_40px_rgba(252,93,1,0.28)]">
            <Trophy className="h-10 w-10" />
          </div>
          <h3 className="text-2xl font-black text-gray-950">Hành trình chinh phục PTE</h3>
          <p className="mt-3 max-w-xs text-sm leading-7 text-gray-600">Một câu chuyện thật từ học viên PTE Intensive</p>
        </div>
      )}
    </aside>
  );
}
