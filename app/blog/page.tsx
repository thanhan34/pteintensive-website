import { Metadata } from 'next';
import Link from 'next/link';
import { getPaginatedPosts, searchPosts, getPostsByTag, getAllPosts, getAllTags } from '@/lib/blog/posts';
import { EnhancedPostCard } from '../../components/blog/enhanced-post-card';
import { BlogHero } from '../../components/blog/blog-hero';
import { BlogSidebar } from '../../components/blog/blog-sidebar';

export const metadata: Metadata = {
  title: 'Blog PTE Intensive - Chia sẻ kinh nghiệm & mẹo thi PTE',
  description: 'Khám phá những bài viết hữu ích về PTE Academic, chiến lược học tập, và kinh nghiệm từ học viên đã đạt điểm cao.',
  keywords: ['PTE', 'PTE Academic', 'Học PTE', 'Luyện thi PTE', 'Mẹo thi PTE', 'PTE Intensive'],
  openGraph: {
    title: 'Blog PTE Intensive - Chia sẻ kinh nghiệm & mẹo thi PTE',
    description: 'Khám phá những bài viết hữu ích về PTE Academic, chiến lược học tập, và kinh nghiệm từ học viên đã đạt điểm cao.',
    images: ['/og/pteintensive-blog.png'],
    type: 'website',
  },
};

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
    tag?: string;
    search?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const tag = params.tag;
  const search = params.search;

  let posts;
  let pagination;

  if (search) {
    const searchResults = searchPosts(search);
    posts = searchResults;
    pagination = {
      totalPages: 1,
      currentPage: 1,
      hasNext: false,
      hasPrev: false,
    };
  } else if (tag) {
    const tagResults = getPostsByTag(tag);
    posts = tagResults;
    pagination = {
      totalPages: 1,
      currentPage: 1,
      hasNext: false,
      hasPrev: false,
    };
  } else {
    const result = getPaginatedPosts(page, 9);
    posts = result.posts;
    pagination = {
      totalPages: result.totalPages,
      currentPage: result.currentPage,
      hasNext: result.hasNext,
      hasPrev: result.hasPrev,
    };
  }

  // Get data for sidebar
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.slice(0, 5);
  const categories = getAllTags();

  return (
    <div className="min-h-screen bg-white transition-colors duration-200">
      {/* Hero Section */}
      <BlogHero />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search & Filters */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <form method="get" className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <svg
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    name="search"
                    placeholder="Tìm kiếm bài viết..."
                    defaultValue={search}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#fc5d01] focus:border-transparent bg-white text-gray-900 placeholder-gray-400 transition-colors"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold hover:scale-105"
              >
                Tìm kiếm
              </button>
              {(search || tag) && (
                <Link
                  href="/blog"
                  className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 text-center font-semibold"
                >
                  Xóa bộ lọc
                </Link>
              )}
            </form>

            {tag && (
              <div className="mt-4 flex items-center">
                <span className="text-sm text-gray-600 mr-2">Đang lọc theo:</span>
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] text-white shadow-md">
                  {tag}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content Grid with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {posts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  {posts.map((post, index) => (
                    <EnhancedPostCard key={post.slug} post={post} index={index} />
                  ))}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && !search && !tag && (
                  <div className="flex justify-center items-center space-x-2 mt-12">
                    {pagination.hasPrev && (
                      <Link
                        href={`/blog?page=${page - 1}`}
                        className="px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold text-gray-700 hover:scale-105"
                      >
                        ← Trang trước
                      </Link>
                    )}

                    <span className="px-6 py-3 text-gray-700 font-semibold">
                      Trang {pagination.currentPage} / {pagination.totalPages}
                    </span>

                    {pagination.hasNext && (
                      <Link
                        href={`/blog?page=${page + 1}`}
                        className="px-6 py-3 bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold hover:scale-105"
                      >
                        Trang sau →
                      </Link>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                <svg
                  className="w-20 h-20 mx-auto text-gray-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {search ? 'Không tìm thấy bài viết nào' : 'Chưa có bài viết nào'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {search ? 'Hãy thử tìm kiếm với từ khóa khác' : 'Vui lòng quay lại sau'}
                </p>
                {search && (
                  <Link
                    href="/blog"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold"
                  >
                    Xem tất cả bài viết
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <BlogSidebar featuredPosts={featuredPosts} categories={categories} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
