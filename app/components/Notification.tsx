"use client";

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaCheckCircle, FaExclamationCircle, FaTimes } from 'react-icons/fa';

export type NotificationType = 'success' | 'error';

interface NotificationProps {
  type: NotificationType;
  message: string;
  duration?: number;
  onClose: () => void;
}

function NotificationContent({ type, message, onClose }: NotificationProps) {
  const bgColor = type === 'success' ? 'bg-green-50' : 'bg-red-50';
  const borderColor = type === 'success' ? 'border-green-400' : 'border-red-400';
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';
  const Icon = type === 'success' ? FaCheckCircle : FaExclamationCircle;

  return (
    <div className={`fixed top-4 right-4 w-96 ${bgColor} border-l-4 ${borderColor} p-4 shadow-lg rounded-r-lg z-50`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <Icon className={`h-5 w-5 ${type === 'success' ? 'text-green-400' : 'text-red-400'}`} />
        </div>
        <div className="ml-3 flex-1">
          <p className={`text-sm ${textColor}`}>{message}</p>
        </div>
        <div className="ml-4 flex-shrink-0">
          <button
            type="button"
            className={`inline-flex ${textColor} hover:${type === 'success' ? 'text-green-600' : 'text-red-600'}`}
            onClick={onClose}
          >
            <FaTimes className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function Notification({ type, message, duration = 5000, onClose }: NotificationProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [portalRoot, setPortalRoot] = useState<Element | null>(null);

  useEffect(() => {
    setIsMounted(true);
    // Only set portal root when on client side
    if (typeof window !== 'undefined') {
      setPortalRoot(document.body);
    }

    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  // Don't render anything on server or before mount
  if (!isMounted || !portalRoot) {
    return null;
  }

  return createPortal(
    <NotificationContent
      type={type}
      message={message}
      onClose={onClose}
    />,
    portalRoot
  );
}

// Context and hook for managing notifications
import { createContext, useContext, useCallback, ReactNode } from 'react';

interface NotificationContextType {
  showNotification: (type: NotificationType, message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<{
    type: NotificationType;
    message: string;
  } | null>(null);

  const showNotification = useCallback((type: NotificationType, message: string) => {
    setNotification({ type, message });
  }, []);

  const hideNotification = useCallback(() => {
    setNotification(null);
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={hideNotification}
        />
      )}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}

// Example usage:
/*
function MyComponent() {
  const { showNotification } = useNotification();

  const handleSuccess = () => {
    showNotification('success', 'Operation completed successfully!');
  };

  const handleError = () => {
    showNotification('error', 'An error occurred. Please try again.');
  };

  return (
    <button onClick={handleSuccess}>
      Show Success
    </button>
  );
}
*/
