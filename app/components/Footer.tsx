'use client';

import Link from 'next/link';
import Image from 'next/image';

const locations = [
  {
    num: '01',
    label: 'Cơ sở 1',
    address: '48 Derwent Place, Riverhills 4074, QLD, Australia',
    flag: '🇦🇺',
    country: 'Australia',
    border: 'hover:border-[#fc5d01]/60',
    numColor: 'text-[#e45500]',
  },
  {
    num: '02',
    label: 'Cơ sở 2 – TRỤ SỞ',
    address: '2C6 Nguyễn Khuyến, Phường Bình Đức, An Giang',
    flag: '🇻🇳',
    country: 'An Giang',
    border: 'hover:border-[#fc5d01]',
    numColor: 'text-[#e45500]',
    isHQ: true,
  },
  {
    num: '03',
    label: 'Cơ sở 3',
    address: 'Số 12 đường 25 KDC Thới Nhựt 1, Tân An, Cần Thơ',
    flag: '🇻🇳',
    country: 'Cần Thơ',
    border: 'hover:border-[#fc5d01]/60',
    numColor: 'text-[#e45500]',
  },
  {
    num: '04',
    label: 'Cơ sở 4',
    address: 'T4 0605A Tầng 6 Khu A, Chung cư Golden, Long Xuyên, An Giang',
    flag: '🇻🇳',
    country: 'An Giang',
    border: 'hover:border-[#fc5d01]/60',
    numColor: 'text-[#e45500]',
  },
];

const quickLinks = [
  { href: '/', label: 'Trang Chủ' },
  { href: '/about', label: 'Về Chúng Tôi' },
  { href: '/knowledge/scoring-system', label: 'Kiến Thức' },
  { href: '/contact', label: 'Liên Lạc' },
  { href: '/register', label: 'Đăng Ký' },
];

const socialLinks = [
  {
    url: 'https://www.facebook.com/groups/pteintensive',
    label: 'Facebook Group',
    color: 'hover:bg-blue-600',
    icon: <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />,
  },
  {
    url: 'https://www.facebook.com/pteintensive',
    label: 'Facebook Fanpage',
    color: 'hover:bg-[#FF4D00]',
    icon: <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z" />,
  },
  {
    url: 'https://www.youtube.com/@andoan.pteintensive',
    label: 'YouTube',
    color: 'hover:bg-red-600',
    icon: <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />,
  },
];

const communityPlatforms = [
  {
    name: 'Facebook Group',
    url: 'https://www.facebook.com/groups/pteintensive',
    stats: '10,000+ thành viên',
    iconColor: 'bg-blue-600 text-white',
    icon: <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />,
  },
  {
    name: 'Facebook Fanpage',
    url: 'https://www.facebook.com/pteintensive',
    stats: 'Cập nhật hàng ngày',
    iconColor: 'bg-[#fc5d01] text-white',
    icon: <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z" />,
  },
  {
    name: 'YouTube Channel',
    url: 'https://www.youtube.com/@andoan.pteintensive',
    stats: 'Video hướng dẫn miễn phí',
    iconColor: 'bg-red-600 text-white',
    icon: <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />,
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#f2dfd2] bg-gradient-to-b from-[#fffdfa] via-white to-[#fff9f4] text-gray-800">
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[30rem] h-[30rem] bg-[#fc5d01]/[0.07] rounded-full blur-[130px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-[#fedac2]/30 rounded-full blur-[130px] translate-x-1/3 translate-y-1/3" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #fc5d01 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">

        {/* ── CTA BANNER ────────────────────────────────────────────── */}
        <div className="relative mb-16 overflow-hidden rounded-[2rem] border border-[#f0ded2] bg-white/95 px-6 py-9 shadow-[0_28px_80px_rgba(91,55,31,0.09)] sm:px-10 lg:flex lg:items-center lg:justify-between lg:px-12 lg:py-12">
          <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-[#ff9b61] via-[#fc5d01] to-[#dc4d00]" />
          <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full border-[38px] border-[#fc5d01]/[0.06]" />
          <div className="absolute bottom-0 right-1/3 h-24 w-24 translate-y-1/2 rounded-full bg-[#fedac2]/30" />
          <div className="relative max-w-2xl">
            <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-[#d94e00]">
              <span className="h-px w-7 bg-[#fc5d01]" />
              Bắt đầu cùng PTE Intensive
            </span>
            <h2 className="max-w-xl font-[family-name:var(--font-noto-serif)] text-3xl font-semibold leading-tight tracking-[-0.025em] text-[#211a16] sm:text-4xl">Sẵn sàng chinh phục điểm PTE mục tiêu?</h2>
            <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
              Nhận tư vấn lộ trình cá nhân hóa và bắt đầu hành trình của bạn ngay hôm nay.
            </p>
          </div>
          <Link
            href="/register"
            className="relative mt-7 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#ed5700] px-7 py-3 text-sm font-bold text-white shadow-[0_14px_30px_rgba(252,93,1,0.24)] transition hover:-translate-y-0.5 hover:bg-[#d94e00] hover:shadow-[0_18px_36px_rgba(252,93,1,0.3)] lg:mt-0"
          >
            Đăng ký tư vấn
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </Link>
        </div>

        {/* ── TOP SECTION: Brand / Links / Contact ─────────────────── */}
        <div className="grid grid-cols-1 gap-10 border-b border-[#f0e3db] pb-14 lg:grid-cols-12 lg:gap-0">

          {/* Brand */}
          <div className="space-y-6 lg:col-span-6 lg:pr-16">
            <div className="flex items-center space-x-3">
              <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-[0_10px_30px_rgba(91,55,31,0.08)]">
                <Image
                  src="/images/logo/white-logo.png"
                  alt="PTE Intensive Logo"
                  fill
                  sizes="56px"
                  className="object-contain p-1"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#211a16] leading-tight">PTE Intensive</h2>
                <p className="text-[#d94e00] text-xs font-semibold tracking-[0.22em] uppercase">Học là đậu</p>
              </div>
            </div>
            <p className="max-w-lg text-gray-500 text-sm leading-7">
              Đối tác tin cậy trong hành trình chinh phục PTE Academic. Chúng tôi giúp học viên đạt điểm mục tiêu nhanh nhất thông qua lộ trình cá nhân hóa và giảng viên 79+.
            </p>
            {/* Social icons */}
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">Theo dõi chúng tôi</p>
              <div className="flex items-center space-x-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.url}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className={`group w-10 h-10 bg-white border border-[#eee1d9] text-[#d94e00] rounded-full flex items-center justify-center ${s.color} shadow-sm transition-all duration-300 hover:-translate-y-1 hover:text-white hover:border-transparent`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      {s.icon}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="border-[#f0e3db] lg:col-span-2 lg:border-l lg:px-8">
            <h3 className="text-[11px] font-bold text-[#211a16] uppercase tracking-[0.22em] mb-6">Truy cập nhanh</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-gray-500 hover:text-[#d94e00] transition-colors duration-200 text-sm"
                  >
                    <span className="w-0 group-hover:w-4 overflow-hidden transition-all duration-300 mr-0 group-hover:mr-2">
                      <svg className="w-3 h-3 text-[#FF4D00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="border-[#f0e3db] lg:col-span-4 lg:border-l lg:pl-8">
            <h3 className="text-[11px] font-bold text-[#211a16] uppercase tracking-[0.22em] mb-6">Liên hệ</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 group">
                <div className="w-10 h-10 border border-orange-100 bg-orange-50 text-[#d94e00] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#ed5700] group-hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-gray-600 text-sm">admin@pteintensive.com</span>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="w-10 h-10 border border-orange-100 bg-orange-50 text-[#d94e00] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#ed5700] group-hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="text-gray-600 text-sm space-y-1">
                  <p>🇻🇳 +84 349 213 852</p>
                  <p>🇦🇺 +61 450 669 092</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* ── DIVIDER ──────────────────────────────────────────────── */}
        <div className="relative mb-7 mt-14 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#d94e00]">PTE Intensive gần bạn</p>
            <div className="flex items-center space-x-1.5">
              <svg className="w-4 h-4 text-[#fc5d01]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-[family-name:var(--font-noto-serif)] text-2xl font-semibold tracking-tight text-[#211a16]">Hệ thống cơ sở</span>
            </div>
          </div>
          <span className="hidden text-sm text-gray-500 sm:block">4 cơ sở tại Việt Nam & Australia</span>
        </div>

        {/* ── LOCATIONS GRID ───────────────────────────────────────── */}
        <div className="grid grid-cols-1 overflow-hidden rounded-[1.5rem] border border-[#eee1d9] bg-white/90 shadow-[0_20px_60px_rgba(91,55,31,0.07)] sm:grid-cols-2 xl:grid-cols-4 mb-16">
          {locations.map((loc) => (
            <div
              key={loc.num}
              className={`relative border-b border-[#f0e3db] p-6 transition-all duration-300 hover:bg-[#fff8f3] sm:border-r xl:border-b-0 ${loc.border} group overflow-hidden`}
            >
              {/* HQ badge */}
              {loc.isHQ && (
                <span className="absolute top-5 right-5 bg-[#ed5700] text-white text-[9px] font-bold px-2.5 py-1 rounded-full tracking-wider shadow-sm">
                  TRỤ SỞ
                </span>
              )}
              {/* Number */}
              <div className={`flex h-9 w-9 items-center justify-center rounded-full border border-orange-100 bg-[#fff8f3] text-xs font-black ${loc.numColor} group-hover:bg-[#ed5700] group-hover:text-white transition-colors mb-5`}>
                {loc.num}
              </div>
              {/* Label */}
              <div className="flex items-center space-x-1.5 mb-2">
                <span className="text-base">{loc.flag}</span>
                <span className="text-[#211a16] text-sm font-bold">{loc.label}</span>
              </div>
              {/* Address */}
              <p className="min-h-12 text-gray-500 text-xs leading-6 group-hover:text-gray-700 transition-colors">
                {loc.address}
              </p>
              {/* Country tag */}
              <div className="mt-3">
                <span className={`inline-block text-[10px] font-semibold uppercase tracking-wider ${loc.numColor}`}>
                  {loc.country}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── DIVIDER ──────────────────────────────────────────────── */}
        <div className="mb-7">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#d94e00]">Cộng đồng học PTE</p>
          <h3 className="font-[family-name:var(--font-noto-serif)] text-2xl font-semibold tracking-tight text-[#211a16]">Kết nối cùng chúng tôi</h3>
        </div>

        {/* ── COMMUNITY SECTION ────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
          {communityPlatforms.map((platform) => (
            <a
              key={platform.url}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="flex items-center gap-3 rounded-2xl border border-[#eee1d9] bg-white/90 px-4 py-4 shadow-[0_10px_30px_rgba(91,55,31,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#fc5d01]/30 hover:shadow-[0_16px_38px_rgba(91,55,31,0.09)]">
                <div className="flex min-w-0 flex-1 items-center space-x-3">
                  <div className={`w-10 h-10 ${platform.iconColor} rounded-full shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      {platform.icon}
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900">{platform.name}</h4>
                    <p className="truncate text-xs text-gray-500">{platform.stats}</p>
                  </div>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-orange-100 text-[#d94e00] transition-colors group-hover:bg-orange-50">
                  <span className="sr-only">Tham gia ngay</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* ── BOTTOM BAR ───────────────────────────────────────────── */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#e9d9cf] to-transparent mb-8" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-1 py-2">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} PTE Intensive. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link href="/terms" className="text-gray-500 hover:text-[#e45500] transition-colors text-xs">
              Điều khoản sử dụng
            </Link>
            <span className="text-orange-200">·</span>
            <Link href="/privacy" className="text-gray-500 hover:text-[#e45500] transition-colors text-xs">
              Chính sách bảo mật
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
