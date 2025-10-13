'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthGuard } from '@/lib/auth/guards';
import { useAuth } from '@/lib/auth/context';
import { PostsService } from '@/lib/services/posts';
import { PostFormData, PostStatus } from '@/lib/types/blog';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import Link from 'next/link';

export default function NewPostPage() {
  const { userProfile } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    status: 'draft',
    tags: [],
    category: '',
    sticky: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userProfile) return;

    try {
      setLoading(true);
      
      const slug = await PostsService.createPost(
        formData,
        userProfile.uid,
        userProfile.displayName || '',
        userProfile.photoURL
      );

      router.push(`/admin/posts/${slug}`);
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Có lỗi xảy ra khi tạo bài viết');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof PostFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTagsChange = (value: string) => {
    const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    handleInputChange('tags', tags);
  };

  return (
    <AuthGuard requiredRoles={['admin', 'editor', 'author']}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Tạo bài viết mới</h1>
                <p className="text-gray-600">Tạo bài viết mới cho blog</p>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/admin/posts">
                  <Button variant="outline">← Quay lại danh sách</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="grid grid-cols-1 gap-6">
                  {/* Title */}
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Tiêu đề *
                    </label>
                    <Input
                      type="text"
                      id="title"
                      required
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="mt-1"
                      placeholder="Nhập tiêu đề bài viết"
                    />
                  </div>

                  {/* Slug */}
                  <div>
                    <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                      Slug (URL)
                    </label>
                    <Input
                      type="text"
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => handleInputChange('slug', e.target.value)}
                      className="mt-1"
                      placeholder="Để trống để tự động tạo từ tiêu đề"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      URL của bài viết sẽ là: /blog/{formData.slug || 'slug-tu-dong'}
                    </p>
                  </div>

                  {/* Excerpt */}
                  <div>
                    <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
                      Tóm tắt
                    </label>
                    <textarea
                      id="excerpt"
                      rows={3}
                      value={formData.excerpt}
                      onChange={(e) => handleInputChange('excerpt', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      placeholder="Tóm tắt ngắn gọn về bài viết"
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                      Nội dung *
                    </label>
                    <textarea
                      id="content"
                      rows={15}
                      required
                      value={formData.content}
                      onChange={(e) => handleInputChange('content', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm font-mono"
                      placeholder="Viết nội dung bằng Markdown/MDX..."
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Hỗ trợ Markdown và MDX. Sử dụng các component như &lt;Callout&gt;, &lt;CodeBlock&gt;, &lt;YouTubeEmbed&gt;
                    </p>
                  </div>

                  {/* Tags */}
                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                      Tags
                    </label>
                    <Input
                      type="text"
                      id="tags"
                      value={formData.tags.join(', ')}
                      onChange={(e) => handleTagsChange(e.target.value)}
                      className="mt-1"
                      placeholder="PTE Speaking, Hướng dẫn, Mẹo thi (phân cách bằng dấu phẩy)"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    >
                      <option value="">Chọn category</option>
                      <option value="speaking">Speaking</option>
                      <option value="writing">Writing</option>
                      <option value="reading">Reading</option>
                      <option value="listening">Listening</option>
                      <option value="experience">Kinh nghiệm</option>
                    </select>
                  </div>

                  {/* Status */}
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                      Trạng thái
                    </label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value as PostStatus)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    >
                      <option value="draft">Bản nháp</option>
                      <option value="pending">Chờ duyệt</option>
                      <option value="published">Xuất bản</option>
                      <option value="private">Riêng tư</option>
                    </select>
                  </div>

                  {/* Sticky */}
                  <div className="flex items-center">
                    <input
                      id="sticky"
                      type="checkbox"
                      checked={formData.sticky}
                      onChange={(e) => handleInputChange('sticky', e.target.checked)}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor="sticky" className="ml-2 block text-sm text-gray-900">
                      Bài viết nổi bật (sticky)
                    </label>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-4">
                <Link href="/admin/posts">
                  <Button type="button" variant="outline">
                    Hủy
                  </Button>
                </Link>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Đang tạo...' : 'Tạo bài viết'}
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
