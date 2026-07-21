import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogCTA } from '@/components/blog/BlogCTA';
import { BlogGrid } from '@/components/blog/BlogGrid';
import { getAllCategories, getCategoryBySlug, getPostsByCategorySlug } from '@/lib/blog/posts';
import { getCanonicalUrl } from '@/lib/site';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCategories().map((category) => ({ categorySlug: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ categorySlug: string }> }): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return { title: 'Chủ đề không tìm thấy', robots: { index: false, follow: false } };
  }

  const canonicalUrl = getCanonicalUrl(`/blog/category/${category.slug}`);
  return {
    title: `${category.name} - Blog PTE Intensive`,
    description: category.description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${category.name} - Blog PTE Intensive`,
      description: category.description,
      type: 'website',
      url: canonicalUrl,
    },
  };
}

export default async function BlogCategoryPage({ params }: { params: Promise<{ categorySlug: string }> }) {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  const posts = getPostsByCategorySlug(categorySlug);
  if (!category) notFound();
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-[#FEDAC2]/40 to-white px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <p className="font-semibold text-[#FC5D01]">Blog Category</p>
          <h1 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">{category.name}</h1>
          <p className="mt-5 max-w-2xl text-lg text-gray-600">{category.description || `Các bài viết mới nhất trong chủ đề ${category.name}.`}</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12">
        <BlogGrid posts={posts} />
        <div className="mt-16"><BlogCTA /></div>
      </section>
    </main>
  );
}
