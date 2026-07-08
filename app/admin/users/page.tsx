'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { AuthGuard } from '@/lib/auth/guards';
import { useAuth } from '@/lib/auth/context';
import { User, UserRole } from '@/lib/types/blog';
import { USER_ROLES, UsersService } from '@/lib/services/users';
import { Button } from '../../../components/ui/button';

const roleLabels: Record<UserRole, string> = {
  admin: 'Admin',
  editor: 'Editor',
  author: 'Author',
  contributor: 'Contributor',
  subscriber: 'Subscriber',
};

const roleDescriptions: Record<UserRole, string> = {
  admin: 'Toàn quyền quản trị, bao gồm phân quyền user.',
  editor: 'Quản lý nội dung, trang, reviews và publish bài viết.',
  author: 'Tạo và chỉnh sửa bài viết theo quyền tác giả.',
  contributor: 'Quyền đóng góp nội dung cơ bản.',
  subscriber: 'User mặc định sau khi đăng ký/đăng nhập.',
};

const adminPrimaryButtonClasses = 'bg-[#FC5D01] text-white hover:bg-[#e65300]';
const adminSecondaryButtonClasses = 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50';

function formatDate(value: User['createdAt']) {
  if (!value) return '—';

  if ('seconds' in value) {
    return new Date(value.seconds * 1000).toLocaleDateString('vi-VN');
  }

  return '—';
}

export default function AdminUsersPage() {
  const { user: currentUser, userProfile, refreshUserProfile } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [draftRoles, setDraftRoles] = useState<Record<string, UserRole[]>>({});
  const [loading, setLoading] = useState(true);
  const [savingUid, setSavingUid] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const adminCount = useMemo(
    () => users.filter((item) => item.roles.includes('admin')).length,
    [users]
  );

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await UsersService.getUsers();
      setUsers(data);
      setDraftRoles(
        data.reduce<Record<string, UserRole[]>>((acc, item) => {
          acc[item.uid] = item.roles;
          return acc;
        }, {})
      );
    } catch (loadError) {
      console.error('Error loading users:', loadError);
      setError('Không thể tải danh sách user. Vui lòng kiểm tra quyền admin hoặc Firestore rules.');
    } finally {
      setLoading(false);
    }
  };

  const updateDraftRole = (uid: string, role: UserRole, checked: boolean) => {
    setDraftRoles((current) => {
      const roles = current[uid] || [];
      const nextRoles = checked
        ? Array.from(new Set([...roles, role]))
        : roles.filter((item) => item !== role);

      return {
        ...current,
        [uid]: nextRoles,
      };
    });
  };

  const resetUserRoles = (user: User) => {
    setDraftRoles((current) => ({
      ...current,
      [user.uid]: user.roles,
    }));
  };

  const saveUserRoles = async (targetUser: User, roleOverride?: UserRole[]) => {
    const nextRoles = roleOverride || draftRoles[targetUser.uid] || [];

    setError('');
    setSuccess('');

    if (nextRoles.length === 0) {
      setError('User phải có ít nhất một role.');
      return;
    }

    if (
      targetUser.uid === currentUser?.uid &&
      userProfile?.roles.includes('admin') &&
      !nextRoles.includes('admin')
    ) {
      setError('Bạn không thể tự xoá role admin của chính mình.');
      return;
    }

    if (
      targetUser.roles.includes('admin') &&
      !nextRoles.includes('admin') &&
      adminCount <= 1
    ) {
      setError('Không thể xoá role admin cuối cùng trong hệ thống.');
      return;
    }

    try {
      setSavingUid(targetUser.uid);
      await UsersService.updateUserRoles(targetUser.uid, nextRoles);
      setUsers((current) =>
        current.map((item) =>
          item.uid === targetUser.uid ? { ...item, roles: nextRoles } : item
        )
      );
      if (targetUser.uid === currentUser?.uid) {
        await refreshUserProfile();
      }
      setSuccess(`Đã cập nhật role cho ${targetUser.email}.`);
    } catch (saveError) {
      console.error('Error saving user roles:', saveError);
      setError('Không thể lưu role. Vui lòng thử lại.');
    } finally {
      setSavingUid(null);
    }
  };

  const removeRole = async (targetUser: User, role: UserRole) => {
    const confirmed = window.confirm(`Xoá role ${roleLabels[role]} khỏi ${targetUser.email}?`);
    if (!confirmed) return;

    const nextRoles = (draftRoles[targetUser.uid] || targetUser.roles).filter(
      (item) => item !== role
    );

    setDraftRoles((current) => ({
      ...current,
      [targetUser.uid]: nextRoles,
    }));

    await saveUserRoles(targetUser, nextRoles);
  };

  const hasRoleChanges = (targetUser: User) => {
    const original = [...targetUser.roles].sort().join('|');
    const draft = [...(draftRoles[targetUser.uid] || [])].sort().join('|');
    return original !== draft;
  };

  return (
    <AuthGuard requiredRoles={['admin']}>
      <div className="admin-dashboard min-h-screen bg-gray-50 text-gray-900">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Quản lý user</h1>
                <p className="text-gray-600">Admin có thể thêm, sửa hoặc xoá role của user.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button type="button" variant="outline" className={adminSecondaryButtonClasses} onClick={loadUsers} disabled={loading}>
                  Tải lại
                </Button>
                <Link href="/admin">
                  <Button variant="outline" className={adminSecondaryButtonClasses}>Về Dashboard</Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {(error || success) && (
              <div className={`mb-6 rounded-lg border p-4 text-sm ${error ? 'border-red-200 bg-red-50 text-red-800' : 'border-green-200 bg-green-50 text-green-800'}`}>
                {error || success}
              </div>
            )}

            <div className="bg-white shadow rounded-lg">
              <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
                <h2 className="text-lg font-medium text-gray-900">Danh sách user</h2>
                <p className="mt-1 text-sm text-gray-500">Role được lưu trong Firestore collection <code>users</code>.</p>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
                </div>
              ) : users.length === 0 ? (
                <div className="px-4 py-12 text-center text-gray-500">Chưa có user nào.</div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {users.map((item) => {
                    const selectedRoles = draftRoles[item.uid] || [];
                    const changed = hasRoleChanges(item);

                    return (
                      <section key={item.uid} className="px-4 py-6 sm:px-6">
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="truncate text-base font-semibold text-gray-900">
                                {item.displayName || item.email}
                              </h3>
                              {item.uid === currentUser?.uid && (
                                <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800">Bạn</span>
                              )}
                            </div>
                            <p className="mt-1 text-sm text-gray-600">{item.email}</p>
                            <p className="mt-1 text-xs text-gray-400">UID: {item.uid}</p>
                            <p className="mt-1 text-xs text-gray-400">Ngày tạo: {formatDate(item.createdAt)}</p>

                            <div className="mt-4 flex flex-wrap gap-2">
                              {item.roles.map((role) => (
                                <span key={role} className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
                                  {roleLabels[role]}
                                  <button
                                    type="button"
                                    className="text-gray-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-[#FC5D01] focus:ring-offset-2 rounded-full"
                                    onClick={() => removeRole(item, role)}
                                    aria-label={`Xoá role ${roleLabels[role]}`}
                                  >
                                    ×
                                  </button>
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="w-full rounded-lg border border-gray-200 bg-gray-50 p-4 lg:max-w-xl">
                            <p className="mb-3 text-sm font-medium text-gray-900">Chỉnh sửa role</p>
                            <div className="grid gap-3 sm:grid-cols-2">
                              {USER_ROLES.map((role) => (
                                <label key={role} className="flex min-h-11 cursor-pointer items-start gap-3 rounded-md border border-gray-200 bg-white p-3 hover:border-gray-300">
                                  <input
                                    type="checkbox"
                                    className="mt-1 h-4 w-4 rounded border-gray-300 text-[#FC5D01] focus:ring-[#FC5D01]"
                                    checked={selectedRoles.includes(role)}
                                    onChange={(event) => updateDraftRole(item.uid, role, event.target.checked)}
                                  />
                                  <span>
                                    <span className="block text-sm font-medium text-gray-900">{roleLabels[role]}</span>
                                    <span className="block text-xs text-gray-500">{roleDescriptions[role]}</span>
                                  </span>
                                </label>
                              ))}
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                              <Button
                                type="button"
                                className={adminPrimaryButtonClasses}
                                disabled={!changed || savingUid === item.uid}
                                onClick={() => saveUserRoles(item)}
                              >
                                {savingUid === item.uid ? 'Đang lưu...' : 'Lưu role'}
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                className={adminSecondaryButtonClasses}
                                disabled={!changed || savingUid === item.uid}
                                onClick={() => resetUserRoles(item)}
                              >
                                Huỷ thay đổi
                              </Button>
                              {selectedRoles.length === 0 && (
                                <span className="self-center text-sm text-red-600">Cần ít nhất một role.</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </section>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}