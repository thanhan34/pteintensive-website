'use client';

import { createContext, useContext, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { useAuth } from '@clerk/nextjs';
import { emptyDraft, type BillingDraft } from '@/lib/billing/draft';
import type { CartItem } from '@/lib/billing/types';
import type { CheckoutContact } from '@/lib/billing/checkout-guidance';
import type { PlacementDeclaration } from '@/lib/billing/placement';
import { validPlacementDeclaration } from '@/lib/billing/placement';
import { courseGuidanceStep, type CourseGuidanceStep } from '@/lib/billing/guidance';

const PlacementSession = createContext<{
  cart: CartItem[];
  changeCart: (cart: CartItem[]) => void;
  contact: CheckoutContact;
  updateContact: (contact: CheckoutContact) => void;
  loaded: boolean;
  needsReview: boolean;
  confirmReview: () => void;
  saveMessage: string;
  flush: () => Promise<void>;
  declaration: PlacementDeclaration;
  update: (value: PlacementDeclaration) => void;
  guidanceStep: CourseGuidanceStep;
  startGuidance: () => void;
  continueGuidance: () => void;
  addedToCart: () => void;
  openGuidedCart: () => void;
} | null>(null);

export function PlacementSessionProvider({ children }: { children: ReactNode }) {
  const { userId, isLoaded } = useAuth();
  return <AccountPlacementSession key={userId || 'anonymous'} uid={userId || ''} authLoaded={isLoaded}>{children}</AccountPlacementSession>;
}

function AccountPlacementSession({ children, uid, authLoaded }: { children: ReactNode; uid: string; authLoaded: boolean }) {
  const [draft, setDraft] = useState<BillingDraft>(emptyDraft);
  const declaration = draft.declaration;
  const [loaded, setLoaded] = useState(!uid);
  const [needsReview, setNeedsReview] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const pending = useRef<BillingDraft | null>(null);
  const queue = useRef<Promise<void>>(Promise.resolve());
  const mounted = useRef(true);
  const flush = useCallback(async () => {
    if (!uid || !pending.current) return queue.current;
    const snapshot = pending.current;
    pending.current = null;
    const task = queue.current.catch(() => {}).then(async () => {
      const response = await fetch('/api/billing/draft', { method: 'PUT', headers: { 'Content-Type': 'application/json', 'x-billing-account': uid }, body: JSON.stringify(snapshot), keepalive: true });
      if (!response.ok) throw new Error('Không lưu được tiến trình. Kiểm tra kết nối rồi chỉnh sửa để thử lại.');
    });
    queue.current = task;
    try { await task; if (mounted.current) setSaveMessage('Đã lưu tiến trình vào tài khoản.'); }
    catch (error) { if (!pending.current) pending.current = snapshot; if (mounted.current) setSaveMessage(error instanceof Error ? error.message : 'Không lưu được tiến trình.'); throw error; }
  }, [uid]);
  useEffect(() => {
    mounted.current = true;
    if (!authLoaded) return;
    if (!uid) return;
    let cancelled = false;
    fetch('/api/billing/draft', { cache: 'no-store' }).then(async (response) => {
      if (!response.ok) throw new Error('Không tải được tiến trình. Tải lại trang để thử lại.');
      const result = await response.json();
      if (!cancelled) { setDraft(result.draft); setNeedsReview(result.needsReview); setLoaded(true); }
    }).catch((error) => { if (!cancelled) setSaveMessage(error.message); });
    return () => { cancelled = true; mounted.current = false; };
  }, [uid, authLoaded]);
  // Serialize saves; an older response cannot overwrite a newer draft.
  useEffect(() => {
    if (!loaded || !uid || !pending.current) return;
    const timer = setTimeout(() => { void flush().catch(() => {}); }, 400);
    return () => clearTimeout(timer);
  }, [draft, loaded, uid, flush]);
  useEffect(() => {
    const save = () => { void flush().catch(() => {}); };
    const visibility = () => { if (document.visibilityState === 'hidden') save(); };
    window.addEventListener('pagehide', save);
    document.addEventListener('visibilitychange', visibility);
    return () => { window.removeEventListener('pagehide', save); document.removeEventListener('visibilitychange', visibility); save(); };
  }, [flush]);
  const edit = (patch: Partial<BillingDraft>) => {
    if (!loaded) return;
    setDraft((current) => { const next = { ...current, ...patch }; pending.current = next; return next; });
    setSaveMessage(uid ? 'Đang lưu tiến trình…' : 'Đăng nhập để lưu tiến trình vào tài khoản.');
  };
  const [started, setStarted] = useState(false);
  const [continued, setContinued] = useState(false);
  const [added, setAdded] = useState(false);
  const [cartOpened, setCartOpened] = useState(false);
  const update = (value: PlacementDeclaration) => {
    setStarted(true);
    edit({ declaration: value });
    if (!validPlacementDeclaration(value)) {
      setContinued(false); setAdded(false); setCartOpened(false);
    }
  };
  const guidanceStep = courseGuidanceStep(declaration, started, continued || validPlacementDeclaration(declaration), added, cartOpened);
  return <PlacementSession.Provider value={{ declaration, update, guidanceStep,
    cart: draft.cart, changeCart: (cart) => { edit({ cart }); window.dispatchEvent(new Event('pte-cart-updated')); },
    contact: draft.contact, updateContact: (contact) => edit({ contact }), loaded, needsReview,
    confirmReview: () => { setNeedsReview(false); edit({}); }, saveMessage, flush,
    startGuidance: () => setStarted(true),
    continueGuidance: () => setContinued(true),
    addedToCart: () => { setAdded(true); setCartOpened(false); },
    openGuidedCart: () => setCartOpened(true),
  }}>{children}</PlacementSession.Provider>;
}

export function usePlacementSession() {
  const session = useContext(PlacementSession);
  if (!session) throw new Error('PlacementSessionProvider is required');
  return session;
}