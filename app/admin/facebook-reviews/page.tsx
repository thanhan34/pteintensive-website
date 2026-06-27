'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { AuthGuard } from '@/lib/auth/guards';
import {
  createFacebookReview,
  deleteFacebookReview,
  getAllFacebookReviews,
  updateFacebookReview,
} from '@/lib/facebookReviews';
import type { FacebookReview } from '@/types/facebookReview';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';

type FacebookReviewFormState = {
  name: string;
  avatarUrl: string;
  content: string;
  postUrl: string;
  screenshotUrl: string;
  date: string;
  rating: string;
  hashtag: string;
  target: string;
  score: string;
  isActive: boolean;
};

const initialFormState: FacebookReviewFormState = {
  name: '',
  avatarUrl: '',
  content: '',
  postUrl: '',
  screenshotUrl: '',
  date: '',
  rating: '5',
  hashtag: '',
  target: '',
  score: '',
  isActive: true,
};

function toFormState(review: FacebookReview): FacebookReviewFormState {
  return {
    name: review.name || '',
    avatarUrl: review.avatarUrl || '',
    content: review.content || '',
    postUrl: review.postUrl || '',
    screenshotUrl: review.screenshotUrl || '',
    date: review.date || '',
    rating: review.rating ? String(review.rating) : '5',
    hashtag: review.hashtag || '',
    target: review.target || '',
    score: review.score || '',
    isActive: review.isActive,
  };
}

function cleanOptional(value: string) {
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

export default function AdminFacebookReviewsPage() {
  const [reviews, setReviews] = useState<FacebookReview[]>([]);
  const [form, setForm] = useState<FacebookReviewFormState>(initialFormState);
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
      const data = await getAllFacebookReviews();
      setReviews(data);
    } catch (err) {
      console.error('Error loading Facebook reviews:', err);
      setError('Không thể tải danh sách review Facebook.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReviews();
  }, []);

  function updateField<K extends keyof FacebookReviewFormState>(field: K, value: FacebookReviewFormState[K]) {
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
      const payload = {
        name: form.name.trim(),
        avatarUrl: cleanOptional(form.avatarUrl),
        content: form.content.trim(),
        postUrl: cleanOptional(form.postUrl),
        screenshotUrl: cleanOptional(form.screenshotUrl),
        date: form.date.trim(),
        rating: form.rating ? Number(form.rating) : undefined,
        hashtag: cleanOptional(form.hashtag),
        target: cleanOptional(form.target),
        score: cleanOptional(form.score),
        source: 'Facebook Group' as const,
        isActive: form.isActive,
      };

      if (!payload.name || !payload.content || !payload.date) {
        setError('Vui lòng nhập Tên học viên, Nội dung review và Ngày đăng review.');
        return;
      }

      if (editingId) {
        await updateFacebookReview(editingId, payload);
        setMessage('Đã cập nhật review Facebook.');
      } else {
        await createFacebookReview(payload);
        setMessage('Đã thêm review Facebook mới.');
      }

      resetForm();
      await loadReviews();
    } catch (err) {
      console.error('Error saving Facebook review:', err);
      setError('Không thể lưu review Facebook. Vui lòng thử lại.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id?: string) {
    if (!id) return;
    const confirmed = window.confirm('Bạn chắc chắn muốn xoá review Facebook này?');
    if (!confirmed) return;

    try {
      await deleteFacebookReview(id);
      setMessage('Đã xoá review Facebook.');
      await loadReviews();
      if (editingId === id) resetForm();
    } catch (err) {
      console.error('Error deleting Facebook review:', err);
      setError('Không thể xoá review Facebook.');
    }
  }

  async function toggleActive(review: FacebookReview) {
    if (!review.id) return;
    try {
      await updateFacebookReview(review.id, { isActive: !review.isActive });
      await loadReviews();
    } catch (err) {
      console.error('Error updating Facebook review status:', err);
      setError('Không thể cập nhật trạng thái hiển thị.');
    }
  }

  return (
    <AuthGuard requiredRoles={['admin', 'editor']}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Facebook Reviews</h1>
              <p className="mt-1 text-gray-600">Quản lý collection facebookReviews cho section Review Từ Cộng Đồng Facebook.</p>
            </div>
            <div className="flex gap-3">
              <Link href="/reviews"><Button variant="outline">Xem trang Reviews</Button></Link>
              <Link href="/admin"><Button variant="outline">Về Dashboard</Button></Link>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-white p-5 shadow">
              <p className="text-sm font-medium text-gray-500">Tổng review</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{reviews.length}</p>
            </div>
            <div className="rounded-lg bg-white p-5 shadow">
              <p className="text-sm font-medium text-gray-500">Đang hiển thị</p>
              <p className="mt-2 text-3xl font-bold text-[#fc5d01]">{activeCount}</p>
            </div>
            <div className="rounded-lg bg-white p-5 shadow">
              <p className="text-sm font-medium text-gray-500">Carousel</p>
              <p className="mt-2 text-sm font-semibold text-gray-900">Random 9 active reviews mỗi lần load / 5 phút.</p>
            </div>
          </div>

          {(message || error) && (
            <div className={`mb-6 rounded-lg p-4 text-sm font-semibold ${error ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
              {error || message}
            </div>
          )}

          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <form onSubmit={handleSubmit} className="rounded-lg bg-white p-6 shadow">
              <div className="mb-5 flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold text-gray-900">{editingId ? 'Chỉnh sửa review' : 'Thêm review mới'}</h2>
                {editingId && <Button type="button" variant="outline" onClick={resetForm}>Huỷ sửa</Button>}
              </div>

              <div className="space-y-4">
                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-gray-700">Tên học viên *</span>
                  <Input value={form.name} onChange={(event) => updateField('name', event.target.value)} placeholder="Lily Phạm" />
                </label>

                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-gray-700">Avatar URL</span>
                  <Input value={form.avatarUrl} onChange={(event) => updateField('avatarUrl', event.target.value)} placeholder="https://..." />
                </label>

                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-gray-700">Nội dung review *</span>
                  <textarea
                    value={form.content}
                    onChange={(event) => updateField('content', event.target.value)}
                    rows={8}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Nhập nội dung review đầy đủ..."
                  />
                </label>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-1 block text-sm font-semibold text-gray-700">Link bài viết Facebook gốc</span>
                    <Input value={form.postUrl} onChange={(event) => updateField('postUrl', event.target.value)} placeholder="https://facebook.com/..." />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-sm font-semibold text-gray-700">Link ảnh chụp màn hình / bảng điểm</span>
                    <Input value={form.screenshotUrl} onChange={(event) => updateField('screenshotUrl', event.target.value)} placeholder="https://..." />
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-1 block text-sm font-semibold text-gray-700">Ngày đăng review *</span>
                    <Input value={form.date} onChange={(event) => updateField('date', event.target.value)} placeholder="22/05/2026 hoặc 2026-05-22" />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-sm font-semibold text-gray-700">Rating</span>
                    <Input type="number" min="1" max="5" value={form.rating} onChange={(event) => updateField('rating', event.target.value)} />
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <label className="block">
                    <span className="mb-1 block text-sm font-semibold text-gray-700">Hashtag</span>
                    <Input value={form.hashtag} onChange={(event) => updateField('hashtag', event.target.value)} placeholder="#PTEIntensive" />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-sm font-semibold text-gray-700">Target</span>
                    <Input value={form.target} onChange={(event) => updateField('target', event.target.value)} placeholder="PTE 36+" />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-sm font-semibold text-gray-700">Score</span>
                    <Input value={form.score} onChange={(event) => updateField('score', event.target.value)} placeholder="37" />
                  </label>
                </div>

                <label className="flex items-center gap-3 rounded-lg border border-gray-200 p-3">
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(event) => updateField('isActive', event.target.checked)}
                    className="h-4 w-4 accent-[#fc5d01]"
                  />
                  <span className="text-sm font-semibold text-gray-700">Trạng thái hiển thị / Active</span>
                </label>

                <Button type="submit" disabled={saving} className="w-full bg-[#fc5d01] hover:bg-[#e65300]">
                  {saving ? 'Đang lưu...' : editingId ? 'Cập nhật review' : 'Thêm review'}
                </Button>
              </div>
            </form>

            <section className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-5 text-xl font-bold text-gray-900">Danh sách review</h2>
              {loading ? (
                <p className="text-gray-500">Đang tải...</p>
              ) : reviews.length === 0 ? (
                <p className="text-gray-500">Chưa có review Facebook nào.</p>
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
                            {review.score && <span className="rounded-full bg-[#fff7f2] px-2 py-0.5 text-xs font-semibold text-[#fc5d01]">Score {review.score}</span>}
                          </div>
                          <p className="mt-1 text-sm text-gray-500">{review.date} · {review.source}</p>
                          <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-700">{review.content}</p>
                          {(review.hashtag || review.target) && (
                            <p className="mt-2 text-sm font-semibold text-[#1877f2]">{[review.hashtag, review.target].filter(Boolean).join(' · ')}</p>
                          )}
                        </div>
                        <div className="flex shrink-0 flex-wrap gap-2">
                          <Button type="button" variant="outline" size="sm" onClick={() => toggleActive(review)}>
                            {review.isActive ? 'Ẩn' : 'Hiện'}
                          </Button>
                          <Button type="button" variant="outline" size="sm" onClick={() => { setEditingId(review.id || null); setForm(toFormState(review)); }}>
                            Sửa
                          </Button>
                          <Button type="button" variant="outline" size="sm" onClick={() => handleDelete(review.id)}>
                            Xoá
                          </Button>
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
