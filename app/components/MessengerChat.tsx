"use client";

import { useEffect } from 'react';

declare global {
  interface Window {
    fbAsyncInit?: () => void;
    FB: any;
  }
}

export default function MessengerChat() {
  useEffect(() => {
    window.fbAsyncInit = function() {
      window.FB?.init({
        xfbml: true,
        version: 'v18.0'
      });
    };

    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    document.body.appendChild(script);

    return () => {
      delete window.fbAsyncInit;
      // Remove the script tag on cleanup
      const fbScript = document.querySelector('script[src*="facebook"]');
      if (fbScript) {
        fbScript.remove();
      }
    };
  }, []);

  return (
    <>
      <div id="fb-root"></div>
      <div 
        className="fb-customerchat"
        data-attribution="biz_inbox"
        data-page_id="100094489217936"
      ></div>
    </>
  );
}
