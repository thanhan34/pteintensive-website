'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth/context';
import { useNotification } from '@/app/components/Notification';
import { AdminBlogLayout } from '../../../../components/admin/blog/AdminLayout';
import { generateSlug } from '@/lib/blog-cms/utils';

export default function BlogCategoriesPage() {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const [categories, setCategories] = useState<any[]>([]);
  const [draft, setDraft] = useState({ name: '', slug: '', description: '', order: 0, isActive: true });
  useEffect(() => { if (user) load(); }, [user]);
  async function authedFetch(url: string, init: RequestInit = {}) { const token = await user?.getIdToken(); return fetch(url, { ...init, headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, ...(init.headers || {}) } }); }
  async function load() { const res = await authedFetch('/api/admin/blog/categories'); if (res.ok) setCategories((await res.json()).categories); }
  async function save(item: any) { const res = await authedFetch('/api/admin/blog/categories', { method: 'POST', body: JSON.stringify(item) }); if (res.ok) { showNotification('success', 'Category saved.'); setDraft({ name: '', slug: '', description: '', order: 0, isActive: true }); load(); } else showNotification('error', 'Save failed.'); }
  return <AdminBlogLayout><div className="mb-8"><h1 className="text-3xl font-bold">Blog Categories</h1><p className="text-gray-600">Default categories are seeded automatically.</p></div><div className="grid gap-6 lg:grid-cols-[360px_1fr]"><form onSubmit={(e) => { e.preventDefault(); save(draft); }} className="rounded-2xl bg-white p-6 shadow"><h2 className="mb-4 font-semibold">Add category</h2><input className="input mb-3" placeholder="Name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value, slug: draft.slug || generateSlug(e.target.value) })} /><input className="input mb-3" placeholder="Slug" value={draft.slug} onChange={(e) => setDraft({ ...draft, slug: generateSlug(e.target.value) })} /><textarea className="input mb-3" placeholder="Description" value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} /><input className="input mb-3" type="number" placeholder="Order" value={draft.order} onChange={(e) => setDraft({ ...draft, order: Number(e.target.value) })} /><label className="mb-4 flex gap-2 text-sm"><input type="checkbox" checked={draft.isActive} onChange={(e) => setDraft({ ...draft, isActive: e.target.checked })} /> Active</label><button className="rounded-xl bg-[#FC5D01] px-4 py-3 font-semibold text-white">Save category</button></form><div className="rounded-2xl bg-white shadow"><div className="divide-y divide-gray-100">{categories.map((c) => <div key={c.id} className="grid gap-3 p-4 md:grid-cols-5 md:items-center"><input className="input" value={c.name} onChange={(e) => setCategories(categories.map((x) => x.id === c.id ? { ...x, name: e.target.value } : x))} /><input className="input" value={c.slug} onChange={(e) => setCategories(categories.map((x) => x.id === c.id ? { ...x, slug: generateSlug(e.target.value) } : x))} /><input className="input" value={c.description} onChange={(e) => setCategories(categories.map((x) => x.id === c.id ? { ...x, description: e.target.value } : x))} /><label className="flex gap-2 text-sm"><input type="checkbox" checked={c.isActive} onChange={(e) => setCategories(categories.map((x) => x.id === c.id ? { ...x, isActive: e.target.checked } : x))} /> Active</label><button onClick={() => save(c)} className="rounded-xl border px-4 py-2 font-semibold hover:bg-gray-50">Save</button></div>)}</div></div></div></AdminBlogLayout>;
}
