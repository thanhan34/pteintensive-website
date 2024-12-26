"use client";

import dynamic from 'next/dynamic';

const MessengerChat = dynamic(() => import('./MessengerChat'), {
  ssr: false,
  loading: () => null,
});

export default function MessengerChatWrapper() {
  return (
    <div suppressHydrationWarning>
      <MessengerChat />
    </div>
  );
}
