'use client';

import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactFormClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // const { scrollYProgress } = useScroll();
  // const scaleX = useSpring(scrollYProgress, {
  //   stiffness: 100,
  //   damping: 30,
  //   restDelta: 0.001
  // });

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
    <>
      {/* Contact Form */}
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
    </>
  );
}
