import { NotificationType } from '../../app/components/Notification';

interface OperationConfig {
  successMessage?: string;
  errorMessage?: string;
  showNotification: (type: NotificationType, message: string) => void;
}

export async function handleFirebaseOperation<T>(
  operation: () => Promise<T>,
  config: OperationConfig
): Promise<T | undefined> {
  try {
    const result = await operation();
    if (config.successMessage) {
      config.showNotification('success', config.successMessage);
    }
    return result;
  } catch (error) {
    const errorMessage = error instanceof Error 
      ? error.message 
      : config.errorMessage || 'An error occurred';
    
    config.showNotification('error', errorMessage);
    console.error('Firebase operation error:', error);
    return undefined;
  }
}

// Helper functions for common operations
export const firebaseHelpers = {
  async uploadWithNotification(
    uploadFn: () => Promise<string>,
    config: OperationConfig
  ) {
    return handleFirebaseOperation(
      uploadFn,
      {
        successMessage: config.successMessage || 'File uploaded successfully',
        errorMessage: config.errorMessage || 'Failed to upload file',
        showNotification: config.showNotification
      }
    );
  },

  async deleteWithNotification(
    deleteFn: () => Promise<void>,
    config: OperationConfig
  ) {
    return handleFirebaseOperation(
      deleteFn,
      {
        successMessage: config.successMessage || 'Item deleted successfully',
        errorMessage: config.errorMessage || 'Failed to delete item',
        showNotification: config.showNotification
      }
    );
  },

  async addWithNotification<T>(
    addFn: () => Promise<T>,
    config: OperationConfig
  ) {
    return handleFirebaseOperation(
      addFn,
      {
        successMessage: config.successMessage || 'Item added successfully',
        errorMessage: config.errorMessage || 'Failed to add item',
        showNotification: config.showNotification
      }
    );
  },

  async updateWithNotification(
    updateFn: () => Promise<void>,
    config: OperationConfig
  ) {
    return handleFirebaseOperation(
      updateFn,
      {
        successMessage: config.successMessage || 'Item updated successfully',
        errorMessage: config.errorMessage || 'Failed to update item',
        showNotification: config.showNotification
      }
    );
  }
};

// Example usage:
/*
async function handleImageUpload(file: File) {
  const { showNotification } = useApp();

  const imageUrl = await firebaseHelpers.uploadWithNotification(
    () => uploadService.uploadImage(file, 'images'),
    {
      successMessage: 'Image uploaded successfully',
      errorMessage: 'Failed to upload image',
      showNotification
    }
  );

  if (imageUrl) {
    // Do something with the image URL
  }
}

async function handleTeacherAdd(teacherData: TeacherData) {
  const { showNotification } = useApp();

  const result = await firebaseHelpers.addWithNotification(
    () => teacherService.addTeacher(teacherData),
    {
      successMessage: 'Teacher added successfully',
      errorMessage: 'Failed to add teacher',
      showNotification
    }
  );

  if (result) {
    // Handle successful addition
  }
}
*/
