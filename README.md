# PTE Intensive Blog System

Hệ thống blog WordPress-like được xây dựng với Next.js 14, TypeScript, Tailwind CSS và Firebase. Hỗ trợ đầy đủ tính năng CMS với role-based access control, MDX content, và SEO optimization.

## 🚀 Tính Năng Chính

### ✅ Đã Triển Khai
- **Authentication & Authorization**: Firebase Auth với role-based access control (Admin/Editor/Author/Contributor/Subscriber)
- **Content Management**: CRUD operations cho posts/pages với MDX support
- **Rich Text Editor**: MDX với custom components (Callout, CodeBlock, YouTubeEmbed, ImageGallery)
- **Media Management**: Upload và quản lý hình ảnh với Firebase Storage
- **SEO Optimization**: Meta tags, Open Graph, Twitter Cards, JSON-LD schema
- **Responsive Design**: Mobile-first với Tailwind CSS
- **Security**: Firestore và Storage security rules
- **Performance**: Next.js App Router với ISR/SSG

### 🔄 Đang Phát Triển
- Post Editor với live preview
- Media Library interface
- Taxonomy management (categories/tags)
- Comment system với moderation
- RSS feeds và sitemap generation
- Import/Export tools

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **UI Components**: Radix UI, shadcn/ui
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Content**: MDX với remark/rehype plugins
- **Forms**: React Hook Form + Zod validation
- **Styling**: Tailwind CSS với custom color scheme
- **Date Handling**: date-fns với Vietnamese locale

## 📦 Cài Đặt

### 1. Clone Repository
```bash
git clone <repository-url>
cd pteintensive-blog
```

### 2. Cài Đặt Dependencies
```bash
npm install
```

### 3. Cấu Hình Environment
```bash
cp .env.local.example .env.local
```

Điền thông tin Firebase vào `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 4. Cấu Hình Firebase

#### 4.1 Firestore Security Rules
```bash
firebase deploy --only firestore:rules
```

#### 4.2 Storage Security Rules
```bash
firebase deploy --only storage
```

### 5. Chạy Development Server
```bash
npm run dev
```

Truy cập http://localhost:3000

## 🔐 Thiết Lập Admin Lần Đầu

### 1. Tạo Tài Khoản Admin
1. Truy cập `/login`
2. Đăng ký tài khoản mới hoặc đăng nhập bằng Google
3. Vào Firebase Console > Firestore Database
4. Tìm document trong collection `users` với UID của bạn
5. Thêm field `roles: ["admin"]`

### 2. Cấu Trúc Collections

#### Users Collection
```javascript
{
  uid: "user_id",
  email: "admin@example.com",
  displayName: "Admin User",
  roles: ["admin"], // ["admin", "editor", "author", "contributor", "subscriber"]
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### Posts Collection
```javascript
{
  id: "post-slug", // Document ID = slug
  title: "Tiêu đề bài viết",
  slug: "post-slug",
  excerpt: "Tóm tắt bài viết",
  content: "# Nội dung MDX...",
  status: "published", // "draft", "pending", "published", "private", "password"
  tags: ["tag1", "tag2"],
  category: "category-slug",
  author: {
    uid: "author_id",
    displayName: "Author Name",
    photoURL: "avatar_url"
  },
  createdAt: timestamp,
  updatedAt: timestamp,
  publishedAt: timestamp,
  views: 0,
  readingMinutes: 5
}
```

## 🎨 Customization

### Color Scheme
Hệ thống sử dụng color scheme theo brand:
- Primary: `#fc5d01` (Cam đậm)
- Secondary colors: `#fedac2`, `#fdbc94`, `#ffac7b`, `#fd7f33`

### Tailwind Configuration
```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#fc5d01',
        'primary-light': '#fedac2',
        // ...
      }
    }
  }
}
```

## 📝 Sử Dụng

### Tạo Bài Viết Mới
1. Đăng nhập admin tại `/login`
2. Truy cập `/admin`
3. Click "Tạo bài viết mới"
4. Viết nội dung bằng MDX
5. Chọn status và publish

### MDX Components
```mdx
# Heading 1

## Heading 2

<Callout type="info" title="Thông tin">
Nội dung callout
</Callout>

<CodeBlock language="javascript" title="Example">
console.log('Hello World');
</CodeBlock>

<YouTubeEmbed id="video_id" title="Video Title" />

<ImageGallery 
  images={[
    { src: "/image1.jpg", alt: "Image 1", caption: "Caption 1" },
    { src: "/image2.jpg", alt: "Image 2", caption: "Caption 2" }
  ]}
  columns={2}
/>
```

### Role-Based Access

#### Admin
- Toàn quyền quản lý hệ thống
- Quản lý users và phân quyền
- Cấu hình settings
- Quản lý tất cả content

#### Editor
- Quản lý tất cả posts/pages
- Moderate comments
- Quản lý taxonomies
- Không thể thay đổi user roles

#### Author
- Tạo và quản lý bài viết của mình
- Publish bài viết của mình
- Upload media

#### Contributor
- Tạo draft posts
- Không thể publish
- Upload media hạn chế

#### Subscriber
- Chỉ xem nội dung public

## 🔧 Development

### Project Structure
```
/app
  /blog/                 # Public blog pages
  /admin/               # Admin interface
  /login/               # Authentication
  
/components
  /ui/                  # shadcn/ui components
  
/lib
  /auth/               # Authentication logic
  /mdx/                # MDX configuration
  /services/           # Business logic
  /types/              # TypeScript definitions
  /utils/              # Utility functions

firestore.rules         # Firestore security rules
storage.rules          # Storage security rules
```

### Adding New Features

#### 1. Tạo Service Layer
```typescript
// lib/services/example.ts
export class ExampleService {
  static async getData() {
    // Implementation
  }
}
```

#### 2. Tạo Types
```typescript
// lib/types/example.ts
export interface Example {
  id: string;
  name: string;
}
```

#### 3. Tạo Components
```typescript
// components/example/ExampleComponent.tsx
export function ExampleComponent() {
  // Implementation
}
```

## 🚀 Deployment

### Vercel Deployment
1. Connect repository to Vercel
2. Set environment variables
3. Deploy

### Firebase Setup
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize project
firebase init

# Deploy rules
firebase deploy --only firestore:rules,storage
```

## 🔒 Security

### Firestore Rules
- Public chỉ đọc được published posts
- Role-based write permissions
- User chỉ sửa được profile của mình (trừ roles)
- Admin có toàn quyền

### Storage Rules
- Public assets: Admin only write
- Media uploads: Author+ với size limits
- User avatars: Owner only
- File type restrictions

### Best Practices
- Validate tất cả input với Zod
- Sanitize MDX content
- Rate limiting cho comments
- HTTPS only
- CSP headers

## 📊 Analytics & SEO

### SEO Features
- Dynamic meta tags
- Open Graph support
- Twitter Cards
- JSON-LD structured data
- Sitemap generation
- RSS feeds

### Performance
- Next.js App Router
- Image optimization
- Code splitting
- ISR for static content

## 🐛 Troubleshooting

### Common Issues

#### Firebase Connection
```bash
# Check Firebase config
console.log(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID)
```

#### Permission Denied
1. Check Firestore rules
2. Verify user roles in Firestore
3. Check authentication status

#### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [MDX Documentation](https://mdxjs.com/)
- [shadcn/ui](https://ui.shadcn.com/)

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Make changes
4. Add tests
5. Submit pull request

## 📄 License

MIT License - see LICENSE file for details.

## 📞 Support

Liên hệ: admin@pteintensive.com

---

**PTE Intensive Blog System** - Xây dựng bởi PTE Intensive Team
