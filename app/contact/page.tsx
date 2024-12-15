"use client";

import { FormEvent, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Image from 'next/image';

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        message: formData.get('message'),
      };

      // TODO: Implement contact form submission
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setSuccess(true);
      e.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#fc5d01] origin-left z-50"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] text-white py-20 overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          animate={{ 
            backgroundPosition: ["0% 0%", "100% 100%"],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        >
          <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 text-center">
          {/* Logo */}
          <motion.div
            className="flex justify-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-48 h-36">
              <Image
                src="/images/logo/orange-logo.png"
                alt="PTE Intensive Logo"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Liên Hệ Với Chúng Tôi
          </motion.h1>
          <motion.p 
            className="text-xl opacity-90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Chúng tôi luôn sẵn sàng hỗ trợ và giải đáp mọi thắc mắc của bạn
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Thông Tin Liên Hệ</h2>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#fc5d01]/10 rounded-full flex items-center justify-center text-[#fc5d01]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Điện thoại</div>
                  <a href="tel:0782116448" className="text-gray-600 hover:text-[#fc5d01]">0782.116.448</a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#fc5d01]/10 rounded-full flex items-center justify-center text-[#fc5d01]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Email</div>
                  <a href="mailto:admin@pteintensive.com" className="text-gray-600 hover:text-[#fc5d01]">admin@pteintensive.com</a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#fc5d01]/10 rounded-full flex items-center justify-center text-[#fc5d01]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Địa chỉ</div>
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#fc5d01]">
                    123 Nguyễn Văn Linh, Quận 7, TP.HCM
                  </a>
                </div>
              </div>

              <div className="pt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Kết nối với chúng tôi</h3>
                <div className="flex gap-4">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#fc5d01] text-white rounded-full flex items-center justify-center hover:bg-[#fd7f33] transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/>
                    </svg>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#fc5d01] text-white rounded-full flex items-center justify-center hover:bg-[#fd7f33] transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,2.16c3.2,0,3.58,0,4.85.07,3.25.15,4.77,1.69,4.92,4.92.06,1.27.07,1.65.07,4.85s0,3.58-.07,4.85c-.15,3.23-1.66,4.77-4.92,4.92-1.27.06-1.65.07-4.85.07s-3.58,0-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s0-3.58.07-4.85C2.38,3.92,3.9,2.38,7.15,2.23,8.42,2.18,8.8,2.16,12,2.16ZM12,0C8.74,0,8.33,0,7.05.07c-4.35.2-6.78,2.62-7,7C0,8.33,0,8.74,0,12S0,15.67.07,17c.2,4.36,2.62,6.78,7,7C8.33,24,8.74,24,12,24s3.67,0,4.95-.07c4.35-.2,6.78-2.62,7-7C24,15.67,24,15.26,24,12s0-3.67-.07-4.95c-.2-4.35-2.62-6.78-7-7C15.67,0,15.26,0,12,0Zm0,5.84A6.16,6.16,0,1,0,18.16,12,6.16,6.16,0,0,0,12,5.84ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16ZM18.41,4.15a1.44,1.44,0,1,0,1.44,1.44A1.44,1.44,0,0,0,18.41,4.15Z"/>
                    </svg>
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#fc5d01] text-white rounded-full flex items-center justify-center hover:bg-[#fd7f33] transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.5,6.19a3.02,3.02,0,0,0-2.12-2.12C19.54,3.5,12,3.5,12,3.5s-7.54,0-9.38.57A3.02,3.02,0,0,0,.5,6.19C0,8.03,0,12,0,12s0,3.97.5,5.81a3.02,3.02,0,0,0,2.12,2.12C4.46,20.5,12,20.5,12,20.5s7.54,0,9.38-.57a3.02,3.02,0,0,0,2.12-2.12C24,15.97,24,12,24,12S24,8.03,23.5,6.19ZM9.5,15.5v-7l6.25,3.5Z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Gửi Tin Nhắn</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#fc5d01] focus:border-[#fc5d01]"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#fc5d01] focus:border-[#fc5d01]"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#fc5d01] focus:border-[#fc5d01]"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Tin nhắn
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#fc5d01] focus:border-[#fc5d01]"
                  />
                </div>

                {error && (
                  <div className="text-red-500 text-sm">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="text-green-500 text-sm">
                    Tin nhắn đã được gửi thành công!
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full px-6 py-3 bg-[#fc5d01] text-white rounded-lg hover:bg-[#fd7f33] transition-colors ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? 'Đang gửi...' : 'Gửi Tin Nhắn'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.0444665502947!2d106.69731661474925!3d10.728891992347725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f6b3f87b755%3A0x6e7b1f0f0f0f0f0f!2zMTIzIE5ndXnhu4VuIFbEg24gTGluaCwgUXXhuq1uIDcsIFRQLkhDTQ!5e0!3m2!1svi!2s!4v1621234567890!5m2!1svi!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </div>
  );
}
