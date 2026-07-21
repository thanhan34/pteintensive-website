'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/context';
import { useNotification } from '@/app/components/Notification';
import { calculateSEOScore, generateSlug, markdownToHtml } from '@/lib/blog-cms/utils';
import { FAQEditor } from './FAQEditor';
import { ImageUploader } from './ImageUploader';
import { SEOScoreChecklist } from './SEOScoreChecklist';

const emptyPost = { title: '', slug: '', excerpt: '', contentMarkdown: '', contentHtml: '', metaTitle: '', metaDescription: '', focusKeyword: '', categoryId: '', categoryName: '', categorySlug: '', tags: [], thumbnailUrl: '', status: 'draft', authorName: 'PTE Intensive', faqs: [] as any[] };

export function BlogPostForm({ initialPost }: { initialPost?: any }) {
  const [post, setPost] = useState<any>(initialPost || emptyPost);
  const [categories, setCategories] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const { showNotification } = useNotification();
  const score = useMemo(() => calculateSEOScore(post), [post]);

  useEffect(() => { loadCategories(); }, []);
  async function authedFetch(url: string, init: RequestInit = {}) { const token = await user?.getIdToken(); return fetch(url, { ...init, headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, ...(init.headers || {}) } }); }
  async function loadCategories() { const res = await authedFetch('/api/admin/blog/categories'); if (res.ok) setCategories((await res.json()).categories); }
  function setField(key: string, value: any) { setPost((p: any) => ({ ...p, [key]: value })); }
  function onTitle(value: string) { setPost((p: any) => ({ ...p, title: value, slug: p.slug ? p.slug : generateSlug(value), metaTitle: p.metaTitle ? p.metaTitle : value })); }
  function onCategory(id: string) { const c = categories.find((item) => item.id === id); setPost((p: any) => ({ ...p, categoryId: id, categoryName: c?.name || '', categorySlug: c?.slug || '' })); }
  async function save(status: 'draft' | 'published') {
    setSaving(true);
    try {
      const payload = { ...post, status, slug: generateSlug(post.slug || post.title), contentHtml: markdownToHtml(post.contentMarkdown) };
      const res = await authedFetch(initialPost?.id ? `/api/admin/blog/posts/${initialPost.id}` : '/api/admin/blog/posts', { method: initialPost?.id ? 'PUT' : 'POST', body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Save failed');
      showNotification('success', status === 'published' ? 'Post published.' : 'Draft saved.');
      router.push('/admin/blog');
    } catch (error) { showNotification('error', error instanceof Error ? error.message : 'Save failed'); } finally { setSaving(false); }
  }
  return (
    <form onSubmit={(e: FormEvent) => { e.preventDefault(); save('draft'); }} className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <section className="space-y-6 rounded-2xl bg-white p-6 shadow">
        <Field label="Title"><input className="input" value={post.title} onChange={(e) => onTitle(e.target.value)} required /></Field>
        <Field label="Slug"><input className="input" value={post.slug} onChange={(e) => setField('slug', generateSlug(e.target.value))} required /></Field>
        <Field label="Excerpt"><textarea className="input min-h-24" value={post.excerpt} onChange={(e) => setField('excerpt', e.target.value)} /></Field>
        <Field label="Markdown content"><textarea className="input min-h-[420px] font-mono" value={post.contentMarkdown} onChange={(e) => setField('contentMarkdown', e.target.value)} /></Field>
        <Field label="FAQs"><FAQEditor faqs={post.faqs || []} onChange={(faqs) => setField('faqs', faqs)} /></Field>
      </section>
      <aside className="space-y-6">
        <div className="rounded-2xl bg-white p-6 shadow"><div className="flex flex-wrap gap-3"><button disabled={saving} type="submit" className="rounded-xl border px-4 py-3 font-semibold hover:bg-gray-50">Save draft</button><button disabled={saving} type="button" onClick={() => save('published')} className="rounded-xl bg-[#FC5D01] px-4 py-3 font-semibold text-white hover:bg-[#e65300]">Publish</button>{post.slug && <a className="rounded-xl border px-4 py-3 font-semibold hover:bg-gray-50" href={`/blog/${post.slug}`} target="_blank">Preview</a>}</div></div>
        <div className="rounded-2xl bg-white p-6 shadow"><Field label="Category"><select className="input" value={post.categoryId} onChange={(e) => onCategory(e.target.value)}><option value="">Select category</option>{categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></Field><Field label="Tags (comma separated)"><input className="input" value={(post.tags || []).join(', ')} onChange={(e) => setField('tags', e.target.value.split(',').map((t) => t.trim()).filter(Boolean))} /></Field><Field label="Thumbnail"><ImageUploader value={post.thumbnailUrl} slug={post.slug} onChange={(url) => setField('thumbnailUrl', url)} /></Field></div>
        <div className="rounded-2xl bg-white p-6 shadow"><Field label="Meta title"><input className="input" value={post.metaTitle} onChange={(e) => setField('metaTitle', e.target.value)} /></Field><p className={`mb-4 text-xs ${post.metaTitle.length > 60 ? 'text-red-600' : 'text-gray-500'}`}>{post.metaTitle.length}/60</p><Field label="Meta description"><textarea className="input" value={post.metaDescription} onChange={(e) => setField('metaDescription', e.target.value)} /></Field><p className={`mb-4 text-xs ${post.metaDescription.length > 160 ? 'text-red-600' : 'text-gray-500'}`}>{post.metaDescription.length}/160</p><Field label="Focus keyword"><input className="input" value={post.focusKeyword} onChange={(e) => setField('focusKeyword', e.target.value)} /></Field><SEOScoreChecklist score={score} /></div>
      </aside>
    </form>
  );
}

function Field({ label, children }: any) { return <label className="block"><span className="mb-2 block text-sm font-semibold text-gray-800">{label}</span>{children}</label>; }
