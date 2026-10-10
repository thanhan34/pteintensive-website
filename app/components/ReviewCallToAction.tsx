import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';

export default function ReviewCallToAction() {
  return (
    <section aria-labelledby="home-consultation-title" className="home-content bg-white px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[24px] border border-peach bg-peach-light/30 p-6 sm:p-8 lg:p-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center lg:gap-12">
          <div>
            <h2 id="home-consultation-title" className="max-w-2xl text-2xl font-bold leading-tight text-gray-900 md:text-4xl">Sẵn sàng chinh phục PTE Academic?</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">
              Hãy để chúng tôi đồng hành cùng bạn trong hành trình chinh phục mục tiêu PTE. Bắt đầu bằng việc trao đổi về trình độ hiện tại, điểm mục tiêu và thời gian học của bạn.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/register" className="home-focus inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0.5">
                Nhận lộ trình miễn phí <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link href="/contact" className="home-focus inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition hover:-translate-y-0.5 hover:border-primary hover:shadow-sm active:translate-y-0.5">
                <MessageCircle className="h-5 w-5" aria-hidden="true" /> Tư vấn miễn phí
              </Link>
            </div>
          </div>
          <div className="border-t border-peach pt-6 lg:border-t-0 lg:pt-0">
            <h3 className="text-lg font-bold text-gray-900">Chọn bước tiếp theo của bạn</h3>
            <div className="mt-4 divide-y divide-peach">
              {[
                { href: '/courses', title: 'Tìm hiểu các khóa học', description: 'Xem nội dung, lịch học và thời gian học.' },
                { href: '/reviews', title: 'Đọc chia sẻ của học viên', description: 'Tham khảo trải nghiệm học tại PTE Intensive.' },
              ].map(({ href, title, description }) => (
                <Link key={href} href={href} className="home-focus group flex min-h-11 items-center justify-between gap-4 rounded-lg py-4 text-gray-900">
                  <span><span className="block text-sm font-semibold group-hover:underline group-hover:underline-offset-4">{title}</span><span className="mt-1 block text-sm leading-6 text-gray-600">{description}</span></span>
                  <ArrowRight className="h-5 w-5 shrink-0 text-primary transition-transform group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}