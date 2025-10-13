import { PortableTextBlock } from '@portabletext/types'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export interface SanityPost {
  _id: string
  _type: 'post'
  _createdAt: string
  _updatedAt: string
  title: string
  slug: {
    current: string
  }
  excerpt: string
  content: PortableTextBlock[]
  coverImage?: {
    asset: SanityImageSource
    alt?: string
  }
  tags?: string[]
  category?: SanityCategory
  author: SanityAuthor
  publishedAt: string
  status: 'draft' | 'published' | 'private'
  featured?: boolean
  readingTime?: number
  seo?: {
    title?: string
    description?: string
    keywords?: string[]
  }
}

export interface SanityCategory {
  _id: string
  _type: 'category'
  name: string
  slug: {
    current: string
  }
  description?: string
  color?: {
    hex: string
  }
}

export interface SanityAuthor {
  _id: string
  _type: 'author'
  name: string
  slug: {
    current: string
  }
  image?: {
    asset: SanityImageSource
    alt?: string
  }
  bio?: PortableTextBlock[]
  email?: string
  social?: {
    twitter?: string
    facebook?: string
    linkedin?: string
    website?: string
  }
}

// Transformed types for frontend use
export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: PortableTextBlock[]
  coverImage?: {
    url: string
    alt?: string
  }
  tags: string[]
  category?: {
    name: string
    slug: string
    color?: string
  }
  author: {
    name: string
    slug: string
    image?: {
      url: string
      alt?: string
    }
    bio?: PortableTextBlock[]
  }
  publishedAt: string
  status: 'draft' | 'published' | 'private'
  featured: boolean
  readingTime?: number
  seo?: {
    title?: string
    description?: string
    keywords?: string[]
  }
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description?: string
  color?: string
}

export interface BlogAuthor {
  id: string
  name: string
  slug: string
  image?: {
    url: string
    alt?: string
  }
  bio?: PortableTextBlock[]
  email?: string
  social?: {
    twitter?: string
    facebook?: string
    linkedin?: string
    website?: string
  }
}

export interface BlogQuery {
  status?: ('draft' | 'published' | 'private')[]
  category?: string
  tag?: string
  author?: string
  search?: string
  limit?: number
  offset?: number
  featured?: boolean
}

export interface PaginatedBlogResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}
