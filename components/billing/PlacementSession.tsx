'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import type { PlacementDeclaration } from '@/lib/billing/placement';
import { validPlacementDeclaration } from '@/lib/billing/placement';
import { courseGuidanceStep, type CourseGuidanceStep } from '@/lib/billing/guidance';

const PlacementSession = createContext<{
  declaration: PlacementDeclaration;
  update: (value: PlacementDeclaration) => void;
  guidanceStep: CourseGuidanceStep;
  startGuidance: () => void;
  continueGuidance: () => void;
  addedToCart: () => void;
  openGuidedCart: () => void;
} | null>(null);

// Keep academic feedback in memory only, across client-side route changes.
export function PlacementSessionProvider({ children }: { children: ReactNode }) {
  const [declaration, setDeclaration] = useState<PlacementDeclaration>({ completed: false, feedback: '' });
  const [started, setStarted] = useState(false);
  const [continued, setContinued] = useState(false);
  const [added, setAdded] = useState(false);
  const [cartOpened, setCartOpened] = useState(false);
  const update = (value: PlacementDeclaration) => {
    setStarted(true);
    setDeclaration(value);
    if (!validPlacementDeclaration(value)) {
      setContinued(false); setAdded(false); setCartOpened(false);
    }
  };
  const guidanceStep = courseGuidanceStep(declaration, started, continued, added, cartOpened);
  return <PlacementSession.Provider value={{ declaration, update, guidanceStep,
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