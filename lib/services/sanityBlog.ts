import { client } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/client'
import { 
  SanityPost, 
  SanityCategory, 
  SanityAuthor, 
  BlogPost, 
  BlogCategory, 
  BlogAuthor, 
  BlogQuery, 
  PaginatedBlogResponse 
} from '@/lib/types/sanity'
import { groq } from 'next-sanity'

// GROQ queries
const postQuery = groq`
  *[_type == "post"] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
    slug,
    excerpt,
    content,
    coverImage {
      asset,
      alt
    },
    tags,
    category-> {
      _id,
      _type,
      name,
      slug,
      description,
      color
    },
    author-> {
      _id,
      _type,
      name,
      slug,
      image {
        asset,
        alt
      },
      bio,
      email,
      social
    },
    publishedAt,
    status,
    featured,
    readingTime,
    seo
  }
`

const categoryQuery = groq`
  *[_type == "category"] {
    _id,
    _type,
    name,
    slug,
    description,
    color
  }
`

const authorQuery = groq`
  *[_type == "author"] {
    _id,
    _type,
    name,
    slug,
    image {
      asset,
      alt
    },
    bio,
    email,
    social
  }
`

// Transform functions
function transformPost(sanityPost: SanityPost): BlogPost {
  return {
    id: sanityPost._id,
    title: sanityPost.title,
    slug: sanityPost.slug.current,
    excerpt: sanityPost.excerpt,
    content: sanityPost.content,
    coverImage: sanityPost.coverImage ? {
      url: urlFor(sanityPost.coverImage.asset).url(),
      alt: sanityPost.coverImage.alt
    } : undefined,
    tags: sanityPost.tags || [],
    category: sanityPost.category ? {
      name: sanityPost.category.name,
      slug: sanityPost.category.slug.current,
      color: sanityPost.category.color?.hex
    } : undefined,
    author: {
      name: sanityPost.author.name,
      slug: sanityPost.author.slug.current,
      image: sanityPost.author.image ? {
        url: urlFor(sanityPost.author.image.asset).url(),
        alt: sanityPost.author.image.alt
      } : undefined,
      bio: sanityPost.author.bio
    },
    publishedAt: sanityPost.publishedAt,
    status: sanityPost.status,
    featured: sanityPost.featured || false,
    readingTime: sanityPost.readingTime,
    seo: sanityPost.seo
  }
}

function transformCategory(sanityCategory: SanityCategory): BlogCategory {
  return {
    id: sanityCategory._id,
    name: sanityCategory.name,
    slug: sanityCategory.slug.current,
    description: sanityCategory.description,
    color: sanityCategory.color?.hex
  }
}

function transformAuthor(sanityAuthor: SanityAuthor): BlogAuthor {
  return {
    id: sanityAuthor._id,
    name: sanityAuthor.name,
    slug: sanityAuthor.slug.current,
    image: sanityAuthor.image ? {
      url: urlFor(sanityAuthor.image.asset).url(),
      alt: sanityAuthor.image.alt
    } : undefined,
    bio: sanityAuthor.bio,
    email: sanityAuthor.email,
    social: sanityAuthor.social
  }
}

export class SanityBlogService {
  // Get all posts with filtering and pagination
  static async getPosts(query: BlogQuery = {}): Promise<PaginatedBlogResponse<BlogPost>> {
    const {
      status = ['published'],
      category,
      tag,
      author,
      search,
      limit = 10,
      offset = 0,
      featured
    } = query

    // Build GROQ query with filters
    let groqQuery = `*[_type == "post"`
    const filters: string[] = []

    // Status filter
    if (status.length > 0) {
      filters.push(`status in [${status.map(s => `"${s}"`).join(', ')}]`)
    }

    // Category filter
    if (category) {
      filters.push(`category->slug.current == "${category}"`)
    }

    // Tag filter
    if (tag) {
      filters.push(`"${tag}" in tags`)
    }

    // Author filter
    if (author) {
      filters.push(`author->slug.current == "${author}"`)
    }

    // Featured filter
    if (featured !== undefined) {
      filters.push(`featured == ${featured}`)
    }

    // Search filter
    if (search) {
      filters.push(`(title match "${search}*" || excerpt match "${search}*")`)
    }

    if (filters.length > 0) {
      groqQuery += ` && (${filters.join(' && ')})`
    }

    groqQuery += `] | order(publishedAt desc)`

    // Get total count
    const countQuery = groqQuery.replace('*[', 'count(*[')
    const total = await client.fetch(countQuery)

    // Add pagination
    groqQuery += ` [${offset}...${offset + limit}]`

    // Add fields
    groqQuery += ` {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      title,
      slug,
      excerpt,
      content,
      coverImage {
        asset,
        alt
      },
      tags,
      category-> {
        _id,
        _type,
        name,
        slug,
        description,
        color
      },
      author-> {
        _id,
        _type,
        name,
        slug,
        image {
          asset,
          alt
        },
        bio,
        email,
        social
      },
      publishedAt,
      status,
      featured,
      readingTime,
      seo
    }`

    const sanityPosts: SanityPost[] = await client.fetch(groqQuery)
    const posts = sanityPosts.map(transformPost)

    const totalPages = Math.ceil(total / limit)
    const currentPage = Math.floor(offset / limit) + 1

    return {
      data: posts,
      pagination: {
        page: currentPage,
        limit,
        total,
        totalPages,
        hasNext: currentPage < totalPages,
        hasPrev: currentPage > 1
      }
    }
  }

  // Get single post by slug
  static async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const query = groq`
      *[_type == "post" && slug.current == $slug][0] {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        title,
        slug,
        excerpt,
        content,
        coverImage {
          asset,
          alt
        },
        tags,
        category-> {
          _id,
          _type,
          name,
          slug,
          description,
          color
        },
        author-> {
          _id,
          _type,
          name,
          slug,
          image {
            asset,
            alt
          },
          bio,
          email,
          social
        },
        publishedAt,
        status,
        featured,
        readingTime,
        seo
      }
    `

    const sanityPost: SanityPost = await client.fetch(query, { slug })
    
    if (!sanityPost) {
      return null
    }

    return transformPost(sanityPost)
  }

  // Get related posts
  static async getRelatedPosts(postId: string, limit: number = 3): Promise<BlogPost[]> {
    const query = groq`
      *[_type == "post" && _id != $postId && status == "published"] | order(publishedAt desc) [0...${limit}] {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        title,
        slug,
        excerpt,
        content,
        coverImage {
          asset,
          alt
        },
        tags,
        category-> {
          _id,
          _type,
          name,
          slug,
          description,
          color
        },
        author-> {
          _id,
          _type,
          name,
          slug,
          image {
            asset,
            alt
          },
          bio,
          email,
          social
        },
        publishedAt,
        status,
        featured,
        readingTime,
        seo
      }
    `

    const sanityPosts: SanityPost[] = await client.fetch(query, { postId })
    return sanityPosts.map(transformPost)
  }

  // Get featured posts
  static async getFeaturedPosts(limit: number = 5): Promise<BlogPost[]> {
    const query = groq`
      *[_type == "post" && featured == true && status == "published"] | order(publishedAt desc) [0...${limit}] {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        title,
        slug,
        excerpt,
        content,
        coverImage {
          asset,
          alt
        },
        tags,
        category-> {
          _id,
          _type,
          name,
          slug,
          description,
          color
        },
        author-> {
          _id,
          _type,
          name,
          slug,
          image {
            asset,
            alt
          },
          bio,
          email,
          social
        },
        publishedAt,
        status,
        featured,
        readingTime,
        seo
      }
    `

    const sanityPosts: SanityPost[] = await client.fetch(query)
    return sanityPosts.map(transformPost)
  }

  // Get all categories
  static async getCategories(): Promise<BlogCategory[]> {
    const sanityCategories: SanityCategory[] = await client.fetch(categoryQuery)
    return sanityCategories.map(transformCategory)
  }

  // Get category by slug
  static async getCategoryBySlug(slug: string): Promise<BlogCategory | null> {
    const query = groq`
      *[_type == "category" && slug.current == $slug][0] {
        _id,
        _type,
        name,
        slug,
        description,
        color
      }
    `

    const sanityCategory: SanityCategory = await client.fetch(query, { slug })
    
    if (!sanityCategory) {
      return null
    }

    return transformCategory(sanityCategory)
  }

  // Get all authors
  static async getAuthors(): Promise<BlogAuthor[]> {
    const sanityAuthors: SanityAuthor[] = await client.fetch(authorQuery)
    return sanityAuthors.map(transformAuthor)
  }

  // Get author by slug
  static async getAuthorBySlug(slug: string): Promise<BlogAuthor | null> {
    const query = groq`
      *[_type == "author" && slug.current == $slug][0] {
        _id,
        _type,
        name,
        slug,
        image {
          asset,
          alt
        },
        bio,
        email,
        social
      }
    `

    const sanityAuthor: SanityAuthor = await client.fetch(query, { slug })
    
    if (!sanityAuthor) {
      return null
    }

    return transformAuthor(sanityAuthor)
  }

  // Search posts
  static async searchPosts(searchTerm: string, limit: number = 10): Promise<BlogPost[]> {
    const query = groq`
      *[_type == "post" && status == "published" && (title match $searchTerm || excerpt match $searchTerm)] | order(publishedAt desc) [0...${limit}] {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        title,
        slug,
        excerpt,
        content,
        coverImage {
          asset,
          alt
        },
        tags,
        category-> {
          _id,
          _type,
          name,
          slug,
          description,
          color
        },
        author-> {
          _id,
          _type,
          name,
          slug,
          image {
            asset,
            alt
          },
          bio,
          email,
          social
        },
        publishedAt,
        status,
        featured,
        readingTime,
        seo
      }
    `

    const sanityPosts: SanityPost[] = await client.fetch(query, { 
      searchTerm: `${searchTerm}*` 
    })
    return sanityPosts.map(transformPost)
  }
}
