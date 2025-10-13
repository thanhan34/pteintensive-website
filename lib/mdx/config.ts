import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrismPlus from 'rehype-prism-plus';

export interface MDXOptions {
  scope?: Record<string, unknown>;
  mdxOptions?: {
    remarkPlugins?: any[];
    rehypePlugins?: any[];
    format?: 'mdx' | 'md';
  };
}

export const defaultMDXOptions: MDXOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: ['anchor'],
          },
        },
      ],
      [rehypePrismPlus, { ignoreMissing: true }],
    ],
    format: 'mdx',
  },
};

export async function serializeMDX(
  content: string,
  options: MDXOptions = {}
): Promise<MDXRemoteSerializeResult> {
  const mergedOptions = {
    ...defaultMDXOptions,
    ...options,
    mdxOptions: {
      ...defaultMDXOptions.mdxOptions,
      ...options.mdxOptions,
    },
  };

  return await serialize(content, mergedOptions);
}

// Extract headings from MDX content for TOC
export interface Heading {
  id: string;
  text: string;
  level: number;
}

export function extractHeadings(content: string): Heading[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    headings.push({ id, text, level });
  }

  return headings;
}

// Calculate reading time
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);
  return readingTime;
}

// Strip MDX/HTML tags for excerpt
export function stripMDX(content: string): string {
  return content
    // Remove MDX components
    .replace(/<[^>]*>/g, '')
    // Remove markdown syntax
    .replace(/#{1,6}\s/g, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`(.*?)`/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    // Remove extra whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

// Generate excerpt from content
export function generateExcerpt(content: string, maxLength: number = 160): string {
  const stripped = stripMDX(content);
  if (stripped.length <= maxLength) {
    return stripped;
  }
  
  return stripped.substring(0, maxLength).trim() + '...';
}
