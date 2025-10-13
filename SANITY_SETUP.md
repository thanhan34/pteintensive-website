# Sanity Blog Setup Guide

This guide will help you set up Sanity CMS for the PTE Intensive blog system.

## Overview

The blog system has been migrated from Firebase to Sanity CMS, providing:
- Rich content editing with Portable Text
- Image management with automatic optimization
- Structured content with categories and authors
- SEO optimization
- Real-time preview capabilities

## Prerequisites

1. Node.js 18+ installed
2. A Sanity account (free at [sanity.io](https://sanity.io))
3. Existing PTE Intensive project

## Setup Steps

### 1. Create Sanity Project

1. Go to [sanity.io](https://sanity.io) and sign up/login
2. Create a new project
3. Choose a project name (e.g., "PTE Intensive Blog")
4. Select a dataset name (use "production" for live site)
5. Note down your Project ID

### 2. Environment Variables

Add these variables to your `.env.local` file:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_here
```

To get your API token:
1. Go to your Sanity project dashboard
2. Navigate to API → Tokens
3. Create a new token with "Editor" permissions
4. Copy the token to your environment file

### 3. Install Dependencies

The required packages are already installed:
- `sanity` - Sanity Studio
- `next-sanity` - Next.js integration
- `@sanity/image-url` - Image URL builder
- `@portabletext/react` - Portable Text renderer
- `@sanity/vision` - GROQ query tool
- `@sanity/color-input` - Color picker
- `@sanity/code-input` - Code editor
- `react-syntax-highlighter` - Code syntax highlighting

### 4. Deploy Sanity Studio

The Sanity Studio is available at `/studio` in your Next.js app.

To access it:
1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:3000/studio`
3. Login with your Sanity account
4. Start creating content!

### 5. Content Structure

#### Posts
- **Title**: Main post title
- **Slug**: URL-friendly identifier (auto-generated)
- **Excerpt**: Short description for previews
- **Content**: Rich text content using Portable Text
- **Cover Image**: Featured image with alt text
- **Tags**: Array of tags for categorization
- **Category**: Reference to category document
- **Author**: Reference to author document
- **Published At**: Publication date
- **Status**: draft | published | private
- **Featured**: Boolean for highlighting posts
- **Reading Time**: Estimated reading time in minutes
- **SEO**: Meta title, description, and keywords

#### Categories
- **Name**: Category display name
- **Slug**: URL-friendly identifier
- **Description**: Optional category description
- **Color**: Brand color for the category

#### Authors
- **Name**: Author display name
- **Slug**: URL-friendly identifier
- **Image**: Author profile photo
- **Bio**: Rich text biography
- **Email**: Contact email
- **Social Links**: Twitter, Facebook, LinkedIn, Website

### 6. Content Migration

To migrate existing Firebase blog posts to Sanity:

1. Export your Firebase data
2. Create authors and categories in Sanity Studio
3. Use Sanity's import tools or create a migration script
4. Convert Markdown content to Portable Text format

### 7. Customization

#### Schema Customization
Edit files in `lib/sanity/schemas/` to modify content structure:
- `post.ts` - Blog post schema
- `category.ts` - Category schema  
- `author.ts` - Author schema

#### Styling
The blog uses your existing color scheme:
- Primary: `#fc5d01` (Orange)
- Light variants: `#fedac2`, `#fdbc94`, `#ffac7b`, `#fd7f33`

#### Portable Text Components
Customize content rendering in `components/PortableText.tsx`:
- Custom block styles (headings, paragraphs, quotes)
- Image rendering with optimization
- Code syntax highlighting
- Custom marks (bold, italic, links)

### 8. Production Deployment

1. Set up environment variables in your hosting platform
2. Deploy your Next.js application
3. Configure CORS in Sanity project settings:
   - Go to API → CORS Origins
   - Add your production domain
4. Update `NEXT_PUBLIC_SITE_URL` in environment variables

### 9. Content Management Workflow

#### Creating Posts
1. Go to `/studio`
2. Click "Posts" → "Create"
3. Fill in post details
4. Add rich content using the editor
5. Set status to "published" when ready
6. Save and publish

#### Managing Media
- Upload images directly in the content editor
- Images are automatically optimized and served via CDN
- Alt text is supported for accessibility

#### SEO Optimization
- Each post has dedicated SEO fields
- Automatic Open Graph and Twitter Card generation
- JSON-LD structured data for search engines

### 10. Development Tips

#### GROQ Queries
Use the Vision tool in Sanity Studio to test GROQ queries:
```groq
*[_type == "post" && status == "published"] | order(publishedAt desc)
```

#### Preview Mode
Set up preview mode for draft content:
1. Create preview API routes
2. Add preview buttons in Sanity Studio
3. Enable real-time updates

#### Performance
- Images are automatically optimized
- Content is cached at the CDN level
- Use ISR (Incremental Static Regeneration) for better performance

## Troubleshooting

### Common Issues

1. **Studio not loading**: Check project ID and dataset in environment variables
2. **Images not displaying**: Verify image URL configuration in `lib/sanity/client.ts`
3. **Content not updating**: Clear Next.js cache and restart development server
4. **CORS errors**: Add your domain to Sanity CORS settings

### Support

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js + Sanity Guide](https://www.sanity.io/guides/nextjs-app-router-live-preview)
- [Portable Text Documentation](https://portabletext.org/)

## Features

### Content Management
- ✅ Rich text editor with Portable Text
- ✅ Image management with automatic optimization
- ✅ Category and tag organization
- ✅ Author management
- ✅ Draft/published workflow
- ✅ SEO optimization

### Frontend Features
- ✅ Responsive blog listing
- ✅ Individual post pages
- ✅ Search and filtering
- ✅ Related posts
- ✅ Social sharing
- ✅ Structured data for SEO

### Developer Experience
- ✅ TypeScript support
- ✅ Real-time preview
- ✅ Version control for content
- ✅ Flexible schema customization
- ✅ Built-in image CDN

The blog system is now ready for content creation and management through Sanity Studio!
