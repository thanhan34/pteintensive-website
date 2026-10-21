# Placement self-declaration before adding courses and checkout

- Students confirm that they completed the placement test and enter the academic feedback they received (10–2000 characters). Clicking the test link alone does not unlock checkout.
- There is no automatic result integration with the placement-test website. Authenticated billing staff must check the actual assessment externally, select the recommended course, enter a review reference (at least 10 characters), and explicitly confirm completion/review when creating a private tuition fee. The server stores the reference, course, staff UID and timestamp; students receive only the approval flag and course title, not internal review notes.
- Enabled listed courses can be added after a valid self-declaration. Private fees still require a valid secret link and unpaid status, but do not require staff review metadata for guest checkout. Admin fee creation retains the staff review fields as an independent audit record.
- The API validates the declaration, but cannot prove completion or feedback authenticity. Orders store the trimmed feedback, server timestamp and `student-self-report` source; the admin order view labels it unverified. No student declaration becomes staff approval. Prices, payment locks, contact fields and IPN checks remain server-controlled.
- Feedback drafts are kept only in shared React state, not localStorage. Client-side navigation between courses and cart preserves them; reload requires re-entry. Existing cart contents do not bypass the declaration check. Legacy `?add=` URLs no longer silently add a course before confirmation.
- Existing pending payments still require IPN/manual reconciliation; this change does not cancel an already-issued gateway URL or unlock pending financial records.

# Học phí và VNPAY — vận hành

## Các màn hình
- `/courses`: danh mục khóa và quy trình đầu vào. Thêm vào giỏ không chuyển trang; học viên mở biểu tượng giỏ trên navigation để tiếp tục.
- `/student`: chuyển hướng tương thích sang `/cart`, giữ query và fragment trên trình duyệt để liên kết học phí và callback cũ tiếp tục dùng được. Các URL cũ `/courses?tab=cart` và `/courses#fee=...` cũng được chuyển tiếp.
- `/cart`: khoản đã chọn, học phí cá nhân và lịch sử đơn. Học viên nhập họ tên, email, điện thoại lúc tạo đơn; không tạo tài khoản Firebase. Nhận xét đầu vào được giữ trong bộ nhớ khi chuyển trang, tải lại cần nhập lại.
- `/admin/billing`: quản lý giá, tạo khoản thu theo email liên hệ (không cần tài khoản), tra cứu 100 đơn/khoản thu gần nhất và đối soát thủ công.
- Admin API dùng `ADMIN_EMAILS` phía server, không tin vai trò do client gửi. Bổ sung email người phụ trách thu tiền vào danh sách này một cách có kiểm soát.

## Trước triển khai
1. Deploy Firestore rules đã sửa bằng quy trình Firebase của trung tâm. Chặn client ghi tài liệu tài chính và chặn tự tạo profile với quyền admin. Rà soát tài khoản có quyền cao hiện hữu (rules mới không sửa dữ liệu cũ).
2. Kiểm tra Firebase Admin credentials và Firebase Auth dành cho admin. Học viên không dùng Firebase Auth. Không commit khóa vào Git.
3. Giữ `VNPAY_ENABLED=false` cho tới khi có sandbox. Không có giá mẫu hoặc giao dịch thành công giả. Thiết lập giá thật trong admin.
4. Tất cả thanh toán bằng VND. Mỗi khoản thu là một lần đóng đủ; thu nhiều đợt bằng nhiều khoản. Hạn thu chỉ là thông tin hiển thị, không tự hết hiệu lực. Không tự ghi danh/xếp lớp, gửi email biên nhận, phát hành hóa đơn thuế, hoàn tiền hay thu định kỳ.

## Đăng ký với VNPAY
Chuẩn bị thông tin đơn vị, người đại diện/liên hệ, MST, tài khoản nhận tiền, tên miền, dịch vụ đào tạo, học phí và chính sách hủy/hoàn/bảo mật. Đây là checklist trao đổi, không thay thế danh sách hồ sơ VNPAY cấp theo loại hình đơn vị.
Yêu cầu rõ Cổng thanh toán website có thẻ tín dụng/thẻ quốc tế (không chỉ QR); xác nhận loại thẻ, thẻ nước ngoài, phí, đối soát, chu kỳ chuyển tiền, hoàn tiền, chargeback, tài khoản merchant và quy trình nghiệm thu.

## Sandbox
Tài liệu chính thức: https://sandbox.vnpayment.vn/apis/docs/thanh-toan-pay/pay.html
Đăng ký kết nối thử theo hướng dẫn tài liệu (devreg); không dùng khóa demo dùng chung.
Mẫu biến được commit trong `.env.billing.example`. Điền biến trong `.env.local` hoặc môi trường deploy, KHÔNG gửi secret vào chat:
```
VNPAY_ENABLED=true
VNPAY_ENVIRONMENT=sandbox
VNPAY_PRODUCTION_APPROVED=false
VNPAY_TMN_CODE=<merchant sandbox được cấp>
VNPAY_HASH_SECRET=<secret sandbox được cấp>
BILLING_BASE_URL=https://<tên miền sandbox hoặc tunnel HTTPS>
BILLING_TRUST_PROXY=false
```
Khởi động lại ứng dụng. `BILLING_BASE_URL` là origin HTTPS, không có path. Nếu deployment có proxy tin cậy luôn ghi đè `x-forwarded-for`, mới đặt `BILLING_TRUST_PROXY=true` để truyền IP học viên. Mặc định dùng loopback cho local; production phải xác minh cấu hình proxy/IP với hosting trước khi nghiệm thu.

Gửi VNPAY hai endpoint công khai, không yêu cầu Firebase login:
- Return: `https://<domain>/api/payments/vnpay/return`
- IPN GET: `https://<domain>/api/payments/vnpay/ipn`

Return chỉ kiểm tra chữ ký để điều hướng, KHÔNG xác nhận thu tiền. IPN kiểm tra HMAC-SHA512, merchant, tổng tiền nhân 100, môi trường và đơn trước khi cập nhật transaction Firestore. Không ép BankCode; gateway hiển thị phương thức mà merchant được bật. Cần nghiệm thu thực tế thẻ quốc tế.

## Quy trình tra soát
- Tạo đơn đồng thời khóa từng khoản; một khóa đã thanh toán không thể mua lại trong cùng phiên trình duyệt. Đây không phải định danh học viên: thay trình duyệt vẫn có thể mua khóa niêm yết lại. Khoản thu riêng khóa toàn cục theo mã khoản thu, không phụ thuộc thiết bị.
- URL hết hạn sau 15 phút nhưng không tự giải phóng khóa: chưa có IPN không đồng nghĩa chưa trừ tiền.
- Chỉ thành công `ResponseCode=00` và `TransactionStatus=00` ghi nhận đã thu. Trạng thái lỗi `02` có thể mở thanh toán lại; trạng thái đảo/gian lận/đang xử lý giữ chờ đối soát.
- Admin kiểm tra trên cổng merchant hoặc với VNPAY, sau đó chọn kết quả trong đơn pending, nhập bằng chứng tra soát và xác nhận trách nhiệm. Dữ liệu ghi lại UID admin, bằng chứng, thời gian; đơn đã settle không sửa lại được qua chức năng này.
- Không đánh dấu thất bại chỉ dựa trên lời học viên hoặc hết hạn URL. Xác nhận sai có thể dẫn tới thu trùng. Không có querydr tự động trong phiên bản này.
- Sandbox và production phải dùng Firebase project/dữ liệu tách biệt. Không tái sử dụng khóa học đã trả tiền sandbox ở môi trường thật.

## Kiểm thử
`node --test scripts/test-billing.cjs`: ký/kiểm chữ ký, mã hóa, timezone, cấu hình fail-closed, mixed checkout, quyền sở hữu, khóa, tổng tiền trusted, IPN sai/lặp/thành công/thất bại và đối soát. Test dùng Firestore giả trong bộ nhớ, không gọi hệ thống thật; chưa thay thế kiểm thử Emulator về concurrency/rules.
`npm run typecheck`, `npm run lint`, `npm run build`.
Sandbox end-to-end bắt buộc: thành công thẻ, hủy, thất bại, hết hạn, đóng trình duyệt, IPN đến trước/sau Return, retry IPN, đồng thời checkout hai tab, cross-user access, mất mạng sau tạo đơn, sửa số tiền và đối soát. Kiểm tra mobile/desktop với tài khoản học viên và admin thật trên môi trường thử riêng.

## Go-live
Chỉ sau nghiệm thu và xác nhận nhận thẻ quốc tế: dùng credentials production, `VNPAY_ENVIRONMENT=production`, `VNPAY_PRODUCTION_APPROVED=true`, `VNPAY_ENABLED=true`, origin HTTPS thật. Xác nhận URL gateway production với VNPAY trước khi bật. Đăng ký IPN, kiểm thử giao dịch kiểm soát và đối soát số tiền thực nhận. Thiết lập giám sát lỗi IPN và người xử lý đơn pending hàng ngày.
Hiện chưa có rate limiting theo IP/WAF, querydr/hoàn tiền tự động hoặc chính sách lưu trữ/xóa dữ liệu. Có giới hạn 5 đơn thành công tạo mỗi 15 phút theo phiên, nhưng khách có thể thay phiên; phải bổ sung chống bot/WAF ở hosting trước khi public rộng. Collection `billingLimits` có `expiresAt`; cấu hình Firestore TTL hoặc dọn định kỳ.

## Liên kết học phí và quyền xem đơn không đăng nhập
- Tạo khoản học phí mới bắt buộc admin nhập **nội dung đánh giá bài kiểm tra đầu vào** (`assessmentFeedback`, tối thiểu 10 ký tự sau trim, tối đa 2.000 ký tự đầu vào), ngoài tham chiếu bài thi, khóa đề xuất và xác nhận học thuật hiện có. API kiểm tra độc lập với form; nội dung được trim và lưu tại `academicReview.feedback` cùng người/thời điểm ghi nhận. API khách không trả nội dung đánh giá nội bộ. Không sửa dữ liệu khoản thu cũ hoặc thay thế khai báo đầu vào của học viên.
- Trong `/admin/billing` → Khoản thu riêng, admin có thể tạo khoản thu và xóa khoản `unpaid` không có `orderId` hoặc khóa giao dịch. Xóa cần xác nhận, thu hồi liên kết bằng cách xóa khoản gốc; giữ nhật ký tối thiểu tại `billingFeeDeletions` (mã, tiêu đề, số tiền, admin, thời điểm), không lưu token. Không xóa đơn hoặc khoản đang chờ/đã thanh toán. Nếu học viên đã thêm khoản bị xóa vào giỏ, khoản đó trở thành không khả dụng và cần xóa khỏi giỏ. API kiểm tra trạng thái và khóa trong cùng transaction để tránh xóa đồng thời với checkout.
- Admin tạo khoản thu rồi sao chép URL `/cart#fee=<id>&access=<token>` gửi riêng qua kênh trung tâm. Token ngẫu nhiên 256-bit chỉ hiển thị một lần; database lưu SHA-256. Fragment được xóa khỏi thanh địa chỉ sau khi nhập vào trình duyệt. Không gửi token trong query string hoặc tra cứu theo email.
- Ai giữ liên kết đều có thể xem nội dung/số tiền và trả thay; không đặt thông tin nhạy cảm trong tiêu đề. Liên kết không tự hết hạn. Admin có thể tạo lại liên kết cho khoản unpaid để thu hồi token cũ. Khoản thu cũ có UID vẫn dùng được sau khi admin tạo lại liên kết.
- Phiên khách dùng bí mật ngẫu nhiên 256-bit lưu localStorage; chỉ hash được lưu trong đơn. API chỉ trả đơn khớp phiên, không trả email/điện thoại hay hash. Lịch sử tối đa 50 đơn; vẫn khôi phục đơn đã tạo nếu phản hồi checkout mất mạng vì tra theo phiên trên server.
- Đổi thiết bị/xóa dữ liệu sẽ mất quyền xem đơn. Giữ mã đơn và liên hệ trung tâm để tra soát; không có khôi phục đơn chỉ qua email. Trên máy dùng chung, người dùng cùng browser profile có thể xem đơn của phiên đó. Mã phiên và token liên kết là bí mật; cần kiểm soát XSS và script bên thứ ba trước khi production.
- Return từ VNPAY không chứa token phiên, không tự cấp quyền xem đơn; trình duyệt ban đầu giữ phiên để tải trạng thái đã xác nhận.