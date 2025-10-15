"use client";

import { ReactNode } from 'react';
import { NotificationProvider } from './components/Notification';
import { AuthProvider } from '../lib/auth/context';
import { ThemeProvider } from '../lib/contexts/ThemeContext';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
