import { NextRequest, NextResponse } from 'next/server';
import { parseCallback, paymentConfig, verifySignature } from '@/lib/billing/vnpay';
export const runtime = 'nodejs';
export async function GET(request: NextRequest) {
  try {
    const config = paymentConfig();
    const params = parseCallback(request.nextUrl.searchParams);
    const target = new URL('/cart', config.origin);
    if (verifySignature(params, config.secret) && params.vnp_TmnCode === config.tmnCode && /^[a-zA-Z0-9_-]{1,100}$/.test(params.vnp_TxnRef || '')) target.searchParams.set('order', params.vnp_TxnRef);
    else target.searchParams.set('callback', 'invalid');
    // Never settle an order from a browser redirect.
    return NextResponse.redirect(target, 303);
  } catch { return new NextResponse('Không thể kiểm tra kết quả. Vui lòng mở Học phí của tôi để kiểm tra đơn.', { status: 400 }); }
}