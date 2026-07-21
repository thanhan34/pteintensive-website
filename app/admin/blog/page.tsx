'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { AdminBlogLayout } from '../../../components/admin/blog/AdminLayout';
import { BlogPostTable } from '../../../components/admin/blog/BlogPostTable';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [category, setCategory] = useState('all');

  useEffect(() => { loadData(); }, []);
  async function loadData() { setLoading(true); try { const res = await fetch('/api/blog/posts'); if (res.ok) { const data = await res.json(); setPosts(data.posts || []); setCategories(data.categories || []); } } finally { setLoading(false); } }
  const filtered = useMemo(() => posts.filter((post) => (status === 'all' || post.status === status) && (category === 'all' || post.categoryId === category) && (!search || `${post.title} ${post.slug} ${post.excerpt}`.toLowerCase().includes(search.toLowerCase()))), [posts, status, category, search]);
  function deletePost() { alert('Blog đã chuyển về MDX. Hãy xoá file trong content/posts nếu muốn xoá bài.'); }
  function togglePost() { alert('Blog đã chuyển về MDX. Hãy chỉnh frontmatter published trong file .mdx.'); }

  return <AdminBlogLayout><div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><h1 className="text-3xl font-bold">MDX Blog</h1><p className="text-gray-600">Public blog hiện đọc từ content/posts/*.mdx, không dùng Firebase CMS.</p></div><Link href="/blog" className="min-h-11 rounded-xl bg-[#FC5D01] px-5 py-3 font-semibold text-white hover:bg-[#e65300]">Xem blog</Link></div><div className="mb-6 rounded-2xl border border-orange-100 bg-orange-50 p-4 text-sm text-orange-900">Để thêm/sửa bài viết, hãy chỉnh file MDX trong <code>content/posts</code> và cập nhật frontmatter.</div><div className="mb-6 grid gap-3 rounded-2xl bg-white p-4 shadow md:grid-cols-3"><input className="input" placeholder="Search posts..." value={search} onChange={(e) => setSearch(e.target.value)} /><select className="input" value={status} onChange={(e) => setStatus(e.target.value)}><option value="all">All status</option><option value="published">Published</option></select><select className="input" value={category} onChange={(e) => setCategory(e.target.value)}><option value="all">All categories</option>{categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>{loading ? <div className="py-16 text-center text-gray-500">Loading posts...</div> : <BlogPostTable posts={filtered} onDelete={deletePost} onToggle={togglePost} />}</AdminBlogLayout>;
}
