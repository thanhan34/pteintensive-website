'use client';

import { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth/context';

export function AdminAuthGuard({ children }: { children: ReactNode }) {
  const { user, loading, signInWithGoogle, signOut } = useAuth();
  const [checking, setChecking] = useState(false);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function checkAdmin() {
      if (!user) return;
      setChecking(true);
      try {
        const token = await user.getIdToken();
        const res = await fetch('/api/admin/blog/me', { headers: { Authorization: `Bearer ${token}` } });
        if (!cancelled) setAllowed(res.ok);
      } catch {
        if (!cancelled) setAllowed(false);
      } finally {
        if (!cancelled) setChecking(false);
      }
    }
    checkAdmin();
    return () => { cancelled = true; };
  }, [user]);

  if (loading || checking) {
    return <div className="flex min-h-[60vh] items-center justify-center"><div className="h-12 w-12 animate-spin rounded-full border-b-2 border-[#FC5D01]" /></div>;
  }

  if (!user) {
    return (
      <div className="admin-dashboard min-h-screen bg-gray-50 px-4 py-16 text-gray-900">
        <div className="mx-auto max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
          <h1 className="text-2xl font-bold">Admin Blog CMS</h1>
          <p className="mt-3 text-gray-600">Đăng nhập bằng Google để quản lý SEO blog.</p>
          <button onClick={signInWithGoogle} className="mt-6 min-h-11 rounded-xl bg-[#FC5D01] px-6 py-3 font-semibold text-white hover:bg-[#e65300] focus:outline-none focus:ring-2 focus:ring-[#FC5D01] focus:ring-offset-2">
            Đăng nhập Google
          </button>
        </div>
      </div>
    );
  }

  if (!allowed) {
    return (
      <div className="admin-dashboard min-h-screen bg-gray-50 px-4 py-16 text-gray-900">
        <div className="mx-auto max-w-lg rounded-2xl border border-red-100 bg-white p-8 text-center shadow-lg">
          <h1 className="text-2xl font-bold text-red-700">Access denied</h1>
          <p className="mt-3 text-gray-600">Email {user.email} không nằm trong ADMIN_EMAILS.</p>
          <button onClick={signOut} className="mt-6 min-h-11 rounded-xl border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-900 hover:bg-gray-50">Đăng xuất</button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
