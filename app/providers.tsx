"use client";

import { ReactNode } from 'react';
import { NotificationProvider } from './components/Notification';
import { AuthProvider } from '../lib/auth/context';
import { ThemeProvider } from '../lib/contexts/ThemeContext';
import { PlacementSessionProvider } from '@/components/billing/PlacementSession';
import { ToastProvider } from '@/components/ui/toast-provider';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <PlacementSessionProvider>{children}</PlacementSessionProvider>
          <ToastProvider />
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
