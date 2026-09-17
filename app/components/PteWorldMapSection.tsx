'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Globe2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import WorldMap, { type MapConnection } from '@/components/ui/world-map';

const animatedText = 'CHẠM TỚI THẾ GIỚI';

const connections: MapConnection[] = [
  {
    start: { lat: 10.8231, lng: 106.6297, label: 'Việt Nam', mapPosition: { x: 158, y: 40.7032 } },
    end: { lat: -33.8688, lng: 151.2093, label: 'Úc', mapPosition: { x: 183.5, y: 65.8179 } },
  },
  {
    start: { lat: 10.8231, lng: 106.6297, label: 'Việt Nam', mapPosition: { x: 158, y: 40.7032 } },
    end: { lat: -36.8509, lng: 174.7645, label: 'New Zealand', mapPosition: { x: 196.5, y: 67.55 } },
  },
  {
    start: { lat: 10.8231, lng: 106.6297, label: 'Việt Nam', mapPosition: { x: 158, y: 40.7032 } },
    end: { lat: 49.2827, lng: -123.1207, label: 'Canada', mapPosition: { x: 31, y: 19.9186 } },
  },
  {
    start: { lat: 10.8231, lng: 106.6297, label: 'Việt Nam', mapPosition: { x: 158, y: 40.7032 } },
    end: { lat: 51.5074, lng: -0.1278, label: 'Anh', mapPosition: { x: 99, y: 18.1865 } },
  },
  {
    start: { lat: 10.8231, lng: 106.6297, label: 'Việt Nam', mapPosition: { x: 158, y: 40.7032 } },
    end: { lat: 37.7749, lng: -122.4194, label: 'Mỹ', mapPosition: { x: 31.5, y: 25.9808 } },
  },
];

const destinations = [
  { flag: '🇦🇺', name: 'Úc' },
  { flag: '🇳🇿', name: 'New Zealand' },
  { flag: '🇨🇦', name: 'Canada' },
  { flag: '🇬🇧', name: 'Anh' },
  { flag: '🇺🇸', name: 'Mỹ' },
];

export default function PteWorldMapSection() {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = window.setInterval(() => {
      if (!document.hidden) {
        setActiveIndex((current) => (current + 1) % connections.length);
      }
    }, 4_000);

    return () => window.clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-[#fedac2]/20 py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute left-1/2 top-12 h-72 w-72 -translate-x-1/2 rounded-full bg-[#fc5d01]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#fc5d01]/20 bg-[#fff4ed] px-4 py-2 text-sm font-semibold text-[#c2410c] shadow-sm"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Globe2 className="h-4 w-4" aria-hidden="true" />
            PTE — Tấm vé ngôn ngữ toàn cầu
          </motion.div>

          <h2 className="text-balance text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            TỪ VIỆT NAM,{' '}
            <span className="inline-block text-[#fc5d01]" aria-label={animatedText}>
              {animatedText.split('').map((character, index) => (
                <motion.span
                  key={`${character}-${index}`}
                  className="inline-block"
                  aria-hidden="true"
                  initial={prefersReducedMotion ? false : { x: -8, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.025 }}
                >
                  {character === ' ' ? '\u00A0' : character}
                </motion.span>
              ))}
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
            PTE Academic được hàng nghìn trường và tổ chức trên thế giới công nhận, mở rộng lựa chọn học tập cho du học sinh Việt Nam tại Úc, New Zealand, Canada và nhiều điểm đến quốc tế.
          </p>
        </div>

        <div className="relative mt-8 bg-white">
          <WorldMap dots={connections} activeIndex={activeIndex} />

          <div className="mt-2 flex flex-wrap justify-center gap-x-6 gap-y-3 px-3 sm:mt-4">
            {destinations.map((destination, index) => (
              <button
                key={destination.name}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-pressed={activeIndex === index}
                className={`group flex items-center gap-2 border-b-2 px-1 py-2 text-sm font-semibold transition-all duration-300 ${
                  activeIndex === index
                    ? 'border-[#fc5d01] text-[#c2410c]'
                    : 'border-transparent text-gray-400 hover:text-gray-700'
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full transition-colors ${activeIndex === index ? 'bg-[#fc5d01]' : 'bg-gray-300 group-hover:bg-gray-400'}`} />
                <span className="text-base" aria-hidden="true">{destination.flag}</span>
                {destination.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="mx-auto mb-6 max-w-2xl text-sm leading-6 text-gray-500">
            Việc chấp nhận PTE và mức điểm yêu cầu phụ thuộc vào từng trường, chương trình và loại hồ sơ. PTE Intensive sẽ hỗ trợ bạn xác định mục tiêu điểm phù hợp.
          </p>
          <Link
            href="/register"
            className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] px-7 py-3 font-bold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fc5d01] focus-visible:ring-offset-2"
          >
            Tư vấn lộ trình PTE
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}