'use client';

import { useAuth } from '@/lib/auth/context';

export default function DebugAuthPageClient() {
  const { user, userProfile, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return <div className="p-8"><h1 className="text-2xl font-bold mb-4">Debug Auth Status</h1><div className="space-y-4"><div><h2 className="text-lg font-semibold">Firebase User:</h2><pre className="bg-gray-100 p-4 rounded">{user ? JSON.stringify({ uid: user.uid, email: user.email, displayName: user.displayName, photoURL: user.photoURL }, null, 2) : 'Not signed in'}</pre></div><div><h2 className="text-lg font-semibold">User Profile:</h2><pre className="bg-gray-100 p-4 rounded">{userProfile ? JSON.stringify(userProfile, null, 2) : 'No profile'}</pre></div></div></div>;
}