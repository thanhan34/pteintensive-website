import { SignIn } from "@clerk/nextjs";
import { Suspense } from 'react';

export default function SignInPage() {
  return (
    <main className="billing-shell flex min-h-screen items-center justify-center px-4 py-32">
      <Suspense fallback={<p>Đang tải đăng nhập…</p>}><SignIn fallbackRedirectUrl="/cart" /></Suspense>
    </main>
  );
}
