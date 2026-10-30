# Giao thức benchmark AI — chưa chạy trên sản phẩm độc lập

Hiện tại: **ChatGPT Search, Claude web search, Gemini, Google AI Overviews, Google AI Mode và Perplexity đều NOT TESTED**. Không có câu trả lời AI, citation hoặc ranking được tạo giả. Việc có công cụ tìm kiếm web trong môi trường lập trình không tương đương kiểm thử các sản phẩm này.

## Thiết kế

`prompts.json` có 60 prompt nguyên văn, nhãn branded/unbranded, cụm và ngôn ngữ. Không thêm tên brand vào prompt unbranded sau khi đã chọn panel. Hai prompt tiếng Anh là cohort riêng; phần lớn câu hỏi tiếng Việt. VN là thị trường chính đề xuất; người Việt tại AU là cohort phụ, cần người dùng xác nhận trước đo thật.

`observations.json` có 720 ô dự kiến cho UI/API riêng. Mỗi sản phẩm phải xác minh có đường API hợp lệ và có tương đương search mode hay không. Nếu không có, chuyển trạng thái `NOT AVAILABLE` cùng lý do đã kiểm chứng, không gọi API model thuần là kết quả của AI Overviews/UI. Không dùng API trả phí trước phê duyệt ngân sách.

## Quy trình mỗi lượt

1. Mở phiên mới, ghi quốc gia thực tế, locale/language, trạng thái login và personalization. Không giả country bằng nhãn ghi tay.
2. Ghi model hiển thị, chế độ web/search, version nếu có, UI/API và timestamp ISO có timezone. Nếu model không hiển thị, ghi `NOT DISCLOSED`, không đoán.
3. Gửi prompt đúng nguyên văn; không đưa kết quả kỳ trước hoặc tài liệu brand vào context.
4. Lưu raw answer nguyên văn vào kho riêng có quyền truy cập phù hợp, ảnh màn hình nếu được phép, citation URL theo đúng platform hiển thị, domain và competitor mentions. Không lưu session token/API key/cookie.
5. Đánh dấu rõ lỗi mạng, refusal, no AI Overview và response không có web search. Không gọi “không xuất hiện AI Overview” là “0 citation trong câu trả lời AI” — đây là trạng thái eligibility khác.
6. Reviewer phân biệt brand đúng thực thể, nhầm thực thể, text mention, citation và lời khuyên tích cực. Có link không đồng nghĩa endorsement.
7. Lặp 3 lần ở các phiên mới cho panel so sánh; giữ cấu hình nhất quán và báo biến động. Ngày thu khác/model khác là cohort khác.

## Trường dữ liệu

Đã có: prompt_id, exact prompt, cluster, brand_class, language, market, platform, access_mode, status, tested_at, model, search_mode, locale, session, repetition, raw_answer, citations, competitor_mentions, brand_mentioned, target_domain_cited, eligible, error.

Khi có dữ liệu thật, citations dùng mảng `{url, title, quoted_claim, citation_position}`; competitor_mentions dùng mảng `{entity, text, disambiguated}`. Raw answer có thể tham chiếu file evidence thay vì nhúng nếu dài. Giữ null cho chưa đo; không đổi null thành 0/false.

## Đo và báo cáo

Tách branded/unbranded, UI/API, locale, platform và model/search cohort. Mẫu số chỉ eligible responses có bằng chứng. Báo count và denominator cùng tỷ lệ; unsupported/not tested/error báo riêng. Đo lead/referral ở hệ thống analytics riêng, không suy luận từ benchmark. Không khẳng định “đã cải thiện” trước khi có baseline và follow-up tương đương.