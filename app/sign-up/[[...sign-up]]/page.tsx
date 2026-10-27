import { SignUp } from "@clerk/nextjs";
import { Suspense } from 'react';

export default function SignUpPage() {
  return (
    <main className="billing-shell flex min-h-screen items-center justify-center px-4 py-32">
      <Suspense fallback={<p>Đang tải đăng ký…</p>}><SignUp fallbackRedirectUrl="/cart" /></Suspense>
    </main>
  );
}
