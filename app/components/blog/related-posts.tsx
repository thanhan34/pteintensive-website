import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/blog/posts';

interface RelatedPostsProps {
  posts: Post[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Bài viết liên quan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article key={post.slug} className="group">
              <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                <Link href={`/blog/${post.slug}`} className="hover:text-[#fc5d01] transition-colors">
                  {post.title}
                </Link>
              </h3>
              
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                {post.description}
              </p>
              
              <div className="text-xs text-gray-500">
                {new Date(post.date).toLocaleDateString('vi-VN')}
                <span className="ml-2">{post.readingTime} phút đọc</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
