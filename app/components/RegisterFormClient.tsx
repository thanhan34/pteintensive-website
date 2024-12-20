'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function RegisterFormClient() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        course: formData.get('course'),
        message: formData.get('message'),
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      setSuccess(true);
      const form = e.target as HTMLFormElement;
      form.reset();
      
      // Navigate to home page after successful submission
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative p-8">
        {/* Form Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Đăng Ký Tư Vấn</h2>
          <p className="text-gray-600">Điền thông tin của bạn và chúng tôi sẽ liên hệ sớm nhất</p>
        </div>

        {/* Registration Form */}
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
            <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
              Khóa học quan tâm
            </label>
            <select
              name="course"
              id="course"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#fc5d01] focus:border-[#fc5d01]"
            >
              <option value="">Chọn khóa học</option>
              <option value="pre-pte">Khóa Học PRE-PTE</option>
              <option value="pte-30-36">Khóa Học PTE 30-36</option>
              <option value="pte-50">Khóa Học PTE 50+</option>
              <option value="pte-1-1">Khóa Học PTE 1 kèm 1</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Tin nhắn (không bắt buộc)
            </label>
            <textarea
              name="message"
              id="message"
              rows={4}
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
              Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-6 py-3 bg-[#fc5d01] text-white rounded-lg hover:bg-[#fd7f33] transition-colors ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Đang xử lý...' : 'Đăng Ký Ngay'}
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
  );
}
