"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import gsap from 'gsap';

// Three.js background — client-side only
const HeroThreeBackground = dynamic(
  () => import('./three/HeroThreeBackground'),
  { ssr: false }
);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [
            logoRef.current,
            titleRef.current,
            subtitleRef.current,
            ctaRef.current,
            imageRef.current,
          ],
          { opacity: 1, y: 0, x: 0 }
        );
        return;
      }

      // --- Entrance timeline ---
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(logoRef.current, {
        opacity: 0,
        y: -40,
        scale: 0.9,
        duration: 0.9,
      })
        .from(
          titleRef.current ? titleRef.current.children : [],
          {
            opacity: 0,
            y: 60,
            rotateX: 45,
            transformOrigin: '50% 100%',
            stagger: 0.15,
            duration: 1,
          },
          '-=0.4'
        )
        .from(
          subtitleRef.current,
          { opacity: 0, y: 30, duration: 0.8 },
          '-=0.5'
        )
        .from(
          featuresRef.current
            ? featuresRef.current.querySelectorAll('.hero-feature')
            : [],
          { opacity: 0, x: -40, stagger: 0.12, duration: 0.6 },
          '-=0.4'
        )
        .from(
          ctaRef.current ? ctaRef.current.children : [],
          {
            opacity: 0,
            y: 30,
            scale: 0.9,
            stagger: 0.12,
            duration: 0.6,
            ease: 'back.out(1.6)',
          },
          '-=0.3'
        )
        .from(
          imageRef.current,
          { opacity: 0, x: 80, scale: 0.92, duration: 1.1 },
          0.5
        );

      // --- Continuous floating for hero image ---
      gsap.to(imageRef.current, {
        y: -18,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.6,
      });

      // --- Scroll indicator bounce ---
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        opacity: 0.5,
        duration: 1,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Magnetic hover effect for CTA buttons
  const handleMagnet = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, {
      x: x * 0.25,
      y: y * 0.25,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const resetMagnet = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen pt-20 overflow-hidden bg-gradient-to-br from-[#fc5d01] to-[#fd7f33]"
    >
      {/* Three.js 3D Background */}
      <HeroThreeBackground />

      {/* Subtle overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 py-36">
        {/* Logo */}
        <div ref={logoRef} className="flex justify-center mb-12">
          <div className="relative w-64 h-32">
            <Image
              src="/images/logo/orange-logo.png"
              alt="PTE Intensive Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-white z-10">
            <h1
              ref={titleRef}
              className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
              style={{ perspective: '800px' }}
            >
              <span className="block">Chinh Phục PTE</span>
              <span className="block text-[#fedac2]">Mở Cửa Tương Lai</span>
            </h1>

            <p ref={subtitleRef} className="text-xl mb-8 text-white/90">
              Khóa học PTE chất lượng cao với cam kết đầu ra và phương pháp học
              tập hiệu quả.
            </p>

            <div ref={featuresRef} className="space-y-4">
              {[
                'Giảng viên chuyên môn cao',
                'Lộ trình học tập cá nhân hóa',
                'Cam kết đầu ra',
                'Hỗ trợ 24/7',
              ].map((feature) => (
                <div
                  key={feature}
                  className="hero-feature flex items-center gap-3 group"
                >
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-125">
                    <svg
                      className="w-3 h-3 text-[#fc5d01]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div ref={ctaRef} className="mt-10 flex gap-4">
              <a
                href="/register"
                onMouseMove={handleMagnet}
                onMouseLeave={resetMagnet}
                className="px-8 py-3 bg-white text-[#fc5d01] rounded-lg font-medium hover:bg-[#fedac2] transition-colors shadow-lg hover:shadow-xl will-change-transform"
              >
                Đăng Ký Ngay
              </a>
              <a
                href="#learn-more"
                onMouseMove={handleMagnet}
                onMouseLeave={resetMagnet}
                className="px-8 py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors will-change-transform"
              >
                Tìm Hiểu Thêm
              </a>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div ref={imageRef} className="relative z-10 will-change-transform">
            <div className="relative h-[600px]">
              <Image
                src="/images/hero.png"
                alt="PTE Learning"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
