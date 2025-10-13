'use client';

import { useEffect, useState } from 'react';
import { AuthGuard } from '@/lib/auth/guards';
import { useAuth } from '@/lib/auth/context';
import { PostsService } from '@/lib/services/posts';
import { Post, PostStatus } from '@/lib/types/blog';
import { Button } from '../../../components/ui/button';
import Link from 'next/link';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

export default function PostsManagementPage() {
  const { userProfile } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft' | 'pending'>('all');

  useEffect(() => {
    loadPosts();
  }, [filter]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      let statusFilter: string[] = [];
      
      switch (filter) {
        case 'published':
          statusFilter = ['published'];
          break;
        case 'draft':
          statusFilter = ['draft'];
          break;
        case 'pending':
          statusFilter = ['pending'];
          break;
        default:
          statusFilter = ['published', 'draft', 'pending', 'private'];
      }

      const result = await PostsService.getPosts({
        status: statusFilter as PostStatus[],
        limit: 50,
        orderBy: 'updatedAt',
        orderDirection: 'desc',
      });

      setPosts(result.data);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (slug: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      return;
    }

    try {
      await PostsService.deletePost(slug);
      await loadPosts(); // Reload posts
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Có lỗi xảy ra khi xóa bài viết');
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      published: 'bg-green-100 text-green-800',
      draft: 'bg-gray-100 text-gray-800',
      pending: 'bg-yellow-100 text-yellow-800',
      private: 'bg-blue-100 text-blue-800',
    };

    const labels = {
      published: 'Đã xuất bản',
      draft: 'Bản nháp',
      pending: 'Chờ duyệt',
      private: 'Riêng tư',
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800'}`}>
        {labels[status as keyof typeof labels] || status}
      </span>
    );
  };

  return (
    <AuthGuard requiredRoles={['admin', 'editor', 'author']}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Quản lý bài viết</h1>
                <p className="text-gray-600">Quản lý tất cả bài viết trên blog</p>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/admin">
                  <Button variant="outline">← Quay lại Dashboard</Button>
                </Link>
                <Link href="/admin/posts/new">
                  <Button>Tạo bài viết mới</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex space-x-4">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    filter === 'all'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Tất cả
                </button>
                <button
                  onClick={() => setFilter('published')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    filter === 'published'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Đã xuất bản
                </button>
                <button
                  onClick={() => setFilter('draft')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    filter === 'draft'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Bản nháp
                </button>
                <button
                  onClick={() => setFilter('pending')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    filter === 'pending'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Chờ duyệt
                </button>
              </div>
            </div>

            {/* Posts Table */}
            <div className="bg-white shadow rounded-lg">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
                </div>
              ) : posts.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tiêu đề
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tác giả
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Trạng thái
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ngày cập nhật
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Lượt xem
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Thao tác
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {posts.map((post) => (
                        <tr key={post.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {post.title}
                                  {post.sticky && (
                                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary text-white">
                                      Nổi bật
                                    </span>
                                  )}
                                </div>
                                <div className="text-sm text-gray-500">
                                  /{post.slug}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{post.author.displayName}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(post.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {format(new Date(post.updatedAt.seconds * 1000), 'dd/MM/yyyy HH:mm', { locale: vi })}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {post.views || 0}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end space-x-2">
                              {post.status === 'published' && (
                                <Link
                                  href={`/blog/${post.slug}`}
                                  target="_blank"
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  Xem
                                </Link>
                              )}
                              <Link
                                href={`/admin/posts/${post.slug}`}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Sửa
                              </Link>
                              <button
                                onClick={() => handleDeletePost(post.slug)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Xóa
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-500 text-lg mb-4">
                    Chưa có bài viết nào
                  </div>
                  <Link href="/admin/posts/new">
                    <Button>Tạo bài viết đầu tiên</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
