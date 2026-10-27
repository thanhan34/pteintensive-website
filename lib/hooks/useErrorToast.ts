'use client';

import { useEffect } from 'react';
import { toast } from 'react-toastify';

/** Keep inline errors available while making new failures visible off-screen. */
export function useErrorToast(message: string) {
  useEffect(() => {
    if (!message.trim()) return;
    toast.error(message, {
      toastId: `billing-error:${message}`,
      ariaLabel: `Lỗi: ${message}`,
    });
  }, [message]);
}