'use client';

import { FormEvent, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ClipboardCheck,
  GraduationCap,
  Lock,
  Phone,
  Sparkles,
  Target,
  Trophy,
  User,
} from 'lucide-react';
import { createPteLead } from '@/lib/pteLeads';
import { cn } from '@/lib/utils/cn';

const targetOptions = ['PTE 30+', 'PTE 36+', 'PTE 50+', 'PTE 58+', 'PTE 65+', 'PTE 79+'];

const benefits = [
  {
    icon: ClipboardCheck,
    text: 'Kiểm tra trình độ đầu vào miễn phí',
  },
  {
    icon: Target,
    text: 'Lộ trình học theo mục tiêu visa/du học',
  },
  {
    icon: Trophy,
    text: 'Được sửa bài và theo sát tiến độ từng tuần',
  },
];

type FormState = {
  name: string;
  phone: string;
  target: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialFormState: FormState = {
  name: '',
  phone: '',
  target: '',
};

export default function NextStudentCTASection() {
  const formCardRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  const scrollToForm = () => {
    formCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(''), 4200);
  };

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitError('');
  };

  const validateForm = () => {
    const nextErrors: FormErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = 'Vui lòng nhập họ và tên.';
    }

    if (!form.phone.trim()) {
      nextErrors.phone = 'Vui lòng nhập số điện thoại hoặc Zalo.';
    }

    if (!form.target.trim()) {
      nextErrors.target = 'Vui lòng nhập hoặc chọn mục tiêu PTE.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      await createPteLead({
        name: form.name.trim(),
        phone: form.phone.trim(),
        target: form.target.trim(),
        source: 'reviews_cta',
        status: 'new',
      });

      setForm(initialFormState);
      setErrors({});
      showToast('Đã nhận thông tin. PTE Intensive sẽ liên hệ tư vấn lộ trình cho bạn.');
    } catch (error) {
      console.error('Error creating PTE lead from reviews CTA:', error);
      setSubmitError('Chưa thể gửi thông tin lúc này. Vui lòng thử lại sau ít phút.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative px-4 sm:px-6 lg:px-8">
      <motion.div
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-[linear-gradient(135deg,#FC5D01_0%,#FF6B00_45%,#FF8A3D_100%)] px-5 py-10 shadow-[0_30px_90px_rgba(252,93,1,0.28)] sm:px-8 lg:px-12 lg:py-14"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.8)_1px,transparent_0)] [background-size:28px_28px]" />
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute -bottom-28 right-1/4 h-80 w-80 rounded-full bg-[#ffe1c7]/30 blur-3xl" />
        <div className="absolute -right-20 top-12 h-56 w-56 rounded-full bg-white/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-8 left-8 hidden h-20 w-20 grid-cols-5 gap-2 opacity-45 md:grid">
          {Array.from({ length: 25 }).map((_, index) => (
            <span key={index} className="h-1.5 w-1.5 rounded-full bg-white" />
          ))}
        </div>

        <div className="relative z-10 grid gap-9 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-12">
          <div className="text-white">
            <motion.div
              className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#fc5d01] shadow-lg"
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Sparkles className="h-4 w-4" /> START YOUR PTE JOURNEY
            </motion.div>

            <motion.h2
              className="max-w-2xl text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.15 }}
            >
              Bạn Có Muốn Là Người Tiếp Theo?
            </motion.h2>

            <motion.p
              className="mt-6 max-w-2xl text-base font-medium leading-8 text-white/95 sm:text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.2 }}
            >
              Hàng trăm học viên đã đạt mục tiêu PTE để du học, làm việc và định cư. Bây giờ đến lượt bạn bắt đầu lộ trình của mình.
            </motion.p>

            <motion.p
              className="mt-4 max-w-2xl text-sm leading-7 text-white/85 sm:text-base"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.25 }}
            >
              PTE Intensive sẽ giúp bạn xác định trình độ hiện tại, xây dựng lộ trình học phù hợp và theo sát quá trình luyện thi đến khi đạt mục tiêu.
            </motion.p>

            <motion.div
              className="mt-9 grid gap-4 sm:grid-cols-3"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.3 }}
            >
              {benefits.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-white shadow-inner">
                    <Icon className="h-6 w-6" />
                  </span>
                  <p className="text-sm font-bold leading-6 text-white">{text}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              className="mt-9 flex flex-col gap-3 sm:flex-row"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.35 }}
            >
              <button
                type="button"
                onClick={scrollToForm}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-6 py-4 text-sm font-black text-[#fc5d01] shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#fff5ee] hover:shadow-2xl sm:w-auto"
              >
                Đăng Ký Tư Vấn Ngay
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <a
                href="#student-results"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-white/70 bg-white/5 px-6 py-4 text-sm font-black text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15 sm:w-auto"
              >
                Xem Kết Quả Học Viên
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </motion.div>
          </div>

          <motion.div
            ref={formCardRef}
            className="relative rounded-3xl border border-[#fc5d01]/15 bg-[#fff9f5] p-5 shadow-[0_28px_80px_rgba(79,39,16,0.22)] sm:p-7 lg:p-8"
            initial={{ opacity: 0, y: 26, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="absolute -top-5 left-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fc5d01] text-white shadow-xl">
              <Trophy className="h-8 w-8" />
            </div>

            <div className="pt-7">
              <div className="mb-6 flex items-start gap-3">
                <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#fc5d01]/10 text-[#fc5d01] sm:flex">
                  <GraduationCap className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-black leading-tight text-gray-950">Mục tiêu tiếp theo của bạn là gì?</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-500">Chọn target hoặc nhập mục tiêu riêng để nhận lộ trình phù hợp.</p>
                </div>
              </div>

              <div className="mb-6 flex flex-wrap gap-3">
                {targetOptions.map((target) => {
                  const isSelected = form.target === target;

                  return (
                    <button
                      key={target}
                      type="button"
                      onClick={() => updateField('target', target)}
                      className={cn(
                        'rounded-full border px-5 py-2.5 text-sm font-black transition-all duration-200 hover:-translate-y-0.5',
                        isSelected
                          ? 'border-[#fc5d01] bg-[#fc5d01] text-white shadow-lg shadow-[#fc5d01]/25'
                          : 'border-[#fc5d01]/30 bg-white text-[#fc5d01] hover:bg-[#fff0e6]'
                      )}
                    >
                      {target}
                    </button>
                  );
                })}
              </div>

              <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                <div>
                  <label className="sr-only" htmlFor="reviews-cta-name">Họ và tên</label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      id="reviews-cta-name"
                      value={form.name}
                      onChange={(event) => updateField('name', event.target.value)}
                      className={cn(
                        'h-14 w-full rounded-2xl border bg-white pl-12 pr-4 text-sm font-medium text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-[#fc5d01] focus:ring-4 focus:ring-[#fc5d01]/10',
                        errors.name ? 'border-red-300' : 'border-gray-200'
                      )}
                      placeholder="Họ và tên"
                    />
                  </div>
                  {errors.name && <p className="mt-1.5 text-xs font-semibold text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <label className="sr-only" htmlFor="reviews-cta-phone">Số điện thoại / Zalo</label>
                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      id="reviews-cta-phone"
                      value={form.phone}
                      onChange={(event) => updateField('phone', event.target.value)}
                      className={cn(
                        'h-14 w-full rounded-2xl border bg-white pl-12 pr-4 text-sm font-medium text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-[#fc5d01] focus:ring-4 focus:ring-[#fc5d01]/10',
                        errors.phone ? 'border-red-300' : 'border-gray-200'
                      )}
                      placeholder="Số điện thoại / Zalo"
                    />
                  </div>
                  {errors.phone && <p className="mt-1.5 text-xs font-semibold text-red-500">{errors.phone}</p>}
                </div>

                <div>
                  <label className="sr-only" htmlFor="reviews-cta-target">Mục tiêu PTE của bạn</label>
                  <div className="relative">
                    <Target className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      id="reviews-cta-target"
                      value={form.target}
                      onChange={(event) => updateField('target', event.target.value)}
                      className={cn(
                        'h-14 w-full rounded-2xl border bg-white pl-12 pr-4 text-sm font-medium text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-[#fc5d01] focus:ring-4 focus:ring-[#fc5d01]/10',
                        errors.target ? 'border-red-300' : 'border-gray-200'
                      )}
                      placeholder="Mục tiêu PTE của bạn"
                    />
                  </div>
                  {errors.target && <p className="mt-1.5 text-xs font-semibold text-red-500">{errors.target}</p>}
                </div>

                {submitError && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{submitError}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#fc5d01] px-6 text-base font-black text-white shadow-xl shadow-[#fc5d01]/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e95400] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? 'Đang gửi...' : 'Nhận Lộ Trình Cá Nhân'}
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </form>

              <p className="mt-5 flex items-start gap-2 text-xs font-medium leading-5 text-gray-500">
                <Lock className="mt-0.5 h-4 w-4 shrink-0 text-[#fc5d01]" />
                PTE Intensive sẽ liên hệ để tư vấn lộ trình phù hợp. Không spam.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-[#fc5d01]/20 bg-white px-5 py-4 text-sm font-bold text-gray-900 shadow-[0_18px_50px_rgba(17,24,39,0.18)]">
          <span className="text-[#fc5d01]">✓</span> {toastMessage}
        </div>
      )}
    </section>
  );
}