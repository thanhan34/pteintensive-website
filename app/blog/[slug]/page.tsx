import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogCTA } from '@/components/blog/BlogCTA';
import { RelatedPosts } from '@/components/blog/RelatedPosts';
import { MDXRenderer } from '@/lib/blog/mdx-renderer';
import { formatPostDate, getAllPostSlugs, getPostBySlug, getPostCategory, getRelatedByTags } from '@/lib/blog/posts';
import { getCanonicalUrl, SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';
export const dynamicParams = false;

interface Props { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Bài viết không tìm thấy', robots: { index: false, follow: false } };

  const canonicalUrl = getCanonicalUrl(`/blog/${post.slug}`);

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: canonicalUrl,
      images: post.cover ? [{ url: post.cover, width: 1200, height: 630, alt: post.title }] : ['/og/pteintensive-blog.png'],
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.cover || '/og/pteintensive-blog.png'],
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedByTags(post, 3);
  const category = getPostCategory(post);
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.cover,
    author: { '@type': 'Person', name: post.author || 'PTE Intensive' },
    publisher: { '@type': 'Organization', name: 'PTE Intensive', logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/logo/pte-intensive-logo.png` } },
    datePublished: post.date,
    dateModified: post.updated || post.date,
    mainEntityOfPage: getCanonicalUrl(`/blog/${post.slug}`),
  };

  return (
    <main className="min-h-screen bg-white">
      <article>
        <header className="bg-gradient-to-b from-[#FEDAC2]/40 to-white px-4 py-14">
          <div className="mx-auto max-w-4xl">
            {category ? <p className="font-semibold text-[#FC5D01]">{category.name}</p> : null}
            <h1 className="mt-4 text-4xl font-bold leading-tight text-gray-900 md:text-5xl">{post.title}</h1>
            <p className="mt-5 text-xl text-gray-600">{post.description}</p>
            <div className="mt-5 flex flex-wrap gap-3 text-sm text-gray-500"><span>{post.author}</span><span>•</span><span>Published {formatPostDate(post.date)}</span>{post.updated ? <><span>•</span><span>Updated {formatPostDate(post.updated)}</span></> : null}<span>•</span><span>{post.readingTime} phút đọc</span></div>
            {post.cover && <img src={post.cover} alt={post.title} className="mt-8 max-h-[460px] w-full rounded-3xl object-cover shadow-xl" />}
          </div>
        </header>
        <div className="mx-auto max-w-4xl px-4 py-12">
          <MDXRenderer content={post.content} />
          <div className="mt-12"><BlogCTA /></div>
          <RelatedPosts posts={related} />
        </div>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    </main>
  );
}
