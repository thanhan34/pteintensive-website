"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { uploadService } from '../../lib/services/uploadService';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  section?: 'teachers' | 'reviews' | 'courses';
  className?: string;
  priority?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill';
  quality?: number;
}

const DEFAULT_SIZES = {
  teachers: { width: 400, height: 400 },
  reviews: { width: 200, height: 200 },
  courses: { width: 800, height: 450 }
};

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  section,
  className = '',
  priority = false,
  objectFit = 'cover',
  quality
}: OptimizedImageProps) {
  const [optimizedSrc, setOptimizedSrc] = useState(src);
  const [blurDataUrl, setBlurDataUrl] = useState<string | undefined>();
  const [error, setError] = useState<string | null>(null);

  // Get default dimensions based on section
  const defaultSize = section ? DEFAULT_SIZES[section] : null;
  const finalWidth = width || defaultSize?.width || 400;
  const finalHeight = height || defaultSize?.height || 400;

  useEffect(() => {
    if (!src) return;

    try {
      // Get optimized URL if section is provided
      const optimized = section 
        ? uploadService.getOptimizedUrl(src, section)
        : src;
      setOptimizedSrc(optimized);

      // Generate blur placeholder
      const placeholder = uploadService.getPlaceholderUrl(src);
      setBlurDataUrl(placeholder);
    } catch (err) {
      console.error('Error optimizing image:', err);
      setError('Failed to optimize image');
      // Use original source as fallback
      setOptimizedSrc(src);
    }
  }, [src, section]);

  if (error) {
    console.warn('Image optimization error:', error);
  }

  return (
    <div className={`relative ${className}`} style={{ aspectRatio: `${finalWidth}/${finalHeight}` }}>
      <Image
        src={optimizedSrc}
        alt={alt}
        fill
        sizes={`(max-width: 768px) 100vw, ${finalWidth}px`}
        priority={priority}
        placeholder={blurDataUrl ? "blur" : "empty"}
        blurDataURL={blurDataUrl}
        className={`object-${objectFit}`}
        quality={quality || 85}
      />
    </div>
  );
}

// Example usage:
/*
// With section-based sizing
<OptimizedImage
  src="/path/to/image.jpg"
  alt="Description"
  section="teachers"
  className="w-full h-full"
/>

// With custom dimensions
<OptimizedImage
  src="/path/to/image.jpg"
  alt="Description"
  width={400}
  height={300}
  quality={90}
  objectFit="contain"
/>
*/
