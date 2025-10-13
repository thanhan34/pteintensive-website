'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth/context';
import { doc, updateDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/initFirebase';
import { Button } from '../../components/ui/button';

export default function SetupAdminPage() {
  const { user, userProfile, refreshUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const TARGET_EMAIL = 'dtan42@gmail.com';

  const handleSetAdmin = async () => {
    if (!user) {
      setMessage('❌ Bạn cần đăng nhập trước');
      return;
    }

    if (user.email !== TARGET_EMAIL) {
      setMessage(`❌ Chỉ tài khoản ${TARGET_EMAIL} mới có thể set admin`);
      return;
    }

    setLoading(true);
    setMessage('🔄 Đang set quyền admin...');

    try {
      const response = await fetch('/api/set-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Refresh user profile to get updated roles
        await refreshUserProfile();
        setMessage('✅ Đã set quyền admin thành công! Bạn có thể vào /admin bây giờ.');
      } else {
        setMessage(`❌ Lỗi: ${result.error}`);
      }
    } catch (error) {
      console.error('Error setting admin role:', error);
      setMessage('❌ Có lỗi xảy ra khi set quyền admin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Setup Admin</h1>
          <p className="text-gray-600 mb-6">
            Trang này chỉ dành cho việc setup admin lần đầu
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold">Thông tin đăng nhập:</h2>
              {user ? (
                <div className="bg-gray-100 p-4 rounded mt-2">
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>UID:</strong> {user.uid}</p>
                  <p><strong>Display Name:</strong> {user.displayName || 'Chưa có'}</p>
                </div>
              ) : (
                <p className="text-red-600">Chưa đăng nhập</p>
              )}
            </div>

            <div>
              <h2 className="text-lg font-semibold">User Profile:</h2>
              {userProfile ? (
                <div className="bg-gray-100 p-4 rounded mt-2">
                  <p><strong>Roles:</strong> {userProfile.roles.join(', ')}</p>
                  <p><strong>Created:</strong> {userProfile.createdAt ? new Date(userProfile.createdAt.seconds * 1000).toLocaleString() : 'N/A'}</p>
                </div>
              ) : (
                <p className="text-yellow-600">Chưa có profile trong Firestore</p>
              )}
            </div>

            <div className="pt-4">
              <Button
                onClick={handleSetAdmin}
                disabled={loading || !user || user.email !== TARGET_EMAIL}
                className="w-full"
              >
                {loading ? 'Đang xử lý...' : 'Set Admin Role'}
              </Button>
            </div>

            {message && (
              <div className="mt-4 p-4 rounded bg-blue-50 text-blue-800">
                {message}
              </div>
            )}

            <div className="mt-6 text-sm text-gray-600">
              <h3 className="font-semibold">Hướng dẫn:</h3>
              <ol className="list-decimal list-inside space-y-1 mt-2">
                <li>Đăng nhập bằng tài khoản {TARGET_EMAIL}</li>
                <li>Click "Set Admin Role"</li>
                <li>Sau khi thành công, truy cập <a href="/admin" className="text-blue-600 underline">/admin</a></li>
              </ol>
            </div>

            <div className="mt-4 text-center">
              <a href="/login" className="text-blue-600 underline">
                Đăng nhập
              </a>
              {' | '}
              <a href="/debug-auth" className="text-blue-600 underline">
                Debug Auth
              </a>
              {' | '}
              <a href="/admin" className="text-blue-600 underline">
                Admin Panel
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
