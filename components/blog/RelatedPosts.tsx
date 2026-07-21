import { BlogGrid } from './BlogGrid';
import type { Post } from '@/lib/blog/posts';

export function RelatedPosts({ posts }: { posts: Post[] }) {
  if (!posts.length) return null;
  return <section className="mt-16"><h2 className="mb-6 text-2xl font-bold text-gray-900">Bài viết liên quan</h2><BlogGrid posts={posts} /></section>;
}

export const RelatedPostsCms = RelatedPosts;
