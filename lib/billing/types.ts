export type CartItem = { kind: 'course' | 'fee'; id: string };
export type BillingLine = CartItem & { title: string; amount: number };
export type Price = { id: string; title: string; amount: number; enabled: boolean };
export type TuitionFee = { id: string; uid?: string; title: string; amount: number; dueDate: string; status: 'unpaid' | 'pending' | 'paid'; orderId?: string; academicApproved?: boolean; courseTitle?: string };
export type BillingOrder = {
  id: string; uid: string; email: string; lines: BillingLine[]; total: number;
  status: 'pending' | 'paid' | 'failed'; createdAt: string; expiresAt: string;
  paymentUrl: string; environment: 'sandbox' | 'production'; transactionNo?: string;
  responseCode?: string; transactionStatus?: string; payDate?: string;
  lastQueryAt?: number; reviewRequired?: boolean;
  name?: string; phone?: string; guestHash?: string;
  archivedAt?: string; archivedBy?: string;
  sandboxResetAt?: string; sandboxResetBy?: string;
  placementDeclaration?: { completed: true; feedback: string; source: 'student-self-report'; recordedAt: string };
};
export const money = (amount: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
export const orderStatus = { pending: 'Đang chờ xác nhận', paid: 'Đã thanh toán', failed: 'Thanh toán không thành công' };