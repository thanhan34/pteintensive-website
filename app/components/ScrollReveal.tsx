"use client";

import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
}

/**
 * GSAP ScrollTrigger reveal wrapper.
 * Animates children into view when they enter the viewport,
 * with a smooth transform + opacity transition.
 */
export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 1,
  distance = 60,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const from: gsap.TweenVars = { opacity: 0 };
    switch (direction) {
      case 'up':
        from.y = distance;
        break;
      case 'down':
        from.y = -distance;
        break;
      case 'left':
        from.x = distance;
        break;
      case 'right':
        from.x = -distance;
        break;
      case 'scale':
        from.scale = 0.9;
        from.y = distance / 2;
        break;
      case 'fade':
      default:
        break;
    }

    const ctx = gsap.context(() => {
      gsap.from(el, {
        ...from,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, el);

    return () => ctx.revert();
  }, [direction, delay, duration, distance]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
