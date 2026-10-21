import { NextRequest, NextResponse } from 'next/server';
import { parseCallback } from '@/lib/billing/vnpay';
import { processIPN } from '@/lib/billing/server';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest) {
  try { return NextResponse.json(await processIPN(parseCallback(request.nextUrl.searchParams)), { headers: { 'Cache-Control': 'no-store' } }); }
  catch (error) {
    console.error('[vnpay ipn]', error);
    return NextResponse.json({ RspCode: '99', Message: 'Unable to confirm' }, { headers: { 'Cache-Control': 'no-store' } });
  }
}