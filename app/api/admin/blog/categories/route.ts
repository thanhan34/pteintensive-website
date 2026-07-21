import { NextRequest, NextResponse } from 'next/server';
import { requireAdminFromRequest } from '@/lib/admin-auth';
import { listCategories, seedDefaultCategoriesIfEmpty, upsertCategory } from '@/lib/blog-cms/server';

export async function GET(request: NextRequest) {
  try {
    await requireAdminFromRequest(request);
    await seedDefaultCategoriesIfEmpty();
    return NextResponse.json({ categories: await listCategories(true) });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdminFromRequest(request);
    const body = await request.json();
    const category = await upsertCategory(body, body.id);
    return NextResponse.json({ category });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to save category' }, { status: 400 });
  }
}
