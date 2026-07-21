'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { useAuth } from '@/lib/auth/context';
import { AdminAuthGuard } from './AdminAuthGuard';

export function AdminBlogLayout({ children }: { children: ReactNode }) {
  const { user, signOut } = useAuth();
  return (
    <AdminAuthGuard>
      <div className="admin-dashboard min-h-screen bg-gray-50 text-gray-900">
        <header className="border-b border-gray-200 bg-white shadow-sm">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <div>
              <Link href="/admin/blog" className="text-2xl font-bold text-gray-900">MDX Blog</Link>
              <p className="text-sm text-gray-600">Public blog đọc từ content/posts/*.mdx</p>
            </div>
            <nav className="flex flex-wrap items-center gap-3 text-sm">
              <Link className="rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-gray-100" href="/admin/blog">Posts</Link>
              <Link className="rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-gray-100" href="/blog">View Blog</Link>
              <span className="hidden text-gray-400 sm:inline">{user?.email}</span>
              <button onClick={signOut} className="rounded-lg border border-gray-200 bg-white px-3 py-2 font-medium hover:bg-gray-50">Logout</button>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      </div>
    </AdminAuthGuard>
  );
}
