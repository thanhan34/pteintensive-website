'use client';

import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight, CheckCircle2, Loader2, Mail, MessageSquareText, Phone, User } from 'lucide-react';

const fieldClassName = 'w-full rounded-xl border border-gray-200 bg-gray-50/70 py-3.5 pl-11 pr-4 text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-[#fc5d01] focus:bg-white focus:ring-4 focus:ring-[#fc5d01]/10 disabled:cursor-not-allowed disabled:opacity-60';

export default function ContactFormClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    const form = event.currentTarget;

    try {
      const formData = new FormData(form);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
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
        throw new Error(result.error || 'Không thể gửi tin nhắn. Vui lòng thử lại.');
      }

      setSuccess(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.section
      className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-[0_24px_70px_rgba(16,24,40,0.12)]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55 }}
      aria-labelledby="contact-form-title"
    >
      <div className="relative overflow-hidden bg-gradient-to-r from-[#fc5d01] to-[#ff8744] px-6 py-7 text-white sm:px-8">
        <div className="absolute -right-10 -top-12 h-36 w-36 rounded-full bg-white/25 blur-3xl" />
        <div className="relative flex items-start justify-between gap-5">
          <div>
            <p className="text-sm font-semibold text-white/85">Tư vấn hoàn toàn miễn phí</p>
            <h2 id="contact-form-title" className="mt-2 text-2xl font-bold sm:text-3xl">Gửi lời nhắn cho chúng tôi</h2>
            <p className="mt-2 max-w-lg text-sm leading-6 text-white/90">Điền thông tin bên dưới, đội ngũ tư vấn sẽ chủ động liên hệ với bạn.</p>
          </div>
          <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 sm:flex">
            <MessageSquareText className="h-6 w-6 text-white" aria-hidden="true" />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 p-6 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-semibold text-gray-700">
              Họ và tên <span className="text-[#fc5d01]">*</span>
            </label>
            <div className="relative">
              <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" aria-hidden="true" />
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                required
                disabled={isLoading}
                className={fieldClassName}
                placeholder="Nguyễn Văn A"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-gray-700">
              Số điện thoại <span className="text-[#fc5d01]">*</span>
            </label>
            <div className="relative">
              <Phone className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" aria-hidden="true" />
              <input
                type="tel"
                name="phone"
                id="phone"
                autoComplete="tel"
                inputMode="tel"
                required
                disabled={isLoading}
                className={fieldClassName}
                placeholder="0349 213 852"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-700">
            Email <span className="text-[#fc5d01]">*</span>
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" aria-hidden="true" />
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              required
              disabled={isLoading}
              className={fieldClassName}
              placeholder="email@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-semibold text-gray-700">
            Bạn cần chúng tôi hỗ trợ điều gì? <span className="text-[#fc5d01]">*</span>
          </label>
          <div className="relative">
            <MessageSquareText className="pointer-events-none absolute left-4 top-4 h-5 w-5 text-gray-400" aria-hidden="true" />
            <textarea
              name="message"
              id="message"
              rows={5}
              required
              disabled={isLoading}
              className={`${fieldClassName} resize-none`}
              placeholder="Ví dụ: Tôi cần tư vấn lộ trình đạt PTE 65..."
            />
          </div>
        </div>

        {error && (
          <div role="alert" aria-live="assertive" className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm leading-6 text-red-700">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            {error}
          </div>
        )}

        {success && (
          <div role="status" aria-live="polite" className="flex items-start gap-3 rounded-xl border border-green-100 bg-green-50 p-4 text-sm leading-6 text-green-700">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            Cảm ơn bạn! Tin nhắn đã được gửi thành công. Chúng tôi sẽ liên hệ sớm nhất.
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="group inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#fc5d01] px-6 py-4 font-bold text-white shadow-[0_12px_28px_rgba(252,93,1,0.24)] transition hover:-translate-y-0.5 hover:bg-[#e95500] hover:shadow-[0_16px_32px_rgba(252,93,1,0.3)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#fc5d01]/25 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              Đang gửi thông tin...
            </>
          ) : (
            <>
              Gửi yêu cầu tư vấn
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </>
          )}
        </button>
        <p className="text-center text-xs leading-5 text-gray-500">Bằng cách gửi biểu mẫu, bạn đồng ý để PTE Intensive liên hệ tư vấn.</p>
      </form>
    </motion.section>
  );
}