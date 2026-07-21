import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getDatabase, Database } from 'firebase/database';
import { getAuth, Auth } from 'firebase/auth';

const fallbackFirebaseConfig = {
  apiKey: 'AIzaSyCBbrlKP1BOO3LRkNXiOEqAE2cmIqLt6nk',
  authDomain: 'pteintensive-91dc2.firebaseapp.com',
  projectId: 'pteintensive-91dc2',
  storageBucket: 'pteintensive-91dc2.firebasestorage.app',
  messagingSenderId: '299717389530',
  appId: '1:299717389530:web:a352258282218e9c4d09e3',
  measurementId: 'G-DLG1RYCVR8',
};

function envOrFallback(envVar: keyof typeof envToFallbackKey) {
  return process.env[envVar] || fallbackFirebaseConfig[envToFallbackKey[envVar]];
}

const envToFallbackKey = {
  NEXT_PUBLIC_FIREBASE_API_KEY: 'apiKey',
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: 'authDomain',
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: 'projectId',
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: 'storageBucket',
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: 'messagingSenderId',
  NEXT_PUBLIC_FIREBASE_APP_ID: 'appId',
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: 'measurementId',
} as const;

// Validate required environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID'
] as const;

// Check environment variables with better error handling
const missingVars: string[] = [];
for (const envVar of requiredEnvVars) {
  if (!envOrFallback(envVar)) {
    missingVars.push(envVar);
  }
}

if (missingVars.length > 0) {
  console.warn('Missing environment variables:', missingVars);
}

const projectId = envOrFallback('NEXT_PUBLIC_FIREBASE_PROJECT_ID');
const firebaseConfig = {
  apiKey: envOrFallback('NEXT_PUBLIC_FIREBASE_API_KEY'),
  authDomain: envOrFallback('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN'),
  projectId,
  storageBucket: envOrFallback('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: envOrFallback('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'),
  appId: envOrFallback('NEXT_PUBLIC_FIREBASE_APP_ID'),
  measurementId: envOrFallback('NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID'),
  databaseURL: `https://${projectId}.firebaseio.com`
};

// Initialize Firebase
let app: FirebaseApp;
let db: Firestore;
let storage: FirebaseStorage;
let database: Database;
let auth: Auth;

// Check if Firebase is already initialized
if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    storage = getStorage(app);
    database = getDatabase(app);
    auth = getAuth(app);
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    throw error;
  }
} else {
  app = getApps()[0];
  db = getFirestore(app);
  storage = getStorage(app);
  database = getDatabase(app);
  auth = getAuth(app);
}

export { app, db, storage, database, auth };
