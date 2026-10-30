import type { CartItem } from './types';
import type { PlacementDeclaration } from './placement';
import type { CheckoutContact } from './checkout-guidance';

export const DRAFT_REVIEW_MS = 30 * 60 * 1000;
export type DraftReviewTiming = { reviewAt: number | null; serverNow: number; needsReview: boolean };

export function draftReviewTiming(updatedAt: unknown, now: number): DraftReviewTiming {
  const reviewAt = typeof updatedAt === 'number' && Number.isFinite(updatedAt) && updatedAt > 0 ? updatedAt + DRAFT_REVIEW_MS : null;
  return { reviewAt, serverNow: now, needsReview: reviewAt !== null && now >= reviewAt };
}

// Anchor the server's remaining duration to the browser clock, not its timezone or clock offset.
export function draftReviewDeadline(timing: DraftReviewTiming, receivedAt: number): number | null {
  if (timing.reviewAt === null || !Number.isFinite(timing.reviewAt) || !Number.isFinite(timing.serverNow)) return null;
  return receivedAt + Math.min(DRAFT_REVIEW_MS, Math.max(0, timing.reviewAt - timing.serverNow));
}

export function draftCountdown(reviewAt: number, now: number) {
  const seconds = Math.max(0, Math.ceil((reviewAt - now) / 1000));
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}

export function hasDraftContent(draft: BillingDraft): boolean {
  return draft.cart.length > 0 || draft.declaration.completed || !!draft.declaration.feedback.trim()
    || Object.values(draft.contact).some((value) => !!value.trim());
}
export type BillingDraft = {
  cart: CartItem[];
  declaration: PlacementDeclaration;
  contact: CheckoutContact;
};
export function emptyDraft(): BillingDraft {
  return { cart: [], declaration: { completed: false, feedback: '' }, contact: { name: '', email: '', phone: '' } };
}
export function validateDraft(value: unknown): value is BillingDraft {
  if (!value || typeof value !== 'object') return false;
  const draft = value as BillingDraft;
  return Array.isArray(draft.cart) && draft.cart.length <= 20
    && draft.cart.every((item) => item && ['course', 'fee'].includes(item.kind) && typeof item.id === 'string' && /^[a-zA-Z0-9_-]{1,100}$/.test(item.id))
    && new Set(draft.cart.map((item) => `${item.kind}:${item.id}`)).size === draft.cart.length
    && !!draft.declaration && typeof draft.declaration.completed === 'boolean'
    && typeof draft.declaration.feedback === 'string' && draft.declaration.feedback.length <= 2000
    && !!draft.contact && typeof draft.contact.name === 'string' && draft.contact.name.length <= 100
    && typeof draft.contact.email === 'string' && draft.contact.email.length <= 254
    && typeof draft.contact.phone === 'string' && draft.contact.phone.length <= 25;
}