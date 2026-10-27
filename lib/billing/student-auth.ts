import { auth } from '@clerk/nextjs/server';

// Student identity is always obtained from Clerk, never from a posted UID/email.
export async function studentIdentity(required = true) {
  const { userId } = await auth();
  if (!userId && required) throw new Error('AUTH');
  return userId;
}