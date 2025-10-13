const fs = require('fs');
const path = require('path');

const posts = [
  {
    filename: 'lo-trinh-hoc-pte-mat-goc-50plus.mdx',
    title: 'Lộ trình học PTE cho người mất gốc – Đạt 50+ sau 3 tháng',
    slug: 'lo-trinh-hoc-pte-mat-goc-50plus',
    description: 'Lộ trình học PTE chi tiết từ A-Z dành cho người mất gốc tiếng Anh, giúp bạn tự tin đạt 50+ điểm chỉ sau 3 tháng với phương pháp khoa học.',
    date: '2025-02-05',
    tags: ['PTE', 'Lộ trình học', 'Người mất gốc', 'Học PTE']
  },
  {
    filename: 'hoc-pte-tai-nha.mdx',
    title: 'Cách học PTE hiệu quả tại nhà (kèm tài liệu miễn phí)',
    slug: 'hoc-pte-tai-nha',
    description: 'Hướng dẫn chi tiết cách tự học PTE tại nhà với tài liệu, công cụ và phương pháp hiệu quả giúp tiết kiệm chi phí mà vẫn đạt điểm cao.',
    date: '2025-02-10',
    tags: ['PTE', 'Tự học', 'Học tại nhà', 'Tài liệu PTE']
  },
  {
    filename: 'sai-lam-thuong-gap.mdx',
    title: 'Top 5 sai lầm thường gặp khi luyện thi PTE và cách khắc phục',
    slug: 'sai-lam-thuong-gap',
    description: 'Phân tích 5 sai lầm phổ biến nhất khiến thí sinh PTE mất điểm oan và cách khắc phục hiệu quả để tránh lặp lại.',
    date: '2025-02-15',
    tags: ['PTE', 'Sai lầm', 'Tips', 'Luyện thi PTE']
  },
  {
    filename: 'shadowing-speaking.mdx',
    title: 'Cách luyện Shadowing PTE Speaking giúp tăng điểm nhanh',
    slug: 'shadowing-speaking',
    description: 'Phương pháp shadowing được chứng minh hiệu quả giúp cải thiện Speaking PTE, tăng fluency và pronunciation chỉ sau 4 tuần.',
    date: '2025-02-20',
    tags: ['PTE Speaking', 'Shadowing', 'Phương pháp học', 'PTE']
  },
  {
    filename: 'meo-speaking-79plus.mdx',
    title: 'Mẹo Speaking PTE: Bí quyết đạt 79+ từ giảng viên PTE Intensive',
    slug: 'meo-speaking-79plus',
    description: 'Chia sẻ chiến lược và mẹo Speaking PTE giúp đạt 79+ từ giảng viên có kinh nghiệm, bao gồm template, pronunciation tips và practice methods.',
    date: '2025-02-25',
    tags: ['PTE Speaking', 'Mẹo thi PTE', 'PTE 79+', 'Speaking']
  },
  {
    filename: 'chien-luoc-listening.mdx',
    title: 'Chiến lược Listening PTE: Take Note & WFD hiệu quả',
    slug: 'chien-luoc-listening',
    description: 'Hướng dẫn chi tiết chiến lược Listening PTE, kỹ thuật ghi chú nhanh và cách làm Write From Dictation đạt điểm tối đa.',
    date: '2025-03-01',
    tags: ['PTE Listening', 'WFD', 'Chiến lược', 'PTE']
  },
  {
    filename: 'reading-rwfib-rfib.mdx',
    title: 'Reading PTE: Cách làm đúng nhanh RWFIB & RFIB',
    slug: 'reading-rwfib-rfib',
    description: 'Chiến lược làm bài Reading Fill in the Blanks hiệu quả, tips chọn đáp án đúng và tránh mất điểm oan trong phần Reading PTE.',
    date: '2025-03-05',
    tags: ['PTE Reading', 'RWFIB', 'RFIB', 'PTE']
  },
  {
    filename: 'writing-template-swt-essay.mdx',
    title: 'Writing PTE: Template Essay và Summarize Written Text (SWT)',
    slug: 'writing-template-swt-essay',
    description: 'Template chuẩn cho Essay và SWT trong PTE Writing, hướng dẫn áp dụng linh hoạt để đạt điểm cao mà không bị phạt do overuse.',
    date: '2025-03-10',
    tags: ['PTE Writing', 'Template', 'Essay', 'SWT']
  },
  {
    filename: 'thay-doi-pte-2025.mdx',
    title: 'Cập nhật thay đổi bài thi PTE từ tháng 8/2025',
    slug: 'thay-doi-pte-2025',
    description: 'Thông tin chính thức về các thay đổi trong format bài thi PTE Academic từ tháng 8/2025 và cách chuẩn bị phù hợp.',
    date: '2025-03-15',
    tags: ['PTE', 'Tin tức', 'Thay đổi 2025', 'Cập nhật']
  },
  {
    filename: 'pte-core-vs-academic.mdx',
    title: 'Thông báo chính thức: PTE Core và PTE Academic khác gì nhau?',
    slug: 'pte-core-vs-academic',
    description: 'So sánh chi tiết PTE Core và PTE Academic, mục đích sử dụng, format và điểm khác biệt để chọn kỳ thi phù hợp.',
    date: '2025-03-20',
    tags: ['PTE Core', 'PTE Academic', 'So sánh', 'PTE']
  },
  {
    filename: 'huong-dan-dang-ky-thi-pte.mdx',
    title: 'Hướng dẫn đăng ký thi PTE tại Việt Nam và Úc (2025)',
    slug: 'huong-dan-dang-ky-thi-pte',
    description: 'Hướng dẫn từng bước đăng ký thi PTE Academic tại Việt Nam và Úc, chi phí, lịch thi và những lưu ý quan trọng.',
    date: '2025-03-25',
    tags: ['PTE', 'Đăng ký thi', 'Hướng dẫn', 'Lịch thi']
  },
  {
    filename: 'hoc-vien-ngoc-lien.mdx',
    title: 'Học viên Ngọc Liên: Từ PTE 47 lên 65 sau 1-1 với PTE Intensive',
    slug: 'hoc-vien-ngoc-lien',
    description: 'Câu chuyện truyền cảm hứng của học viên Ngọc Liên, từ điểm 47 thất vọng đến 65 chỉ sau 2 tháng học 1-1 với PTE Intensive.',
    date: '2025-04-01',
    tags: ['Học viên', 'Success Story', 'PTE Intensive', 'Động lực']
  },
  {
    filename: 'hoc-vien-79plus.mdx',
    title: 'Học viên đạt PTE 79+ – Bí quyết giữ vững tâm lý khi thi',
    slug: 'hoc-vien-79plus',
    description: 'Phỏng vấn học viên đạt 79+ chia sẻ về lộ trình học, chiến lược thi và đặc biệt là cách quản lý tâm lý trong ngày thi.',
    date: '2025-04-05',
    tags: ['Học viên', 'PTE 79+', 'Tâm lý thi', 'Success Story']
  },
  {
    filename: 'tong-hop-ket-qua-10-2025.mdx',
    title: 'Tổng hợp kết quả học viên PTE Intensive tháng 10/2025',
    slug: 'tong-hop-ket-qua-10-2025',
    description: 'Báo cáo chi tiết kết quả học viên PTE Intensive tháng 10/2025, tỷ lệ đậu cao và những câu chuyện thành công đáng tự hào.',
    date: '2025-04-10',
    tags: ['Kết quả', 'Học viên', 'PTE Intensive', 'Thống kê']
  },
  {
    filename: 'ai-cham-diem-pte.mdx',
    title: 'Cách Pearson chấm điểm AI trong PTE – Giải thích chi tiết',
    slug: 'ai-cham-diem-pte',
    description: 'Phân tích sâu về hệ thống AI chấm điểm của Pearson trong PTE Academic, cách thức hoạt động và ý nghĩa với thí sinh.',
    date: '2025-04-15',
    tags: ['PTE', 'AI Scoring', 'Pearson', 'Chuyên sâu']
  },
  {
    filename: 'pte-intensive-trung-tam-hang-dau.mdx',
    title: 'PTE Intensive – Trung tâm luyện thi PTE hàng đầu tại Việt Nam & Úc',
    slug: 'pte-intensive-trung-tam-hang-dau',
    description: 'Giới thiệu về PTE Intensive, phương pháp giảng dạy độc quyền, đội ngũ giảng viên chất lượng và cam kết đầu ra vượt trội.',
    date: '2025-04-20',
    tags: ['PTE Intensive', 'Trung tâm PTE', 'Giới thiệu', 'Học PTE']
  }
];

const postsDir = path.join(__dirname, '..', 'content', 'posts');

// Create directory if it doesn't exist
if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true });
}

posts.forEach(post => {
  const content = `---
title: "${post.title}"
slug: "${post.slug}"
description: "${post.description}"
date: "${post.date}"
author: "PTE Intensive"
tags: ${JSON.stringify(post.tags)}
cover: "/og/pteintensive-blog.png"
published: true
---

## Giới thiệu

${post.description}

## Nội dung chính

[Content placeholder - This post needs to be completed with detailed content]

## Kết luận

Với những chia sẻ trên, hy vọng bạn đã có thêm kiến thức hữu ích về PTE Academic. Hãy áp dụng những chiến lược và phương pháp phù hợp để đạt mục tiêu điểm số của mình.

👉 [Đăng ký học thử ngay](https://pteintensive.com/trialclass) để trải nghiệm phương pháp học hiệu quả

🎧 [Làm Mock Test miễn phí](https://pteintensive.com/mocktest) để đánh giá trình độ hiện tại

**PTE Intensive – Học là đậu!**
`;

  const filePath = path.join(postsDir, post.filename);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Created: ${post.filename}`);
});

console.log(`\n✓ Generated ${posts.length} blog posts successfully!`);
