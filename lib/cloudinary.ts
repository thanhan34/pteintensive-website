// We'll use the Cloudinary URL transformation API directly
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
}

export const cloudinaryService = {
  async uploadImage(file: File): Promise<string> {
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      throw new Error('Cloudinary configuration is missing');
    }

    try {
      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      formData.append('cloud_name', CLOUDINARY_CLOUD_NAME);
      formData.append('folder', 'pte-landing'); // Optional: organize uploads in a folder

      // Upload to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
          headers: {
            // Don't set Content-Type header - let the browser set it with the correct boundary
            'Accept': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Cloudinary error:', errorData);
        throw new Error(errorData.error?.message || 'Failed to upload image');
      }

      const data: CloudinaryResponse = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw new Error(error instanceof Error ? error.message : 'Failed to upload image');
    }
  },

  async deleteImage(publicId: string): Promise<void> {
    // Note: Image deletion requires authentication and should be done through your backend
    console.warn('Image deletion through Cloudinary requires backend implementation');
  },

  // Helper function to get public ID from URL
  getPublicIdFromUrl(url: string): string {
    if (!url) return '';
    
    try {
      // Extract the public ID from a Cloudinary URL
      const regex = /\/v\d+\/([^/]+)\.[^.]+$/;
      const match = url.match(regex);
      return match ? match[1] : '';
    } catch (error) {
      console.error('Error extracting public ID:', error);
      return '';
    }
  },

  // Helper function to optimize image URL
  optimizeImage(url: string, options: { width?: number; height?: number; quality?: number } = {}) {
    if (!url || !url.includes('cloudinary.com')) return url;

    try {
      const baseUrl = url.split('/upload/')[0] + '/upload/';
      const transformations: string[] = [];

      if (options.width) transformations.push(`w_${options.width}`);
      if (options.height) transformations.push(`h_${options.height}`);
      if (options.quality) transformations.push(`q_${options.quality}`);
      
      // Add format optimization
      transformations.push('f_auto');

      // Add basic optimizations
      transformations.push('c_limit'); // Scale down if needed
      
      const transformationString = transformations.join(',');
      const imagePath = url.split('/upload/')[1];

      return `${baseUrl}${transformationString}/${imagePath}`;
    } catch (error) {
      console.error('Error optimizing image URL:', error);
      return url;
    }
  },

  // Helper function to generate a placeholder blur URL
  getPlaceholderUrl(url: string): string {
    if (!url || !url.includes('cloudinary.com')) return url;
    return this.optimizeImage(url, {
      width: 10,
      quality: 20
    });
  }
};
