"use client";

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    fbAsyncInit?: () => void;
    FB?: {
      init: (config: { xfbml: boolean; version: string }) => void;
    };
  }
}

export default function MessengerChat() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Load Facebook SDK
    const loadFacebookSDK = () => {
      if (document.getElementById('facebook-jssdk')) return;

      const script = document.createElement('script');
      script.id = 'facebook-jssdk';
      script.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      
      script.onload = () => {
        window.fbAsyncInit = function() {
          window.FB?.init({
            xfbml: true,
            version: 'v18.0'
          });
        };
      };

      document.body.appendChild(script);
    };

    loadFacebookSDK();

    return () => {
      // Cleanup
      if (window.FB) {
        delete window.fbAsyncInit;
      }
      const fbRoot = document.getElementById('fb-root');
      if (fbRoot) {
        fbRoot.innerHTML = '';
      }
      const fbScript = document.getElementById('facebook-jssdk');
      if (fbScript) {
        fbScript.remove();
      }
    };
  }, [isClient]);

  if (!isClient) return null;

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
