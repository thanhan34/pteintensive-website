'use client';

import Link from 'next/link';
import { ChevronDown, Hash } from 'lucide-react';
import { useState } from 'react';
import type { BlogCategory } from '@/lib/blog/posts';

export function BlogCategoryFilter({ categories }: { categories: BlogCategory[] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-t border-gray-100 pt-4">
      <div className="mb-3 flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2 text-sm font-bold text-gray-800">
          <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-orange-50 text-[#FC5D01]">
            <Hash aria-hidden="true" className="size-4" />
          </span>
          <span>Khám phá chủ đề</span>
          <span className="hidden font-medium text-gray-400 sm:inline">{categories.length} chủ đề</span>
        </div>

        <button
          type="button"
          aria-expanded={isExpanded}
          onClick={() => setIsExpanded((current) => !current)}
          className="flex shrink-0 items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-semibold text-gray-500 transition hover:bg-orange-50 hover:text-[#FC5D01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FC5D01]/30"
        >
          {isExpanded ? 'Thu gọn' : 'Xem tất cả'}
          <ChevronDown
            aria-hidden="true"
            className={`size-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      <div className={isExpanded ? '' : 'relative'}>
        <nav
          aria-label="Chủ đề blog"
          className={
            isExpanded
              ? 'flex flex-wrap gap-2'
              : 'flex gap-2 overflow-x-auto pb-1 pr-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
          }
        >
          <Link
            href="/blog"
            className="shrink-0 rounded-full bg-[#FC5D01] px-3.5 py-1.5 text-xs font-bold text-white shadow-sm shadow-orange-200 transition hover:bg-[#e65300] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FC5D01]/30 focus-visible:ring-offset-2"
          >
            Tất cả
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/blog/category/${category.slug}`}
              className="shrink-0 rounded-full border border-gray-200 bg-gray-50/80 px-3.5 py-1.5 text-xs font-semibold text-gray-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-[#e65300] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FC5D01]/30 focus-visible:ring-offset-2"
            >
              {category.name}
            </Link>
          ))}
        </nav>

        {!isExpanded && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white via-white/90 to-transparent"
          />
        )}
      </div>
    </div>
  );
}
