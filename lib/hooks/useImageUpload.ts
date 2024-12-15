import { useState, useCallback } from 'react';
import { uploadService } from '../services/uploadService';
import { useNotification } from '../../app/components/Notification';

interface UseImageUploadOptions {
  section: 'teachers' | 'reviews' | 'courses';
  onSuccess?: (url: string) => void;
  onError?: (error: Error) => void;
}

export function useImageUpload({ section, onSuccess, onError }: UseImageUploadOptions) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { showNotification } = useNotification();

  const uploadImage = useCallback(async (file: File) => {
    setIsUploading(true);
    setProgress(0);
    setError(null);

    try {
      // Validate image
      const validation = await uploadService.validateImage(file);
      if (!validation.isValid) {
        throw new Error(validation.error || 'Invalid image');
      }

      // Start upload
      setProgress(10);

      // Upload image
      const imageUrl = await uploadService.uploadImage(file, section);
      
      setProgress(100);
      showNotification('success', 'Image uploaded successfully');
      onSuccess?.(imageUrl);
      return imageUrl;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload image';
      setError(errorMessage);
      showNotification('error', errorMessage);
      onError?.(err instanceof Error ? err : new Error(errorMessage));
      return null;
    } finally {
      setIsUploading(false);
      // Reset progress after a short delay to allow for animation
      setTimeout(() => setProgress(0), 500);
    }
  }, [section, onSuccess, onError, showNotification]);

  const deleteImage = useCallback(async (url: string) => {
    if (!url) return;

    try {
      await uploadService.deleteImage(url);
      showNotification('success', 'Image deleted successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete image';
      showNotification('error', errorMessage);
      throw err;
    }
  }, [showNotification]);

  const getOptimizedUrl = useCallback((url: string) => {
    return uploadService.getOptimizedUrl(url, section);
  }, [section]);

  const getPlaceholderUrl = useCallback((url: string) => {
    return uploadService.getPlaceholderUrl(url);
  }, []);

  return {
    uploadImage,
    deleteImage,
    getOptimizedUrl,
    getPlaceholderUrl,
    isUploading,
    progress,
    error,
  };
}

// Example usage:
/*
function ImageUploadComponent() {
  const { uploadImage, isUploading, progress, error } = useImageUpload({
    section: 'teachers',
    onSuccess: (url) => {
      console.log('Upload successful:', url);
    },
    onError: (error) => {
      console.error('Upload failed:', error);
    }
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = await uploadImage(file);
      if (imageUrl) {
        // Handle successful upload
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {isUploading && (
        <div>
          <progress value={progress} max={100} />
          <span>{progress}%</span>
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
}
*/
