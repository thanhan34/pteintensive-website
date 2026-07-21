import { NextRequest, NextResponse } from 'next/server';
import { requireAdminFromRequest } from '@/lib/admin-auth';
import { setAdminPostStatus } from '@/lib/blog-cms/server';

interface Params { params: Promise<{ id: string }> }

export async function POST(request: NextRequest, { params }: Params) {
  try {
    await requireAdminFromRequest(request);
    const { id } = await params;
    const { status } = await request.json();
    await setAdminPostStatus(id, status === 'published' ? 'published' : 'draft');
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to update status' }, { status: 400 });
  }
}
