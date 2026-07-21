import { NextResponse } from 'next/server';
import { getAllCategories, getAllPosts, getPostCategory } from '@/lib/blog/posts';

export async function GET() {
  const posts = getAllPosts().map((post) => {
    const category = getPostCategory(post);

    return {
      id: post.slug,
      title: post.title,
      slug: post.slug,
      excerpt: post.description,
      status: 'published',
      updatedAt: post.updated || post.date,
      publishedAt: post.date,
      categoryId: category?.id || null,
      categoryName: category?.name || null,
      cover: post.cover,
      source: 'mdx',
    };
  });

  return NextResponse.json({ posts, categories: getAllCategories(), source: 'mdx' });
}