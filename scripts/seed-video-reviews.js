const fs = require('fs');
const path = require('path');
const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, serverTimestamp } = require('firebase/firestore');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');

function loadEnvLocal() {
  const envPath = path.join(process.cwd(), '.env.local');

  if (!fs.existsSync(envPath)) return;

  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex);
    const value = trimmed.slice(separatorIndex + 1).replace(/^['"]|['"]$/g, '');
    process.env[key] = process.env[key] || value;
  }
}

loadEnvLocal();

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const videoReviews = [
  {
    id: 'video-review-1',
    name: 'Du Nguyễn',
    videoUrl: 'https://www.facebook.com/reel/1544208246479839',
    achievement: 'PTE24 - Visa 407',
    course: 'Lớp 30-36',
    displayOrder: 1,
    isActive: true,
  },
  {
    id: 'video-review-2',
    name: 'Nguyễn Hương Quỳnh',
    videoUrl: 'https://www.facebook.com/reel/1846982872581132',
    achievement: 'PTE50 - Visa 500',
    course: 'Lớp 30-36',
    displayOrder: 2,
    isActive: true,
  },
  {
    id: 'video-review-3',
    name: 'Hà Thị Mỹ Linh',
    videoUrl: 'https://www.facebook.com/reel/1697383781219962',
    achievement: 'PTE36 - Visa 482',
    course: 'Lớp Nhóm Online 50+',
    displayOrder: 3,
    isActive: true,
  },
];

async function seedVideoReviews() {
  console.log('Seeding videoReviews to project:', firebaseConfig.projectId);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);

  if (process.env.FIREBASE_AUTH_EMAIL && process.env.FIREBASE_AUTH_PASSWORD) {
    await signInWithEmailAndPassword(
      auth,
      process.env.FIREBASE_AUTH_EMAIL,
      process.env.FIREBASE_AUTH_PASSWORD
    );
    console.log('Signed in as:', process.env.FIREBASE_AUTH_EMAIL);
  } else {
    console.log('No FIREBASE_AUTH_EMAIL/FIREBASE_AUTH_PASSWORD provided; writing without auth.');
  }

  for (const review of videoReviews) {
    const { id, ...data } = review;
    await setDoc(
      doc(db, 'videoReviews', id),
      {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    console.log(`Seeded ${id}: ${data.name}`);
  }

  console.log('Done.');
}

Promise.race([
  seedVideoReviews(),
  new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Seed timed out after 20 seconds')), 20000);
  }),
])
  .then(() => process.exit(0))
  .catch((error) => {
  console.error('Seed failed:', error.code || error.name, error.message);
  process.exit(1);
  });