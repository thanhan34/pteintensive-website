import { NextRequest, NextResponse } from 'next/server';
import { studentIdentity } from '@/lib/billing/student-auth';
import { getAdminDb } from '@/lib/firebase-admin';
import { billingError } from '@/lib/billing/server';
import { DRAFT_REVIEW_MS, emptyDraft, validateDraft } from '@/lib/billing/draft';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const headers = { 'Cache-Control': 'no-store' };
export async function GET() {
  try {
    const uid = (await studentIdentity())!;
    const doc = await getAdminDb().collection('billingDrafts').doc(uid).get();
    const data = doc.data();
    const draft = data && validateDraft(data.draft) ? data.draft : emptyDraft();
    return NextResponse.json({ draft, needsReview: !!data && Date.now() - data.updatedAt > DRAFT_REVIEW_MS }, { headers });
  } catch (error) { return billingError(error); }
}
export async function PUT(request: NextRequest) {
  try {
    const uid = (await studentIdentity())!;
    // An old tab/unmount save must never write its draft into a newly signed-in account.
    if (request.headers.get('x-billing-account') !== uid) throw new Error('FORBIDDEN');
    const body = await request.json();
    if (!validateDraft(body)) return NextResponse.json({ error: 'Bản nháp không hợp lệ.' }, { status: 400, headers });
    // Whitelist fields: do not persist arbitrary posted properties or academic approvals.
    const draft = { cart: body.cart.map(({ kind, id }) => ({ kind, id })), declaration: { completed: body.declaration.completed, feedback: body.declaration.feedback }, contact: { name: body.contact.name, email: body.contact.email, phone: body.contact.phone } };
    await getAdminDb().collection('billingDrafts').doc(uid).set({ draft, updatedAt: Date.now() });
    return NextResponse.json({ success: true }, { headers });
  } catch (error) { return billingError(error); }
}