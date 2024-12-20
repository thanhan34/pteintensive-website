import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error('SENDGRID_API_KEY environment variable is required');
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, phone, message, course } = await request.json();

    console.log('Starting email send process...');

    const msg = {
      to: process.env.ADMIN_EMAIL!,
      from: process.env.FROM_EMAIL!,
      subject: course 
        ? `New Course Registration - ${course}`
        : 'New Contact Form Submission',
      html: `
        <h2>${course ? 'New Course Registration' : 'New Contact Form Submission'}</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        ${course ? `<p><strong>Course:</strong> ${course}</p>` : ''}
        ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
      `,
    };

    console.log('Attempting to send email with options:', {
      to: msg.to,
      from: msg.from,
      subject: msg.subject
    });

    await sgMail.send(msg);
    console.log('Email sent successfully');

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
