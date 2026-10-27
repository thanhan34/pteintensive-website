import { NextRequest, NextResponse } from 'next/server';
import { billingError, checkStudentOrder } from '@/lib/billing/server';
export const runtime = 'nodejs';
export async function POST(request: NextRequest) {
  try { return NextResponse.json(await checkStudentOrder(request), { headers: { 'Cache-Control': 'no-store' } }); }
  catch (error) { return billingError(error); }
}