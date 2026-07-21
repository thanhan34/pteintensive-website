'use client';

import { useEffect, useState } from 'react';
import { AuthGuard } from '@/lib/auth/guards';
import { useAuth } from '@/lib/auth/context';
import { Button } from '../../components/ui/button';
import Link from 'next/link';

type DashboardPostStatus = 'draft' | 'published';

interface DashboardPost {
  id: string;
  title: string;
  slug: string;
  status: DashboardPostStatus;
  updatedAt: string | null;
}

interface DashboardStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  pendingPosts: number;
  recentPosts: DashboardPost[];
}

export default function AdminDashboard() {
  const { user, userProfile, signOut } = useAuth();
  const adminPrimaryButtonClasses = 'bg-[#FC5D01] text-white hover:bg-[#e65300]';
  const adminSecondaryButtonClasses = 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50';
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    pendingPosts: 0,
    recentPosts: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) loadDashboardStats();
  }, [user]);

  const loadDashboardStats = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const response = await fetch('/api/blog/posts');

      if (!response.ok) {
        throw new Error('Failed to load admin blog posts');
      }

      const { posts = [] } = await response.json() as { posts?: DashboardPost[] };
      const publishedPosts = posts.filter((post) => post.status === 'published').length;
      const draftPosts = posts.filter((post) => post.status === 'draft').length;

      setStats({
        totalPosts: posts.length,
        publishedPosts,
        draftPosts,
        pendingPosts: 0,
        recentPosts: posts.slice(0, 5),
      });
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const formatUpdatedDate = (updatedAt: string | null) => {
    if (!updatedAt) return 'Không rõ';
    const date = new Date(updatedAt);
    return Number.isNaN(date.getTime()) ? 'Không rõ' : date.toLocaleDateString('vi-VN');
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      published: 'bg-green-100 text-green-800',
      draft: 'bg-gray-100 text-gray-800',
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  return (
    <AuthGuard requiredRoles={['admin', 'editor', 'author']}>
      <div className="admin-dashboard min-h-screen bg-gray-50 text-gray-900">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600">Chào mừng, {userProfile?.displayName}</p>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/blog">
                  <Button variant="outline" className={adminSecondaryButtonClasses}>Xem Blog</Button>
                </Link>
                <Button onClick={handleSignOut} variant="outline" className={adminSecondaryButtonClasses}>
                  Đăng xuất
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="px-4 py-6 sm:px-0">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Tổng bài viết</dt>
                          <dd className="text-lg font-medium text-gray-900">{stats.totalPosts}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Đã xuất bản</dt>
                          <dd className="text-lg font-medium text-gray-900">{stats.publishedPosts}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-gray-500 rounded-md flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Bản nháp</dt>
                          <dd className="text-lg font-medium text-gray-900">{stats.draftPosts}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <Link href="/admin/blog" className="bg-white overflow-hidden shadow rounded-lg hover:bg-gray-50">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-[#FC5D01] rounded-md flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Tạo nhanh</dt>
                          <dd className="text-lg font-medium text-gray-900">MDX Blog</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Quick Actions */}
              <div className="bg-white shadow rounded-lg mb-8">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Thao tác nhanh</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Link href="/admin/blog">
                      <Button className={`w-full ${adminPrimaryButtonClasses}`}>Xem bài viết MDX</Button>
                    </Link>
                    <Link href="/admin/blog">
                      <Button variant="outline" className={`w-full ${adminSecondaryButtonClasses}`}>Quản lý bài viết</Button>
                    </Link>
                    <Link href="/admin/pages">
                      <Button variant="outline" className={`w-full ${adminSecondaryButtonClasses}`}>Quản lý trang</Button>
                    </Link>
                    <Link href="/admin/media">
                      <Button variant="outline" className={`w-full ${adminSecondaryButtonClasses}`}>Thư viện media</Button>
                    </Link>
                    {userProfile?.roles.includes('admin') && (
                      <Link href="/admin/users">
                        <Button variant="outline" className={`w-full ${adminSecondaryButtonClasses}`}>Quản lý user</Button>
                      </Link>
                    )}
                    <Link href="/admin/facebook-reviews">
                      <Button variant="outline" className={`w-full ${adminSecondaryButtonClasses}`}>Facebook Reviews</Button>
                    </Link>
                    <Link href="/admin/video-reviews">
                      <Button variant="outline" className={`w-full ${adminSecondaryButtonClasses}`}>Video Reviews</Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Recent Posts */}
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Bài viết gần đây</h3>
                  {stats.recentPosts.length > 0 ? (
                    <div className="flow-root">
                      <ul className="-my-5 divide-y divide-gray-200">
                        {stats.recentPosts.map((post) => (
                          <li key={post.id} className="py-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {post.title}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Cập nhật: {formatUpdatedDate(post.updatedAt)}
                                </p>
                              </div>
                              <div className="flex items-center space-x-2">
                                {getStatusBadge(post.status)}
                                <Link href={`/blog/${post.slug}`}>
                                  <Button variant="outline" size="sm" className={adminSecondaryButtonClasses}>Xem bài</Button>
                                </Link>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-gray-500">Chưa có bài viết nào.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </AuthGuard>
  );
}
