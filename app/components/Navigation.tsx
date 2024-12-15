"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { href: '/', label: 'Trang Chủ' },
    { href: '/about', label: 'Về Chúng Tôi' },
    { href: '/courses', label: 'Khóa Học' },
    { href: '/reviews', label: 'Đánh Giá' },
    { href: '/contact', label: 'Liên Hệ' }
  ];

  useEffect(() => {
    // Close menu when route changes
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-36">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="relative w-40 h-32">
              <Image
                src="/images/logo/white-logo.png"
                alt="PTE Intensive Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-gray-600 hover:text-[#FF4D00] transition-colors ${
                  pathname === item.href ? 'text-[#FF4D00] font-medium' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/register"
              className="px-6 py-2 bg-[#FF4D00] text-white rounded-lg hover:bg-[#ff6a2a] transition-colors"
            >
              Đăng Ký Ngay
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden ${
            isMenuOpen ? 'block' : 'hidden'
          } pb-4`}
        >
          <div className="flex flex-col space-y-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-gray-600 hover:text-[#FF4D00] transition-colors ${
                  pathname === item.href ? 'text-[#FF4D00] font-medium' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/register"
              className="px-6 py-2 bg-[#FF4D00] text-white rounded-lg hover:bg-[#ff6a2a] transition-colors text-center"
            >
              Đăng Ký Ngay
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
