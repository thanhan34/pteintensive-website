import type { BillingOrder } from './types';

export function paymentState(order: BillingOrder, now: number) {
  if (order.status === 'paid') return { title: 'Đã thanh toán', detail: 'Học phí đã được ghi nhận. Liên hệ trung tâm kèm mã đơn để nhận hướng dẫn vào lớp.' };
  if (order.status === 'failed') {
    const reasons: Record<string, string> = {
      '11': 'VNPay xác nhận đã hết hạn chờ thanh toán.', '24': 'Giao dịch đã được hủy.',
      '51': 'Ngân hàng báo không đủ số dư.', '65': 'Giao dịch vượt hạn mức thanh toán trong ngày.',
      '75': 'Ngân hàng đang bảo trì.', '13': 'Mã xác thực OTP không đúng.',
    };
    return { title: order.responseCode === '24' ? 'Đã hủy thanh toán' : 'Thanh toán không thành công', detail: `${reasons[order.responseCode || ''] || 'Máy chủ đã ghi nhận giao dịch không thành công.'} Nếu đã bị trừ tiền, liên hệ trung tâm trước khi thử lại.` };
  }
  if (order.reviewRequired || ['04', '07'].includes(order.transactionStatus || '') || order.responseCode === '07') return { title: 'Cần kiểm tra giao dịch', detail: 'Giao dịch cần được xác minh với VNPay. Không thanh toán lại; gửi mã đơn cho trung tâm để tra soát.' };
  if (new Date(order.expiresAt).getTime() <= now) return { title: 'Liên kết hết hạn · Chờ xác minh', detail: 'Không tiếp tục dùng liên kết cũ. Tra cứu kết quả với VNPay; chưa thể kết luận giao dịch thất bại hoặc tạo đơn mới.' };
  return { title: 'Chờ xác nhận', detail: 'Nếu chưa thanh toán, bạn có thể tiếp tục đơn hiện tại. Nếu đã bị trừ tiền, chờ xác nhận và không thanh toán lại.' };
}