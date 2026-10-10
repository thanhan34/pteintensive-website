import Link from 'next/link';
import { ArrowRight, BookOpenCheck, MessagesSquare, Route, Users, Wallet } from 'lucide-react';

const benefits = [
  { id: 1, icon: Route, title: 'Học Nhanh - Lộ Trình Ngắn', subtitle: 'Tập Trung 20% Nội Dung, Tạo Ra 80% Kết Quả' },
  { id: 2, icon: Users, title: 'Sĩ Số Lớp Nhỏ', subtitle: 'Chỉ Từ 5 - 10 Học Viên/Lớp | Tối Đa Hiệu Quả Tiếp Thu' },
  { id: 3, icon: MessagesSquare, title: 'Hỗ Trợ 1 - 1 Sau Mỗi Buổi Học', subtitle: 'Giải Đáp - Học Tập - Luyện Đề, Chữa Đề. Kỹ Năng Cải Thiện Nhanh Chóng' },
  { id: 4, icon: BookOpenCheck, title: 'Thực hành trên APEuni', subtitle: 'Luyện Đề Có Độ Chính Xác Đến 99,5%. Tủ Cập Nhật Thường Xuyên' },
  { id: 5, icon: Wallet, title: 'Lệ Phí Rẻ - Không Phát Sinh Chi Phí', subtitle: 'Lịch Học Tối Ưu Nhất' },
];

export default function BenefitsSection() {
  return (
    <section aria-labelledby="home-benefits-title" className="home-content bg-gradient-to-b from-white to-peach-light/10 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-8 max-w-3xl text-center md:mb-12">
          <span aria-hidden="true" className="mx-auto mb-6 block h-1 w-12 rounded-full bg-primary" />
          <h2 id="home-benefits-title" className="text-2xl font-bold uppercase leading-tight tracking-tight text-primary md:text-4xl">Lợi ích vượt trội của PTE Intensive</h2>
          <p className="mt-4 text-base uppercase leading-7 text-primary">Cam kết đem đến cho học viên</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {benefits.map(benefit => {
            const Icon = benefit.icon;

            return (
              <article key={benefit.id} className={`relative flex h-full flex-col overflow-hidden rounded-3xl border p-6 md:p-8 ${benefit.id === 1 ? 'border-primary/30 bg-peach-light/40' : 'border-primary/15 bg-white shadow-sm'}`}>
                <span aria-hidden="true" className="absolute inset-x-8 top-0 h-1 rounded-b-full bg-primary" />
                <div className="mb-6 flex items-center justify-between gap-4" aria-hidden="true">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </span>
                  <span className="text-sm font-semibold tabular-nums text-primary">0{benefit.id}</span>
                </div>
                <h3 className="mb-3 text-xl font-bold leading-7 tracking-tight text-gray-900">{benefit.title}</h3>
                <p className="text-sm leading-7 text-gray-600 md:text-base">{benefit.subtitle}</p>
              </article>
            );
          })}
          <div className="flex h-full flex-col items-start justify-center rounded-3xl border border-primary bg-primary p-6 shadow-sm md:p-8">
            <p className="text-2xl font-bold leading-8 tracking-tight text-gray-900">Sẵn sàng bắt đầu?</p>
            <p className="mb-6 mt-3 text-sm leading-7 text-secondary md:text-base">Đăng ký ngay để trải nghiệm những lợi ích tuyệt vời này</p>
            <Link href="/register" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-transparent bg-white px-6 py-3 text-sm font-bold text-secondary shadow-sm transition hover:-translate-y-0.5 hover:border-secondary/30 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary active:translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none">
              Đăng Ký Ngay <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}