import { NextRequest, NextResponse } from 'next/server';
import { billingData, billingError, checkout } from '@/lib/billing/server';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest) {
  try { return NextResponse.json(await billingData(request), { headers: { 'Cache-Control': 'no-store' } }); } catch (error) { return billingError(error); }
}
export async function POST(request: NextRequest) {
  try { return NextResponse.json(await checkout(request), { headers: { 'Cache-Control': 'no-store' } }); } catch (error) { return billingError(error); }
}