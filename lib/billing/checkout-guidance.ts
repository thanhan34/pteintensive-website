export type CheckoutContact = { name: string; email: string; phone: string };
export type CheckoutStep = 'placement' | 'items' | 'review' | 'name' | 'email' | 'phone' | 'unavailable' | 'pay' | 'processing';

export function checkoutStep({ placementReady, invalidCount, reviewed, contact, paymentAvailable, busy }: {
  placementReady: boolean; invalidCount: number; reviewed: boolean; contact: CheckoutContact; paymentAvailable: boolean; busy: boolean;
}): CheckoutStep {
  if (busy) return 'processing';
  if (!placementReady) return 'placement';
  if (invalidCount) return 'items';
  if (!reviewed) return 'review';
  if (contact.name.trim().length < 2 || contact.name.length > 100) return 'name';
  if (contact.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) return 'email';
  if (!/^\+?[\d ()-]{8,25}$/.test(contact.phone)) return 'phone';
  return paymentAvailable ? 'pay' : 'unavailable';
}

export const checkoutStepCopy: Record<CheckoutStep, string> = {
  placement: 'Trước tiên: quay lại khóa học để xác nhận bài kiểm tra và nhập nhận xét đầu vào.',
  items: 'Xóa khoản không còn khả dụng trước khi tiếp tục kiểm tra giỏ hàng.',
  review: 'Bước 1/5 · Kiểm tra đúng khóa, khoản thu và tổng tiền, rồi tích xác nhận bên dưới.',
  name: 'Bước 2/5 · Nhập đầy đủ họ và tên học viên (ít nhất 2 ký tự, không chỉ khoảng trắng).',
  email: 'Bước 3/5 · Nhập email liên hệ hợp lệ, ví dụ ban@example.com.',
  phone: 'Bước 4/5 · Nhập số điện thoại hợp lệ, từ 8 đến 25 ký tự.',
  unavailable: 'Đã đủ thông tin. Thanh toán trực tuyến chưa mở; liên hệ trung tâm để được hướng dẫn.',
  pay: 'Bước 5/5 · Kiểm tra tổng tiền lần cuối, rồi bấm thanh toán để chuyển đến VNPAY.',
  processing: 'Đang xử lý yêu cầu. Vui lòng chờ, không bấm thanh toán nhiều lần.',
};