'use client';

import { ExternalLink, Globe2, MessageCircle, MoreHorizontal } from 'lucide-react';
import type { FacebookReview } from '@/types/facebookReview';

type FacebookReviewDetailCardProps = {
  review: FacebookReview;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'PT';
}

function formatDate(date: string) {
  if (!date) return '';
  const parsed = new Date(date);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toLocaleDateString('vi-VN');
  }
  return date;
}

export default function FacebookReviewDetailCard({ review, onMouseEnter, onMouseLeave }: FacebookReviewDetailCardProps) {
  return (
    <article
      key={review.id || `${review.name}-${review.date}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="relative h-full overflow-hidden rounded-[28px] border border-gray-200 bg-white p-5 shadow-[0_24px_70px_rgba(17,24,39,0.10)] transition-all duration-500 sm:p-7"
    >
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#fc5d01]/35 to-transparent" />

      <header className="mb-6 flex items-start gap-4">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-white bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] shadow-lg sm:h-16 sm:w-16">
          {review.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={review.avatarUrl} alt={review.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-base font-bold text-white">
              {getInitials(review.name)}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="break-words text-lg font-bold leading-snug text-gray-950 sm:text-xl">
            {review.name} <span className="font-semibold text-gray-600">is feeling fantastic.</span>
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-medium text-gray-500 sm:text-sm">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#1877f2]/10 px-2.5 py-1 font-semibold text-[#1877f2]">
              <MessageCircle className="h-3.5 w-3.5" /> Review
            </span>
            {formatDate(review.date) && <span>{formatDate(review.date)}</span>}
            <span className="inline-flex items-center gap-1"><Globe2 className="h-3.5 w-3.5" /> Public</span>
          </div>
        </div>

        <button
          type="button"
          aria-label="Facebook post options"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
        >
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </header>

      <div className="max-h-[520px] overflow-y-auto pr-1 text-[15px] leading-8 text-gray-800 scrollbar-thin sm:text-base lg:max-h-[620px]">
        <p className="whitespace-pre-line break-words">{review.content}</p>
        {review.hashtag && (
          <p className="mt-4 break-words text-base font-bold text-[#1877f2]">{review.hashtag}</p>
        )}

        {review.screenshotUrl && (
          <div className="mt-6 overflow-hidden rounded-[22px] border border-[#fc5d01]/10 bg-[#fff7f2] p-2 lg:hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={review.screenshotUrl} alt={`Screenshot review của ${review.name}`} className="max-h-[520px] w-full rounded-[18px] object-contain" />
          </div>
        )}
      </div>

      {review.postUrl && (
        <a
          href={review.postUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#fc5d01]/20 bg-[#fff7f2] px-5 py-2.5 text-sm font-bold text-[#fc5d01] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#fc5d01] hover:text-white"
        >
          Xem bài viết gốc <ExternalLink className="h-4 w-4" />
        </a>
      )}
    </article>
  );
}
