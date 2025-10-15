'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ClientDate } from './client-date';

interface ArticleHeaderProps {
  title: string;
  description: string;
  author: string;
  date: string;
  readingTime: number;
  coverImage: string;
  tags?: string[];
}

export function ArticleHeader({
  title,
  description,
  author,
  date,
  readingTime,
  coverImage,
  tags,
}: ArticleHeaderProps) {
  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-white via-[#fedac2]/10 to-[#fdbc94]/20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.05, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-[#fc5d01] rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link
              href="/blog"
              className="inline-flex items-center text-[#fc5d01] hover:text-[#fd7f33] font-medium transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Quay lại Blog
            </Link>
          </motion.nav>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap gap-2 mb-6"
            >
              {tags.slice(0, 3).map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[#fedac2] to-[#fdbc94] text-gray-800 hover:shadow-md transition-all duration-200"
                >
                  {tag}
                </Link>
              ))}
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight"
          >
            {title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-600 leading-relaxed mb-8"
          >
            {description}
          </motion.p>

          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center flex-wrap gap-4 text-gray-600"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] flex items-center justify-center text-white font-bold mr-3">
                {author.charAt(0).toUpperCase()}
              </div>
              <span className="font-medium">{author}</span>
            </div>
            <span className="text-gray-400">•</span>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <ClientDate date={date} format="long" />
            </div>
            <span className="text-gray-400">•</span>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{readingTime} phút đọc</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Cover Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10"
      >
        <div className="aspect-video relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </motion.div>
    </>
  );
}
