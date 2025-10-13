import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  env: {
    NEXT_PUBLIC_FIREBASE_API_KEY: 'AIzaSyCBbrlKP1BOO3LRkNXiOEqAE2cmIqLt6nk',
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: 'pteintensive-91dc2.firebaseapp.com',
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: 'pteintensive-91dc2',
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: 'pteintensive-91dc2.firebasestorage.app',
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: '299717389530',
    NEXT_PUBLIC_FIREBASE_APP_ID: '1:299717389530:web:a352258282218e9c4d09e3',
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: 'G-DLG1RYCVR8',
  },
};

export default nextConfig;
