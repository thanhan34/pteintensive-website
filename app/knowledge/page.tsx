import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kiến Thức PTE | PTE Intensive',
  description: 'Thư viện kiến thức PTE gồm scoring system, speaking, writing, reading và listening guides giúp bot và người dùng dễ tra cứu.',
  alternates: {
    canonical: 'https://pteintensive.com/knowledge',
  },
};

const KnowledgePage = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Kiến Thức PTE</h1>
      <p className="text-gray-600">
        Chọn một mục từ menu bên trái để xem thông tin chi tiết về các phần của bài thi PTE.
      </p>
    </>
  );
};

export default KnowledgePage;
