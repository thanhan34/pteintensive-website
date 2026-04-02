'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../lib/auth/context';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils/cn';

export default function LoginPageClient() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn, signInWithGoogle, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push('/admin');
  }, [user, router]);

  if (user) return null;

  return <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"><div className="max-w-md w-full space-y-8"><div><h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Đăng nhập Admin</h2><p className="mt-2 text-center text-sm text-gray-600">Đăng nhập để quản lý blog</p></div><form className="mt-8 space-y-6" onSubmit={async (e) => { e.preventDefault(); setIsLoading(true); setError(''); try { await signIn(email, password); router.push('/admin'); } catch (error: unknown) { setError(error instanceof Error ? error.message : 'Đăng nhập thất bại'); } finally { setIsLoading(false); } }}><div className="space-y-4"><div><label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label><input id="email" name="email" type="email" autoComplete="email" required className={cn('mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm')} placeholder="Nhập email" value={email} onChange={(e) => setEmail(e.target.value)} /></div><div><label htmlFor="password" className="block text-sm font-medium text-gray-700">Mật khẩu</label><input id="password" name="password" type="password" autoComplete="current-password" required className={cn('mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm')} placeholder="Nhập mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} /></div></div>{error && <div className="rounded-md bg-red-50 p-4"><div className="text-sm text-red-700">{error}</div></div>}<div className="space-y-4"><Button type="submit" disabled={isLoading} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50">{isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}</Button><Button type="button" variant="outline" onClick={async () => { setIsLoading(true); setError(''); try { await signInWithGoogle(); router.push('/admin'); } catch (error: unknown) { setError(error instanceof Error ? error.message : 'Đăng nhập với Google thất bại'); } finally { setIsLoading(false); } }} disabled={isLoading} className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50">Đăng nhập với Google</Button></div></form></div></div>;
}