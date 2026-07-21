import { MetadataRoute } from 'next';
import { getAllCategories, getAllPosts } from '@/lib/blog/posts';
import { courseData } from '@/lib/courseData';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getCanonicalUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getAllPosts();
  const blogCategories = getAllCategories();
  const migrationPosts = getAllMigrationSlugs();
  const courseSlugs = Object.keys(courseData);

  const blogPostUrls: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: getCanonicalUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updated || post.date),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const blogCategoryUrls: MetadataRoute.Sitemap = blogCategories.map((category) => ({
    url: getCanonicalUrl(`/blog/category/${category.slug}`),
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const migrationUrls: MetadataRoute.Sitemap = migrationPosts.map((slug) => ({
    url: getCanonicalUrl(`/migration/${slug}`),
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const courseUrls: MetadataRoute.Sitemap = courseSlugs.map((slug) => ({
    url: getCanonicalUrl(`/courses/${slug}`),
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: getCanonicalUrl('/'),
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: getCanonicalUrl('/blog'),
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: getCanonicalUrl('/about'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: getCanonicalUrl('/courses'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: getCanonicalUrl('/contact'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: getCanonicalUrl('/terms'),
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: getCanonicalUrl('/privacy'),
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: getCanonicalUrl('/reviews'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: getCanonicalUrl('/register'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: getCanonicalUrl('/study'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    // Knowledge base pages
    {
      url: getCanonicalUrl('/knowledge'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: getCanonicalUrl('/knowledge/scoring-system'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Speaking section
    {
      url: getCanonicalUrl('/knowledge/speaking/read-aloud'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: getCanonicalUrl('/knowledge/speaking/repeat-sentence'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: getCanonicalUrl('/knowledge/speaking/describe-image'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: getCanonicalUrl('/knowledge/speaking/retell-lecture'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: getCanonicalUrl('/knowledge/speaking/answer-short-question'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Writing section
    {
      url: getCanonicalUrl('/knowledge/writing/summarize-text'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: getCanonicalUrl('/knowledge/writing/essay'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Reading section
    {
      url: getCanonicalUrl('/knowledge/reading/mcsa'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: getCanonicalUrl('/knowledge/reading/mcma'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: getCanonicalUrl('/knowledge/reading/rop'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: getCanonicalUrl('/knowledge/reading/rfib'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: getCanonicalUrl('/knowledge/reading/rwfib'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Listening section
    {
      url: getCanonicalUrl('/knowledge/listening/summarize-spoken'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: getCanonicalUrl('/knowledge/listening/mcma'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: getCanonicalUrl('/knowledge/listening/fill-blanks'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: getCanonicalUrl('/knowledge/listening/highlight-summary'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: getCanonicalUrl('/knowledge/listening/mcsa'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: getCanonicalUrl('/knowledge/listening/select-missing'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: getCanonicalUrl('/knowledge/listening/highlight-incorrect'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: getCanonicalUrl('/knowledge/listening/write-dictation'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...courseUrls,
    ...migrationUrls,
    ...blogPostUrls,
    ...blogCategoryUrls,
  ];
}

function getAllMigrationSlugs(): string[] {
  const categories = ['visa', 'jobs', 'pathway'];
  const slugs: string[] = [];

  for (const category of categories) {
    const contentDir = path.join(process.cwd(), 'content', 'migration', category);
    if (!fs.existsSync(contentDir)) continue;

    const files = fs.readdirSync(contentDir).filter((file) => file.endsWith('.mdx'));
    for (const file of files) {
      const fileContent = fs.readFileSync(path.join(contentDir, file), 'utf8');
      const { data, content } = matter(fileContent);
      if (data.published !== false && data.slug && data.title && data.description && content.trim()) {
        slugs.push(data.slug);
      }
    }
  }

  return slugs;
}
