import Link from 'next/link';
import { formatPostDate, getPostCategory, type Post } from '@/lib/blog/posts';

export function BlogCard({ post }: { post: Post }) {
  const category = getPostCategory(post);

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/blog/${post.slug}`}>
        <img src={post.cover || '/og/pteintensive-blog.png'} alt={post.title} className="h-52 w-full object-cover" />
      </Link>
      <div className="p-6">
        {category ? <Link href={`/blog/category/${category.slug}`} className="text-sm font-semibold text-[#FC5D01]">{category.name}</Link> : null}
        <h2 className="mt-3 line-clamp-2 text-xl font-bold text-gray-900"><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
        <p className="mt-3 line-clamp-3 text-gray-600">{post.description}</p>
        <div className="mt-5 flex items-center justify-between text-sm text-gray-500"><span>{formatPostDate(post.date)}</span><Link className="font-semibold text-[#FC5D01]" href={`/blog/${post.slug}`}>Đọc tiếp →</Link></div>
      </div>
    </article>
  );
}
