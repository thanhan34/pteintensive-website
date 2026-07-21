'use client';

import type { FAQItem } from '@/lib/blog-cms/types';

export function FAQEditor({ faqs, onChange }: { faqs: FAQItem[]; onChange: (faqs: FAQItem[]) => void }) {
  const update = (index: number, patch: Partial<FAQItem>) => onChange(faqs.map((faq, i) => i === index ? { ...faq, ...patch } : faq));
  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="rounded-xl border border-gray-200 bg-white p-4">
          <input className="mb-3 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#FC5D01]" placeholder="Câu hỏi" value={faq.question} onChange={(e) => update(index, { question: e.target.value })} />
          <textarea className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#FC5D01]" rows={3} placeholder="Câu trả lời" value={faq.answer} onChange={(e) => update(index, { answer: e.target.value })} />
          <button type="button" onClick={() => onChange(faqs.filter((_, i) => i !== index))} className="mt-2 text-sm font-medium text-red-600">Remove FAQ</button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...faqs, { question: '', answer: '' }])} className="min-h-11 rounded-xl border border-gray-200 bg-white px-4 py-2 font-semibold hover:bg-gray-50">+ Add FAQ</button>
    </div>
  );
}
