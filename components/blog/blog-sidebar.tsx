'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Post } from '@/lib/blog/posts';

interface BlogSidebarProps {
  featuredPosts: Post[];
  categories: string[];
}

export function BlogSidebar({ featuredPosts, categories }: BlogSidebarProps) {
  return (
    <aside className="space-y-8">
      {/* Featured Posts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="w-1 h-6 bg-gradient-to-b from-[#fc5d01] to-[#fd7f33] rounded-full mr-3"></span>
          Bài viết nổi bật
        </h3>
        <div className="space-y-4">
          {featuredPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group flex gap-3 hover:bg-gray-50 p-2 rounded-lg transition-all duration-200"
              >
                <div className="relative w-24 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={post.cover}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-[#fc5d01] transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {post.readingTime} phút đọc
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="w-1 h-6 bg-gradient-to-b from-[#fc5d01] to-[#fd7f33] rounded-full mr-3"></span>
          Danh mục
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.05 }}
            >
              <Link
                href={`/blog?tag=${encodeURIComponent(category)}`}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-[#fedac2] to-[#fdbc94] text-gray-800 hover:shadow-md transition-all duration-200 hover:scale-105"
              >
                {category}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] rounded-2xl shadow-xl p-6 text-white"
      >
        <h3 className="text-xl font-bold mb-3">Sẵn sàng chinh phục PTE?</h3>
        <p className="text-white/90 mb-4 text-sm leading-relaxed">
          Tham gia khóa học tại PTE Intensive và đạt mục tiêu của bạn ngay hôm nay!
        </p>
        <Link
          href="/register"
          className="block w-full bg-white text-[#fc5d01] text-center font-semibold py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 hover:shadow-lg"
        >
          Đăng ký ngay
        </Link>
        <p className="text-center text-white/80 text-xs mt-3 font-medium">
          ✨ Học là đậu!
        </p>
      </motion.div>
    </aside>
  );
}
