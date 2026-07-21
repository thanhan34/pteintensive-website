import { NextRequest, NextResponse } from 'next/server';
import { requireAdminFromRequest } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
  try {
    const admin = await requireAdminFromRequest(request);
    return NextResponse.json({ admin: { email: admin.email, name: admin.name || admin.email } });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unauthorized' }, { status: 401 });
  }
}
