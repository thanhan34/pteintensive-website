import { NextResponse } from 'next/server';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import sgMail from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error('SENDGRID_API_KEY environment variable is required');
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

    // Send email notification
    const msg = {
      to: process.env.ADMIN_EMAIL!,
      from: process.env.FROM_EMAIL!,
      subject: 'New Course Registration',
      html: `
        <h2>New Course Registration</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        ${body.course ? `<p><strong>Course:</strong> ${body.course}</p>` : ''}
        ${body.message ? `<p><strong>Message:</strong> ${body.message}</p>` : ''}
      `,
    };

    await sgMail.send(msg);

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
