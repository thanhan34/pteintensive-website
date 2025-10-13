'use client';

import { useState } from 'react';
import { AuthGuard } from '@/lib/auth/guards';
import { Button } from '../../../components/ui/button';
import Link from 'next/link';

export default function MediaLibraryPage() {
  const [mediaFiles] = useState([
    {
      id: '1',
      name: 'pte-speaking-tips.jpg',
      type: 'image',
      size: '245 KB',
      url: '/images/pte-speaking-tips.jpg',
      uploadedAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      name: 'writing-structure.png',
      type: 'image',
      size: '180 KB',
      url: '/images/writing-structure.png',
      uploadedAt: new Date('2024-01-10'),
    },
    {
      id: '3',
      name: 'listening-guide.pdf',
      type: 'document',
      size: '1.2 MB',
      url: '/documents/listening-guide.pdf',
      uploadedAt: new Date('2024-01-05'),
    },
  ]);

  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const handleFileSelect = (fileId: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return (
          <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'document':
        return (
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
    }
  };

  return (
    <AuthGuard requiredRoles={['admin', 'editor', 'author']}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Thư viện Media</h1>
                <p className="text-gray-600">Quản lý hình ảnh và tài liệu</p>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/admin">
                  <Button variant="outline">← Quay lại Dashboard</Button>
                </Link>
                <Button>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Tải lên file
                </Button>
              </div>
            </div>
          </div>
        </div>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Upload Area */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="mt-4">
                  <p className="text-lg text-gray-600">Kéo thả file vào đây hoặc</p>
                  <button className="mt-2 text-primary hover:text-primary/80 font-medium">
                    chọn file từ máy tính
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Hỗ trợ: JPG, PNG, GIF, PDF, DOC, DOCX (tối đa 10MB)
                </p>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex space-x-4">
                  <button className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium">
                    Tất cả
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md text-sm font-medium">
                    Hình ảnh
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md text-sm font-medium">
                    Tài liệu
                  </button>
                </div>
                
                {selectedFiles.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">
                      Đã chọn {selectedFiles.length} file
                    </span>
                    <Button variant="outline" size="sm">
                      Xóa đã chọn
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Media Grid */}
            <div className="bg-white shadow rounded-lg">
              {mediaFiles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-6">
                  {mediaFiles.map((file) => (
                    <div
                      key={file.id}
                      className={`relative group border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedFiles.includes(file.id)
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleFileSelect(file.id)}
                    >
                      {/* Checkbox */}
                      <div className="absolute top-2 right-2">
                        <input
                          type="checkbox"
                          checked={selectedFiles.includes(file.id)}
                          onChange={() => handleFileSelect(file.id)}
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                      </div>

                      {/* File Preview */}
                      <div className="flex flex-col items-center">
                        {file.type === 'image' ? (
                          <div className="w-full aspect-square bg-gray-100 rounded-lg mb-2 overflow-hidden">
                            <img
                              src={file.url}
                              alt={file.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                            <div className="hidden w-full h-full flex items-center justify-center">
                              {getFileIcon(file.type)}
                            </div>
                          </div>
                        ) : (
                          <div className="w-full aspect-square bg-gray-100 rounded-lg mb-2 flex items-center justify-center">
                            {getFileIcon(file.type)}
                          </div>
                        )}

                        {/* File Info */}
                        <div className="w-full text-center">
                          <p className="text-sm font-medium text-gray-900 truncate" title={file.name}>
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {file.size}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {file.uploadedAt.toLocaleDateString('vi-VN')}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <div className="flex space-x-2">
                          <button className="p-2 bg-white rounded-full text-gray-700 hover:text-gray-900">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button className="p-2 bg-white rounded-full text-gray-700 hover:text-gray-900">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </button>
                          <button className="p-2 bg-white rounded-full text-red-600 hover:text-red-800">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div className="text-gray-500 text-lg mb-4 mt-4">
                    Chưa có file nào
                  </div>
                  <Button>Tải lên file đầu tiên</Button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
