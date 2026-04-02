'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth/context';
import { Button } from '../../components/ui/button';

export default function SetupAdminPageClient() {
  const { user, userProfile, refreshUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const TARGET_EMAIL = 'dtan42@gmail.com';

  return <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4"><div className="max-w-md w-full space-y-8"><div className="text-center"><h1 className="text-3xl font-bold text-gray-900 mb-4">Setup Admin</h1><p className="text-gray-600 mb-6">Trang này chỉ dành cho việc setup admin lần đầu</p></div><div className="bg-white p-6 rounded-lg shadow"><div className="space-y-4"><div><h2 className="text-lg font-semibold">Thông tin đăng nhập:</h2>{user ? <div className="bg-gray-100 p-4 rounded mt-2"><p><strong>Email:</strong> {user.email}</p></div> : <p className="text-red-600">Chưa đăng nhập</p>}</div><div><h2 className="text-lg font-semibold">User Profile:</h2>{userProfile ? <div className="bg-gray-100 p-4 rounded mt-2"><p><strong>Roles:</strong> {userProfile.roles.join(', ')}</p></div> : <p className="text-yellow-600">Chưa có profile trong Firestore</p>}</div><div className="pt-4"><Button onClick={async () => { if (!user) return setMessage('❌ Bạn cần đăng nhập trước'); if (user.email !== TARGET_EMAIL) return setMessage(`❌ Chỉ tài khoản ${TARGET_EMAIL} mới có thể set admin`); setLoading(true); setMessage('🔄 Đang set quyền admin...'); try { const response = await fetch('/api/set-admin', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ uid: user.uid, email: user.email }) }); const result = await response.json(); if (response.ok) { await refreshUserProfile(); setMessage('✅ Đã set quyền admin thành công!'); } else { setMessage(`❌ Lỗi: ${result.error}`); } } catch { setMessage('❌ Có lỗi xảy ra khi set quyền admin'); } finally { setLoading(false); } }} disabled={loading || !user || user.email !== TARGET_EMAIL} className="w-full">{loading ? 'Đang xử lý...' : 'Set Admin Role'}</Button></div>{message && <div className="mt-4 p-4 rounded bg-blue-50 text-blue-800">{message}</div>}</div></div></div></div>;
}