import Link from 'next/link';
import type { BlogCategory } from '@/lib/blog/posts';

export function BlogCategoryFilter({ categories }: { categories: BlogCategory[] }) {
  return <div className="flex flex-wrap gap-3"><Link href="/blog" className="rounded-full bg-[#FC5D01] px-4 py-2 text-sm font-semibold text-white">Tất cả</Link>{categories.map((cat) => <Link key={cat.id} href={`/blog/category/${cat.slug}`} className="rounded-full border border-orange-100 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:border-[#FC5D01] hover:text-[#FC5D01]">{cat.name}</Link>)}</div>;
}
