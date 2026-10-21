"use client";

import { ReactNode } from 'react';
import { NotificationProvider } from './components/Notification';
import { AuthProvider } from '../lib/auth/context';
import { ThemeProvider } from '../lib/contexts/ThemeContext';
import { PlacementSessionProvider } from '@/components/billing/PlacementSession';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <PlacementSessionProvider>{children}</PlacementSessionProvider>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
