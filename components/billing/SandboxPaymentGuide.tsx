export function SandboxPaymentGuide({ environment }: { environment: 'sandbox' | 'production' }) {
  if (environment !== 'sandbox') return null;
  return <details className="student-alert block">
    <summary className="min-h-11 cursor-pointer rounded-lg py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">Hướng dẫn thanh toán thử bằng thẻ NCB</summary>
    <div className="space-y-4 pb-4 text-sm">
      <p>Chỉ dùng trên VNPAY Sandbox. Không nhập thẻ thật; giao dịch thử không ghi nhận học phí thực tế.</p>
      <dl className="grid gap-3 sm:grid-cols-2">
        <div><dt className="text-gray-600">Ngân hàng</dt><dd className="font-semibold">NCB</dd></div>
        <div><dt className="text-gray-600">Số thẻ test</dt><dd className="break-all font-semibold tabular-nums">9704198526191432198</dd></div>
        <div><dt className="text-gray-600">Tên chủ thẻ</dt><dd className="font-semibold">NGUYEN VAN A</dd></div>
        <div><dt className="text-gray-600">Ngày phát hành</dt><dd className="font-semibold tabular-nums">07/15</dd></div>
        <div><dt className="text-gray-600">OTP test</dt><dd className="font-semibold tabular-nums">123456</dd></div>
      </dl>
      <p>Hoàn thành thông tin đầu vào, chọn khoản học phí và nhập thông tin liên hệ. Bấm “Thanh toán qua VNPAY”, chọn thẻ nội địa NCB tại cổng thử nghiệm rồi dùng thông tin trên.</p>
      <p>Khi quay lại, mở “Lịch sử đơn” và bấm “Cập nhật”. Đơn chỉ được xác nhận khi máy chủ nhận được thông báo hợp lệ từ VNPAY; nếu còn chờ, không tạo đơn thanh toán lại.</p>
    </div>
  </details>;
}