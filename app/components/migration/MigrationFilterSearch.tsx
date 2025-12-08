'use client';

import { useState } from 'react';

interface FilterSearchProps {
  onFilterChange: (category: string) => void;
  onSearchChange: (query: string) => void;
  activeFilter: string;
  totalCount: { visa: number; jobs: number; pathway: number; all: number };
}

export default function MigrationFilterSearch({
  onFilterChange,
  onSearchChange,
  activeFilter,
  totalCount
}: FilterSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearchChange(value);
  };

  const filters = [
    { id: 'all', label: 'Tất cả', icon: '🌐', count: totalCount.all },
    { id: 'visa', label: 'Visa', icon: '📋', count: totalCount.visa },
    { id: 'jobs', label: 'Ngành nghề', icon: '💼', count: totalCount.jobs },
    { id: 'pathway', label: 'Lộ trình', icon: '🛤️', count: totalCount.pathway },
  ];

  return (
    <div className="mb-12 space-y-6">
      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Tìm kiếm theo tiêu đề, mô tả, hoặc tags..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full pl-12 pr-4 py-4 text-gray-900 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#fc5d01] focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
        />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery('');
              onSearchChange('');
            }}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-3">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`
              group relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 
              flex items-center space-x-2 shadow-sm hover:shadow-md
              ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] text-white scale-105'
                  : 'bg-white text-gray-700 hover:text-[#fc5d01] border-2 border-gray-200 hover:border-[#fc5d01]/30'
              }
            `}
          >
            <span className="text-lg">{filter.icon}</span>
            <span>{filter.label}</span>
            <span
              className={`
                ml-1 px-2 py-0.5 rounded-full text-xs font-bold
                ${
                  activeFilter === filter.id
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-100 text-gray-600 group-hover:bg-[#fedac2]'
                }
              `}
            >
              {filter.count}
            </span>
            
            {/* Active Indicator */}
            {activeFilter === filter.id && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white rounded-full"></div>
            )}
          </button>
        ))}
      </div>

      {/* Active Search Info */}
      {searchQuery && (
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Đang tìm kiếm: <span className="font-semibold text-[#fc5d01]">&ldquo;{searchQuery}&rdquo;</span>
          </p>
        </div>
      )}
    </div>
  );
}
