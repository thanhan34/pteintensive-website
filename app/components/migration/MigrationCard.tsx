'use client';

import Link from 'next/link';

interface MigrationCardProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags?: string[];
  cover?: string;
  index: number;
  category: 'visa' | 'jobs' | 'pathway';
}

const categoryConfig = {
  visa: {
    gradient: 'from-[#fc5d01] via-[#fd7f33] to-[#ffac7b]',
    icon: (
      <svg className="w-20 h-20 text-white opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  jobs: {
    gradient: 'from-[#fdbc94] via-[#ffac7b] to-[#fc5d01]',
    icon: (
      <svg className="w-16 h-16 text-white opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  pathway: {
    gradient: 'from-[#ffac7b] via-[#fd7f33] to-[#fdbc94]',
    icon: (
      <svg className="w-16 h-16 text-white opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    )
  }
};

export default function MigrationCard({
  slug,
  title,
  description,
  date,
  tags = [],
  cover,
  index,
  category
}: MigrationCardProps) {
  const config = categoryConfig[category];

  return (
    <article
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#fc5d01]/30 hover:-translate-y-2"
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
      }}
    >
      <Link href={`/migration/${slug}`} className="block">
        {/* Cover Image / Gradient */}
        <div className={`relative aspect-video overflow-hidden bg-gradient-to-br ${config.gradient}`}>
          {cover ? (
            <>
              <img 
                src={cover} 
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </>
          ) : (
            <>
              <div className="absolute inset-0 flex items-center justify-center">
                {config.icon}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </>
          )}
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-[#fc5d01] shadow-lg">
            {category === 'visa' && '📋 Visa'}
            {category === 'jobs' && '💼 Nghề nghiệp'}
            {category === 'pathway' && '🛤️ Lộ trình'}
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6">
          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[#fedac2] to-[#fdbc94] text-gray-800 border border-[#fdbc94]"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 2 && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  +{tags.length - 2}
                </span>
              )}
            </div>
          )}

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#fc5d01] transition-colors duration-200">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
            {description}
          </p>

          {/* Meta Footer */}
          <div className="flex items-center justify-between text-sm pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-2 text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{new Date(date).toLocaleDateString('vi-VN')}</span>
            </div>

            <div className="flex items-center text-[#fc5d01] font-medium group-hover:translate-x-1 transition-transform duration-200">
              Đọc thêm
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
