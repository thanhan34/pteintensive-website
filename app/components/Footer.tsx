'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-[#FF4D00]/20 to-transparent rounded-full blur-3xl"/>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-[#FF4D00]/10 to-transparent rounded-full blur-3xl"/>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}/>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 pt-20 pb-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-20">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16">
                <Image
                  src="/images/logo/white-logo.png"
                  alt="PTE Intensive Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h2 className="text-2xl font-bold text-white">PTE Intensive</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              Đối tác tin cậy của bạn trong hành trình chinh phục PTE Academic. Chúng tôi giúp học viên đạt được điểm số mong muốn thông qua đào tạo chuyên sâu và hướng dẫn cá nhân hóa.
            </p>
            <div className="flex items-center space-x-6">
              <span className="text-[#FF4D00] font-semibold">Theo dõi chúng tôi:</span>
              <div className="flex space-x-4">
                {[
                  {
                    url: "https://www.facebook.com/groups/pteintensive",
                    color: "hover:bg-blue-600",
                    icon: (
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
                    )
                  },
                  {
                    url: "https://www.facebook.com/pteintensive",
                    color: "hover:bg-[#FF4D00]",
                    icon: (
                      <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/>
                    )
                  },
                  {
                    url: "https://www.youtube.com/@pteintensive",
                    color: "hover:bg-red-600",
                    icon: (
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    )
                  }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center ${social.color} transition-all duration-300 hover:scale-110`}
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      {social.icon}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Truy Cập Nhanh</h3>
            <ul className="grid grid-cols-1 gap-4">
              {[
                { href: "/", label: "Trang Chủ" },
                { href: "/about", label: "Về Chúng Tôi" },
                { href: "/study", label: "Du Học và Định Cư" },
                { href: "/contact", label: "Liên Lạc" }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="group flex items-center text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    <span className="w-2 h-2 bg-[#FF4D00] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all duration-300"/>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Liên Hệ</h3>
            <ul className="space-y-4">
              <li>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#FF4D00]/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#FF4D00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <span className="text-gray-300">admin@pteintensive.com</span>
                </div>
              </li>
              <li>
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-[#FF4D00]/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#FF4D00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div className="text-gray-300">
                    <p>Vietnam: 0349213852</p>
                    <p>Australia: 0450669092</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-[#FF4D00]/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#FF4D00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <span className="text-gray-300">123 Nguyễn Văn Linh, Đà Nẵng</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Community Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[
            {
              name: "Facebook Group",
              url: "https://www.facebook.com/groups/pteintensive",
              stats: "10,000+ thành viên",
              color: "from-blue-600/30 to-blue-600/10",
              icon: (
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
              )
            },
            {
              name: "Facebook Fanpage",
              url: "https://www.facebook.com/pteintensive",
              stats: "Cập nhật hàng ngày",
              color: "from-[#FF4D00]/30 to-[#FF4D00]/10",
              icon: (
                <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/>
              )
            },
            {
              name: "YouTube Channel",
              url: "https://www.youtube.com/@pteintensive",
              stats: "Video hướng dẫn miễn phí",
              color: "from-red-600/30 to-red-600/10",
              icon: (
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              )
            }
          ].map((platform, index) => (
            <a
              key={index}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className={`bg-gradient-to-br ${platform.color} backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 hover:scale-105`}>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      {platform.icon}
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">{platform.name}</h4>
                    <p className="text-sm text-gray-300">{platform.stats}</p>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-300 group-hover:text-white transition-colors">
                  <span>Tham gia ngay</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent h-px"/>
          <div className="pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} PTE Intensive. All rights reserved.
              </p>
              <div className="flex space-x-8 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Điều khoản sử dụng
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Chính sách bảo mật
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
