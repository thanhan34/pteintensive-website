import { BlogCard } from './BlogCard';
import type { Post } from '@/lib/blog/posts';

export function BlogGrid({ posts }: { posts: Post[] }) {
  if (!posts.length) return <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center text-gray-500 shadow">Chưa có bài viết phù hợp.</div>;
  return <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">{posts.map((post) => <BlogCard key={post.slug} post={post} />)}</div>;
}
