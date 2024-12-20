"use client";

import dynamic from 'next/dynamic';

const MessengerChat = dynamic(() => import('./MessengerChat'), {
  ssr: false,
});

export default function MessengerChatWrapper() {
  return <MessengerChat />;
}
