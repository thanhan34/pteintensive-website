import { NextResponse } from 'next/server';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email } = body;

    // Validate required fields
    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Add registration to Firestore
    const registrationData = {
      name,
      phone,
      email,
      createdAt: new Date().toISOString(),
      status: 'pending' // pending, contacted, completed
    };

    const docRef = await addDoc(collection(db, 'registrations'), registrationData);

    return NextResponse.json({
      message: 'Registration successful',
      id: docRef.id
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Failed to process registration' },
      { status: 500 }
    );
  }
}
