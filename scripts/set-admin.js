/**
 * Script to set admin role for a specific user
 * Usage: node scripts/set-admin.js
 */

const { initializeApp } = require('firebase/app');
const { getFirestore, doc, updateDoc, getDoc, setDoc, serverTimestamp } = require('firebase/firestore');

// Firebase config (same as in .env.local)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyCBbrlKP1BOO3LRkNXiOEqAE2cmIqLt6nk',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'pteintensive-91dc2.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'pteintensive-91dc2',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'pteintensive-91dc2.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '299717389530',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:299717389530:web:a352258282218e9c4d09e3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Target email to set as admin
const TARGET_EMAIL = 'dtan42@gmail.com';

async function setAdminRole() {
  try {
    console.log('🔍 Looking for user with email:', TARGET_EMAIL);
    
    // Since we can't query by email directly in Firestore rules,
    // we'll need to find the user by checking all users
    // This is a simplified approach - in production you'd use Firebase Admin SDK
    
    // For now, we'll create a function that can be called from the frontend
    console.log('⚠️  This script needs to be run from the frontend after user signs in');
    console.log('📋 Steps to set admin role:');
    console.log('1. User with email', TARGET_EMAIL, 'needs to sign in first');
    console.log('2. Go to /debug-auth to get the UID');
    console.log('3. Manually update Firestore or use the admin panel');
    
    // Alternative: Create a temporary admin endpoint
    console.log('\n🔧 Creating admin setup endpoint...');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Export function for use in frontend
async function setUserAsAdmin(uid, email) {
  try {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      // Update existing user
      await updateDoc(userRef, {
        roles: ['admin'],
        updatedAt: serverTimestamp(),
      });
      console.log('✅ Updated user roles to admin');
    } else {
      // Create new user document
      await setDoc(userRef, {
        uid: uid,
        email: email,
        displayName: email.split('@')[0],
        roles: ['admin'],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      console.log('✅ Created new user with admin role');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error setting admin role:', error);
    return false;
  }
}

if (require.main === module) {
  setAdminRole();
}

module.exports = { setUserAsAdmin };
