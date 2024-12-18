"use client";

import { FormEvent, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Image from 'next/image';
import ContactInfo from '../components/ContactInfo';
import CommunityLinks from '../components/CommunityLinks';

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
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
      e.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#fc5d01] origin-left z-50"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] text-white py-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-40 h-32">
              <Image
                src="/images/logo/orange-logo.png"
                alt="PTE Intensive Logo"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
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

      {/* Main Content */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-50">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #f0f0f0 1px, transparent 0)',
            backgroundSize: '20px 20px'
          }}/>
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left Column */}
            <div className="space-y-6">
              <ContactInfo />
              <CommunityLinks />
            </div>

            {/* Right Column */}
            <div className="lg:sticky lg:top-8">
              <motion.div 
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative p-8">
                  {/* Form Header */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Gửi Tin Nhắn</h2>
                    <p className="text-gray-600">Điền thông tin của bạn và chúng tôi sẽ liên hệ sớm nhất</p>
                  </div>

                  {/* Contact Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
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
                        placeholder="Nhập họ và tên của bạn"
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
                        placeholder="Nhập số điện thoại của bạn"
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
                        placeholder="Nhập địa chỉ email của bạn"
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
                        placeholder="Nhập nội dung tin nhắn của bạn"
                      />
                    </div>

                    {error && (
                      <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                        {error}
                      </div>
                    )}

                    {success && (
                      <div className="text-green-500 text-sm bg-green-50 p-3 rounded-lg">
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

                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'radial-gradient(circle, #fc5d01 1px, transparent 1px)',
                      backgroundSize: '10px 10px'
                    }}/>
                  </div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 opacity-5">
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'linear-gradient(45deg, #fc5d01 25%, transparent 25%, transparent 75%, #fc5d01 75%, #fc5d01)',
                      backgroundSize: '8px 8px'
                    }}/>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[400px] relative mt-12">
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
