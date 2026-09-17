import { Metadata } from 'next';
import { BlogCategoryFilter } from '@/components/blog/BlogCategoryFilter';
import { BlogCTA } from '@/components/blog/BlogCTA';
import { BlogGrid } from '@/components/blog/BlogGrid';
import { getAllCategories, searchPosts, getAllPosts } from '@/lib/blog/posts';
import { getCanonicalUrl } from '@/lib/site';

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ search?: string }> }): Promise<Metadata> {
  const { search } = await searchParams;
  const canonicalUrl = getCanonicalUrl('/blog');
  return {
    title: 'PTE Intensive Blog - Kiến thức PTE và visa Úc',
    description: 'Bài viết SEO chuyên sâu về PTE Academic, visa Úc 482, 485, 500, 407, 462 và lộ trình học PTE hiệu quả.',
    alternates: { canonical: canonicalUrl },
    robots: search ? { index: false, follow: true } : undefined,
    openGraph: {
      title: 'PTE Intensive Blog - Kiến thức PTE và visa Úc',
      description: 'Kiến thức PTE và visa Úc từ PTE Intensive.',
      images: ['/og/pteintensive-blog.png'],
      type: 'website',
      url: canonicalUrl,
    },
  };
}

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ search?: string }> }) {
  const params = await searchParams;
  const categories = getAllCategories();
  const search = params.search || '';
  const filtered = search ? searchPosts(search) : getAllPosts();

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-[#FEDAC2]/40 to-white px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <p className="font-semibold text-[#FC5D01]">PTE Intensive Blog</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold text-gray-900 md:text-5xl">Kiến thức PTE và lộ trình visa Úc</h1>
          <p className="mt-5 max-w-2xl text-lg text-gray-600">Cập nhật chiến lược học PTE, kinh nghiệm thi và hướng dẫn đạt điểm PTE cho các mục tiêu visa Úc.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
          <form className="mb-4 flex gap-2 sm:gap-3">
            <input name="search" defaultValue={params.search} aria-label="Tìm bài viết" placeholder="Tìm bài viết..." className="min-h-11 min-w-0 flex-1 rounded-xl border border-gray-200 bg-gray-50/70 px-4 text-sm transition placeholder:text-gray-400 hover:border-gray-300 focus:border-[#FC5D01] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#FC5D01]/10" />
            <button className="min-h-11 rounded-xl bg-[#FC5D01] px-5 text-sm font-bold text-white shadow-sm shadow-orange-200 transition hover:bg-[#e65300] sm:px-6">Tìm</button>
          </form>
          <BlogCategoryFilter categories={categories} />
        </div>
        <BlogGrid posts={filtered} />
        <div className="mt-16"><BlogCTA /></div>
      </section>
    </main>
  );
}
