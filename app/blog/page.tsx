import { Metadata } from 'next';
import Link from 'next/link';
import { getPaginatedPosts, searchPosts, getPostsByTag } from '@/lib/blog/posts';
import { PostCard } from '@/components/blog/post-card';

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
    // Search posts
    const searchResults = searchPosts(search);
    posts = searchResults;
    pagination = {
      totalPages: 1,
      currentPage: 1,
      hasNext: false,
      hasPrev: false,
    };
  } else if (tag) {
    // Filter by tag
    const tagResults = getPostsByTag(tag);
    posts = tagResults;
    pagination = {
      totalPages: 1,
      currentPage: 1,
      hasNext: false,
      hasPrev: false,
    };
  } else {
    // Get paginated posts
    const result = getPaginatedPosts(page, 12);
    posts = result.posts;
    pagination = {
      totalPages: result.totalPages,
      currentPage: result.currentPage,
      hasNext: result.hasNext,
      hasPrev: result.hasPrev,
    };
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Blog PTE Intensive
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Chia sẻ kinh nghiệm, mẹo học và tin tức mới nhất về PTE Academic
            </p>
            <p className="mt-2 text-[#fc5d01] font-semibold">
              PTE Intensive – Học là đậu!
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <form method="get" className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                name="search"
                placeholder="Tìm kiếm bài viết..."
                defaultValue={search}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#fc5d01] focus:border-[#fc5d01]"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-[#fc5d01] text-white rounded-md hover:bg-[#fd7f33] transition-colors"
            >
              Tìm kiếm
            </button>
            {(search || tag) && (
              <Link
                href="/blog"
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-center"
              >
                Xóa bộ lọc
              </Link>
            )}
          </form>

          {tag && (
            <div className="mt-4">
              <span className="text-sm text-gray-600">Đang lọc theo tag: </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#fc5d01] text-white">
                {tag}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && !search && !tag && (
              <div className="flex justify-center items-center space-x-2">
                {pagination.hasPrev && (
                  <Link
                    href={`/blog?page=${page - 1}`}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    ← Trang trước
                  </Link>
                )}
                
                <span className="px-4 py-2 text-gray-700">
                  Trang {pagination.currentPage} / {pagination.totalPages}
                </span>
                
                {pagination.hasNext && (
                  <Link
                    href={`/blog?page=${page + 1}`}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Trang sau →
                  </Link>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">
              {search ? 'Không tìm thấy bài viết nào phù hợp' : 'Chưa có bài viết nào'}
            </div>
            {search && (
              <Link
                href="/blog"
                className="text-[#fc5d01] hover:text-[#fd7f33] underline"
              >
                Xem tất cả bài viết
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
