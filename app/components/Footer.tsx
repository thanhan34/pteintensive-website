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
    gradient: 'from-blue-500/10 to-blue-600/5',
    border: 'hover:border-blue-400/40',
    numColor: 'text-blue-400',
  },
  {
    num: '02',
    label: 'Cơ sở 2 – TRỤ SỞ',
    address: '2C6 Nguyễn Khuyến, Phường Bình Đức, An Giang',
    flag: '🇻🇳',
    country: 'An Giang',
    gradient: 'from-[#FF4D00]/10 to-[#FF4D00]/5',
    border: 'hover:border-[#FF4D00]/50',
    numColor: 'text-[#FF4D00]',
    isHQ: true,
  },
  {
    num: '03',
    label: 'Cơ sở 3',
    address: 'Số 12 đường 25 KDC Thới Nhựt 1, Tân An, Cần Thơ',
    flag: '🇻🇳',
    country: 'Cần Thơ',
    gradient: 'from-emerald-500/10 to-emerald-600/5',
    border: 'hover:border-emerald-400/40',
    numColor: 'text-emerald-400',
  },
  {
    num: '04',
    label: 'Cơ sở 4',
    address: 'T4 0605A Tầng 6 Khu A, Chung cư Golden, Long Xuyên, An Giang',
    flag: '🇻🇳',
    country: 'An Giang',
    gradient: 'from-violet-500/10 to-violet-600/5',
    border: 'hover:border-violet-400/40',
    numColor: 'text-violet-400',
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
    color: 'from-blue-600/30 to-blue-600/10',
    icon: <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />,
  },
  {
    name: 'Facebook Fanpage',
    url: 'https://www.facebook.com/pteintensive',
    stats: 'Cập nhật hàng ngày',
    color: 'from-[#FF4D00]/30 to-[#FF4D00]/10',
    icon: <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z" />,
  },
  {
    name: 'YouTube Channel',
    url: 'https://www.youtube.com/@andoan.pteintensive',
    stats: 'Video hướng dẫn miễn phí',
    color: 'from-red-600/30 to-red-600/10',
    icon: <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />,
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#FF4D00]/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/8 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">

        {/* ── TOP SECTION: Brand / Links / Contact ─────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative w-14 h-14 flex-shrink-0">
                <Image
                  src="/images/logo/white-logo.png"
                  alt="PTE Intensive Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white leading-tight">PTE Intensive</h2>
                <p className="text-[#FF4D00] text-xs font-medium tracking-widest uppercase">Học là đậu</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Đối tác tin cậy trong hành trình chinh phục PTE Academic. Chúng tôi giúp học viên đạt điểm mục tiêu nhanh nhất thông qua lộ trình cá nhân hóa và giảng viên 79+.
            </p>
            {/* Social icons */}
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Theo dõi chúng tôi</p>
              <div className="flex items-center space-x-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.url}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className={`w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center ${s.color} transition-all duration-300 hover:scale-110 hover:-translate-y-0.5`}
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      {s.icon}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-6">Truy Cập Nhanh</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-gray-400 hover:text-white transition-colors duration-200 text-sm"
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
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-6">Liên Hệ</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 group">
                <div className="w-9 h-9 bg-[#FF4D00]/15 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF4D00]/25 transition-colors">
                  <svg className="w-4 h-4 text-[#FF4D00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-gray-400 text-sm">admin@pteintensive.com</span>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="w-9 h-9 bg-[#FF4D00]/15 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF4D00]/25 transition-colors">
                  <svg className="w-4 h-4 text-[#FF4D00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="text-gray-400 text-sm space-y-1">
                  <p>🇻🇳 +84 349 213 852</p>
                  <p>🇦🇺 +61 450 669 092</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* ── DIVIDER ──────────────────────────────────────────────── */}
        <div className="relative mb-10">
          <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <div className="absolute left-1/2 -translate-x-1/2 -top-3 bg-gray-900 px-4">
            <div className="flex items-center space-x-1.5">
              <svg className="w-4 h-4 text-[#FF4D00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-xs text-gray-400 font-medium tracking-widest uppercase">Hệ Thống Cơ Sở</span>
            </div>
          </div>
        </div>

        {/* ── LOCATIONS GRID ───────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-14">
          {locations.map((loc) => (
            <div
              key={loc.num}
              className={`relative bg-gradient-to-br ${loc.gradient} border border-white/8 ${loc.border} rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30 group overflow-hidden`}
            >
              {/* HQ badge */}
              {loc.isHQ && (
                <span className="absolute top-3 right-3 bg-[#FF4D00] text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider">
                  TRỤ SỞ
                </span>
              )}
              {/* Number */}
              <div className={`text-3xl font-black ${loc.numColor} opacity-20 group-hover:opacity-40 transition-opacity leading-none mb-3`}>
                {loc.num}
              </div>
              {/* Label */}
              <div className="flex items-center space-x-1.5 mb-2">
                <span className="text-base">{loc.flag}</span>
                <span className="text-white text-sm font-semibold">{loc.label}</span>
              </div>
              {/* Address */}
              <p className="text-gray-400 text-xs leading-relaxed group-hover:text-gray-300 transition-colors">
                {loc.address}
              </p>
              {/* Country tag */}
              <div className="mt-3">
                <span className={`inline-block text-[10px] font-medium ${loc.numColor} bg-white/5 rounded-full px-2 py-0.5 border border-white/10`}>
                  {loc.country}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── DIVIDER ──────────────────────────────────────────────── */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

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
              <div className={`bg-gradient-to-br ${platform.color} backdrop-blur-sm px-5 py-4 rounded-2xl border border-white/8 hover:border-white/15 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5`}>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      {platform.icon}
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{platform.name}</h4>
                    <p className="text-xs text-gray-400">{platform.stats}</p>
                  </div>
                </div>
                <div className="flex items-center text-xs text-gray-400 group-hover:text-white transition-colors">
                  <span>Tham gia ngay</span>
                  <svg className="w-3 h-3 ml-1.5 group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* ── BOTTOM BAR ───────────────────────────────────────────── */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} PTE Intensive. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link href="/terms" className="text-gray-500 hover:text-white transition-colors text-xs">
              Điều khoản sử dụng
            </Link>
            <span className="text-gray-700">·</span>
            <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors text-xs">
              Chính sách bảo mật
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
