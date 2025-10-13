"use client";

import { ReactNode } from 'react';
import { NotificationProvider } from './components/Notification';
import { AuthProvider } from '../lib/auth/context';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <NotificationProvider>
        {children}
      </NotificationProvider>
    </AuthProvider>
  );
}
