import type { Metadata } from 'next';
import LegalPageShell from '../../components/ui/legal-page-shell';

export const metadata: Metadata = {
  title: 'Điều khoản sử dụng | PTE Intensive',
  description:
    'Điều khoản sử dụng website và dịch vụ của PTE Intensive, bao gồm quyền, trách nhiệm và các nguyên tắc sử dụng nội dung.',
  alternates: {
    canonical: 'https://pteintensive.com/terms',
  },
  openGraph: {
    title: 'Điều khoản sử dụng | PTE Intensive',
    description:
      'Tìm hiểu các điều khoản sử dụng áp dụng khi truy cập website và sử dụng dịch vụ của PTE Intensive.',
    type: 'website',
    url: 'https://pteintensive.com/terms',
  },
};

const sections = [
  {
    title: '1. Phạm vi áp dụng',
    content: (
      <>
        <p>
          Điều khoản này áp dụng cho mọi cá nhân và tổ chức truy cập website, gửi biểu mẫu,
          đăng ký tư vấn, đăng ký khóa học hoặc sử dụng bất kỳ nội dung nào do PTE Intensive cung cấp.
        </p>
        <p>
          Khi tiếp tục sử dụng website, bạn xác nhận đã đọc, hiểu và đồng ý tuân thủ các điều khoản được nêu tại trang này.
        </p>
      </>
    ),
  },
  {
    title: '2. Sử dụng nội dung và tài nguyên',
    content: (
      <>
        <p>
          Nội dung trên website bao gồm bài viết, hình ảnh, video, biểu mẫu, tài liệu hướng dẫn và các tài nguyên học tập chỉ nhằm mục đích thông tin và hỗ trợ học viên.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Không sao chép, phát hành lại hoặc khai thác nội dung cho mục đích thương mại nếu chưa được chấp thuận bằng văn bản.</li>
          <li>Không chỉnh sửa, cắt ghép hoặc sử dụng nội dung theo cách gây hiểu lầm về thương hiệu PTE Intensive.</li>
          <li>Có thể trích dẫn ngắn với điều kiện ghi rõ nguồn và liên kết về website gốc khi phù hợp.</li>
        </ul>
      </>
    ),
  },
  {
    title: '3. Đăng ký và thông tin người dùng',
    content: (
      <>
        <p>
          Khi điền biểu mẫu liên hệ hoặc đăng ký khóa học, bạn cam kết cung cấp thông tin chính xác, đầy đủ và cập nhật. PTE Intensive có quyền từ chối hoặc tạm dừng xử lý nếu phát hiện thông tin sai lệch hoặc có dấu hiệu lạm dụng hệ thống.
        </p>
        <p>
          Bạn chịu trách nhiệm với mọi nội dung được gửi qua biểu mẫu, bao gồm câu hỏi, tệp đính kèm hoặc thông tin liên hệ cá nhân.
        </p>
      </>
    ),
  },
  {
    title: '4. Giới hạn trách nhiệm',
    content: (
      <>
        <p>
          PTE Intensive nỗ lực duy trì độ chính xác của thông tin, tuy nhiên không bảo đảm rằng toàn bộ nội dung luôn hoàn toàn đầy đủ, không có sai sót hoặc phù hợp với mọi mục tiêu cá nhân của người dùng.
        </p>
        <p>
          Các thông tin về lộ trình học, chiến lược làm bài, điểm số hoặc định hướng thi chỉ mang tính tham khảo. Kết quả thực tế phụ thuộc vào năng lực, mức độ cam kết và quá trình học tập của từng học viên.
        </p>
      </>
    ),
  },
  {
    title: '5. Hành vi bị cấm',
    content: (
      <ul className="list-disc space-y-2 pl-5">
        <li>Can thiệp, phá hoại hoặc thử khai thác lỗ hổng của website, biểu mẫu hoặc hệ thống dữ liệu.</li>
        <li>Gửi nội dung spam, mã độc, thông tin giả mạo hoặc nội dung vi phạm pháp luật.</li>
        <li>Sử dụng thương hiệu, logo hoặc tài nguyên của PTE Intensive theo cách gây nhầm lẫn với quan hệ hợp tác chính thức.</li>
      </ul>
    ),
  },
  {
    title: '6. Liên kết bên thứ ba',
    content: (
      <>
        <p>
          Website có thể chứa liên kết đến nền tảng bên thứ ba như Facebook, YouTube hoặc các dịch vụ hỗ trợ khác. Các website đó có chính sách và điều khoản riêng, và PTE Intensive không chịu trách nhiệm cho nội dung hoặc thực tiễn xử lý dữ liệu của họ.
        </p>
      </>
    ),
  },
  {
    title: '7. Thay đổi điều khoản',
    content: (
      <>
        <p>
          Chúng tôi có thể cập nhật điều khoản sử dụng để phản ánh thay đổi trong hoạt động, pháp lý hoặc tính năng website. Phiên bản mới sẽ được đăng trực tiếp tại trang này và có hiệu lực kể từ thời điểm cập nhật.
        </p>
      </>
    ),
  },
  {
    title: '8. Liên hệ',
    content: (
      <>
        <p>
          Nếu bạn cần làm rõ bất kỳ nội dung nào trong điều khoản sử dụng, vui lòng liên hệ qua email <span className="text-white/90">admin@pteintensive.com</span> hoặc truy cập trang liên hệ của chúng tôi.
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPageShell
      eyebrow="Legal"
      title="Điều khoản sử dụng"
      description="Các điều khoản dưới đây quy định cách bạn truy cập, sử dụng website và tương tác với các nội dung, biểu mẫu và dịch vụ do PTE Intensive cung cấp."
      updatedAt="15/03/2026"
      sections={sections}
    />
  );
}