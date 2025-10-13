import { Timestamp } from 'firebase/firestore';

export type PostStatus = "draft" | "pending" | "published" | "private" | "password";

export interface Post {
  id: string; // = slug
  title: string;
  slug: string;
  excerpt: string;
  content: string; // MDX
  coverImageUrl?: string;
  ogImageUrl?: string;
  tags: string[];
  category?: string; // category slug
  series?: string; // series slug
  status: PostStatus;
  sticky?: boolean;
  passwordHash?: string; // if status="password"
  createdAt: Timestamp;
  updatedAt: Timestamp;
  publishedAt?: Timestamp; // for scheduled/backdated
  author: {
    uid: string;
    displayName: string;
    photoURL?: string;
  };
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    canonical?: string;
    robots?: "index,follow" | "noindex,nofollow";
  };
  schemaOrg?: any; // JSON-LD object
  readingMinutes?: number;
  views?: number;
  revision?: number;
  prevSlugs?: string[]; // for 301 redirects
}

export interface Page {
  id: string; // = slug
  title: string;
  slug: string;
  excerpt?: string;
  content: string; // MDX
  coverImageUrl?: string;
  ogImageUrl?: string;
  tags?: string[];
  category?: string;
  status: PostStatus;
  passwordHash?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  publishedAt?: Timestamp;
  author: {
    uid: string;
    displayName: string;
    photoURL?: string;
  };
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    canonical?: string;
    robots?: "index,follow" | "noindex,nofollow";
  };
  schemaOrg?: any;
  readingMinutes?: number;
  views?: number;
  revision?: number;
  prevSlugs?: string[];
  template?: string; // page template
}

export interface Revision {
  id: string;
  refType: "post" | "page";
  refId: string; // slug
  revision: number;
  title: string;
  excerpt?: string;
  content: string; // MDX
  diff?: string; // optional diff text
  authorUid: string;
  createdAt: Timestamp;
}

export interface Taxonomy {
  id: string;
  type: "category" | "tag" | "series";
  slug: string;
  name: string;
  parent?: string; // category parent slug
  description?: string;
  coverImageUrl?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  postCount?: number; // computed field
}

export interface Comment {
  id: string;
  postSlug: string;
  parentId?: string; // for threading
  authorName: string;
  authorEmail?: string;
  authorUrl?: string;
  body: string;
  status: "pending" | "approved" | "spam" | "trash";
  createdAt: Timestamp;
  userAgent?: string;
  ip?: string;
  replies?: Comment[]; // computed field for nested comments
}

export type UserRole = "admin" | "editor" | "author" | "contributor" | "subscriber";

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  roles: UserRole[];
  bio?: string;
  socials?: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    website?: string;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Settings {
  id: string;
  [key: string]: any;
}

export interface GeneralSettings extends Settings {
  id: 'general';
  siteName: string;
  tagline: string;
  logoUrl?: string;
  faviconUrl?: string;
  localeDefault: string;
  languages: string[];
  timezone: string;
  postsPerPage: number;
  homepageType: "latest" | "page";
  homepageSlug?: string;
}

export interface DiscussionSettings extends Settings {
  id: 'discussion';
  commentsEnabled: boolean;
  closeAfterDays?: number;
  recaptchaSiteKey?: string;
  recaptchaSecretKey?: string;
  moderationRequired: boolean;
}

export interface PermalinkSettings extends Settings {
  id: 'permalinks';
  patternPost: string; // e.g. /blog/[slug]
  patternCategory: string;
  patternTag: string;
  patternAuthor: string;
  archivePaths: {
    blog: string;
    category: string;
    tag: string;
    author: string;
    archive: string;
  };
}

export interface SEOSettings extends Settings {
  id: 'seo';
  defaultTitle?: string;
  defaultDescription?: string;
  defaultKeywords?: string[];
  socialProfiles: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  googleAnalyticsId?: string;
  googleSearchConsole?: string;
}

export interface MediaSettings extends Settings {
  id: 'media';
  imageSizes: {
    thumbnail: { width: number; height: number };
    medium: { width: number; height: number };
    large: { width: number; height: number };
  };
  allowedTypes: string[];
  maxFileSize: number; // in MB
  uploadPath: string;
}

// Form types
export interface PostFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl?: string;
  tags: string[];
  category?: string;
  series?: string;
  status: PostStatus;
  sticky?: boolean;
  password?: string;
  publishedAt?: Date;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    canonical?: string;
    robots?: "index,follow" | "noindex,nofollow";
  };
}

export interface PageFormData {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImageUrl?: string;
  status: PostStatus;
  password?: string;
  publishedAt?: Date;
  template?: string;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    canonical?: string;
    robots?: "index,follow" | "noindex,nofollow";
  };
}

export interface TaxonomyFormData {
  name: string;
  slug: string;
  description?: string;
  parent?: string;
  coverImageUrl?: string;
}

// Query types
export interface PostQuery {
  status?: PostStatus[];
  category?: string;
  tag?: string;
  author?: string;
  search?: string;
  limit?: number;
  offset?: number;
  orderBy?: 'createdAt' | 'updatedAt' | 'publishedAt' | 'views' | 'title';
  orderDirection?: 'asc' | 'desc';
  sticky?: boolean;
}

export interface ArchiveQuery {
  year?: number;
  month?: number;
  category?: string;
  tag?: string;
  author?: string;
  limit?: number;
  offset?: number;
}

// API Response types
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
