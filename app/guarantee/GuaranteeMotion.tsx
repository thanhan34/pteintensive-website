'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type MotionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

type RevealProps = MotionProps & {
  direction?: 'up' | 'left' | 'right' | 'scale';
};

const easing = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, className, delay = 0, direction = 'up' }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const offset = direction === 'left'
    ? { x: -42, y: 0, scale: 1 }
    : direction === 'right'
      ? { x: 42, y: 0, scale: 1 }
      : direction === 'scale'
        ? { x: 0, y: 20, scale: 0.94 }
        : { x: 0, y: 34, scale: 1 };

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, ...offset }}
      whileInView={reduceMotion ? undefined : { opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.72, delay, ease: easing }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({ children, className, delay = 0 }: MotionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : 'hidden'}
      whileInView={reduceMotion ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: { transition: { delayChildren: delay, staggerChildren: 0.13 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: MotionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={reduceMotion ? undefined : {
        hidden: { opacity: 0, y: 28, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.58, ease: easing } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function Float({ children, className }: MotionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      animate={reduceMotion ? undefined : { y: [0, -9, 0], rotate: [-8, -5, -8] }}
      transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

export function Heartbeat({ children, className }: MotionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      animate={reduceMotion ? undefined : {
        scale: [1, 1.06, 1],
        boxShadow: [
          '0 0 0 8px rgba(252,93,1,0.12), 0 0 28px rgba(252,93,1,0.28)',
          '0 0 0 14px rgba(252,93,1,0.04), 0 0 48px rgba(252,93,1,0.52)',
          '0 0 0 8px rgba(252,93,1,0.12), 0 0 28px rgba(252,93,1,0.28)',
        ],
      }}
      transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

export function DrawLine({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <svg className={className} viewBox="0 0 260 12" fill="none" aria-hidden="true">
      <motion.path
        d="M2 9C58 2 147 2 258 5"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
        animate={reduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.8, ease: easing }}
      />
    </svg>
  );
}