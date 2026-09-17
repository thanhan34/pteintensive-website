'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  CirclePlay,
  Clock3,
  FileCheck2,
  GraduationCap,
  Headphones,
  MessageCircleMore,
  MonitorPlay,
  Route,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  UserRoundCheck,
  UsersRound,
} from 'lucide-react';

const processSteps = [
  { number: '01', title: 'Xác định mục tiêu', description: 'Làm rõ điểm số, thời hạn và mục đích sử dụng chứng chỉ PTE của bạn.', icon: Target },
  { number: '02', title: 'Đánh giá đầu vào', description: 'Kiểm tra 4 kỹ năng để nhận diện đúng điểm mạnh và khoảng trống kiến thức.', icon: BarChart3 },
  { number: '03', title: 'Thiết kế lộ trình', description: 'Chọn lớp, lịch học và trọng tâm luyện tập phù hợp với năng lực hiện tại.', icon: Route },
  { number: '04', title: 'Học và luyện tập', description: 'Nắm chiến thuật từng dạng bài, thực hành có hướng dẫn và sửa lỗi chi tiết.', icon: BookOpenCheck },
  { number: '05', title: 'Mock test & về đích', description: 'Thi thử, phân tích kết quả, tinh chỉnh chiến thuật trước ngày thi thật.', icon: Trophy },
];

const pathways = [
  {
    level: 'NỀN TẢNG', score: 'Pre-PTE', title: 'Xây gốc phát âm',
    description: 'Dành cho người mới bắt đầu hoặc đang gặp khó khăn khi máy nhận diện giọng nói.',
    duration: '10 buổi · 2 giờ/buổi', href: '/courses/pre-pte', image: '/images/courses/foundation.jpg',
    points: ['Chuẩn hóa IPA và trọng âm', 'Tăng phản xạ nghe – nói', 'Làm quen dạng bài Speaking'],
    accent: 'from-[#fff1e8] to-[#fffaf7]',
  },
  {
    level: 'MỤC TIÊU CƠ BẢN', score: 'PTE 30–42', title: 'Nắm chắc chiến thuật',
    description: 'Phù hợp mục tiêu visa lao động, du học nghề hoặc yêu cầu đầu vào cơ bản.',
    duration: '12 buổi · hỗ trợ đến 6 tháng', href: '/courses/pte-30-36', image: '/images/courses/30-36.jpg',
    points: ['Hiểu cấu trúc và cách tính điểm', 'Luyện dạng bài trọng tâm', 'Mock test cùng Trainer'],
    accent: 'from-[#fff6dd] to-[#fffdf5]', featured: true,
  },
  {
    level: 'MỤC TIÊU NÂNG CAO', score: 'PTE 50–79', title: 'Bứt phá điểm số',
    description: 'Lộ trình chuyên sâu cho mục tiêu du học, tốt nghiệp và hồ sơ visa tay nghề.',
    duration: '3 tháng · hỗ trợ đến 6 tháng', href: '/courses/pte-50', image: '/images/courses/50+.jpg',
    points: ['Tối ưu kỹ năng liên kết điểm', 'Luyện và giải đề chuyên sâu', 'Theo sát tiến độ cá nhân'],
    accent: 'from-[#eef8f3] to-[#fbfdfc]',
  },
];

const phases = [
  { phase: 'Chặng 01', title: 'Hiểu đúng & xây nền', description: 'Nắm cấu trúc bài thi, tiêu chí chấm điểm và củng cố nền tảng cần thiết.', tasks: ['Cấu trúc đề thi PTE', 'Phát âm, từ vựng và ngữ pháp', 'Kỹ thuật làm bài cốt lõi'], icon: GraduationCap },
  { phase: 'Chặng 02', title: 'Luyện đúng trọng tâm', description: 'Phân bổ thời gian theo nhóm kỹ năng tạo điểm và luyện tập có phản hồi.', tasks: ['Speaking & Writing', 'Reading & Listening', 'Sửa lỗi cùng Trainer'], icon: MonitorPlay },
  { phase: 'Chặng 03', title: 'Tăng tốc & về đích', description: 'Mô phỏng phòng thi, kiểm soát thời gian và ổn định phong độ trước ngày thi.', tasks: ['Full mock test', 'Phân tích điểm số', 'Chiến thuật ngày thi'], icon: FileCheck2 },
];

const supportItems = [
  { icon: UserRoundCheck, title: 'Trainer theo sát', text: 'Nhận phản hồi cụ thể để biết mình cần sửa gì sau từng giai đoạn.' },
  { icon: CalendarDays, title: 'Lịch học linh hoạt', text: 'Học online và có ghi âm hỗ trợ khi bạn cần xem lại nội dung.' },
  { icon: Headphones, title: 'Bổ trợ Speaking', text: 'Tăng thời lượng thực hành, cải thiện độ trôi chảy và phát âm.' },
  { icon: ShieldCheck, title: 'Hỗ trợ dài hạn', text: 'Tiếp tục ôn luyện theo chính sách hỗ trợ của từng khóa học.' },
];

export default function StudyPageClient() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fffaf6] text-[#211a16] pt-24">
      <section className="relative isolate overflow-hidden bg-[#0b1720] text-white">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_75%_20%,rgba(252,93,1,0.24),transparent_30%),radial-gradient(circle_at_8%_80%,rgba(252,93,1,0.12),transparent_28%)]" />
        <div className="absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="mx-auto grid max-w-7xl gap-14 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-24">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#ff8a4c]/30 bg-[#fc5d01]/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[#ff9a68]">
              <Sparkles className="h-4 w-4" aria-hidden="true" /> Lộ trình học PTE cá nhân hóa
            </div>
            <h1 className="max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.1] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
              Không học lan man.<span className="mt-2 block text-[#ff7133]">Đi đúng đường, đạt đúng đích.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">Từ năng lực hiện tại đến điểm số mục tiêu, mỗi chặng học đều được thiết kế rõ ràng, đo lường được và có Trainer đồng hành.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/register" className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#fc5d01] px-7 text-sm font-extrabold uppercase tracking-wide text-white shadow-[0_14px_34px_rgba(252,93,1,0.3)] transition hover:-translate-y-0.5 hover:bg-[#ff7025] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff9a68]">
                Nhận lộ trình miễn phí <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <a href="#chon-lo-trinh" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5 px-7 text-sm font-bold text-white transition hover:border-white/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60">
                <CirclePlay className="h-5 w-5 text-[#ff8a4c]" aria-hidden="true" /> Khám phá lộ trình
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/10 pt-6 text-sm text-white/70">
              {['Kiểm tra đầu vào', 'Cá nhân hóa mục tiêu', 'Theo sát tiến độ'].map((item) => <span key={item} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#ff7133]" aria-hidden="true" />{item}</span>)}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
            <div className="absolute -inset-8 rounded-full bg-[#fc5d01]/15 blur-3xl" />
            <div className="relative rounded-[2rem] border border-white/15 bg-white/[0.07] p-4 shadow-[0_30px_90px_rgba(0,0,0,0.38)] backdrop-blur-xl sm:p-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ff8a4c]">Bản đồ về đích</p><p className="mt-1 font-semibold text-white">Lộ trình của bạn</p></div>
                <span className="rounded-full bg-emerald-400/10 px-3 py-1.5 text-xs font-bold text-emerald-300">Cá nhân hóa</span>
              </div>
              <div className="relative mt-6 space-y-4">
                <div className="absolute bottom-8 left-[23px] top-8 w-px bg-gradient-to-b from-[#fc5d01] via-[#ffad7e] to-emerald-400" />
                {[
                  { label: 'Điểm bắt đầu', value: 'Đánh giá năng lực', icon: BarChart3, status: 'BƯỚC 1' },
                  { label: 'Kế hoạch học', value: 'Luyện đúng trọng tâm', icon: Route, status: 'BƯỚC 2' },
                  { label: 'Điểm về đích', value: 'Chinh phục mục tiêu', icon: Trophy, status: 'BƯỚC 3' },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return <div key={item.label} className="relative flex items-center gap-4 rounded-2xl border border-white/10 bg-[#101f29]/90 p-4 transition hover:border-[#fc5d01]/40 sm:p-5">
                    <div className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${index === 2 ? 'bg-emerald-400 text-[#0b1720]' : 'bg-[#fc5d01] text-white'}`}><Icon className="h-5 w-5" aria-hidden="true" /></div>
                    <div className="min-w-0 flex-1"><p className="text-xs font-medium text-white/45">{item.label}</p><p className="mt-1 font-bold text-white">{item.value}</p></div>
                    <span className="hidden text-[10px] font-extrabold tracking-[0.14em] text-white/35 sm:block">{item.status}</span>
                  </div>;
                })}
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2">
                {[['5', 'bước rõ ràng'], ['4', 'kỹ năng'], ['1', 'mục tiêu']].map(([value, label]) => <div key={label} className="rounded-xl bg-white/[0.06] px-2 py-3 text-center"><strong className="block text-xl text-[#ff8a4c]">{value}</strong><span className="text-[10px] uppercase tracking-wide text-white/45">{label}</span></div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <nav aria-label="Điều hướng nội dung lộ trình" className="relative z-20 mx-auto -mt-px max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto rounded-b-2xl border-x border-b border-[#eadfd8] bg-white px-3 py-3 shadow-[0_12px_35px_rgba(74,45,27,0.06)] [scrollbar-width:none] sm:justify-center sm:gap-5">
          {[['Quy trình', '#quy-trinh'], ['Chọn lộ trình', '#chon-lo-trinh'], ['Kế hoạch học', '#ke-hoach'], ['Đồng hành', '#dong-hanh']].map(([label, href]) => <a key={href} href={href} className="shrink-0 rounded-full px-4 py-2 text-sm font-bold text-gray-600 transition hover:bg-[#fff1e8] hover:text-[#e65300]">{label}</a>)}
        </div>
      </nav>

      <section id="quy-trinh" className="scroll-mt-28 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Quy trình học tập" title="5 bước biến mục tiêu thành kế hoạch" description="Bạn luôn biết mình đang ở đâu, cần làm gì tiếp theo và tiến gần mục tiêu như thế nào." />
          <div className="relative mt-14 grid gap-4 md:grid-cols-5">
            <div className="absolute left-[10%] right-[10%] top-9 hidden h-px bg-gradient-to-r from-transparent via-[#f6b995] to-transparent md:block" />
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return <article key={step.number} className="group relative rounded-[1.5rem] border border-[#eee1d9] bg-white p-5 shadow-[0_14px_35px_rgba(79,50,31,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#fc5d01]/35 hover:shadow-[0_20px_45px_rgba(79,50,31,0.09)]">
                <div className="relative z-10 flex items-center justify-between"><div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl border border-[#ffd8c0] bg-[#fff3eb] text-[#e65300] transition group-hover:bg-[#fc5d01] group-hover:text-white"><Icon className="h-7 w-7" aria-hidden="true" /></div><span className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[#eadfd8]">{step.number}</span></div>
                <h3 className="mt-6 text-lg font-extrabold text-[#211a16]">{step.title}</h3><p className="mt-3 text-sm leading-6 text-gray-500">{step.description}</p>
                {index < processSteps.length - 1 && <ChevronRight className="absolute -right-3 top-8 z-20 hidden h-5 w-5 rounded-full bg-[#fffaf6] text-[#fc5d01] md:block" aria-hidden="true" />}
              </article>;
            })}
          </div>
        </div>
      </section>

      <section id="chon-lo-trinh" className="scroll-mt-28 border-y border-[#eee2da] bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Lộ trình theo mục tiêu" title="Bạn đang muốn chinh phục mốc điểm nào?" description="Chọn đúng điểm xuất phát và điểm đích để tập trung vào nội dung thực sự tạo ra kết quả." />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {pathways.map((pathway) => <article key={pathway.score} className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border bg-gradient-to-b ${pathway.accent} ${pathway.featured ? 'border-[#fc5d01]/55 shadow-[0_22px_55px_rgba(252,93,1,0.13)]' : 'border-[#eadfd8] shadow-[0_16px_40px_rgba(74,45,27,0.06)]'} transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_55px_rgba(74,45,27,0.12)]`}>
              {pathway.featured && <span className="absolute right-5 top-5 z-20 rounded-full bg-[#fc5d01] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-white shadow-lg">Phổ biến</span>}
              <div className="relative h-48 overflow-hidden"><Image src={pathway.image} alt={`${pathway.score} - ${pathway.title}`} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#17110d]/80 via-[#17110d]/10 to-transparent" /><div className="absolute bottom-5 left-6"><p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#ffb68f]">{pathway.level}</p><p className="mt-1 text-3xl font-black text-white">{pathway.score}</p></div></div>
              <div className="flex flex-1 flex-col p-6 sm:p-7"><h3 className="text-xl font-extrabold text-[#211a16]">{pathway.title}</h3><p className="mt-3 text-sm leading-6 text-gray-600">{pathway.description}</p><div className="mt-5 flex items-center gap-2 rounded-xl border border-black/5 bg-white/70 px-3 py-2.5 text-xs font-bold text-gray-600"><Clock3 className="h-4 w-4 text-[#fc5d01]" aria-hidden="true" />{pathway.duration}</div><ul className="mt-5 space-y-3">{pathway.points.map((point) => <li key={point} className="flex gap-3 text-sm text-gray-600"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#fc5d01]" aria-hidden="true" />{point}</li>)}</ul><Link href={pathway.href} className="mt-7 inline-flex items-center gap-2 border-t border-black/5 pt-5 text-sm font-extrabold text-[#df5200] transition group-hover:gap-3">Xem chi tiết khóa học <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>
            </article>)}
          </div>
          <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-2xl border border-dashed border-[#f0b38f] bg-[#fff8f3] p-6 sm:flex-row sm:items-center">
            <div className="flex items-start gap-4"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#fc5d01] shadow-sm"><UsersRound className="h-5 w-5" aria-hidden="true" /></div><div><h3 className="font-extrabold">Cần lịch học linh hoạt hoặc tăng tốc?</h3><p className="mt-1 text-sm leading-6 text-gray-500">Khóa PTE 1–1 được thiết kế riêng theo mục tiêu, năng lực và thời gian của bạn.</p></div></div>
            <Link href="/courses/pte-1-1" className="inline-flex shrink-0 items-center gap-2 text-sm font-extrabold text-[#df5200]">Khám phá lớp 1–1 <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section id="ke-hoach" className="scroll-mt-28 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-32">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#df5200]">Kế hoạch học tập</p><h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight tracking-[-0.025em] sm:text-4xl">Mỗi chặng đều có một đích đến rõ ràng</h2><p className="mt-5 max-w-lg leading-7 text-gray-600">Không chạy theo số lượng bài tập. Lộ trình tập trung vào kỹ năng tạo điểm, lỗi cần sửa và chỉ số tiến bộ của riêng bạn.</p>
            <div className="mt-8 rounded-2xl border border-[#eadfd8] bg-white p-5 shadow-[0_15px_35px_rgba(74,45,27,0.05)]"><div className="flex items-center gap-3"><MessageCircleMore className="h-5 w-5 text-[#fc5d01]" /><p className="font-bold">Bạn chưa biết bắt đầu từ đâu?</p></div><p className="mt-3 text-sm leading-6 text-gray-500">Đăng ký để được đánh giá mục tiêu và gợi ý lộ trình phù hợp trước khi chọn khóa.</p><Link href="/register" className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-[#df5200]">Đăng ký tư vấn <ArrowRight className="h-4 w-4" /></Link></div>
          </div>
          <div className="space-y-5">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              return <article key={phase.phase} className="relative overflow-hidden rounded-[1.75rem] border border-[#eadfd8] bg-white p-6 shadow-[0_18px_45px_rgba(74,45,27,0.06)] sm:p-8"><span className="absolute right-5 top-0 font-[family-name:var(--font-display)] text-8xl font-semibold leading-none text-[#f8eee8] sm:right-8">0{index + 1}</span><div className="relative grid gap-6 sm:grid-cols-[auto_1fr]"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fc5d01] text-white shadow-[0_10px_24px_rgba(252,93,1,0.23)]"><Icon className="h-6 w-6" aria-hidden="true" /></div><div><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#df5200]">{phase.phase}</p><h3 className="mt-2 text-2xl font-extrabold text-[#211a16]">{phase.title}</h3><p className="mt-3 max-w-xl text-sm leading-7 text-gray-500">{phase.description}</p><div className="mt-5 flex flex-wrap gap-2">{phase.tasks.map((task) => <span key={task} className="rounded-full border border-[#eee1d9] bg-[#fffaf6] px-3 py-2 text-xs font-bold text-gray-600">{task}</span>)}</div></div></div></article>;
            })}
          </div>
        </div>
      </section>

      <section id="dong-hanh" className="scroll-mt-28 bg-[#0d1b24] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl"><div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"><div><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#ff8a4c]">Không học một mình</p><h2 className="mt-4 max-w-xl font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight tracking-[-0.025em] sm:text-4xl">Một hệ thống đồng hành xuyên suốt hành trình</h2><p className="mt-5 max-w-xl leading-7 text-white/60">Lộ trình hiệu quả không chỉ là danh sách bài học. Bạn cần người chỉ ra lỗi, công cụ để luyện tập và các mốc đánh giá đúng lúc.</p></div><div className="grid gap-4 sm:grid-cols-2">{supportItems.map((item) => { const Icon = item.icon; return <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.055] p-5 transition hover:border-[#fc5d01]/40 hover:bg-white/[0.08]"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fc5d01]/15 text-[#ff8a4c]"><Icon className="h-5 w-5" aria-hidden="true" /></div><h3 className="mt-5 font-extrabold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-white/55">{item.text}</p></article>; })}</div></div></div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#fc5d01] to-[#e64b00] px-6 py-12 text-white shadow-[0_28px_70px_rgba(252,93,1,0.22)] sm:px-10 lg:px-16 lg:py-16"><div className="absolute -right-24 -top-28 h-80 w-80 rounded-full border-[55px] border-white/10" /><div className="absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-white/10 blur-2xl" /><div className="relative flex flex-col items-start justify-between gap-9 lg:flex-row lg:items-center"><div className="max-w-2xl"><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/70">Bước đầu tiên bắt đầu hôm nay</p><h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight sm:text-4xl">Nhận lộ trình PTE dành riêng cho bạn</h2><p className="mt-4 leading-7 text-white/80">Chia sẻ mục tiêu và thời gian dự kiến. Đội ngũ PTE Intensive sẽ giúp bạn xác định bước đi phù hợp.</p></div><Link href="/register" className="group inline-flex min-h-14 shrink-0 items-center justify-center gap-3 rounded-full bg-white px-7 text-sm font-extrabold uppercase tracking-wide text-[#df5200] shadow-xl transition hover:-translate-y-0.5 hover:bg-[#fff7f2]">Nhận tư vấn miễn phí <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link></div></div>
      </section>
    </main>
  );
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="mx-auto max-w-3xl text-center"><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#df5200]">{eyebrow}</p><h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight tracking-[-0.025em] text-[#211a16] sm:text-4xl">{title}</h2><p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-600">{description}</p></div>;
}