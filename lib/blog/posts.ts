import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
export { formatPostDate } from './format';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface PostFrontmatter {
  title: string;
  slug: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  tags: string[];
  cover: string;
  published: boolean;
}

export interface Post extends PostFrontmatter {
  content: string;
  readingTime: number;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

// Get all post files
function getPostFiles(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs.readdirSync(postsDirectory).filter(file => file.endsWith('.mdx'));
}

// Parse a single post file
function parsePost(filename: string): Post | null {
  const fullPath = path.join(postsDirectory, filename);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  const { data, content } = matter(fileContents);
  const frontmatter = data as PostFrontmatter;
  
  // Skip unpublished posts
  if (!frontmatter.published || !frontmatter.title || !frontmatter.description || !content.trim()) {
    return null;
  }
  
  // Calculate reading time
  const stats = readingTime(content);
  const readTime = Math.ceil(stats.minutes);
  
  return {
    ...frontmatter,
    slug: frontmatter.slug || filename.replace(/\.mdx$/, ''),
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
    content,
    readingTime: readTime,
  };
}

export function slugifyTag(tag: string): string {
  return tag
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export function getPostCategory(post: Post): BlogCategory | null {
  const primaryTag = post.tags?.[0];
  if (!primaryTag) return null;

  return {
    id: slugifyTag(primaryTag),
    name: primaryTag,
    slug: slugifyTag(primaryTag),
    description: `Các bài viết mới nhất trong chủ đề ${primaryTag}.`,
  };
}

export function getAllCategories(): BlogCategory[] {
  const categories = new Map<string, BlogCategory>();

  getAllPosts().forEach((post) => {
    post.tags.forEach((tag) => {
      const slug = slugifyTag(tag);
      if (!categories.has(slug)) {
        categories.set(slug, {
          id: slug,
          name: tag,
          slug,
          description: `Các bài viết mới nhất trong chủ đề ${tag}.`,
        });
      }
    });
  });

  return Array.from(categories.values()).sort((a, b) => a.name.localeCompare(b.name, 'vi'));
}

export function getCategoryBySlug(slug: string): BlogCategory | null {
  return getAllCategories().find((category) => category.slug === slug) || null;
}

export function getPostsByCategorySlug(categorySlug: string): Post[] {
  return getAllPosts().filter((post) => post.tags.some((tag) => slugifyTag(tag) === categorySlug));
}

// Get all published posts
export function getAllPosts(): Post[] {
  const files = getPostFiles();
  const posts = files
    .map(parsePost)
    .filter((post): post is Post => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return posts;
}

// Get a single post by slug
export function getPostBySlug(slug: string): Post | null {
  return getPostFiles()
    .map(parsePost)
    .find((post): post is Post => post?.slug === slug) ?? null;
}

// Get all post slugs for static generation
export function getAllPostSlugs(): string[] {
  const posts = getAllPosts();
  return posts.map(post => post.slug);
}

// Get related posts by tags
export function getRelatedByTags(currentPost: Post, limit: number = 3): Post[] {
  const allPosts = getAllPosts();
  const currentTags = new Set(currentPost.tags);
  
  // Calculate relevance score based on shared tags
  const postsWithScores = allPosts
    .filter(post => post.slug !== currentPost.slug)
    .map(post => {
      const sharedTags = post.tags.filter(tag => currentTags.has(tag)).length;
      return { post, score: sharedTags };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);
  
  return postsWithScores.slice(0, limit).map(item => item.post);
}

// Get posts by tag
export function getPostsByTag(tag: string): Post[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.tags.includes(tag));
}

// Get paginated posts
export function getPaginatedPosts(page: number = 1, limit: number = 12): {
  posts: Post[];
  totalPages: number;
  currentPage: number;
  hasNext: boolean;
  hasPrev: boolean;
} {
  const allPosts = getAllPosts();
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const posts = allPosts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(allPosts.length / limit);
  
  return {
    posts,
    totalPages,
    currentPage: page,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}

// Search posts
export function searchPosts(query: string): Post[] {
  const allPosts = getAllPosts();
  const lowerQuery = query.toLowerCase();
  
  return allPosts.filter(post => 
    post.title.toLowerCase().includes(lowerQuery) ||
    post.description.toLowerCase().includes(lowerQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

// Get all unique tags
export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const tagsSet = new Set<string>();
  
  allPosts.forEach(post => {
    post.tags.forEach(tag => tagsSet.add(tag));
  });
  
  return Array.from(tagsSet).sort();
}
