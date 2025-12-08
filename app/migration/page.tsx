import { Metadata } from 'next';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import MigrationClient from '../components/migration/MigrationClient';

export const metadata: Metadata = {
  title: 'Định Cư & Visa Úc - Hướng dẫn chi tiết từ A-Z | PTE Intensive',
  description: 'Tìm hiểu về các loại visa Úc, ngành nghề dễ định cư, và lộ trình từ PTE đến định cư vĩnh viễn tại Úc.',
  keywords: ['Visa Úc', 'Định cư Úc', 'Visa 485', 'Visa 189', 'Visa 190', 'Visa 491', 'PTE', 'Du học Úc'],
  openGraph: {
    title: 'Định Cư & Visa Úc - Hướng dẫn chi tiết từ A-Z | PTE Intensive',
    description: 'Tìm hiểu về các loại visa Úc, ngành nghề dễ định cư, và lộ trình từ PTE đến định cư vĩnh viễn tại Úc.',
    images: ['/og/pteintensive-blog.png'],
    type: 'website',
  },
};

interface MigrationPostData {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  cover?: string;
}

function getMigrationPosts(category: string): MigrationPostData[] {
  const contentDir = path.join(process.cwd(), 'content', 'migration', category);
  
  if (!fs.existsSync(contentDir)) {
    return [];
  }

  const files = fs.readdirSync(contentDir);
  const posts = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const filePath = path.join(contentDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);
      
      return {
        slug: data.slug || file.replace('.mdx', ''),
        title: data.title || '',
        description: data.description || '',
        date: data.date || '',
        tags: data.tags || [],
        cover: data.cover,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export default function MigrationPage() {
  const visaPosts = getMigrationPosts('visa');
  const jobsPosts = getMigrationPosts('jobs');
  const pathwayPosts = getMigrationPosts('pathway');

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#fc5d01] via-[#fd7f33] to-[#ffac7b] text-white py-20 md:py-28 lg:py-32 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl transform translate-x-1/2 translate-y-1/2 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>
        
        {/* Decorative Circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-32 h-32 border-4 border-white/20 rounded-full"></div>
          <div className="absolute bottom-20 left-10 w-24 h-24 border-4 border-white/20 rounded-full"></div>
          <div className="absolute top-1/3 left-1/4 w-16 h-16 border-4 border-white/10 rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-semibold">Hướng dẫn đầy đủ & cập nhật 2025</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Định Cư & Visa Úc
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto mb-8 leading-relaxed">
              Hướng dẫn chi tiết về các loại visa, ngành nghề dễ định cư và lộ trình từ PTE đến định cư vĩnh viễn tại Úc
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl md:text-4xl font-bold mb-1">10+</div>
                <div className="text-sm md:text-base text-orange-100">Loại Visa</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl md:text-4xl font-bold mb-1">50+</div>
                <div className="text-sm md:text-base text-orange-100">Ngành Nghề</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl md:text-4xl font-bold mb-1">100%</div>
                <div className="text-sm md:text-base text-orange-100">Miễn Phí</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Card 1 */}
          <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#fc5d01]/30">
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#fc5d01] transition-colors">
              Thông Tin Chi Tiết
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Cập nhật đầy đủ các loại visa Úc mới nhất 2025 với điều kiện, thủ tục và lộ trình chi tiết.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#fc5d01]/30">
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#fd7f33] to-[#ffac7b] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#fc5d01] transition-colors">
              Dễ Hiểu & Thực Tế
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Hướng dẫn rõ ràng, dễ theo dõi với kinh nghiệm thực tế từ những người đã thành công.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#fc5d01]/30">
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#ffac7b] to-[#fdbc94] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#fc5d01] transition-colors">
              Cập Nhật Liên Tục
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Thông tin được cập nhật thường xuyên theo chính sách mới nhất của Chính phủ Úc.
            </p>
          </div>
        </div>

        {/* Main Content with Filter, Search and Cards */}
        <MigrationClient
          visaPosts={visaPosts.map(post => ({ ...post, category: 'visa' as const }))}
          jobsPosts={jobsPosts.map(post => ({ ...post, category: 'jobs' as const }))}
          pathwayPosts={pathwayPosts.map(post => ({ ...post, category: 'pathway' as const }))}
        />

        {/* CTA Section */}
        <div className="mt-20 relative bg-gradient-to-br from-[#fc5d01] via-[#fd7f33] to-[#ffac7b] rounded-3xl p-12 md:p-16 text-center text-white overflow-hidden shadow-2xl">
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full filter blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              🎓 Bắt Đầu Hành Trình Định Cư Của Bạn
            </h3>
            <p className="text-lg md:text-xl mb-8 text-orange-100 max-w-2xl mx-auto leading-relaxed">
              Đạt điểm PTE mục tiêu là bước đầu tiên quan trọng cho lộ trình định cư Úc. 
              Hãy bắt đầu ngay hôm nay cùng PTE Intensive!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/register"
                className="inline-flex items-center px-8 py-4 bg-white text-[#fc5d01] rounded-xl font-bold hover:bg-gray-100 transition-all duration-200 hover:scale-105 shadow-lg"
              >
                <span>Đăng Ký Học PTE Ngay</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              
              <Link
                href="/blog"
                className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold hover:bg-white/20 transition-all duration-200 border-2 border-white/30"
              >
                <span>Xem Blog PTE</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
