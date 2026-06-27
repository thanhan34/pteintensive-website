'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { AuthGuard } from '@/lib/auth/guards';
import {
  createVideoReview,
  deleteVideoReview,
  getAllVideoReviews,
  updateVideoReview,
} from '@/lib/videoReviews';
import type { VideoReview } from '@/types/videoReview';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';

type VideoReviewFormState = {
  name: string;
  videoUrl: string;
  achievement: string;
  course: string;
  displayOrder: string;
  isActive: boolean;
};

const initialFormState: VideoReviewFormState = {
  name: '',
  videoUrl: '',
  achievement: '',
  course: '',
  displayOrder: '',
  isActive: true,
};

function toFormState(review: VideoReview): VideoReviewFormState {
  return {
    name: review.name || '',
    videoUrl: review.videoUrl || '',
    achievement: review.achievement || '',
    course: review.course || '',
    displayOrder: typeof review.displayOrder === 'number' ? String(review.displayOrder) : '',
    isActive: review.isActive,
  };
}

export default function AdminVideoReviewsPage() {
  const [reviews, setReviews] = useState<VideoReview[]>([]);
  const [form, setForm] = useState<VideoReviewFormState>(initialFormState);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const activeCount = useMemo(() => reviews.filter((review) => review.isActive).length, [reviews]);

  async function loadReviews() {
    try {
      setLoading(true);
      setError('');
      const data = await getAllVideoReviews();
      setReviews(data);
    } catch (err) {
      console.error('Error loading video reviews:', err);
      setError('Không thể tải danh sách video review.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReviews();
  }, []);

  function updateField<K extends keyof VideoReviewFormState>(field: K, value: VideoReviewFormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function resetForm() {
    setForm(initialFormState);
    setEditingId(null);
    setMessage('');
    setError('');
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    try {
      const videoUrl = form.videoUrl.trim();

      if (!form.name.trim() || !videoUrl || !form.achievement.trim() || !form.course.trim()) {
        setError('Vui lòng điền đầy đủ tên, video URL, thành tích và lớp học.');
        return;
      }

      const payload = {
        name: form.name.trim(),
        videoUrl,
        achievement: form.achievement.trim(),
        course: form.course.trim(),
        isActive: form.isActive,
      };

      if (form.displayOrder.trim()) {
        Object.assign(payload, { displayOrder: Number(form.displayOrder) });
      }

      if (editingId) {
        await updateVideoReview(editingId, payload);
        setMessage('Đã cập nhật video review.');
      } else {
        await createVideoReview(payload);
        setMessage('Đã thêm video review mới.');
      }

      setForm(initialFormState);
      setEditingId(null);
      await loadReviews();
    } catch (err) {
      console.error('Error saving video review:', err);
      setError('Không thể lưu video review. Vui lòng kiểm tra quyền Firestore và thử lại.');
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(review: VideoReview) {
    if (!review.id) return;

    try {
      await updateVideoReview(review.id, { isActive: !review.isActive });
      await loadReviews();
    } catch (err) {
      console.error('Error toggling video review:', err);
      setError('Không thể đổi trạng thái video review.');
    }
  }

  async function handleDelete(id?: string) {
    if (!id) return;
    if (!window.confirm('Bạn chắc chắn muốn xoá video review này?')) return;

    try {
      await deleteVideoReview(id);
      if (editingId === id) resetForm();
      await loadReviews();
    } catch (err) {
      console.error('Error deleting video review:', err);
      setError('Không thể xoá video review.');
    }
  }

  return (
    <AuthGuard requiredRoles={['admin', 'editor']}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Video Reviews</h1>
              <p className="text-gray-600">Quản lý video testimonials hiển thị trong VideoReviewGallery.</p>
            </div>
            <div className="flex gap-3">
              <Link href="/"><Button variant="outline">Xem website</Button></Link>
              <Link href="/admin"><Button variant="outline">Về Dashboard</Button></Link>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {(message || error) && (
            <div className={`mb-6 rounded-lg p-4 ${error ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
              {error || message}
            </div>
          )}

          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-white p-5 shadow"><p className="text-sm text-gray-500">Tổng video</p><p className="text-3xl font-bold text-gray-900">{reviews.length}</p></div>
            <div className="rounded-lg bg-white p-5 shadow"><p className="text-sm text-gray-500">Đang hiển thị</p><p className="text-3xl font-bold text-[#fc5d01]">{activeCount}</p></div>
            <div className="rounded-lg bg-white p-5 shadow"><p className="text-sm text-gray-500">Đang sửa</p><p className="text-lg font-semibold text-gray-900">{editingId ? 'Có' : 'Không'}</p></div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[420px_1fr]">
            <form onSubmit={handleSubmit} className="rounded-lg bg-white p-6 shadow">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">{editingId ? 'Sửa video' : 'Thêm video mới'}</h2>
                {editingId && <Button type="button" variant="outline" size="sm" onClick={resetForm}>Huỷ sửa</Button>}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">Tên học viên *</label>
                  <Input value={form.name} onChange={(event) => updateField('name', event.target.value)} placeholder="Du Nguyễn" required />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">Facebook video/reel URL *</label>
                  <Input value={form.videoUrl} onChange={(event) => updateField('videoUrl', event.target.value)} placeholder="https://www.facebook.com/reel/..." required />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">Thành tích *</label>
                  <Input value={form.achievement} onChange={(event) => updateField('achievement', event.target.value)} placeholder="PTE50 - Visa 500" required />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">Lớp học *</label>
                  <Input value={form.course} onChange={(event) => updateField('course', event.target.value)} placeholder="Lớp 30-36" required />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">Thứ tự hiển thị</label>
                  <Input type="number" value={form.displayOrder} onChange={(event) => updateField('displayOrder', event.target.value)} placeholder="1" />
                </div>

                <label className="flex items-center gap-3 rounded-lg border border-gray-200 p-3">
                  <input type="checkbox" checked={form.isActive} onChange={(event) => updateField('isActive', event.target.checked)} className="h-4 w-4 accent-[#fc5d01]" />
                  <span className="text-sm font-semibold text-gray-700">Hiển thị trên website</span>
                </label>

                <Button type="submit" disabled={saving} className="w-full bg-[#fc5d01] hover:bg-[#e65300]">
                  {saving ? 'Đang lưu...' : editingId ? 'Cập nhật video' : 'Thêm video'}
                </Button>
              </div>
            </form>

            <section className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-5 text-xl font-bold text-gray-900">Danh sách video</h2>
              {loading ? (
                <p className="text-gray-500">Đang tải...</p>
              ) : reviews.length === 0 ? (
                <p className="text-gray-500">Chưa có video review nào.</p>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="rounded-lg border border-gray-200 p-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-bold text-gray-900">{review.name}</h3>
                            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${review.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                              {review.isActive ? 'Active' : 'Hidden'}
                            </span>
                            {typeof review.displayOrder === 'number' && <span className="rounded-full bg-[#fff7f2] px-2 py-0.5 text-xs font-semibold text-[#fc5d01]">Order {review.displayOrder}</span>}
                          </div>
                          <p className="mt-1 text-sm text-gray-500">{review.achievement} · {review.course}</p>
                          <a href={review.videoUrl} target="_blank" rel="noopener noreferrer" className="mt-2 block truncate text-sm font-medium text-[#1877f2] hover:underline">
                            {review.videoUrl}
                          </a>
                        </div>
                        <div className="flex shrink-0 flex-wrap gap-2">
                          <Button type="button" variant="outline" size="sm" onClick={() => toggleActive(review)}>{review.isActive ? 'Ẩn' : 'Hiện'}</Button>
                          <Button type="button" variant="outline" size="sm" onClick={() => { setEditingId(review.id || null); setForm(toFormState(review)); }}>Sửa</Button>
                          <Button type="button" variant="outline" size="sm" onClick={() => handleDelete(review.id)}>Xoá</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}