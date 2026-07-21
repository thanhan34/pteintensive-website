import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { getAdminDb } from '@/lib/firebase-admin';
import type { BlogCategory, BlogCategoryInput, BlogPost, BlogPostInput } from './types';
import { calculateSEOScore, cleanFaqs, defaultBlogCategories, generateSlug, markdownToHtml } from './utils';

const POSTS = 'posts';
const CATEGORIES = 'categories';

function adminDb() {
  return getAdminDb();
}

type AnyDoc = FirebaseFirestore.DocumentData & { id?: string };

function serializeTimestamp(value: any): string | null {
  if (!value) return null;
  if (typeof value.toDate === 'function') return value.toDate().toISOString();
  if (value instanceof Date) return value.toISOString();
  return typeof value === 'string' ? value : null;
}

export function serializePost(doc: AnyDoc): any {
  return {
    ...doc,
    createdAt: serializeTimestamp(doc.createdAt),
    updatedAt: serializeTimestamp(doc.updatedAt),
    publishedAt: serializeTimestamp(doc.publishedAt),
  };
}

export function serializeCategory(doc: AnyDoc): any {
  return {
    ...doc,
    createdAt: serializeTimestamp(doc.createdAt),
    updatedAt: serializeTimestamp(doc.updatedAt),
  };
}

function fromPostSnap(snap: FirebaseFirestore.DocumentSnapshot): BlogPost | null {
  if (!snap.exists) return null;
  return { id: snap.id, ...snap.data() } as BlogPost;
}

function fromCategorySnap(snap: FirebaseFirestore.DocumentSnapshot): BlogCategory | null {
  if (!snap.exists) return null;
  return { id: snap.id, ...snap.data() } as BlogCategory;
}

async function ensureUniqueSlug(slug: string, currentId?: string): Promise<string> {
  let base = generateSlug(slug);
  if (!base) base = 'blog-post';
  let next = base;
  let count = 1;

  while (true) {
    const snap = await adminDb().collection(POSTS).where('slug', '==', next).limit(1).get();
    if (snap.empty || snap.docs[0].id === currentId) return next;
    next = `${base}-${count++}`;
  }
}

function normalizePostInput(input: BlogPostInput) {
  const slug = generateSlug(input.slug || input.title);
  const faqs = cleanFaqs(input.faqs || []);
  const contentMarkdown = input.contentMarkdown || '';
  const contentHtml = input.contentHtml || markdownToHtml(contentMarkdown);
  const status = input.status === 'published' ? 'published' : 'draft';

  return {
    title: input.title.trim(),
    slug,
    excerpt: input.excerpt.trim(),
    contentHtml,
    contentMarkdown,
    metaTitle: input.metaTitle.trim(),
    metaDescription: input.metaDescription.trim(),
    focusKeyword: input.focusKeyword.trim(),
    categoryId: input.categoryId || '',
    categoryName: input.categoryName || '',
    categorySlug: input.categorySlug || '',
    tags: Array.isArray(input.tags) ? input.tags.map((tag) => tag.trim()).filter(Boolean) : [],
    thumbnailUrl: input.thumbnailUrl || '',
    status,
    authorName: input.authorName || 'PTE Intensive',
    faqs,
  } satisfies Omit<BlogPostInput, 'publishedAt'>;
}

export async function listAdminPosts() {
  const snap = await adminDb().collection(POSTS).orderBy('updatedAt', 'desc').get();
  return snap.docs.map((doc) => serializePost({ id: doc.id, ...doc.data() }));
}

export async function getAdminPost(id: string) {
  const post = fromPostSnap(await adminDb().collection(POSTS).doc(id).get());
  return post ? serializePost(post) : null;
}

export async function createAdminPost(input: BlogPostInput) {
  const normalized = normalizePostInput(input);
  const slug = await ensureUniqueSlug(normalized.slug);
  const now = FieldValue.serverTimestamp();
  const data = {
    ...normalized,
    slug,
    seoScore: calculateSEOScore({ ...normalized, slug }),
    createdAt: now,
    updatedAt: now,
    publishedAt: normalized.status === 'published' ? now : null,
  };
  const ref = await adminDb().collection(POSTS).add(data);
  return { id: ref.id, ...data, createdAt: null, updatedAt: null, publishedAt: null };
}

export async function updateAdminPost(id: string, input: BlogPostInput) {
  const current = fromPostSnap(await adminDb().collection(POSTS).doc(id).get());
  if (!current) throw new Error('Post not found');
  const normalized = normalizePostInput(input);
  const slug = await ensureUniqueSlug(normalized.slug, id);
  const isPublishing = current.status !== 'published' && normalized.status === 'published';
  const data = {
    ...normalized,
    slug,
    seoScore: calculateSEOScore({ ...normalized, slug }),
    updatedAt: FieldValue.serverTimestamp(),
    publishedAt: normalized.status === 'published'
      ? (current.publishedAt || (isPublishing ? FieldValue.serverTimestamp() : null))
      : null,
  };
  await adminDb().collection(POSTS).doc(id).update(data);
  return { id, ...data };
}

export async function deleteAdminPost(id: string) {
  await adminDb().collection(POSTS).doc(id).delete();
}

export async function setAdminPostStatus(id: string, status: 'draft' | 'published') {
  const current = fromPostSnap(await adminDb().collection(POSTS).doc(id).get());
  if (!current) throw new Error('Post not found');
  await adminDb().collection(POSTS).doc(id).update({
    status,
    updatedAt: FieldValue.serverTimestamp(),
    publishedAt: status === 'published' ? (current.publishedAt || FieldValue.serverTimestamp()) : null,
  });
}

export async function listCategories(includeInactive = true) {
  let ref: FirebaseFirestore.Query = adminDb().collection(CATEGORIES).orderBy('order', 'asc');
  if (!includeInactive) ref = adminDb().collection(CATEGORIES).where('isActive', '==', true).orderBy('order', 'asc');
  const snap = await ref.get();
  return snap.docs.map((doc) => serializeCategory({ id: doc.id, ...doc.data() }));
}

export async function seedDefaultCategoriesIfEmpty() {
  const existing = await adminDb().collection(CATEGORIES).limit(1).get();
  if (!existing.empty) return;
  const db = adminDb();
  const batch = db.batch();
  defaultBlogCategories.forEach((name, index) => {
    const ref = db.collection(CATEGORIES).doc();
    batch.set(ref, {
      name,
      slug: generateSlug(name),
      description: '',
      order: index + 1,
      isActive: true,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
  });
  await batch.commit();
}

export async function upsertCategory(input: BlogCategoryInput, id?: string) {
  const data = {
    name: input.name.trim(),
    slug: generateSlug(input.slug || input.name),
    description: input.description || '',
    order: Number(input.order || 0),
    isActive: Boolean(input.isActive),
    updatedAt: FieldValue.serverTimestamp(),
  };
  if (id) {
    await adminDb().collection(CATEGORIES).doc(id).update(data);
    return { id, ...data };
  }
  const ref = await adminDb().collection(CATEGORIES).add({ ...data, createdAt: FieldValue.serverTimestamp() });
  return { id: ref.id, ...data };
}

export async function getPublishedPosts() {
  const snap = await adminDb().collection(POSTS).where('status', '==', 'published').orderBy('publishedAt', 'desc').get();
  return snap.docs.map((doc) => serializePost({ id: doc.id, ...doc.data() }));
}

export async function getPostBySlug(slug: string) {
  const snap = await adminDb().collection(POSTS).where('slug', '==', slug).where('status', '==', 'published').limit(1).get();
  if (snap.empty) return null;
  return serializePost({ id: snap.docs[0].id, ...snap.docs[0].data() });
}

export async function getCategoryBySlug(slug: string) {
  const snap = await adminDb().collection(CATEGORIES).where('slug', '==', slug).where('isActive', '==', true).limit(1).get();
  if (snap.empty) return null;
  return serializeCategory({ id: snap.docs[0].id, ...snap.docs[0].data() });
}

export async function getPublishedPostsByCategory(categorySlug: string) {
  const snap = await adminDb().collection(POSTS)
    .where('status', '==', 'published')
    .where('categorySlug', '==', categorySlug)
    .orderBy('publishedAt', 'desc')
    .get();
  return snap.docs.map((doc) => serializePost({ id: doc.id, ...doc.data() }));
}

export async function getRelatedPosts(post: any, limit = 3) {
  const posts = await getPublishedPosts();
  return posts.filter((item) => item.id !== post.id && (item.categorySlug === post.categorySlug || item.tags?.some((tag: string) => post.tags?.includes(tag)))).slice(0, limit);
}
