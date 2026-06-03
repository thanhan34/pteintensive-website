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
        src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=vi&amp;q=2C6%20Nguy%E1%BB%85n%20Khuy%E1%BA%BFn%2C%20Ph%C6%B0%E1%BB%9Dng%20B%C3%ACnh%20%C4%90%E1%BB%A9c%2C%20An%20Giang+(PTE%20Intensive%20TR%E1%BB%A4%20S%E1%BB%9E)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        width="100%"
        height="600"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="PTE Intensive TRỤ SỞ Location"
        className="absolute inset-0"
      />
    </div>
  );
}
