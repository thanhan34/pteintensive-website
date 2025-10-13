# PTE Intensive Blog System

Complete SEO-optimized MDX-based blog system for PTE Intensive.

## 🎯 Features

- ✅ 20 SEO-ready Vietnamese blog posts about PTE
- ✅ MDX-based content with hardcoded posts
- ✅ Full-text search functionality
- ✅ Tag-based filtering
- ✅ Pagination (12 posts per page)
- ✅ Related posts by tags
- ✅ Automatic sitemap.xml generation
- ✅ RSS feed at /rss.xml
- ✅ JSON-LD structured data for SEO
- ✅ Open Graph images
- ✅ Reading time calculation
- ✅ Brand-aligned CTAs
- ✅ Mobile-responsive design

## 📁 Structure

```
content/posts/          # All MDX blog posts
lib/blog/
  ├── posts.ts         # Core blog functions
  └── mdx-renderer.tsx # MDX rendering component
components/blog/
  ├── post-card.tsx    # Blog post card
  ├── cta-block.tsx    # CTA component
  └── related-posts.tsx # Related posts
app/
  ├── blog/
  │   ├── page.tsx     # Blog listing with pagination
  │   └── [slug]/
  │       └── page.tsx # Individual post page
  ├── sitemap.ts       # Dynamic sitemap
  └── rss.xml/
      └── route.ts     # RSS feed
```

## 📝 Adding a New Blog Post

### 1. Create MDX File

Create a new file in `content/posts/` with `.mdx` extension:

```markdown
---
title: "Your Post Title Here"
slug: "your-post-slug"
description: "A brief description for SEO (150-160 characters)"
date: "2025-01-15"
author: "PTE Intensive"
tags: ["PTE", "Tag1", "Tag2"]
cover: "/og/pteintensive-blog.png"
published: true
---

## Giới thiệu

Your introduction paragraph...

## Main Content

### Subheading 1

Content here...

### Subheading 2

More content...

## Kết luận

Summary and CTAs:

👉 [Đăng ký học thử ngay](https://pteintensive.com/trialclass)
🎧 [Làm Mock Test miễn phí](https://pteintensive.com/mocktest)

**PTE Intensive – Học là đậu!**
```

### 2. Front-matter Fields

Required fields:
- `title`: Post title (SEO optimized)
- `slug`: URL-friendly identifier (no spaces, lowercase)
- `description`: Meta description for SEO
- `date`: Publication date (YYYY-MM-DD format)
- `author`: Author name
- `tags`: Array of tags for categorization
- `cover`: Cover image path
- `published`: Boolean (true/false)

### 3. Content Guidelines

**Length**: 900-1200 words minimum

**Structure**:
1. Introduction (giới thiệu)
2. Main content with H2/H3 headings
3. Conclusion with CTAs

**Internal Links**: Include 2-3 links to other posts:
```markdown
[Link text](/blog/other-post-slug)
```

**Brand Elements**:
- Mention "PTE Intensive – Học là đậu!" 
- Highlight differentiators: cam kết đầu ra, lộ trình cá nhân hóa, giảng viên 1-1
- Include CTAs to `/trialclass` and `/mocktest`

**Tone**: Professional yet approachable Vietnamese

### 4. MDX Features

You can use these special components:

```markdown
> Blockquote for important notes

**Bold text** for emphasis

`Inline code` for technical terms

- Bullet lists
- With multiple items

1. Numbered lists
2. For step-by-step

| Tables | Are |
|--------|-----|
| Also   | Supported |
```

### 5. Images

**Cách thêm hình vào Blog Post:**

#### Bước 1: Chuẩn bị hình ảnh
- Tối ưu hình trước khi upload (nén, resize)
- Đặt tên file rõ ràng (vd: `pte-speaking-tips.jpg`)
- Kích thước khuyến nghị: 1200x630px cho cover, 800x600px cho nội dung

#### Bước 2: Đặt hình vào thư mục
Có 2 vị trí:
- `/public/og/` - cho cover images (OG images)
- `/public/images/blog/` - cho hình trong bài viết

#### Bước 3: Sử dụng trong MDX

**Cách 1 - Markdown thuần (đơn giản):**
```markdown
![Mô tả hình ảnh](/images/blog/your-image.jpg)
```

**Cách 2 - Next.js Image (tối ưu hơn, khuyến nghị):**
```markdown
<Image 
  src="/images/blog/image.jpg" 
  alt="Mô tả chi tiết" 
  width={800} 
  height={400}
  className="rounded-lg"
/>
```

**Ví dụ thực tế:**
```markdown
## Phần 1: Giới thiệu

![PTE Speaking Tips](/images/blog/pte-speaking-tips.jpg)

Dưới đây là những mẹo quan trọng...

<Image 
  src="/images/blog/score-guide.jpg" 
  alt="Hướng dẫn tính điểm PTE" 
  width={800} 
  height={600}
  className="my-6 rounded-lg shadow-md"
/>
```

**Lưu ý:**
- Luôn thêm `alt` text mô tả cho SEO
- Sử dụng Next.js Image để tự động tối ưu
- Có thể thêm className để styling

## 🔍 SEO Optimization

### Metadata

Each post automatically generates:
- Title tag
- Meta description
- Keywords
- Open Graph tags
- Twitter Card
- Canonical URL
- JSON-LD structured data

### Sitemap

Sitemap is automatically generated at `/sitemap.xml` including:
- All published blog posts
- Main pages
- Proper priority and changefreq

### RSS Feed

RSS feed available at `/rss.xml` with:
- All published posts
- Full content
- Proper XML formatting

## 🎨 Styling

Blog uses TailwindCSS with brand colors:
- Primary: `#fc5d01`
- Secondary: `#fd7f33`
- Light: `#fedac2`, `#fdbc94`, `#ffac7b`

## 🔄 Workflow

1. **Write**: Create MDX file in `content/posts/`
2. **Preview**: Run `npm run dev` and visit `/blog/your-slug`
3. **Test**: Check formatting, links, images
4. **Deploy**: Push to repository
5. **Verify**: Check production site

## 📊 Analytics & Performance

### Lighthouse Targets
- Performance: ≥90
- SEO: ≥90
- Accessibility: ≥90
- Best Practices: ≥90

### Key Optimizations
- Next.js Image optimization
- Static generation for all posts
- Lazy loading
- Efficient MDX parsing

## 🚀 Deployment

The blog is ready for Vercel deployment:

```bash
# Install dependencies
npm install

# Build
npm run build

# Start
npm start
```

### Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SITE_URL=https://pteintensive.com
```

## 📚 Available Functions

### Core Functions (`lib/blog/posts.ts`)

```typescript
// Get all published posts
getAllPosts(): Post[]

// Get single post by slug
getPostBySlug(slug: string): Post | null

// Get all slugs for static generation
getAllPostSlugs(): string[]

// Get related posts by tags
getRelatedByTags(currentPost: Post, limit: number): Post[]

// Get posts by tag
getPostsByTag(tag: string): Post[]

// Get paginated posts
getPaginatedPosts(page: number, limit: number): {
  posts: Post[],
  totalPages: number,
  currentPage: number,
  hasNext: boolean,
  hasPrev: boolean
}

// Search posts
searchPosts(query: string): Post[]

// Get all unique tags
getAllTags(): string[]
```

## 🎯 Content Strategy

### Current Posts (20 total)

**Group 1: Foundation (4 posts)**
1. PTE là gì? Hướng dẫn chi tiết
2. So sánh PTE và IELTS
3. Cấu trúc đề thi PTE 2025
4. Thang điểm PTE & cách tính

**Group 2: Learning Path (4 posts)**
5. Lộ trình học cho người mất gốc
6. Cách học PTE tại nhà
7. Sai lầm thường gặp
8. Shadowing Speaking

**Group 3: Skills & Strategies (4 posts)**
9. Mẹo Speaking 79+
10. Chiến lược Listening
11. Reading RWFIB & RFIB
12. Writing Template

**Group 4: Updates & News (3 posts)**
13. Thay đổi PTE 2025
14. PTE Core vs Academic
15. Hướng dẫn đăng ký thi

**Group 5: Student Stories (3 posts)**
16. Học viên Ngọc Liên
17. Học viên 79+
18. Tổng hợp kết quả tháng 10

**Group 6: Deep Dive (2 posts)**
19. AI chấm điểm PTE
20. PTE Intensive - Giới thiệu

### Adding More Content

Follow these topic ideas:
- Vocabulary building strategies
- Grammar tips for PTE
- Time management techniques
- Mock test analysis
- Score improvement case studies
- Comparison with other English tests
- Study schedules and plans
- Technology and tools for PTE prep
- Psychological preparation
- Post-test strategies

## 🛠️ Troubleshooting

### Post Not Showing

1. Check `published: true` in frontmatter
2. Verify file extension is `.mdx`
3. Ensure no syntax errors in frontmatter
4. Check slug matches filename

### Images Not Loading

1. Verify image path starts with `/`
2. Check image exists in `/public/`
3. Use Next.js Image for optimization

### Build Errors

1. Run `npm run build` locally first
2. Check MDX syntax
3. Verify all internal links exist
4. Check frontmatter YAML syntax

## 📞 Support

For issues or questions:
- Check existing posts as examples
- Review MDX documentation
- Test locally before deployment

## 🎉 Success Metrics

Track these KPIs:
- Blog page views
- Time on page
- Click-through rate to CTAs
- Organic search traffic
- Bounce rate
- Social shares

## 📄 License

Content © 2025 PTE Intensive. All rights reserved.

---

**Ready to create amazing content!** 🚀

For the complete list of current posts, see `content/posts/` directory.
