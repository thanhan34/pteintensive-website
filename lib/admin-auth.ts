import { NextRequest } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';

export function getAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return getAdminEmails().includes(email.toLowerCase());
}

export async function requireAdminFromRequest(request: NextRequest) {
  const authHeader = request.headers.get('authorization') || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

  if (!token) {
    throw new Error('Missing Firebase ID token');
  }

  const decoded = await adminAuth.verifyIdToken(token);
  if (!isAdminEmail(decoded.email)) {
    throw new Error('Admin access denied');
  }

  return decoded;
}
