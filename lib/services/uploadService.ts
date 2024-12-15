import { cloudinaryService } from '../cloudinary';

interface ImageOptions {
  width?: number;
  height?: number;
  quality?: number;
}

const SECTION_OPTIONS: Record<string, ImageOptions> = {
  teachers: {
    width: 400,
    height: 400,
    quality: 90
  },
  reviews: {
    width: 200,
    height: 200,
    quality: 85
  },
  courses: {
    width: 800,
    height: 450, // Added height for 16:9 aspect ratio
    quality: 90
  }
};

export const uploadService = {
  async uploadImage(file: File, section: string): Promise<string> {
    try {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('File must be an image');
      }

      // Validate file size (2MB limit)
      const MAX_SIZE = 2 * 1024 * 1024; // 2MB in bytes
      if (file.size > MAX_SIZE) {
        throw new Error('Image must be less than 2MB');
      }

      // Validate file dimensions
      const validation = await this.validateImage(file);
      if (!validation.isValid) {
        throw new Error(validation.error || 'Invalid image');
      }

      try {
        // Upload to Cloudinary
        const imageUrl = await cloudinaryService.uploadImage(file);

        // Optimize image based on section
        const options = SECTION_OPTIONS[section] || {};
        return cloudinaryService.optimizeImage(imageUrl, options);
      } catch (error) {
        if (error instanceof Error && error.message.includes('configuration is missing')) {
          throw new Error('Image upload service is not properly configured. Please check your environment variables.');
        }
        throw error;
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  async deleteImage(url: string): Promise<void> {
    if (!url) return;

    try {
      const publicId = cloudinaryService.getPublicIdFromUrl(url);
      if (publicId) {
        await cloudinaryService.deleteImage(publicId);
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  },

  async validateImage(file: File): Promise<{ isValid: boolean; error?: string }> {
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      return { isValid: false, error: 'File must be an image' };
    }

    // Check file size (2MB limit)
    const MAX_SIZE = 2 * 1024 * 1024; // 2MB in bytes
    if (file.size > MAX_SIZE) {
      return { isValid: false, error: 'Image must be less than 2MB' };
    }

    // Check supported formats
    const supportedFormats = ['image/jpeg', 'image/png', 'image/webp'];
    if (!supportedFormats.includes(file.type)) {
      return { 
        isValid: false, 
        error: 'Unsupported image format. Please use JPG, PNG, or WebP'
      };
    }

    // Check image dimensions
    return new Promise((resolve) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      
      img.onload = () => {
        URL.revokeObjectURL(objectUrl);
        
        // Maximum dimensions check
        if (img.width > 4096 || img.height > 4096) {
          resolve({ 
            isValid: false, 
            error: 'Image dimensions too large (max 4096x4096)' 
          });
          return;
        }

        // Minimum dimensions check
        if (img.width < 200 || img.height < 200) {
          resolve({ 
            isValid: false, 
            error: 'Image dimensions too small (min 200x200)' 
          });
          return;
        }

        resolve({ isValid: true });
      };

      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        resolve({ isValid: false, error: 'Invalid image file' });
      };

      img.src = objectUrl;
    });
  },

  // Helper function to get optimized image URL
  getOptimizedUrl(url: string, section: string): string {
    if (!url) return url;
    const options = SECTION_OPTIONS[section] || {};
    return cloudinaryService.optimizeImage(url, options);
  },

  // Helper function to get placeholder URL for blur effect
  getPlaceholderUrl(url: string): string {
    return cloudinaryService.getPlaceholderUrl(url);
  }
};
