import { NextRequest, NextResponse } from 'next/server';
import { doc, setDoc, updateDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/initFirebase';

export async function POST(request: NextRequest) {
  try {
    const { uid, email } = await request.json();
    
    // Only allow specific email
    if (email !== 'dtan42@gmail.com') {
      return NextResponse.json(
        { error: 'Unauthorized email' },
        { status: 403 }
      );
    }

    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      // Update existing user
      await updateDoc(userRef, {
        roles: ['admin'],
        updatedAt: serverTimestamp(),
      });
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
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error setting admin role:', error);
    return NextResponse.json(
      { error: 'Failed to set admin role' },
      { status: 500 }
    );
  }
}
