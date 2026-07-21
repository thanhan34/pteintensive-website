'use client';

import Link from 'next/link';
import { BlogStatusBadge } from './BlogStatusBadge';
import { formatPostDate } from '@/lib/blog/format';

export function BlogPostTable({ posts, onDelete, onToggle }: { posts: any[]; onDelete: (id: string) => void; onToggle: (post: any) => void }) {
  if (!posts.length) return <div className="rounded-2xl bg-white p-12 text-center text-gray-500 shadow">No posts found.</div>;
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
            <tr><th className="px-4 py-3">Post</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Updated</th><th className="px-4 py-3">Published</th><th className="px-4 py-3">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="px-4 py-4"><div className="flex items-center gap-3"><img src={post.cover || post.thumbnailUrl || '/images/logo/pte-intensive-logo.png'} alt="" className="h-14 w-20 rounded-lg object-cover bg-gray-100" /><div><p className="font-semibold text-gray-900">{post.title}</p><p className="text-xs text-gray-500">/{post.slug}</p></div></div></td>
                <td className="px-4 py-4 text-gray-600">{post.categoryName || '—'}</td>
                <td className="px-4 py-4"><BlogStatusBadge status={post.status} /></td>
                <td className="px-4 py-4 text-gray-600">{formatPostDate(post.updatedAt)}</td>
                <td className="px-4 py-4 text-gray-600">{formatPostDate(post.publishedAt)}</td>
                <td className="px-4 py-4"><div className="flex flex-wrap gap-2"><Link href={`/blog/${post.slug}`} className="rounded-lg border px-3 py-2 font-medium hover:bg-gray-50">View</Link><button onClick={() => onToggle(post)} className="rounded-lg border px-3 py-2 font-medium hover:bg-gray-50">{post.status === 'published' ? 'Unpublish' : 'Publish'}</button><button onClick={() => onDelete(post.id)} className="rounded-lg border border-red-200 px-3 py-2 font-medium text-red-600 hover:bg-red-50">Delete</button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
