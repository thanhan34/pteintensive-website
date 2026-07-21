import { getApps, initializeApp, cert, type App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

function normalizePrivateKey(value?: string) {
  if (!value) return undefined;

  return value
    .replace(/^"|"$/g, '')
    .replace(/^'|'$/g, '')
    .replace(/\\n/g, '\n');
}

export function getAdminApp(): App {
  if (getApps().length) return getApps()[0];

  const projectId =
    process.env.FIREBASE_ADMIN_PROJECT_ID ||
    process.env.FIREBASE_PROJECT_ID ||
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL || process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = normalizePrivateKey(process.env.FIREBASE_ADMIN_PRIVATE_KEY || process.env.FIREBASE_PRIVATE_KEY);
  const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

  const missing = [
    ['FIREBASE_ADMIN_PROJECT_ID', projectId],
    ['FIREBASE_ADMIN_CLIENT_EMAIL', clientEmail],
    ['FIREBASE_ADMIN_PRIVATE_KEY', privateKey],
  ].filter(([, value]) => !value).map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(
      `Missing Firebase Admin credentials: ${missing.join(', ')}. ` +
      'Please add them to .env.local or your deployment environment.'
    );
  }

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
    storageBucket,
  });
}

export function getAdminAuth() {
  return getAuth(getAdminApp());
}

export function getAdminDb() {
  return getFirestore(getAdminApp());
}

export function getAdminStorage() {
  return getStorage(getAdminApp());
}
