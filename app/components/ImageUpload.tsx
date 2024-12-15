"use client";

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useImageUpload } from '@/lib/hooks/useImageUpload';

interface ImageUploadProps {
  onUpload: (url: string) => void;
  section: 'teachers' | 'reviews' | 'courses';
  currentImage?: string;
  className?: string;
}

export default function ImageUpload({ 
  onUpload, 
  section, 
  currentImage,
  className = ''
}: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string>(currentImage || '');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { uploadImage, isUploading, progress, error } = useImageUpload({
    section,
    onSuccess: (url) => {
      onUpload(url);
    }
  });

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Create preview immediately
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      // Upload image
      const imageUrl = await uploadImage(file);
      if (imageUrl) {
        setPreviewUrl(imageUrl);
      } else {
        // Reset preview if upload failed
        setPreviewUrl(currentImage || '');
      }

      // Cleanup
      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      // Reset preview if there was an error
      setPreviewUrl(currentImage || '');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    if (!file) return;

    // Trigger file input change with dropped file
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    if (fileInputRef.current) {
      fileInputRef.current.files = dataTransfer.files;
      const event = new Event('change', { bubbles: true });
      fileInputRef.current.dispatchEvent(event);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className={`
          relative w-full h-40 border-2 border-dashed rounded-lg
          ${isUploading ? 'border-gray-300 bg-gray-50' : 'border-gray-300 hover:border-red-500'}
          transition-colors cursor-pointer
        `}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        {isUploading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-full max-w-xs mx-auto px-4">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-600 bg-red-200">
                      Uploading
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-red-600">
                      {progress}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-red-200">
                  <div 
                    style={{ width: `${progress}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500 transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : previewUrl ? (
          <div className="relative w-full h-full">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity flex items-center justify-center">
              <span className="text-white opacity-0 hover:opacity-100">
                Click or drop to change image
              </span>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
            <svg
              className="w-8 h-8 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span>Click or drop image here</span>
            <span className="text-sm mt-1">Max size: 2MB</span>
          </div>
        )}
      </div>
      {error && (
        <div className="mt-2 text-sm text-red-600">
          {error}
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
