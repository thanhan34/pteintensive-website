import { NextRequest, NextResponse } from 'next/server';
import { studentIdentity } from '@/lib/billing/student-auth';
import { getAdminDb } from '@/lib/firebase-admin';
import { billingError } from '@/lib/billing/server';
import { draftReviewTiming, emptyDraft, validateDraft } from '@/lib/billing/draft';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const headers = { 'Cache-Control': 'no-store' };
export async function GET() {
  try {
    const uid = (await studentIdentity())!;
    const db = getAdminDb();
    const reference = db.collection('billingDrafts').doc(uid);
    const result = await db.runTransaction(async (transaction) => {
      const data = (await transaction.get(reference)).data();
      const timing = draftReviewTiming(data?.updatedAt, Date.now());
      const expired = !!data && (timing.needsReview || timing.reviewAt === null);
      if (expired) transaction.delete(reference);
      return {
        draft: !expired && data && validateDraft(data.draft) ? data.draft : emptyDraft(),
        ...draftReviewTiming(expired ? null : data?.updatedAt, Date.now()), expired,
      };
    });
    return NextResponse.json(result, { headers });
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
    const updatedAt = Date.now();
    const db = getAdminDb();
    const reference = db.collection('billingDrafts').doc(uid);
    const accepted = await db.runTransaction(async (transaction) => {
      const data = (await transaction.get(reference)).data();
      const previousDeadline = Number(request.headers.get('x-billing-draft-deadline'));
      // A delayed save from an expired tab must not revive deleted personal data.
      if ((data && draftReviewTiming(data.updatedAt, updatedAt).needsReview)
        || (previousDeadline > 0 && previousDeadline <= updatedAt)) {
        if (data && draftReviewTiming(data.updatedAt, updatedAt).needsReview) transaction.delete(reference);
        return false;
      }
      if (data) transaction.update(reference, { draft, updatedAt });
      else transaction.create(reference, { draft, updatedAt });
      return true;
    });
    if (!accepted) return NextResponse.json({ error: 'Bản nháp đã hết hạn và được xóa. Vui lòng nhập lại.', expired: true }, { status: 409, headers });
    return NextResponse.json({ success: true, ...draftReviewTiming(updatedAt, Date.now()) }, { headers });
  } catch (error) { return billingError(error); }
}