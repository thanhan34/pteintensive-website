import type { CartItem } from './types';
import type { PlacementDeclaration } from './placement';
import type { CheckoutContact } from './checkout-guidance';

export const DRAFT_REVIEW_MS = 30 * 60 * 1000;
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