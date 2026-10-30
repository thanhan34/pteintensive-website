# GEO PTE Intensive — bàn giao ngày 30/10/2026

## Đọc theo thứ tự

1. `strategy.md`: kết luận, đối thủ/thực thể, ưu tiên 30/60/90 ngày và đo lường.
2. `content-architecture.md`: 14 cụm nội dung đề xuất, mỗi cụm có trang đại diện và brief.
3. `implementation-plan.md`: kế hoạch Next.js, tiêu chí nghiệm thu và ranh giới phê duyệt.
4. `skills-runtime.md`: cài đặt, tương thích, giới hạn và gỡ cài đặt.
5. `benchmark/protocol.md`: cách chạy 60 câu hỏi mà không tạo baseline giả.

## Dữ liệu bằng chứng

- `evidence/baseline-2026-10-30/audit.json`: HTTP 149 URL sitemap + 5 URL kiểm tra, ma trận Accept/User-Agent và phân tích HTML ban đầu.
- `evidence/baseline-2026-10-30/{robots.txt,sitemap.xml}`: bản chụp endpoint công khai.
- `evidence/browser-diagnostics.json`: so sánh HTML ban đầu và DOM sau render ở homepage và một khóa học; đã bỏ query token.
- `evidence/content-inventory.json`: inventory nội dung MDX và kích thước tệp ảnh cục bộ.
- `evidence/research-sources.json`: nguồn chính thức và ba website đối thủ; đây là dữ liệu nghiên cứu, không phải kết quả AI benchmark.
- `evidence/skill-validation.json`: kiểm tra adapter, định dạng và smoke test.
- `benchmark/prompts.{json,csv}`: 60 câu hỏi, có nhãn branded/unbranded và ngôn ngữ.
- `benchmark/observations.json`: 720 ô **NOT TESTED** cho 60 câu hỏi × 6 nền tảng × UI/API. Ô API là lịch kiểm tra khả năng hỗ trợ, không khẳng định sản phẩm có API tương đương UI.
- `patches/001-course-ssr.patch`: bản vá cô lập, chưa áp dụng vào website.

## Phạm vi và tính trung thực

Chỉ clone/cài công cụ cục bộ, GET trang công khai, tạo tài liệu và chạy kiểm thử. Không deploy, không thay đổi auth/payment, không ghi Firebase, không dùng tài khoản AI bên ngoài hay dịch vụ API trả phí. Những số đo crawl cũ được thay bằng crawl mới thành công; một lần thử trước đã lỗi do resolver upstream không thread-safe, sau đó đã chuyển sang tuần tự và chạy lại đủ 154 URL không lỗi.

Chưa có Search Console, GA4, log verified bot, CRM, hồ sơ pháp lý/đối tác được xác minh hoặc benchmark AI độc lập. Không công bố “độ phủ AI”, ranking, điểm GEO tổng hợp hoặc mức tăng trưởng vì chưa có dữ liệu hợp lệ.

**Mọi brief nội dung, claim doanh nghiệp và bản vá vẫn cần người phụ trách học thuật/kinh doanh duyệt trước khi xuất bản.** Báo cáo này không phải tư vấn di trú.