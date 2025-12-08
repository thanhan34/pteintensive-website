'use client';

import { useState, useMemo } from 'react';
import MigrationCard from './MigrationCard';
import MigrationFilterSearch from './MigrationFilterSearch';

interface MigrationPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  cover?: string;
  category: 'visa' | 'jobs' | 'pathway';
}

interface MigrationClientProps {
  visaPosts: MigrationPost[];
  jobsPosts: MigrationPost[];
  pathwayPosts: MigrationPost[];
}

export default function MigrationClient({
  visaPosts,
  jobsPosts,
  pathwayPosts
}: MigrationClientProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Combine all posts with category labels
  const allPosts = useMemo(() => {
    return [
      ...visaPosts.map(post => ({ ...post, category: 'visa' as const })),
      ...jobsPosts.map(post => ({ ...post, category: 'jobs' as const })),
      ...pathwayPosts.map(post => ({ ...post, category: 'pathway' as const }))
    ];
  }, [visaPosts, jobsPosts, pathwayPosts]);

  // Filter and search posts
  const filteredPosts = useMemo(() => {
    let posts = allPosts;

    // Apply category filter
    if (activeFilter !== 'all') {
      posts = posts.filter(post => post.category === activeFilter);
    }

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return posts;
  }, [allPosts, activeFilter, searchQuery]);

  const totalCount = {
    all: allPosts.length,
    visa: visaPosts.length,
    jobs: jobsPosts.length,
    pathway: pathwayPosts.length
  };

  return (
    <>
      {/* Filter and Search */}
      <MigrationFilterSearch
        onFilterChange={setActiveFilter}
        onSearchChange={setSearchQuery}
        activeFilter={activeFilter}
        totalCount={totalCount}
      />

      {/* Results Count */}
      <div className="mb-8 text-center">
        <p className="text-gray-600">
          Hiển thị <span className="font-bold text-[#fc5d01]">{filteredPosts.length}</span> bài viết
          {activeFilter !== 'all' && (
            <span className="ml-2">
              trong danh mục <span className="font-semibold">
                {activeFilter === 'visa' && '📋 Visa'}
                {activeFilter === 'jobs' && '💼 Ngành nghề'}
                {activeFilter === 'pathway' && '🛤️ Lộ trình'}
              </span>
            </span>
          )}
        </p>
      </div>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <MigrationCard
              key={post.slug}
              {...post}
              index={index}
            />
          ))}
        </div>
      ) : (
        // Empty State
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Không tìm thấy bài viết
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Không có bài viết nào phù hợp với từ khóa &ldquo;<span className="font-semibold text-[#fc5d01]">{searchQuery}</span>&rdquo;. 
            Hãy thử tìm kiếm với từ khóa khác.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveFilter('all');
            }}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Xem tất cả bài viết
          </button>
        </div>
      )}
    </>
  );
}
