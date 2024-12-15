"use client";

import { useState } from 'react';
import ImagePreview from '@/app/components/ImagePreview';
import ImageUpload from '@/app/components/ImageUpload';
import { FaPlus } from 'react-icons/fa';

interface Image {
  id: string;
  url: string;
  alt: string;
}

interface ImageGalleryProps {
  images: Image[];
  section: 'teachers' | 'reviews' | 'courses';
  onAdd: (url: string) => void;
  onRemove: (id: string) => void;
  maxImages?: number;
  aspectRatio?: 'square' | 'video' | 'portrait';
  className?: string;
}

export default function ImageGallery({
  images,
  section,
  onAdd,
  onRemove,
  maxImages = Infinity,
  aspectRatio = 'square',
  className = ''
}: ImageGalleryProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (url: string) => {
    setIsUploading(false);
    onAdd(url);
  };

  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}>
      {/* Existing Images */}
      {images.map((image) => (
        <ImagePreview
          key={image.id}
          src={image.url}
          alt={image.alt}
          section={section}
          onRemove={() => onRemove(image.id)}
          aspectRatio={aspectRatio}
        />
      ))}

      {/* Upload Button */}
      {images.length < maxImages && (
        <div className={`
          relative border-2 border-dashed border-gray-300 rounded-lg
          hover:border-red-500 transition-colors cursor-pointer
          ${aspectRatio === 'square' ? 'aspect-square' : 
            aspectRatio === 'video' ? 'aspect-video' : 
            'aspect-[3/4]'}
        `}>
          {isUploading ? (
            <ImageUpload
              onUpload={handleUpload}
              section={section}
              className="absolute inset-0"
            />
          ) : (
            <button
              onClick={() => setIsUploading(true)}
              className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 hover:text-red-500"
            >
              <FaPlus className="w-8 h-8 mb-2" />
              <span>Add Image</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// Example usage:
/*
function TeacherGallery() {
  const [images, setImages] = useState<Image[]>([]);

  const handleAdd = (url: string) => {
    setImages([
      ...images,
      {
        id: Date.now().toString(),
        url,
        alt: 'Teacher image'
      }
    ]);
  };

  const handleRemove = (id: string) => {
    setImages(images.filter(img => img.id !== id));
  };

  return (
    <ImageGallery
      images={images}
      section="teachers"
      onAdd={handleAdd}
      onRemove={handleRemove}
      maxImages={5}
      aspectRatio="square"
    />
  );
}

// Or with a single image limit:
function CourseImage({ imageUrl, onImageChange }: { imageUrl?: string; onImageChange: (url: string) => void }) {
  const images = imageUrl ? [{ id: '1', url: imageUrl, alt: 'Course image' }] : [];

  return (
    <ImageGallery
      images={images}
      section="courses"
      onAdd={onImageChange}
      onRemove={() => onImageChange('')}
      maxImages={1}
      aspectRatio="video"
      className="max-w-xl mx-auto"
    />
  );
}
*/
