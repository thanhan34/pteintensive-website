import { NextRequest, NextResponse } from 'next/server';
import { requireAdminFromRequest } from '@/lib/admin-auth';
import { deleteAdminPost, getAdminPost, updateAdminPost } from '@/lib/blog-cms/server';

interface Params { params: Promise<{ id: string }> }

export async function GET(request: NextRequest, { params }: Params) {
  try {
    await requireAdminFromRequest(request);
    const { id } = await params;
    const post = await getAdminPost(id);
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    return NextResponse.json({ post });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unauthorized' }, { status: 401 });
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    await requireAdminFromRequest(request);
    const { id } = await params;
    const post = await updateAdminPost(id, await request.json());
    return NextResponse.json({ post });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to update post' }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    await requireAdminFromRequest(request);
    const { id } = await params;
    await deleteAdminPost(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to delete post' }, { status: 400 });
  }
}
