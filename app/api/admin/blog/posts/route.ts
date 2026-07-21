import { NextRequest, NextResponse } from 'next/server';
import { requireAdminFromRequest } from '@/lib/admin-auth';
import { createAdminPost, listAdminPosts } from '@/lib/blog-cms/server';

export async function GET(request: NextRequest) {
  try {
    await requireAdminFromRequest(request);
    return NextResponse.json({ posts: await listAdminPosts() });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await requireAdminFromRequest(request);
    const body = await request.json();
    const post = await createAdminPost({ ...body, authorName: body.authorName || admin.name || admin.email || 'PTE Intensive' });
    return NextResponse.json({ post });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to create post' }, { status: 400 });
  }
}
