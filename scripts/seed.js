/**
 * Seed Script for PTE Intensive Blog
 * 
 * This script creates sample data for testing the blog system.
 * Run with: node scripts/seed.js
 * 
 * Make sure to:
 * 1. Set up Firebase project
 * 2. Configure .env.local
 * 3. Create an admin user first
 */

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc, serverTimestamp } = require('firebase/firestore');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');

// Firebase config (same as in .env.local)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Sample data
const samplePosts = [
  {
    id: 'huong-dan-pte-speaking-cho-nguoi-moi-bat-dau',
    title: 'Hướng dẫn PTE Speaking cho người mới bắt đầu',
    slug: 'huong-dan-pte-speaking-cho-nguoi-moi-bat-dau',
    excerpt: 'Tổng hợp các mẹo và chiến lược hiệu quả để đạt điểm cao trong phần Speaking của PTE Academic.',
    content: `# Hướng dẫn PTE Speaking cho người mới bắt đầu

PTE Speaking là một trong những phần quan trọng nhất của bài thi PTE Academic. Trong bài viết này, chúng ta sẽ tìm hiểu các chiến lược và mẹo để đạt điểm cao.

## Các dạng bài trong PTE Speaking

### 1. Read Aloud
- Đọc to và rõ ràng
- Chú ý đến pronunciation và fluency
- Thời gian: 30-40 giây

<Callout type="info" title="Mẹo quan trọng">
Hãy đọc thầm một lần trước khi bắt đầu ghi âm để làm quen với nội dung.
</Callout>

### 2. Repeat Sentence
- Lắng nghe cẩn thận
- Lặp lại chính xác những gì đã nghe
- Không cần hiểu nghĩa, chỉ cần lặp lại

### 3. Describe Image
- Mô tả chi tiết những gì nhìn thấy
- Sử dụng từ vựng đa dạng
- Thời gian: 40 giây

<CodeBlock language="text" title="Template mô tả biểu đồ">
This chart/graph shows...
The main trend is...
We can see that...
In conclusion...
</CodeBlock>

## Chiến lược ôn tập

1. **Luyện tập hàng ngày**: Ít nhất 30 phút mỗi ngày
2. **Ghi âm bản thân**: Để kiểm tra pronunciation
3. **Mở rộng từ vựng**: Học từ vựng theo chủ đề
4. **Luyện tập với đề thi thật**: Sử dụng các đề thi mẫu

<YouTubeEmbed id="dQw4w9WgXcQ" title="PTE Speaking Tips" />

Chúc các bạn học tốt và đạt điểm cao trong kỳ thi PTE!`,
    status: 'published',
    sticky: true,
    tags: ['PTE Speaking', 'Hướng dẫn', 'Mẹo thi'],
    category: 'speaking',
    readingMinutes: 5,
    views: 150,
  },
  {
    id: 'cach-lam-bai-pte-writing-hieu-qua',
    title: 'Cách làm bài PTE Writing hiệu quả',
    slug: 'cach-lam-bai-pte-writing-hieu-qua',
    excerpt: 'Khám phá các phương pháp và template để viết essay và summarize text đạt điểm cao trong PTE Writing.',
    content: `# Cách làm bài PTE Writing hiệu quả

PTE Writing bao gồm hai dạng bài chính: Summarize Written Text và Write Essay. Hãy cùng tìm hiểu cách làm bài hiệu quả.

## Summarize Written Text

### Cấu trúc bài làm
1. **Đọc hiểu bài văn** (2-3 phút)
2. **Xác định ý chính** (1 phút)
3. **Viết summary** (5-7 phút)
4. **Kiểm tra lại** (1-2 phút)

<Callout type="warning" title="Lưu ý quan trọng">
Summary phải là một câu duy nhất, từ 5-75 từ.
</Callout>

### Template cơ bản
\`\`\`
The passage discusses [main topic], highlighting that [key point 1], [key point 2], and [key point 3].
\`\`\`

## Write Essay

### Cấu trúc essay 4 đoạn
1. **Introduction** (50-60 từ)
2. **Body paragraph 1** (70-80 từ)
3. **Body paragraph 2** (70-80 từ)
4. **Conclusion** (40-50 từ)

<ImageGallery 
  images={[
    { src: "/images/pte-writing-structure.jpg", alt: "PTE Writing Structure", caption: "Cấu trúc bài viết PTE" },
    { src: "/images/pte-essay-template.jpg", alt: "Essay Template", caption: "Template viết essay" }
  ]}
  columns={2}
/>

## Mẹo đạt điểm cao

- **Grammar**: Sử dụng cấu trúc câu đa dạng
- **Vocabulary**: Dùng từ vựng academic
- **Spelling**: Kiểm tra chính tả cẩn thận
- **Content**: Trả lời đúng yêu cầu đề bài

Chúc các bạn thành công!`,
    status: 'published',
    tags: ['PTE Writing', 'Essay', 'Summarize'],
    category: 'writing',
    readingMinutes: 4,
    views: 89,
  },
  {
    id: 'kinh-nghiem-thi-pte-lan-dau',
    title: 'Kinh nghiệm thi PTE lần đầu - Từ 45 lên 79',
    slug: 'kinh-nghiem-thi-pte-lan-dau',
    excerpt: 'Chia sẻ kinh nghiệm thực tế từ học viên đã thi PTE và đạt điểm mục tiêu sau 3 tháng học.',
    content: `# Kinh nghiệm thi PTE lần đầu - Từ 45 lên 79

Xin chào các bạn! Mình là Minh, vừa thi PTE lần đầu và may mắn đạt được 79 điểm tổng. Hôm nay mình muốn chia sẻ kinh nghiệm học và thi để các bạn tham khảo.

## Xuất phát điểm

- **Mock test đầu tiên**: 45 điểm
- **Thời gian học**: 3 tháng
- **Kết quả cuối**: 79 điểm (L:85, R:78, S:74, W:81)

## Lộ trình học tập

### Tháng 1: Làm quen với format
- Học các dạng bài
- Làm quen với phần mềm
- Xây dựng foundation

### Tháng 2: Luyện tập chuyên sâu
- Focus vào điểm yếu
- Làm nhiều bài tập
- Tham gia lớp học

### Tháng 3: Ôn tập và thi thử
- Mock test hàng tuần
- Review lỗi sai
- Chuẩn bị tâm lý

<Callout type="success" title="Bí quyết thành công">
Kiên trì luyện tập mỗi ngày, dù chỉ 30 phút cũng tốt hơn không làm gì.
</Callout>

## Những khó khăn gặp phải

1. **Speaking**: Ban đầu rất nervous, nói không fluent
2. **Listening**: Dạng Fill in the blanks khó nhất
3. **Reading**: Thời gian không đủ
4. **Writing**: Grammar còn yếu

## Cách khắc phục

### Speaking
- Luyện tập với mirror
- Ghi âm và nghe lại
- Học thuộc template

### Listening
- Nghe podcast hàng ngày
- Luyện dictation
- Tập trung cao độ

### Reading
- Đọc nhiều bài báo
- Luyện skimming & scanning
- Quản lý thời gian tốt

### Writing
- Học grammar cơ bản
- Thuộc template
- Luyện typing nhanh

## Ngày thi

<CodeBlock language="text" title="Timeline ngày thi">
7:00 - Dậy sớm, ăn sáng nhẹ
8:00 - Review template lần cuối
8:30 - Đến test center
9:00 - Bắt đầu thi
12:00 - Kết thúc
</CodeBlock>

## Kết quả và cảm nhận

Khi nhận được kết quả 79 điểm, mình thực sự rất vui. Đây là thành quả của 3 tháng học tập chăm chỉ.

**Lời khuyên cuối cùng**: Đừng bỏ cuộc, PTE hoàn toàn có thể chinh phục được nếu bạn có phương pháp đúng và kiên trì luyện tập.

Chúc các bạn thành công!`,
    status: 'published',
    tags: ['Kinh nghiệm', 'PTE Tips', 'Success Story'],
    category: 'experience',
    readingMinutes: 6,
    views: 234,
  },
  {
    id: 'pte-listening-strategies',
    title: 'Chiến lược làm bài PTE Listening đạt điểm cao',
    slug: 'pte-listening-strategies',
    excerpt: 'Tổng hợp các chiến lược và mẹo làm bài hiệu quả cho từng dạng bài trong phần PTE Listening.',
    content: `# Chiến lược làm bài PTE Listening đạt điểm cao

PTE Listening là phần thi cuối cùng nhưng không kém phần quan trọng. Với 8 dạng bài khác nhau, bạn cần có chiến lược riêng cho từng dạng.

## Tổng quan về PTE Listening

- **Thời gian**: 45-57 phút
- **Số câu hỏi**: 12-20 câu
- **Dạng bài**: 8 loại khác nhau

## Các dạng bài và chiến lược

### 1. Summarize Spoken Text (SST)

**Cách làm:**
1. Nghe và ghi chú key points
2. Viết summary 50-70 từ
3. Kiểm tra grammar và spelling

<Callout type="info" title="Template SST">
The speaker discusses [topic], mentioning that [point 1], [point 2], and [point 3].
</Callout>

### 2. Multiple Choice (Multiple Answers)

**Chiến lược:**
- Đọc câu hỏi trước khi nghe
- Loại trừ đáp án sai
- Chọn 2-3 đáp án đúng

### 3. Fill in the Blanks

**Mẹo quan trọng:**
- Dự đoán từ loại cần điền
- Chú ý đến grammar
- Viết chính xác spelling

### 4. Highlight Correct Summary

**Cách làm:**
- Đọc nhanh các options
- Nghe và so sánh với từng option
- Chọn summary chính xác nhất

### 5. Multiple Choice (Single Answer)

**Chiến lược:**
- Focus vào main idea
- Loại trừ đáp án không liên quan
- Chọn đáp án best fit

### 6. Select Missing Word

**Mẹo:**
- Chú ý đến context
- Dự đoán từ cuối câu
- Nghe tone của speaker

### 7. Highlight Incorrect Words

**Cách làm:**
- Đọc transcript trước
- Nghe và so sánh
- Click vào từ sai

### 8. Write from Dictation (WFD)

**Quan trọng nhất:**
- Nghe cẩn thận từng từ
- Viết chính xác spelling
- Kiểm tra grammar

<CodeBlock language="text" title="Checklist WFD">
✓ Nghe đầy đủ câu
✓ Viết đúng spelling
✓ Kiểm tra grammar
✓ Capitalize đầu câu
✓ Dấu chấm cuối câu
</CodeBlock>

## Mẹo luyện tập

### Hàng ngày
- Nghe podcast 30 phút
- Luyện dictation
- Làm bài tập listening

### Hàng tuần
- Mock test full listening
- Review lỗi sai
- Cải thiện điểm yếu

### Trước thi
- Làm quen với headphone
- Kiểm tra volume
- Thư giãn tinh thần

## Lỗi thường gặp

1. **Không đọc instructions**: Mất điểm oan
2. **Spelling sai**: Đặc biệt ở WFD
3. **Không manage time**: Bỏ lỡ câu hỏi
4. **Nervous**: Ảnh hưởng concentration

## Kết luận

PTE Listening đòi hỏi sự tập trung cao và luyện tập thường xuyên. Với chiến lược đúng và kiên trì, bạn hoàn toàn có thể đạt điểm mục tiêu.

Chúc các bạn học tốt!`,
    status: 'published',
    tags: ['PTE Listening', 'Strategies', 'Tips'],
    category: 'listening',
    readingMinutes: 7,
    views: 167,
  },
  {
    id: 'draft-post-example',
    title: 'Bài viết nháp - Chuẩn bị cho PTE Reading',
    slug: 'draft-post-example',
    excerpt: 'Đây là một bài viết nháp về PTE Reading, đang trong quá trình hoàn thiện.',
    content: `# Chuẩn bị cho PTE Reading

Đây là bài viết đang trong quá trình viết...

## Các dạng bài Reading

- Multiple Choice
- Re-order Paragraphs
- Fill in the Blanks
- ...

*Nội dung sẽ được cập nhật sớm*`,
    status: 'draft',
    tags: ['PTE Reading', 'Draft'],
    category: 'reading',
    readingMinutes: 2,
    views: 0,
  }
];

const sampleCategories = [
  {
    id: 'speaking',
    type: 'category',
    slug: 'speaking',
    name: 'Speaking',
    description: 'Hướng dẫn và mẹo cho phần Speaking trong PTE',
  },
  {
    id: 'writing',
    type: 'category',
    slug: 'writing',
    name: 'Writing',
    description: 'Chiến lược và template cho PTE Writing',
  },
  {
    id: 'reading',
    type: 'category',
    slug: 'reading',
    name: 'Reading',
    description: 'Kỹ thuật đọc hiểu và làm bài PTE Reading',
  },
  {
    id: 'listening',
    type: 'category',
    slug: 'listening',
    name: 'Listening',
    description: 'Phương pháp luyện nghe và làm bài PTE Listening',
  },
  {
    id: 'experience',
    type: 'category',
    slug: 'experience',
    name: 'Kinh nghiệm',
    description: 'Chia sẻ kinh nghiệm học và thi PTE từ học viên',
  }
];

const sampleSettings = {
  general: {
    siteName: 'PTE Intensive Blog',
    tagline: 'Chia sẻ kinh nghiệm và mẹo học PTE Academic',
    logoUrl: '/images/logo/pte-intensive-logo.png',
    faviconUrl: '/favicon.ico',
    localeDefault: 'vi',
    languages: ['vi', 'en'],
    timezone: 'Asia/Ho_Chi_Minh',
    postsPerPage: 12,
    homepageType: 'latest',
  },
  discussion: {
    commentsEnabled: true,
    closeAfterDays: 30,
    recaptchaSiteKey: '',
    recaptchaSecretKey: '',
  },
  permalinks: {
    patternPost: '/blog/[slug]',
    patternCategory: '/category/[slug]',
    patternTag: '/tag/[slug]',
    patternAuthor: '/author/[slug]',
  },
  seo: {
    defaultTitle: 'PTE Intensive Blog',
    defaultDescription: 'Chia sẻ kinh nghiệm, mẹo học và tin tức về PTE Academic',
    defaultKeywords: ['PTE', 'PTE Academic', 'IELTS', 'English Test', 'Study Tips'],
    socialProfiles: {
      facebook: 'https://facebook.com/pteintensive',
      twitter: 'https://twitter.com/pteintensive',
      youtube: 'https://youtube.com/pteintensive',
    },
  },
};

async function seedData() {
  try {
    console.log('🌱 Starting seed process...');

    // You need to sign in as admin first
    // Replace with your admin credentials
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@pteintensive.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'your-admin-password';

    console.log('🔐 Signing in as admin...');
    // Note: You'll need to create this admin user first
    // await signInWithEmailAndPassword(auth, adminEmail, adminPassword);

    // Seed categories
    console.log('📁 Creating categories...');
    for (const category of sampleCategories) {
      await setDoc(doc(db, 'taxonomies', category.id), {
        ...category,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      console.log(`✅ Created category: ${category.name}`);
    }

    // Seed posts
    console.log('📝 Creating posts...');
    for (const post of samplePosts) {
      await setDoc(doc(db, 'posts', post.id), {
        ...post,
        author: {
          uid: 'admin-uid', // Replace with actual admin UID
          displayName: 'PTE Intensive Admin',
          photoURL: null,
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        publishedAt: post.status === 'published' ? serverTimestamp() : null,
        revision: 1,
        prevSlugs: [],
      });
      console.log(`✅ Created post: ${post.title}`);
    }

    // Seed settings
    console.log('⚙️ Creating settings...');
    for (const [key, value] of Object.entries(sampleSettings)) {
      await setDoc(doc(db, 'settings', key), {
        ...value,
        updatedAt: serverTimestamp(),
      });
      console.log(`✅ Created settings: ${key}`);
    }

    console.log('🎉 Seed completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Go to Firebase Console > Firestore');
    console.log('2. Find your user in the "users" collection');
    console.log('3. Add roles: ["admin"] to your user document');
    console.log('4. Update author.uid in posts to your actual UID');
    console.log('5. Visit /login to sign in');
    console.log('6. Visit /admin to access admin panel');
    console.log('7. Visit /blog to see the public blog');

  } catch (error) {
    console.error('❌ Seed failed:', error);
  }
}

// Run seed if this file is executed directly
if (require.main === module) {
  seedData();
}

module.exports = { seedData };
