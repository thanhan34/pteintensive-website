'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useId } from 'react';

export interface MapPoint {
  lat: number;
  lng: number;
  label?: string;
  mapPosition?: {
    x: number;
    y: number;
  };
}

export interface MapConnection {
  start: MapPoint;
  end: MapPoint;
}

interface WorldMapProps {
  dots: MapConnection[];
  activeIndex?: number;
  lineColor?: string;
  className?: string;
}

const MAP_WIDTH = 199;
const MAP_HEIGHT = 80;

function projectPoint({ lat, lng, mapPosition }: MapPoint) {
  if (mapPosition) return mapPosition;

  return {
    x: (lng * MAP_WIDTH) / 360 + MAP_WIDTH / 2,
    y: (-lat * MAP_HEIGHT) / 180 + MAP_HEIGHT / 2,
  };
}

function createArc(start: MapPoint, end: MapPoint) {
  const from = projectPoint(start);
  const to = projectPoint(end);
  const midpointX = (from.x + to.x) / 2;
  const midpointY = Math.min(from.y, to.y) - Math.max(7, Math.abs(to.x - from.x) * 0.14);

  return `M ${from.x} ${from.y} Q ${midpointX} ${midpointY} ${to.x} ${to.y}`;
}

function LocationDot({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r="1.7" fill={color} opacity="0.16" />
      <circle cx={x} cy={y} r="0.68" fill={color} />
    </g>
  );
}

export default function WorldMap({
  dots,
  activeIndex = 0,
  lineColor = '#fc5d01',
  className = '',
}: WorldMapProps) {
  const prefersReducedMotion = useReducedMotion();
  const id = useId().replace(/:/g, '');
  const activeDot = dots[activeIndex] ?? dots[0];

  if (!activeDot) return null;

  const origin = projectPoint(activeDot.start);
  const destination = projectPoint(activeDot.end);
  const route = createArc(activeDot.start, activeDot.end);
  const gradientId = `route-gradient-${id}`;

  return (
    <div className={`relative aspect-[199/80] w-full overflow-hidden bg-white ${className}`}>
      <Image
        src="/images/world-map-dots.svg"
        alt=""
        fill
        priority={false}
        sizes="(max-width: 768px) 100vw, 1200px"
        className="pointer-events-none select-none object-contain"
        aria-hidden="true"
      />

      <svg
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label={`Tuyến kết nối từ ${activeDot.start.label ?? 'Việt Nam'} đến ${activeDot.end.label ?? 'điểm đến quốc tế'}`}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={lineColor} stopOpacity="0" />
            <stop offset="8%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="92%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
          </linearGradient>
        </defs>

        <AnimatePresence mode="wait">
          <motion.g
            key={activeIndex}
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.45 }}
          >
            <motion.path
              d={route}
              fill="none"
              stroke={`url(#${gradientId})`}
              strokeWidth="0.27"
              strokeLinecap="round"
              initial={prefersReducedMotion ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 1.7, ease: 'easeInOut' }}
            />

            <motion.g
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              style={{ transformOrigin: `${origin.x}px ${origin.y}px` }}
            >
              <LocationDot x={origin.x} y={origin.y} color={lineColor} />
            </motion.g>

            <motion.g
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : 1.45 }}
              style={{ transformOrigin: `${destination.x}px ${destination.y}px` }}
            >
              <LocationDot x={destination.x} y={destination.y} color={lineColor} />
            </motion.g>
          </motion.g>
        </AnimatePresence>
      </svg>
    </div>
  );
}