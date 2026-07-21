'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/lib/auth/context';
import { AdminBlogLayout } from '../../../../../components/admin/blog/AdminLayout';
import { BlogPostForm } from '../../../../../components/admin/blog/BlogPostForm';

export default function EditBlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { async function load() { if (!user || !id) return; const token = await user.getIdToken(); const res = await fetch(`/api/admin/blog/posts/${id}`, { headers: { Authorization: `Bearer ${token}` } }); if (res.ok) setPost((await res.json()).post); setLoading(false); } load(); }, [user, id]);
  return <AdminBlogLayout>{loading ? <div className="py-16 text-center text-gray-500">Loading post...</div> : post ? <><div className="mb-6"><h1 className="text-3xl font-bold">Edit blog post</h1><p className="text-gray-600">/{post.slug}</p></div><BlogPostForm initialPost={post} /></> : <div className="rounded-2xl bg-white p-12 text-center shadow">Post not found.</div>}</AdminBlogLayout>;
}
