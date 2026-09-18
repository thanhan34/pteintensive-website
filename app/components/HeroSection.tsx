"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import heroImage from '../../public/images/hero.svg';
import mobileHeroImage from '../../public/images/heromobile.png';
import courseImage from '../../public/images/hero/1.png';
import pathwayImage from '../../public/images/hero/2.png';
import teachersImage from '../../public/images/hero/3.png';
import migrationImage from '../../public/images/hero/4.png';
import guaranteeImage from '../../public/images/hero/5.png';
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Home,
  Newspaper,
  Plane,
  Play,
  Route,
  ShieldCheck,
  Target,
  UsersRound,
} from 'lucide-react';

const highlights = [
  {
    title: 'Khóa học PTE',
    description: 'Lộ trình tinh gọn, khoa học, hiệu quả vượt trội.',
    href: '/courses',
    image: courseImage,
    icon: BookOpen,
  },
  {
    title: 'Lộ trình cá nhân hóa',
    description: 'Đo trình độ · Xây lộ trình · Theo sát tiến độ.',
    href: '/study',
    image: pathwayImage,
    icon: Route,
  },
  {
    title: 'Đội ngũ giảng viên',
    description: 'Giàu kinh nghiệm, tận tâm, đồng hành sát sao.',
    href: '/about',
    image: teachersImage,
    icon: UsersRound,
  },
  {
    title: 'Du học & Định cư',
    description: 'Mở rộng cơ hội, chinh phục ước mơ toàn cầu.',
    href: '/migration',
    image: migrationImage,
    icon: Plane,
  },
  {
    title: 'Cam kết đầu ra',
    description: 'Đồng hành bền bỉ đến khi bạn đạt mục tiêu.',
    href: '/guarantee',
    image: guaranteeImage,
    icon: ShieldCheck,
  },
];

const commitments = [
  { title: 'PTE 79+', description: 'Mục tiêu không xa', icon: Target },
  { title: '1:1 Coaching', description: 'Cá nhân hóa lộ trình', icon: UsersRound },
  { title: 'Cam kết đồng hành', description: 'Đến khi đạt mục tiêu', icon: ShieldCheck },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroSection() {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? false : { opacity: 0, y: 28 };

  return (
    <section className="home-hero relative isolate min-h-[900px] overflow-hidden bg-[#05090d] text-white lg:min-h-[940px] xl:min-h-[min(970px,100svh)]">
      <picture>
        <source media="(max-width: 639px)" srcSet={mobileHeroImage.src} />
      <Image
        src={heroImage}
        alt="Học viên PTE Intensive với Nhà hát Opera Sydney"
        fill
        loading="eager"
        fetchPriority="high"
        sizes="100vw"
        className="hero-background object-cover object-[57%_center] brightness-[1.15] sm:object-center"
      />
      </picture>

      <div className="hero-shade-horizontal absolute inset-0 bg-[linear-gradient(90deg,rgba(2,7,12,0.97)_0%,rgba(2,7,12,0.82)_27%,rgba(2,7,12,0.12)_57%,rgba(2,7,12,0.56)_100%)]" />
      <div className="hero-shade-vertical absolute inset-0 bg-[linear-gradient(180deg,rgba(1,5,9,0.5)_0%,transparent_33%,rgba(2,5,8,0.18)_58%,rgba(2,4,7,0.9)_100%)]" />
      <div className="hero-vignette absolute inset-0 shadow-[inset_0_0_130px_rgba(0,0,0,0.62)]" />
      <div className="hero-grid absolute inset-0 opacity-20" />

      <div className="hero-content relative z-10 mx-auto flex min-h-[900px] max-w-[1440px] flex-col px-5 pb-8 pt-32 sm:px-8 lg:min-h-[940px] lg:px-12 lg:pb-7 lg:pt-44 xl:min-h-[min(970px,100svh)] xl:px-16">
        <div className="hero-intro grid flex-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_280px] xl:grid-cols-[minmax(0,1fr)_300px]">
          <motion.div initial={initial} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="hero-copy max-w-[650px] pt-4 lg:pt-8">
            <div className="hero-eyebrow mb-5 inline-flex items-center gap-2 rounded-full border border-[#ff6a25]/70 bg-black/30 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#ff8a52] shadow-[0_0_24px_rgba(252,93,1,0.16)] backdrop-blur-md">
              <GraduationCap className="h-4 w-4" aria-hidden="true" />
              PTE Intensive
            </div>

            <h1 className="text-[clamp(2.8rem,5vw,5.15rem)] font-extrabold leading-[0.98] tracking-[-0.055em] drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)]">
              <span className="block">Chinh phục PTE</span>
              <span className="mt-2 block bg-gradient-to-r from-[#ff5a16] via-[#ff812f] to-[#ffc067] bg-clip-text pb-2 text-transparent">Mở lối tương lai</span>
            </h1>

            <p className="hero-description mt-5 max-w-[560px] text-base font-medium leading-7 text-white/80 sm:text-lg">
              <span className="hero-description-line">Lộ trình học cá nhân hóa</span>{' '}
              <span className="hero-description-separator mx-2 text-[#ff6a25]">•</span>{' '}
              <span className="hero-description-line">Chiến lược thực chiến</span>{' '}
              <span className="hero-description-separator mx-2 text-[#ff6a25]">•</span>{' '}
              <span className="hero-description-line sm:whitespace-nowrap">Đồng hành đến khi đạt mục tiêu</span>
            </p>

            <div className="hero-actions mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/register" className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#ff4d00] to-[#ff7417] px-7 text-sm font-extrabold uppercase tracking-wide shadow-[0_12px_34px_rgba(252,93,1,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_42px_rgba(252,93,1,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8b51] focus-visible:ring-offset-2 focus-visible:ring-offset-black">
                Nhận lộ trình miễn phí
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link href="/courses" className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-[#ff7b3d]/75 bg-black/35 px-7 text-sm font-bold uppercase tracking-wide backdrop-blur-md transition hover:border-[#ff9a6a] hover:bg-[#fc5d01]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8b51]">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#ff7b3d] text-[#ff7b3d]"><Play className="ml-0.5 h-3.5 w-3.5 fill-current" aria-hidden="true" /></span>
                Xem khóa học
              </Link>
            </div>
          </motion.div>

          <aside
            aria-label="Cam kết đào tạo"
            className="hero-commitments hero-glass mt-4 hidden w-full min-w-0 flex-col overflow-hidden rounded-[24px] lg:block"
          >
            {commitments.map(({ title, description, icon: Icon }, index) => (
              <div key={title} className={`flex items-center gap-4 px-6 py-7 ${index < commitments.length - 1 ? 'border-b border-white/10' : ''}`}>
                <Icon className="h-10 w-10 shrink-0 text-[#ff6a25] drop-shadow-[0_0_12px_rgba(252,93,1,0.55)]" strokeWidth={1.8} aria-hidden="true" />
                <div>
                  <p className="text-base font-extrabold uppercase tracking-tight">{title}</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-white/60">{description}</p>
                </div>
              </div>
            ))}
          </aside>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.45, ease }}
          className="mt-auto"
        >
          <div className="mb-3 mt-5 flex items-center justify-between gap-3 sm:hidden">
            <h2 className="max-w-[72%] text-lg font-extrabold leading-tight tracking-tight">Hành trình chinh phục PTE<br />bắt đầu từ đây</h2>
            <Link href="/courses" className="flex min-h-11 items-center gap-1 whitespace-nowrap text-xs font-semibold text-[#ff812f]">Xem tất cả <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <div className="hero-card-scroll -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 pt-3 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-3.5 lg:overflow-visible lg:px-0 lg:pb-1 xl:gap-4">
            {highlights.map(({ title, description, href, image, icon: Icon }, index) => (
              <Link
                key={title}
                href={href}
                aria-label={`${title} – tìm hiểu thêm`}
                className="hero-feature-card group relative flex aspect-[5/4] w-[82vw] max-w-[350px] shrink-0 snap-center flex-col overflow-hidden rounded-[22px] focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fc5d01] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05090d] sm:w-[48vw] lg:w-auto lg:max-w-none lg:snap-none"
              >
                <div className="hero-card-image relative h-[58%] shrink-0 overflow-hidden">
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 250px, (min-width: 1024px) 20vw, (min-width: 640px) 48vw, 82vw"
                    className="object-cover object-[center_43%] transition-transform duration-700 ease-out group-hover:scale-[1.055]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,8,13,0.03)_20%,rgba(5,12,18,0.1)_60%,#08131d_100%)]" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-[#061019]/55 px-2.5 py-1 text-[9px] font-bold tracking-[0.22em] text-white/80 shadow-lg backdrop-blur-md">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="hero-card-copy relative z-10 -mt-px flex min-h-0 flex-1 items-center gap-3 bg-[linear-gradient(145deg,rgba(12,23,33,0.98),rgba(6,16,25,0.99))] px-4 py-3.5 xl:px-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#fc5d01]/35 bg-[#fc5d01]/10 text-[#ff7526] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_18px_rgba(252,93,1,0.1)]">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-[15px] font-extrabold leading-tight tracking-[-0.02em] text-white lg:text-[13px] xl:text-[15px]">
                      {title}
                    </h2>
                    <p className="mt-1 line-clamp-2 text-[11px] leading-[1.35] text-white/55 lg:text-[10px] xl:text-[11px]">
                      {description}
                    </p>
                  </div>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#fc5d01]/45 bg-black/20 text-[#ff7a32] transition duration-300 group-hover:border-[#ff8445] group-hover:bg-[#fc5d01] group-hover:text-white group-hover:shadow-[0_0_18px_rgba(252,93,1,0.42)]">
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-2 gap-3 sm:hidden">
            {highlights.slice(3).map(({ title, description, href, image, icon: Icon }) => (
              <Link key={href} href={href} className="hero-feature-card relative flex min-h-[180px] flex-col justify-end overflow-hidden rounded-xl p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-400">
                <Image src={image} alt="" fill sizes="50vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030b12] via-[#030b12]/75 to-transparent" />
                <div className="relative">
                  <Icon className="mb-2 h-7 w-7 text-[#ff812f]" aria-hidden="true" />
                  <h3 className="text-sm font-bold">{title}</h3>
                  <p className="mb-7 mt-1 text-xs leading-relaxed text-slate-300">{description}</p>
                  <ArrowRight className="absolute bottom-0 right-0 h-7 w-7 rounded-full border border-orange-500 p-1 text-orange-400" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
      <nav aria-label="Điều hướng nhanh trang chủ" className="hero-mobile-nav relative z-10 flex items-center justify-between gap-1 rounded-t-2xl border-t border-[#ff9c70]/30 bg-[#040b11]/95 px-3 py-3 sm:hidden">
        {[
          { href: '/', label: 'Trang chủ', icon: Home },
          { href: '/courses', label: 'Khóa học', icon: BookOpen },
          { href: '/about', label: 'Về chúng tôi', icon: UsersRound },
          { href: '/blog', label: 'Tin tức', icon: Newspaper },
        ].map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} aria-current={href === '/' ? 'page' : undefined} className={`flex min-h-11 flex-col items-center justify-center gap-1 text-[9px] ${href === '/' ? 'text-orange-500' : 'text-slate-300'}`}>
            <Icon className="h-5 w-5" aria-hidden="true" />{label}
          </Link>
        ))}
        <Link href="/register" className="flex min-h-11 items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-[#ff4d00] px-3 text-[10px] font-bold uppercase shadow-[0_0_24px_#fc5d0155]">Đăng ký tư vấn <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
      </nav>
    </section>
  );
}