import type { Metadata } from 'next';
import LegalPageShell from '../../components/ui/legal-page-shell';

export const metadata: Metadata = {
  title: 'Chính sách bảo mật | PTE Intensive',
  description:
    'Chính sách bảo mật của PTE Intensive giải thích cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ dữ liệu cá nhân của bạn.',
  alternates: {
    canonical: 'https://pteintensive.com/privacy',
  },
  openGraph: {
    title: 'Chính sách bảo mật | PTE Intensive',
    description:
      'Tìm hiểu cách PTE Intensive thu thập, sử dụng và bảo vệ thông tin cá nhân khi bạn sử dụng website và dịch vụ.',
    type: 'website',
    url: 'https://pteintensive.com/privacy',
  },
};

const sections = [
  {
    title: '1. Thông tin chúng tôi thu thập',
    content: (
      <>
        <p>
          Khi bạn sử dụng website hoặc gửi biểu mẫu, chúng tôi có thể thu thập các thông tin như họ tên, số điện thoại, email, mục tiêu học tập, nội dung tin nhắn và các dữ liệu kỹ thuật cơ bản liên quan đến phiên truy cập.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Thông tin bạn chủ động cung cấp qua biểu mẫu liên hệ, đăng ký hoặc tư vấn.</li>
          <li>Dữ liệu tương tác cơ bản như trang đã xem, thời gian truy cập hoặc nguồn giới thiệu.</li>
          <li>Thông tin kỹ thuật cần thiết để duy trì bảo mật và vận hành website.</li>
        </ul>
      </>
    ),
  },
  {
    title: '2. Mục đích sử dụng dữ liệu',
    content: (
      <ul className="list-disc space-y-2 pl-5">
        <li>Liên hệ tư vấn, phản hồi yêu cầu và hỗ trợ đăng ký khóa học.</li>
        <li>Cải thiện chất lượng nội dung, trải nghiệm người dùng và hiệu quả vận hành của website.</li>
        <li>Gửi thông tin cần thiết liên quan đến khóa học, lịch học, chính sách hoặc các cập nhật quan trọng.</li>
        <li>Phòng chống gian lận, lạm dụng biểu mẫu hoặc các hành vi ảnh hưởng đến an toàn hệ thống.</li>
      </ul>
    ),
  },
  {
    title: '3. Chia sẻ thông tin',
    content: (
      <>
        <p>
          PTE Intensive không bán thông tin cá nhân của bạn cho bên thứ ba. Chúng tôi chỉ chia sẻ dữ liệu trong phạm vi cần thiết để vận hành dịch vụ, tuân thủ pháp luật hoặc khi có sự đồng ý của bạn.
        </p>
        <p>
          Trong một số trường hợp, dữ liệu có thể được xử lý bởi các nhà cung cấp hạ tầng, lưu trữ hoặc công cụ hỗ trợ liên hệ, với điều kiện họ phải đáp ứng tiêu chuẩn bảo mật phù hợp.
        </p>
      </>
    ),
  },
  {
    title: '4. Lưu trữ và bảo mật',
    content: (
      <>
        <p>
          Chúng tôi áp dụng các biện pháp kỹ thuật và quản trị hợp lý để bảo vệ dữ liệu khỏi truy cập trái phép, mất mát, tiết lộ hoặc sử dụng sai mục đích. Tuy nhiên, không có hệ thống truyền tải hoặc lưu trữ điện tử nào đạt mức an toàn tuyệt đối 100%.
        </p>
        <p>
          Dữ liệu chỉ được lưu giữ trong khoảng thời gian cần thiết cho mục đích vận hành, tư vấn, chăm sóc học viên hoặc theo yêu cầu pháp luật hiện hành.
        </p>
      </>
    ),
  },
  {
    title: '5. Cookie và công nghệ tương tự',
    content: (
      <>
        <p>
          Website có thể sử dụng cookie hoặc công nghệ tương tự để ghi nhớ tùy chọn, phân tích hành vi truy cập và nâng cao hiệu suất hoạt động. Bạn có thể điều chỉnh cài đặt trình duyệt để chặn hoặc xóa cookie, tuy nhiên một số tính năng có thể bị ảnh hưởng.
        </p>
      </>
    ),
  },
  {
    title: '6. Quyền của bạn',
    content: (
      <ul className="list-disc space-y-2 pl-5">
        <li>Yêu cầu xem lại, cập nhật hoặc chỉnh sửa thông tin cá nhân đã cung cấp.</li>
        <li>Yêu cầu ngừng liên hệ tiếp thị hoặc hỗ trợ không cần thiết.</li>
        <li>Yêu cầu xóa dữ liệu trong phạm vi pháp luật cho phép và khi không còn nghĩa vụ lưu trữ bắt buộc.</li>
      </ul>
    ),
  },
  {
    title: '7. Cập nhật chính sách',
    content: (
      <>
        <p>
          Chính sách bảo mật có thể được điều chỉnh theo thay đổi pháp lý, công nghệ hoặc mô hình vận hành. Phiên bản mới nhất luôn được công bố tại trang này và có hiệu lực từ ngày cập nhật.
        </p>
      </>
    ),
  },
  {
    title: '8. Thông tin liên hệ',
    content: (
      <>
        <p>
          Nếu bạn có câu hỏi về việc xử lý dữ liệu cá nhân hoặc muốn thực hiện các quyền liên quan đến quyền riêng tư, vui lòng liên hệ <span className="text-white/90">admin@pteintensive.com</span>.
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPageShell
      eyebrow="Privacy"
      title="Chính sách bảo mật"
      description="Chính sách này giải thích cách PTE Intensive thu thập, sử dụng, lưu trữ và bảo vệ thông tin cá nhân khi bạn truy cập website hoặc để lại thông tin tư vấn."
      updatedAt="15/03/2026"
      sections={sections}
    />
  );
}