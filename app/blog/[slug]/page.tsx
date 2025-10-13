import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getPostBySlug, getAllPostSlugs, getRelatedByTags } from '@/lib/blog/posts';
import { MDXRenderer } from '@/lib/blog/mdx-renderer';
import { CTABlock } from '@/components/blog/cta-block';
import { RelatedPosts } from '@/components/blog/related-posts';
import { ShareButtons } from '@/components/blog/share-buttons';
import { ClientDate } from '../../../components/blog/client-date';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Bài viết không tìm thấy',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pteintensive.com';

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      images: [
        {
          url: post.cover,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.cover],
    },
    alternates: {
      canonical: `${siteUrl}/blog/${post.slug}`,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedByTags(post, 3);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pteintensive.com';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="mb-6">
            <Link href="/blog" className="text-[#fc5d01] hover:text-[#fd7f33] text-sm font-medium">
              ← Quay lại Blog
            </Link>
          </nav>

          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between text-sm text-gray-600 mb-6 flex-wrap gap-4">
            <div className="flex items-center space-x-6">
              <span className="font-medium">{post.author}</span>
              <time dateTime={post.date}>
                <ClientDate date={post.date} format="long" />
              </time>
              <span>{post.readingTime} phút đọc</span>
            </div>
          </div>

          <p className="text-xl text-gray-600 leading-relaxed">
            {post.description}
          </p>
        </div>
      </div>

      {/* Cover Image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="aspect-video relative rounded-lg overflow-hidden shadow-lg">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <article className="bg-white rounded-lg shadow-sm p-8 lg:p-12">
          <div className="prose prose-lg max-w-none">
            <MDXRenderer content={post.content} />
          </div>

          {/* CTA Block */}
          <CTABlock />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Thẻ:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Share */}
          <ShareButtons url={`${siteUrl}/blog/${post.slug}`} title={post.title} />
        </article>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} />}

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description,
            image: post.cover,
            author: {
              '@type': 'Person',
              name: post.author,
            },
            publisher: {
              '@type': 'Organization',
              name: 'PTE Intensive',
              logo: {
                '@type': 'ImageObject',
                url: `${siteUrl}/og/pteintensive-blog.png`,
              },
            },
            datePublished: new Date(post.date).toISOString(),
            dateModified: new Date(post.date).toISOString(),
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `${siteUrl}/blog/${post.slug}`,
            },
            keywords: post.tags.join(', '),
          }),
        }}
      />
    </div>
  );
}
