import { NextRequest, NextResponse } from 'next/server';
import { requireAdminFromRequest } from '@/lib/admin-auth';
import { getAdminStorage } from '@/lib/firebase-admin';
import { generateSlug } from '@/lib/blog-cms/utils';

export async function POST(request: NextRequest) {
  try {
    await requireAdminFromRequest(request);
    const formData = await request.formData();
    const file = formData.get('file');
    const slug = generateSlug(String(formData.get('slug') || 'draft')) || 'draft';

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Missing image file' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image uploads are allowed' }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Image must be smaller than 5MB' }, { status: 400 });
    }

    const bucket = getAdminStorage().bucket();
    const extension = file.name.split('.').pop() || 'jpg';
    const storagePath = `covers/${slug}/${Date.now()}.${extension}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    const upload = bucket.file(storagePath);

    await upload.save(buffer, {
      metadata: { contentType: file.type, cacheControl: 'public, max-age=31536000' },
      resumable: false,
    });

    await upload.makePublic();

    return NextResponse.json({
      url: `https://storage.googleapis.com/${bucket.name}/${storagePath}`,
      path: storagePath,
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Upload failed' }, { status: 400 });
  }
}
