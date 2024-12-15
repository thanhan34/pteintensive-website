"use client";

import { useState, useEffect } from 'react';
import { onConnectionStateChange } from '../../lib/firebase';
import { FaWifi, FaExclamationTriangle } from 'react-icons/fa';
import { TbWifiOff } from 'react-icons/tb';

export default function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    onConnectionStateChange((online) => {
      setIsOnline(online);
      setShowMessage(true);
      // Hide message after 5 seconds
      const timer = setTimeout(() => setShowMessage(false), 5000);
      return () => clearTimeout(timer);
    });
  }, []);

  if (!showMessage) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg transition-all duration-300 ${
        isOnline ? 'bg-green-50' : 'bg-red-50'
      }`}
      style={{
        transform: showMessage ? 'translateY(0)' : 'translateY(100%)',
        opacity: showMessage ? 1 : 0
      }}
    >
      <div className="flex items-center space-x-2">
        {isOnline ? (
          <>
            <FaWifi className="text-green-500" />
            <span className="text-green-700">Back online</span>
          </>
        ) : (
          <>
            <TbWifiOff className="text-red-500" />
            <span className="text-red-700">
              You are offline. Changes will be saved when you reconnect.
            </span>
          </>
        )}
      </div>
    </div>
  );
}

// Offline Banner component for more prominent display
export function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    onConnectionStateChange((online) => {
      setIsOffline(!online);
    });
  }, []);

  if (!isOffline) return null;

  return (
    <div className="bg-red-500 text-white px-4 py-2 text-center">
      <div className="flex items-center justify-center space-x-2">
        <TbWifiOff className="animate-pulse" />
        <span>
          You are currently offline. Changes will be saved when you reconnect.
        </span>
      </div>
    </div>
  );
}

// Loading Error component
interface LoadingErrorProps {
  error: Error;
  retry?: () => void;
}

export function LoadingError({ error, retry }: LoadingErrorProps) {
  return (
    <div className="bg-red-50 border-l-4 border-red-400 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <FaExclamationTriangle className="h-5 w-5 text-red-400" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700">
            {error.message || 'Error loading data'}
          </p>
          {retry && (
            <button
              onClick={retry}
              className="mt-2 text-sm text-red-700 hover:text-red-600 underline"
            >
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
