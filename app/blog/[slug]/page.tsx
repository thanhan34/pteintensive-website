import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getAllPostSlugs, getRelatedByTags } from '@/lib/blog/posts';
import { MDXRenderer } from '@/lib/blog/mdx-renderer';
import { CTABlock } from '@/components/blog/cta-block';
import { RelatedPosts } from '@/components/blog/related-posts';
import { ShareButtons } from '@/components/blog/share-buttons';
import { ReadingProgress } from '../../../components/blog/reading-progress';
import { ArticleHeader } from '../../../components/blog/article-header';

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
    <>
      {/* Reading Progress Bar */}
      <ReadingProgress />

      <div className="min-h-screen bg-white">
        {/* Article Header */}
        <ArticleHeader
          title={post.title}
          description={post.description}
          author={post.author}
          date={post.date}
          readingTime={post.readingTime}
          coverImage={post.cover}
          tags={post.tags}
        />

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <article className="bg-white">
            {/* Article Content */}
            <div className="prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-gray-900
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-gray-200
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-3
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-[#fc5d01] prose-a:no-underline hover:prose-a:text-[#fd7f33] hover:prose-a:underline
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-ul:my-6 prose-ul:space-y-2
              prose-ol:my-6 prose-ol:space-y-2
              prose-li:text-gray-700 prose-li:leading-relaxed
              prose-blockquote:border-l-4 prose-blockquote:border-[#fc5d01] prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:bg-[#fedac2]/10 prose-blockquote:py-4 prose-blockquote:my-6 prose-blockquote:rounded-r-lg
              prose-code:text-[#fc5d01] prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
              prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:p-6 prose-pre:my-6 prose-pre:overflow-x-auto
              prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8
              prose-hr:border-gray-200 prose-hr:my-12
              prose-table:border-collapse prose-table:w-full prose-table:my-8
              prose-th:bg-gray-100 prose-th:p-3 prose-th:text-left prose-th:font-semibold prose-th:border prose-th:border-gray-300
              prose-td:p-3 prose-td:border prose-td:border-gray-300"
            >
              <MDXRenderer content={post.content} />
            </div>

            {/* CTA Block */}
            <div className="mt-16">
              <CTABlock />
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-[#fc5d01]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog?tag=${encodeURIComponent(tag)}`}
                      className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-[#fedac2] to-[#fdbc94] text-gray-800 hover:shadow-md transition-all duration-200 hover:scale-105"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#fc5d01]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Chia sẻ bài viết
              </h3>
              <ShareButtons url={`${siteUrl}/blog/${post.slug}`} title={post.title} />
            </div>
          </article>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="bg-gray-50 py-16">
            <RelatedPosts posts={relatedPosts} />
          </div>
        )}

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
    </>
  );
}
