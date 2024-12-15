"use client";

import { useEffect, useState } from 'react';

export default function LoadingSpinner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show loading spinner after a delay and if loading is still needed
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#fc5d01] border-t-transparent"></div>
      </div>
    </div>
  );
}
