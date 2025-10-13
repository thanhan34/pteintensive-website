'use client';

import { useState } from 'react';
import { AuthGuard } from '@/lib/auth/guards';
import { Button } from '../../../components/ui/button';
import Link from 'next/link';

export default function PagesManagementPage() {
  const [pages, setPages] = useState([
    {
      id: 'about',
      title: 'Giới thiệu',
      slug: 'about',
      status: 'published',
      updatedAt: new Date(),
    },
    {
      id: 'contact',
      title: 'Liên hệ',
      slug: 'contact',
      status: 'published',
      updatedAt: new Date(),
    },
    {
      id: 'privacy',
      title: 'Chính sách bảo mật',
      slug: 'privacy',
      status: 'draft',
      updatedAt: new Date(),
    },
  ]);

  const getStatusBadge = (status: string) => {
    const styles = {
      published: 'bg-green-100 text-green-800',
      draft: 'bg-gray-100 text-gray-800',
      private: 'bg-blue-100 text-blue-800',
    };

    const labels = {
      published: 'Đã xuất bản',
      draft: 'Bản nháp',
      private: 'Riêng tư',
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800'}`}>
        {labels[status as keyof typeof labels] || status}
      </span>
    );
  };

  return (
    <AuthGuard requiredRoles={['admin', 'editor']}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Quản lý trang</h1>
                <p className="text-gray-600">Quản lý các trang tĩnh của website</p>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/admin">
                  <Button variant="outline">← Quay lại Dashboard</Button>
                </Link>
                <Link href="/admin/pages/new">
                  <Button>Tạo trang mới</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Pages Table */}
            <div className="bg-white shadow rounded-lg">
              {pages.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tiêu đề
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Trạng thái
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ngày cập nhật
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Thao tác
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {pages.map((page) => (
                        <tr key={page.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {page.title}
                                </div>
                                <div className="text-sm text-gray-500">
                                  /{page.slug}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(page.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {page.updatedAt.toLocaleDateString('vi-VN')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end space-x-2">
                              {page.status === 'published' && (
                                <Link
                                  href={`/${page.slug}`}
                                  target="_blank"
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  Xem
                                </Link>
                              )}
                              <Link
                                href={`/admin/pages/${page.slug}`}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Sửa
                              </Link>
                              <button
                                onClick={() => {
                                  if (confirm('Bạn có chắc chắn muốn xóa trang này?')) {
                                    setPages(prev => prev.filter(p => p.id !== page.id));
                                  }
                                }}
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
                    Chưa có trang nào
                  </div>
                  <Link href="/admin/pages/new">
                    <Button>Tạo trang đầu tiên</Button>
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
