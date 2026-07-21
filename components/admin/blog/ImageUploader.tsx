'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth/context';

export function ImageUploader({ value, onChange, slug }: { value: string; onChange: (url: string) => void; slug: string }) {
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();
  async function upload(file: File) {
    setUploading(true);
    try {
      const token = await user?.getIdToken();
      const formData = new FormData();
      formData.append('file', file);
      formData.append('slug', slug || 'draft');
      const res = await fetch('/api/admin/blog/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      onChange(data.url);
    } finally {
      setUploading(false);
    }
  }
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
      {value && <img src={value} alt="Thumbnail preview" className="mb-4 h-40 w-full rounded-xl object-cover" />}
      <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} className="block w-full text-sm" />
      {uploading && <p className="mt-2 text-sm text-gray-500">Uploading...</p>}
    </div>
  );
}
