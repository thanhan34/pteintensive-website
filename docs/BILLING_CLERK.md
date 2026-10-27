# Student billing: Clerk and VNPAY

This document supersedes the guest/self-declaration/session-only sections of BILLING_VNPAY.md. Admin/CMS authentication remains Firebase; student billing authentication uses Clerk. Do not migrate Firebase users/roles automatically.

## Setup and production gates

- Clerk app: **PTE Intensive Website** (`app_3LFv1uX4mzgTRsGMlMLCynleAPD`). CLI initialized the development instance and wrote keys directly to ignored `.env.local`. Never commit or print secrets.
- SDK/provider/proxy follow the official Next.js App Router quickstart: https://clerk.com/docs/nextjs/getting-started/quickstart . `proxy.ts` installs Clerk but does not make every route private. Server APIs enforce the authenticated student ID. IPN/Return remain accessible without Clerk login.
- Deployment needs this Clerk application's production instance, authorized domains, production keys, sign-in methods and approved privacy/retention policy. Existing Firebase admin setup is unchanged. Use `/sign-in` for students and existing `/login` for admin/CMS.
- New keys: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`, `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up`.
- Firestore data stays server-only via Admin SDK. Deploy `firestore.rules` including `billingDrafts`; no Clerk-to-Firebase custom token bridge is needed.

## Ownership and input requirements

- New orders use the verified Clerk user ID, not a posted UID or posted email. Student contact fields identify the learner, not authorization.
- A signed-in payer redeems the existing private fee token. In a transaction, an unclaimed fee gets `payerUid`; subsequent devices can access through that account without the link. Another account cannot claim an already bound fee, even if it has the same email or link.
- Staff approval (`academicReview` reference, course, reviewer and timestamp) is required server-side for private fees. Approved fees bypass student self-declaration. Legacy fees lacking staff approval must be reviewed by staff; do not fabricate approval or bypass it.
- Listed course purchases still require the placement declaration. This is explicitly a student self-report, not an automatically verified test result. Mixed carts apply each requirement independently.
- Link rotation revokes the bearer token but does not remove an existing account binding. Staff should verify the intended payer before sharing. No public email lookup exists.
- Guest orders from the old flow are NOT silently claimed by matching email. Financial records and locks remain untouched. Staff can look them up for support; automatic legacy-account migration is not implemented.
- Unbound legacy fees already pending/paid are not redeemed into an account automatically. Contact staff for lookup; do not change the old financial lock owner.

## Drafts and 30-minute review

- `billingDrafts/{clerkUserId}` stores cart, self-reported declaration and learner contact. Autosave is debounced (400ms), serialized in one browser and flushed before checkout and on page hide. Network errors are visible. A signed-in account boundary remounts the context; saves carry an account header verified against Clerk to avoid an old tab writing into another account.
- Reload/return restores drafts from Firestore. After 30 minutes since the last save, the draft is retained and a review prompt blocks checkout until acknowledged. The learner still reviews items/total via the checkout checkbox. No test or staff approval is erased by this timer.
- This is a review window, not automatic data deletion, not a Clerk session timeout and not VNPAY's payment expiry. Configure a real retention policy separately before production. Concurrent devices currently use last completed save; no real-time collaborative merge is claimed.
- Saving requires a working network. An immediate force-close before an unsent save cannot be guaranteed. No card information is collected or stored by this site.

## VNPAY: official integration rules

Primary reference supplied by the merchant's VNPAY team:
https://sandbox.vnpayment.vn/apis/docs/thanh-toan-pay/pay.html#code-ipn-url

QueryDR reference:
https://sandbox.vnpayment.vn/apis/docs/truy-van-hoan-tien/querydr&refund.html

- PAY 2.1.0 uses sorted/encoded fields and HMAC-SHA512; VND amount is multiplied by 100. Date fields are GMT+7. Issued payment links retain the existing 15-minute expiry; this is separate from draft review.
- Return only validates the redirect and locates the account order. It NEVER settles payment. Closing the browser does not prevent IPN settlement.
- IPN validates signature, merchant, format, amount, order, environment and current state. Settlement and item locks are transactional and idempotent. `RspCode` acknowledges IPN processing, not payment success.
- Signed uncertain results are recorded for review with locks retained. Success requires response/status `00`/`00`; a definitive error status `02` may release locks. Fraud code `07`, reversal, incomplete and refund-related statuses are not mapped blindly to retryable failure.
- VNPAY documents up to 10 IPN calls with 5-minute retry spacing. The UI's initial one-minute polling window does not imply a failure after that minute.
- `/api/billing/check` is authenticated, owner-only QueryDR, with a transactional one-minute merchant-side cooldown. This interval is a local safety policy, not a claimed VNPAY SLA. Request IDs are random, unique per request; QueryDR uses pipe-delimited signatures, not PAY URL signing. Verify response signature, merchant, reference, amount and transaction type. API response `00` alone is not payment success; inspect transaction status.
- Set **`VNPAY_QUERY_IP`** to the valid IP of the server making QueryDR calls. Sandbox endpoint is fixed. Production requires **`VNPAY_QUERY_URL`** confirmed with VNPAY and HTTPS on `pay.vnpay.vn`. If missing, the UI gives a support message; never fake a result. No automatic refund is implemented.
- Query errors, missing transactions, timeouts and local payment-link expiry never independently release locks. Do not create another payable attempt while the old result is uncertain.
- Successful payment shows amount, order/transaction ID and contact action for class onboarding; it does not claim automatic enrollment, tax invoice issuance or an email receipt.

## Verification and remaining operational work

Run `npm run test:billing`, `npm run typecheck`, `npm run lint`, `npm run build`, and `npx clerk@latest doctor`. Tests use isolated provider/Firestore fixtures, never production payment calls.

Before go-live, test real Clerk sign-in/sign-out/account switching and VNPAY sandbox: success, cancellation, expiry, delayed/duplicate IPN, Return before/after IPN, QueryDR signatures/cooldown, two tabs, lost checkout response and cross-account access. Register a public HTTPS IPN endpoint with VNPAY. Apply WAF/rate limiting and monitor unresolved payments. Neither deploy nor production payment acceptance is automatic.