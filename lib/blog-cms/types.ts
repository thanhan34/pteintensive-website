import type { Timestamp } from 'firebase-admin/firestore';

export type BlogPostStatus = 'draft' | 'published';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SEOScore {
  hasMetaTitle: boolean;
  hasMetaDescription: boolean;
  hasFocusKeyword: boolean;
  metaDescriptionLengthOk: boolean;
  slugOk: boolean;
  hasThumbnail: boolean;
  hasFaq: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  contentHtml: string;
  contentMarkdown: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  categoryId: string;
  categoryName: string;
  categorySlug: string;
  tags: string[];
  thumbnailUrl: string;
  status: BlogPostStatus;
  authorName: string;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
  publishedAt: Timestamp | null;
  faqs: FAQItem[];
  seoScore: SEOScore;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  order: number;
  isActive: boolean;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
}

export type BlogPostInput = Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'publishedAt' | 'seoScore'> & {
  publishedAt?: string | null;
};

export type BlogCategoryInput = Omit<BlogCategory, 'id' | 'createdAt' | 'updatedAt'>;
