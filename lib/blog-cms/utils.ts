import type { BlogPostInput, FAQItem, SEOScore } from './types';

export function removeVietnameseAccents(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

export function generateSlug(input: string): string {
  return removeVietnameseAccents(input)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function calculateReadingTime(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function calculateSEOScore(post: Partial<BlogPostInput>): SEOScore {
  return {
    hasMetaTitle: Boolean(post.metaTitle?.trim()),
    hasMetaDescription: Boolean(post.metaDescription?.trim()),
    hasFocusKeyword: Boolean(post.focusKeyword?.trim()),
    metaDescriptionLengthOk: Boolean(post.metaDescription && post.metaDescription.length <= 160),
    slugOk: Boolean(post.slug && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug)),
    hasThumbnail: Boolean(post.thumbnailUrl?.trim()),
    hasFaq: Boolean(post.faqs?.some((faq) => faq.question.trim() && faq.answer.trim())),
  };
}

export function formatDate(value: any): string {
  if (!value) return '—';
  const date = typeof value.toDate === 'function' ? value.toDate() : new Date(value);
  return Number.isNaN(date.getTime()) ? '—' : date.toLocaleDateString('vi-VN');
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function inlineMarkdown(value: string): string {
  return escapeHtml(value)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" rel="noopener noreferrer">$1</a>');
}

export function markdownToHtml(markdown: string): string {
  const blocks = markdown.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean);
  return blocks.map((block) => {
    if (block.startsWith('### ')) return `<h3>${inlineMarkdown(block.slice(4))}</h3>`;
    if (block.startsWith('## ')) return `<h2>${inlineMarkdown(block.slice(3))}</h2>`;
    if (block.startsWith('# ')) return `<h2>${inlineMarkdown(block.slice(2))}</h2>`;
    if (block.startsWith('- ')) {
      const items = block.split('\n').map((line) => `<li>${inlineMarkdown(line.replace(/^-\s+/, ''))}</li>`).join('');
      return `<ul>${items}</ul>`;
    }
    return `<p>${inlineMarkdown(block).replace(/\n/g, '<br />')}</p>`;
  }).join('\n');
}

export function cleanFaqs(faqs: FAQItem[] = []): FAQItem[] {
  return faqs.map((faq) => ({ question: faq.question.trim(), answer: faq.answer.trim() })).filter((faq) => faq.question && faq.answer);
}

export const defaultBlogCategories = [
  'PTE cho visa Úc', 'Visa 482', 'Visa 485', 'Visa 500', 'Visa 407', 'Visa 462',
  'PTE Speaking', 'PTE Writing', 'PTE Reading', 'PTE Listening', 'Lộ trình học PTE', 'Kinh nghiệm thi PTE',
];
