"use client";

import { useState } from 'react';
import OptimizedImage from './OptimizedImage';
import { FaTimes } from 'react-icons/fa';

interface ImagePreviewProps {
  src: string;
  alt: string;
  section?: 'teachers' | 'reviews' | 'courses';
  onRemove?: () => void;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'portrait';
}

export default function ImagePreview({
  src,
  alt,
  section,
  onRemove,
  className = '',
  aspectRatio = 'square'
}: ImagePreviewProps) {
  const [isHovered, setIsHovered] = useState(false);

  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]'
  };

  return (
    <div 
      className={`
        relative rounded-lg overflow-hidden
        ${aspectRatioClasses[aspectRatio]}
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <OptimizedImage
        src={src}
        alt={alt}
        section={section}
        className={`
          transition-transform duration-300
          ${isHovered ? 'scale-110' : 'scale-100'}
        `}
      />
      
      {/* Overlay */}
      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300">
          {/* Remove button */}
          {onRemove && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              aria-label="Remove image"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// Example usage:
/*
function AdminImageGallery() {
  const handleRemove = (imageId: string) => {
    // Handle image removal
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((image) => (
        <ImagePreview
          key={image.id}
          src={image.url}
          alt={image.alt}
          section="teachers"
          onRemove={() => handleRemove(image.id)}
          aspectRatio="square"
        />
      ))}
    </div>
  );
}

// Or as a simple preview:
function SingleImagePreview({ imageUrl }: { imageUrl: string }) {
  return (
    <ImagePreview
      src={imageUrl}
      alt="Preview"
      section="courses"
      aspectRatio="video"
      className="w-full max-w-md mx-auto"
    />
  );
}
*/
