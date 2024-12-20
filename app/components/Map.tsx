'use client';

import { useEffect, useState } from 'react';

export default function Map() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="h-[600px] bg-gray-100 animate-pulse flex items-center justify-center">
        <div className="text-gray-400">Loading map...</div>
      </div>
    );
  }

  return (
    <div className="h-[600px] relative">
      <iframe
        src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=48%20Derwent%20Place+(PTE%20Intensive)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        width="100%"
        height="600"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="PTE Intensive Location"
        className="absolute inset-0"
      />
    </div>
  );
}
