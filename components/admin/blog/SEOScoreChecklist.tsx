'use client';

import type { SEOScore } from '@/lib/blog-cms/types';

const labels: Record<keyof SEOScore, string> = {
  hasMetaTitle: 'Meta title',
  hasMetaDescription: 'Meta description',
  hasFocusKeyword: 'Focus keyword',
  metaDescriptionLengthOk: 'Meta description ≤ 160 ký tự',
  slugOk: 'Slug URL-safe',
  hasThumbnail: 'Thumbnail',
  hasFaq: 'FAQ',
};

export function SEOScoreChecklist({ score }: { score: SEOScore }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
      <p className="mb-3 font-semibold text-gray-900">SEO checklist</p>
      <ul className="space-y-2 text-sm">
        {(Object.keys(labels) as (keyof SEOScore)[]).map((key) => (
          <li key={key} className={score[key] ? 'text-green-700' : 'text-gray-500'}>{score[key] ? '✓' : '○'} {labels[key]}</li>
        ))}
      </ul>
    </div>
  );
}
