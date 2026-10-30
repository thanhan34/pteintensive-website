'use client';

import { createContext, useContext, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { useAuth } from '@clerk/nextjs';
import { DRAFT_REVIEW_MS, draftReviewDeadline, emptyDraft, hasDraftContent, type BillingDraft } from '@/lib/billing/draft';
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
  draftReviewAt: number | null;
  resetVersion: number;
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
  const [resetVersion, setResetVersion] = useState(0);
  const [draftReviewAt, setDraftReviewAt] = useState<number | null>(null);
  const [saveMessage, setSaveMessage] = useState('');
  const pending = useRef<BillingDraft | null>(null);
  const queue = useRef<Promise<void>>(Promise.resolve());
  const mounted = useRef(true);
  const generation = useRef(0);
  const resetEpoch = useRef(0);
  const serverDeadline = useRef<number | null>(null);
  const [started, setStarted] = useState(false);
  const [continued, setContinued] = useState(false);
  const [added, setAdded] = useState(false);
  const [cartOpened, setCartOpened] = useState(false);
  const reset = useCallback(() => {
    resetEpoch.current++;
    generation.current++;
    pending.current = null;
    serverDeadline.current = null;
    setDraft(emptyDraft());
    setDraftReviewAt(null);
    setResetVersion((value) => value + 1);
    setStarted(false); setContinued(false); setAdded(false); setCartOpened(false);
    setSaveMessage('Bản nháp đã tự xóa sau 30 phút không chỉnh sửa. Vui lòng nhập lại thông tin. Đơn thanh toán đã tạo vẫn được giữ nguyên.');
  }, []);
  const flush = useCallback(async () => {
    if (!uid || !pending.current) return queue.current;
    const snapshot = pending.current;
    pending.current = null;
    const version = generation.current;
    const epoch = resetEpoch.current;
    const task = queue.current.catch(() => {}).then(async () => {
      if (version !== generation.current) return;
      const response = await fetch('/api/billing/draft', { method: 'PUT', headers: { 'Content-Type': 'application/json', 'x-billing-account': uid, 'x-billing-draft-deadline': String(serverDeadline.current || '') }, body: JSON.stringify(snapshot), keepalive: true });
      if (response.status === 409) { if (mounted.current && version === generation.current) reset(); throw new Error('Bản nháp đã hết hạn. Vui lòng nhập lại thông tin.'); }
      if (!response.ok) throw new Error('Không lưu được tiến trình. Kiểm tra kết nối rồi chỉnh sửa để thử lại.');
      const result = await response.json();
      if (epoch === resetEpoch.current) serverDeadline.current = result.reviewAt;
      if (mounted.current && version === generation.current) { serverDeadline.current = result.reviewAt; setDraftReviewAt(draftReviewDeadline(result, Date.now())); }
    });
    queue.current = task;
    try { await task; if (mounted.current && version === generation.current) setSaveMessage('Đã lưu bản nháp · Tự xóa sau 30 phút không chỉnh sửa.'); }
    catch (error) { if (version === generation.current) { if (!pending.current) pending.current = snapshot; if (mounted.current) setSaveMessage(error instanceof Error ? error.message : 'Không lưu được tiến trình.'); } throw error; }
  }, [uid, reset]);
  useEffect(() => {
    mounted.current = true;
    if (!authLoaded) return;
    if (!uid) return;
    let cancelled = false;
    fetch('/api/billing/draft', { cache: 'no-store' }).then(async (response) => {
      if (!response.ok) throw new Error('Không tải được tiến trình. Tải lại trang để thử lại.');
      const result = await response.json();
      if (!cancelled) { if (result.expired) reset(); else setDraft(result.draft); serverDeadline.current = result.reviewAt; setDraftReviewAt(draftReviewDeadline(result, Date.now())); setLoaded(true); }
    }).catch((error) => { if (!cancelled) setSaveMessage(error.message); });
    return () => { cancelled = true; mounted.current = false; };
  }, [uid, authLoaded, reset]);
  useEffect(() => {
    if (!loaded || draftReviewAt === null) return;
    let checking = false;
    const check = async () => {
      if (Date.now() < draftReviewAt || checking) return;
      if (!uid) { reset(); return; }
      checking = true;
      const version = generation.current;
      try {
        // Resolve against the server: another tab may have extended this draft.
        const response = await fetch('/api/billing/draft', { cache: 'no-store' });
        if (!response.ok) throw new Error('DRAFT_CHECK_FAILED');
        const result = await response.json();
        if (!mounted.current || version !== generation.current) return;
        if (result.expired || !hasDraftContent(result.draft)) reset();
        else { setDraft(result.draft); serverDeadline.current = result.reviewAt; setDraftReviewAt(draftReviewDeadline(result, Date.now())); }
      } catch { if (mounted.current && version === generation.current) reset(); }
      finally { checking = false; }
    };
    const timer = setTimeout(check, Math.max(0, draftReviewAt - Date.now()));
    window.addEventListener('focus', check);
    document.addEventListener('visibilitychange', check);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('focus', check);
      document.removeEventListener('visibilitychange', check);
    };
  }, [uid, loaded, draftReviewAt, reset]);
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
    // Handle the first keystroke after a sleeping/background tab before autosave.
    if (draftReviewAt !== null && Date.now() >= draftReviewAt) { reset(); return; }
    generation.current++;
    setDraftReviewAt(Date.now() + DRAFT_REVIEW_MS);
    setDraft((current) => { const next = { ...current, ...patch }; pending.current = next; return next; });
    setSaveMessage(uid ? 'Đang lưu tiến trình…' : 'Đăng nhập để lưu tiến trình vào tài khoản.');
  };
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
    contact: draft.contact, updateContact: (contact) => edit({ contact }), loaded, resetVersion,
    draftReviewAt: uid && loaded && hasDraftContent(draft) ? draftReviewAt : null,
    saveMessage, flush,
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