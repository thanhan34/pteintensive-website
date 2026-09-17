"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Menu, X } from 'lucide-react';

const menuItems = [
  { href: '/', label: 'Trang chủ' },
  { href: '/courses', label: 'Khóa học' },
  { href: '/study', label: 'Lộ trình' },
  { href: '/about', label: 'Về chúng tôi' },
  { href: '/blog', label: 'Tin tức' },
  { href: '/contact', label: 'Liên hệ' },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <nav
      aria-label="Điều hướng chính"
      className={`fixed z-50 transition-all duration-300 ${
        isHome
          ? 'left-4 right-4 top-4 rounded-2xl border border-white/15 bg-[#050b10]/75 text-white shadow-[0_16px_45px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:left-6 sm:right-6 lg:left-1/2 lg:right-auto lg:w-[min(1320px,calc(100vw-64px))] lg:-translate-x-1/2'
          : 'left-0 right-0 top-0 bg-white text-gray-800 shadow-md'
      }`}
    >
      <div className={`mx-auto px-4 sm:px-6 ${isHome ? 'max-w-[1320px]' : 'max-w-7xl'}`}>
        <div className={`flex items-center justify-between ${isHome ? 'h-[76px]' : 'h-24'}`}>
          <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="PTE Intensive - Trang chủ">
            <div className={`relative shrink-0 ${isHome ? 'h-12 w-12' : 'h-16 w-16'}`}>
              <Image src="/images/logo/white-logo.png" alt="" fill sizes="64px" className="object-contain" priority />
            </div>
            <span className={`hidden text-[15px] font-extrabold uppercase tracking-[0.08em] sm:block ${isHome ? 'text-[#ff8350]' : 'text-[#fc5d01]'}`}>
              PTE Intensive
            </span>
          </Link>

          <div className="hidden items-center gap-6 lg:flex xl:gap-8">
            {menuItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative py-3 text-sm font-semibold transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:rounded-full after:bg-[#fc5d01] after:transition-transform ${
                    active
                      ? `${isHome ? 'text-[#ff9060]' : 'text-[#fc5d01]'} after:scale-x-100`
                      : `${isHome ? 'text-white/75 hover:text-white' : 'text-gray-600 hover:text-[#fc5d01]'} after:scale-x-0 hover:after:scale-x-100`
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <Link href="/register" className="hidden min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-[#ff4d00] to-[#ff7417] px-6 text-sm font-extrabold uppercase tracking-wide text-white shadow-[0_8px_24px_rgba(252,93,1,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(252,93,1,0.45)] sm:flex">
            Đăng ký tư vấn
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          <button
            type="button"
            className={`rounded-xl p-2.5 lg:hidden ${isHome ? 'border border-white/15 bg-white/5 text-white' : 'text-gray-700'}`}
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? 'Đóng menu' : 'Mở menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className={`border-t pb-5 pt-3 lg:hidden ${isHome ? 'border-white/10' : 'border-gray-100'}`}>
            <div className="grid gap-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    pathname === item.href
                      ? 'bg-[#fc5d01]/15 text-[#ff7433]'
                      : isHome
                        ? 'text-white/75 hover:bg-white/5 hover:text-white'
                        : 'text-gray-700 hover:bg-orange-50 hover:text-[#fc5d01]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/register" onClick={() => setIsMenuOpen(false)} className="mt-2 rounded-xl bg-[#fc5d01] px-4 py-3 text-center text-sm font-bold text-white sm:hidden">Đăng ký tư vấn</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}