"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Menu, ShoppingCart, X } from 'lucide-react';
import { UserButton, SignInButton, useAuth } from '@clerk/nextjs';
import { usePlacementSession } from '@/components/billing/PlacementSession';

const menuItems = [
  { href: '/', label: 'Trang chủ' },
  { href: '/about', label: 'Về chúng tôi' },
  { href: '/courses', label: 'Khóa học & Học phí' },
  { href: '/study', label: 'Lộ trình' },
  { href: '/guarantee', label: 'Cam kết' },
  { href: '/knowledge', label: 'Kiến thức' },
  { href: '/migration', label: 'Visa Úc' },
  { href: '/reviews', label: 'Đánh giá' },
  { href: '/blog', label: 'Tin tức' },
  { href: '/contact', label: 'Liên hệ' },
];

export default function Navigation() {
  const { guidanceStep, openGuidedCart, cart } = usePlacementSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = cart.length;
  const { isSignedIn, isLoaded } = useAuth();
  const pathname = usePathname();
  const isHome = pathname === '/';
  const guideCart = pathname === '/courses' && guidanceStep === 'cart' && cartCount > 0;
  const isActive = (href: string) => href === '/' ? isHome : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav
      aria-label="Điều hướng chính"
      className={`${isHome ? 'home-mobile-header' : ''} fixed z-50 transition-all duration-300 ${
        isHome
          ? 'left-4 right-4 top-4 rounded-2xl border border-white/15 bg-[#050b10]/75 text-white shadow-[0_16px_45px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:left-6 sm:right-6 lg:left-1/2 lg:right-auto lg:w-[min(1320px,calc(100vw-64px))] lg:-translate-x-1/2'
          : 'left-0 right-0 top-0 bg-white text-gray-800 shadow-md'
      }`}
    >
      <div className={`mx-auto px-4 sm:px-6 ${isHome ? 'max-w-[1320px]' : 'max-w-[1440px]'}`}>
        <div className={`flex items-center justify-between ${isHome ? 'h-[76px]' : 'h-24'}`}>
          <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="PTE Intensive - Trang chủ">
            <div className={`relative shrink-0 ${isHome ? 'h-12 w-12' : 'h-16 w-16'}`}>
              <Image src="/images/logo/white-logo.png" alt="" fill sizes="64px" className="object-contain" priority />
            </div>
            <span className={`${isHome ? 'home-brand' : ''} hidden text-[15px] font-extrabold uppercase tracking-[0.08em] sm:block ${isHome ? 'text-[#ff8350]' : 'text-[#fc5d01]'}`}>
              PTE Intensive
              {isHome && <span className="mt-1 block text-[8px] font-medium tracking-[.06em] text-slate-300 sm:hidden">MORE SKILLS · A BRIGHTER YOU</span>}
            </span>
          </Link>

          <div className="hidden items-center gap-3 xl:flex">
            {menuItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative whitespace-nowrap py-3 text-[13px] font-semibold transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:rounded-full after:bg-[#fc5d01] after:transition-transform ${
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

          <div className="flex items-center gap-3">
          {isLoaded && (isSignedIn ? <div className="flex min-h-11 min-w-11 items-center justify-center"><UserButton /></div> : <SignInButton mode="modal"><button className="billing-link min-h-11 rounded-lg px-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">Đăng nhập</button></SignInButton>)}
          <Link href="/cart" data-guidance={guideCart} aria-describedby={guideCart ? 'course-guide-cart-hint' : undefined} onClick={() => { setIsMenuOpen(false); openGuidedCart(); }} aria-label={`Giỏ hàng, ${cartCount} khoản đã chọn`} aria-current={pathname === '/cart' ? 'page' : undefined} className={`relative inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full border transition hover:-translate-y-0.5 active:translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#fc5d01] ${isHome ? 'border-white/20 text-white hover:bg-white/10' : 'border-orange-200 text-[#9a3412] hover:bg-orange-50'} ${pathname === '/cart' ? 'bg-orange-100' : ''}`}><ShoppingCart className="h-5 w-5" aria-hidden="true" /><span aria-hidden="true" className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#fc5d01] px-1 text-xs font-bold text-white">{cartCount}</span>{guideCart && <span id="course-guide-cart-hint" className="course-guide-cart-hint">Tiếp theo: mở giỏ hàng <ArrowRight className="inline h-3 w-3" aria-hidden="true" /></span>}</Link>
          <Link href="/register" className="home-focus hidden min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-[#ff4d00] to-[#ff7417] px-6 text-sm font-extrabold uppercase tracking-wide text-white shadow-[0_8px_24px_rgba(252,93,1,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(252,93,1,0.45)] active:translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none sm:flex">
            Đăng ký tư vấn
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          <button
            type="button"
            className={`rounded-xl p-2.5 xl:hidden ${isHome ? 'border border-white/15 bg-white/5 text-white' : 'text-gray-700'}`}
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? 'Đóng menu' : 'Mở menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className={`border-t pb-5 pt-3 xl:hidden ${isHome ? 'border-white/10' : 'border-gray-100'}`}>
            <div className="grid max-h-[calc(100vh-8rem)] gap-1 overflow-y-auto">
              {menuItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setIsMenuOpen(false)}
                    className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      active
                        ? 'bg-[#fc5d01]/15 text-[#ff7433]'
                        : isHome
                          ? 'text-white/75 hover:bg-white/5 hover:text-white'
                          : 'text-gray-700 hover:bg-orange-50 hover:text-[#fc5d01]'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link href="/register" onClick={() => setIsMenuOpen(false)} className="home-focus mt-2 rounded-xl bg-[#fc5d01] px-4 py-3 text-center text-sm font-bold text-white sm:hidden">Đăng ký tư vấn</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}