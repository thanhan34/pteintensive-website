# Chiến lược GEO dựa trên bằng chứng

Ngày quan sát: **30/10/2026**. GEO là mục tiêu; SEO là nền tảng giúp nội dung truy cập được, hiểu đúng và có thể kiểm chứng. Không có kỹ thuật nào bảo đảm được AI trích dẫn.

## 1. Điều đã đo và điều chưa biết

Nguồn nội bộ của các số liệu dưới đây: `evidence/baseline-2026-10-30/audit.json`, `evidence/browser-diagnostics.json` và `evidence/content-inventory.json`.

| Phát hiện | Bằng chứng/giới hạn | Hệ quả và hành động |
|---|---|---|
| 149 URL sitemap đều HTTP 200 với `Accept: */*` | Tổng kiểm tra 154 URL: 152 HTTP 200, 2 HTTP 404 (llms.txt và URL giả); không có lỗi fetch sau khi chạy lại | HTTP 200 không đồng nghĩa đầy đủ nội dung hoặc đã được index |
| Homepage trả 200 với `*/*`, 307 với `text/html` ở cả 12 UA chẩn đoán | 24 lượt; đích 307 là Clerk development handshake; robots/sitemap/course cũng 307 với HTML Accept | Ưu tiên xử lý sau phê duyệt auth; chưa suy ra verified bot nào bị chặn |
| Browser hoàn thành handshake và render được | Homepage và khóa `/courses/pte-50`; kết quả browser có thể khác raw request | Không kết luận site bị chặn hoàn toàn; cần log Vercel/Clerk và kiểm tra crawler thật |
| 5 khóa không có H1 trong HTML ban đầu | Các slug pre-pte, pte-30-36, pte-42-50, pte-50, pte-1-1 | SSR phần trả lời chính trước; giữ phần tương tác ở client |
| `/courses/pte-50` render ra tên “Khóa PTE58/60/65/79” | Raw không H1; DOM có H1 trên; không tự coi slug cũ là lỗi | Xác minh chủ đích sản phẩm, nhất quán title/H1/schema; tránh đổi URL tùy tiện |
| 21 trang knowledge dùng cùng default title | Cộng sign-in/up có 23 URL dùng title đó; scoring-system có nhiều H1 | Metadata riêng và một H1 chính, OG URL theo từng trang |
| JSON-LD chưa nhất quán giữa raw và DOM | Homepage mẫu raw/DOM đều 0 block; course raw 1 block, DOM 3 block; layout có `next/script` | Không hứa schema sau hydration luôn được crawler thấy; chuyển server script theo kiểm thử |
| Robots cho Googlebot/Bingbot riêng allow toàn bộ | Wildcard chặn `/_next/`; một số nhóm khác có exclusions khác nhau | Chính sách nhóm nhất quán; cho tài nguyên render; robots không thay thế bảo vệ dữ liệu |
| `/sign-in`, `/sign-up` HTTP 200, không canonical riêng, thừa kế index | Không nằm sitemap nhưng vẫn có thể được phát hiện qua liên kết | Đề xuất metadata noindex; không chỉnh auth trong phiên này |
| 45 MDX công khai, tác giả đều tổ chức; chỉ 1 có `updated`; 29 title có 2025 | 21 bài không có URL ngoài theo regex: chỉ tín hiệu inventory, không phải kết luận thiếu nguồn ở mọi bài | Bổ sung chuyên gia/reviewer thật, nguồn và lịch kiểm tra; không đổi năm khi chưa cập nhật nội dung |
| Hero SVG 19.932.767 byte, PNG mobile 2.023.085 byte | Kích thước tệp cục bộ/decoded, không phải wire bytes hoặc LCP | Chuyển raster sang AVIF/WebP, đo trước/sau; chưa có CWV |
| 66 archive category/tag cho 25 bài blog | Kiểm kê trước và sitemap hiện tại; chưa có GSC nhu cầu từng archive | Đánh giá giá trị riêng trước khi index; không xóa/noindex hàng loạt theo số lượng |

Không quan sát `x-vercel-mitigated` ở các mẫu không có nghĩa firewall không chặn ở nơi khác. Không đo Lighthouse/CWV trong phiên; lần PageSpeed API trước trả 429. `check-seo.js` vẫn báo 5 lỗi `/cart` và `/login`: route inventory hardcode nên chưa phải bằng chứng liên kết hỏng.

## 2. Crawler: quyết định theo chức năng

Đối chiếu các nguồn chính thức đã fetch 200 trong `research-sources.json`: OpenAI bots, Anthropic bots, Google AI/crawlers, Perplexity bots và Vercel bot management.

- **OAI-SearchBot** phục vụ tìm kiếm ChatGPT; **GPTBot** là lựa chọn sử dụng cho huấn luyện. Hai lựa chọn độc lập. **ChatGPT-User** là truy xuất theo thao tác người dùng, không phải bằng chứng index tìm kiếm.
- **Claude-SearchBot**, **Claude-User**, **ClaudeBot** lần lượt cần xét cho search, user retrieval và training. Không dùng kết quả ClaudeBot để kết luận search visibility.
- **Googlebot** phục vụ hệ thống Search; điều khiển **Google-Extended** không phải điều kiện inclusion/ranking Google Search. AI Overviews/Mode không đòi hỏi schema AI đặc biệt.
- **PerplexityBot** và **Perplexity-User** có chức năng khác nhau; kiểm tra UA/IP theo tài liệu nhà cung cấp, không allow firewall chỉ dựa chuỗi UA.
- `llms.txt` có thể là tài liệu hỗ trợ tùy chọn. Đang 404 nhưng **không phải lỗi bắt buộc hoặc nguyên nhân đã chứng minh làm mất citation**.

Quy trình nghiệm thu thật: đối chiếu log request với UA và dải IP chính thức/verified signals, trạng thái challenge/redirect/response, thời gian và URL. Không dùng bản giả lập UA làm số lượt bot thật. Không mở các route riêng tư để phục vụ SEO.

## 3. Thực thể và đối thủ: bằng chứng có giới hạn

Quan sát website công khai của **PTE Magic, PTE Life và PTE Helper**, không quan sát thứ hạng AI của các đơn vị. Nguồn snapshot: các mục `competitor-*` trong `research-sources.json`.

| Đơn vị | Điều quan sát được trên website | Chưa xác minh | Bài học có thể áp dụng |
|---|---|---|---|
| PTE Magic | Homepage nêu phương pháp, nền tảng luyện thi, đội ngũ, cơ sở và có cụm “PTE Intensive” trong nội dung khóa học | Claim đối tác Pearson, độ chính xác AI, kết quả và ưu thế cạnh tranh là nội dung tự công bố, chưa kiểm chứng độc lập | Làm rõ PTE Intensive là thương hiệu tại domain chính thức, không đánh đồng với tên khóa của đơn vị khác |
| PTE Life | Khóa học chia theo trình độ, phát âm, mục tiêu; có số buổi và online/offline trong mô tả | Chất lượng, hiệu quả, số lượng học viên và chính sách thực tế chưa kiểm toán | Course brief có cấu trúc, điều kiện đầu vào, hình thức và bước tư vấn rõ ràng |
| PTE Helper | Nhóm nội dung theo target, tài liệu, bài kiến thức; có JSON-LD WebSite/Organization/WebPage/Person trong HTML | Claim “tốt nhất”, quy mô, đối tác và các con số tự công bố chưa xác minh | Topic hub có chuyên gia thật và dữ liệu định danh nhất quán; không sao chép claim/quy mô |

**Nguy cơ mơ hồ thực thể là giả thuyết**, không phải AI đã nhầm thương hiệu. Benchmark GEO-008 và GEO-060 được thiết kế để kiểm tra điều đó.

Entity checklist cần người sở hữu xác minh: tên pháp lý/tên giao dịch, website canonical, email/domain, địa chỉ liên hệ so với cơ sở dạy thật, hồ sơ giáo viên, quy trình học, học phí/chính sách, social chính chủ, quyền dùng kết quả học viên và bất kỳ tư cách đối tác Pearson. `sameAs` chỉ trỏ hồ sơ đã xác nhận, không đưa trang đối thủ hoặc directory không kiểm soát vào đó.

## 4. Hệ thống nội dung đáng trích dẫn

Ưu tiên trả lời đúng câu hỏi của người học: định nghĩa/điều kiện, đối tượng áp dụng, ngày hiệu lực, bảng so sánh có giới hạn, ví dụ tự tạo, nguồn sơ cấp sát claim, tên người biên soạn và người duyệt. Độ dài đoạn là quyết định biên tập, không phải quy tắc xếp hạng AI.

Mỗi bài có: H1 duy nhất, câu trả lời trực tiếp, phạm vi và ngoại lệ, dẫn Pearson/Home Affairs khi cần, ngày kiểm tra thực tế, liên kết hub–bài con–khóa phù hợp và CTA test đầu vào. Không thêm “đảm bảo 79”, chứng chỉ giáo viên hoặc số liệu thành tích khi thiếu hồ sơ. Không mua mention, tạo review giả, spam diễn đàn hoặc tạo trang địa phương không có hoạt động thật.

Chủ đề di trú có rủi ro cao: kiểm tra theo ngày thi trước/sau **07/08/2025**, từng kỹ năng, loại visa và mục đích hồ sơ; không tái dùng một bảng overall cũ cho tất cả trường hợp. Mọi con số phải được kiểm tra trên trang Home Affairs cụ thể và duyệt chuyên môn trước khi xuất bản.

## 5. Roadmap 30/60/90 ngày

Impact là giả thuyết về khả năng truy cập/tin cậy/lead, không phải dự báo tăng citation. Effort là ngày công ước lượng, không phải lịch cam kết.

| Mốc | Việc | Impact | Effort | Confidence | Phụ thuộc/owner | Nghiệm thu |
|---|---|---|---|---|---|---|
| 0–7 ngày | Xác minh Clerk key môi trường và chính sách public route | Rất cao về truy cập | 1–3 | Cao với hành vi đã đo; trung bình với bot thật | Chủ auth + phê duyệt riêng + logs | Public GET không handshake/challenge với ma trận đã thống nhất; protected routes vẫn bảo vệ |
| 0–14 | SSR nội dung khóa, server JSON-LD và metadata knowledge | Cao về khả năng đọc/định danh | 3–5 | Cao | Dev + review học thuật | HTML ban đầu có H1/nội dung; không hydration regression; JSON parse đúng |
| 0–30 | Robots/sitemap trung thực, tài nguyên render, auth noindex | Cao về hygiene | 2–3 | Cao | Dev, phê duyệt auth cho metadata auth | Tests nhóm bot, lastmod có nguồn hoặc bỏ, sitemap chỉ canonical/indexable |
| 0–30 | Sửa nội dung scoring/format/visa và hồ sơ brand | Cao về tin cậy | 3–6 | Cao về nhu cầu sửa, chưa đo citation | Academic + chủ doanh nghiệp | Nguồn sơ cấp, reviewer, lịch kiểm tra; loại bỏ claim chưa chứng minh |
| 0–30 | Chạy baseline AI và thiết lập analytics | Cao về đo lường | 2–4 + quyền truy cập | Chưa biết visibility | Analyst + tài khoản UI/API hợp lệ | Raw evidence, locale/session, mẫu số hợp lệ; không thay NOT TESTED bằng 0 |
| 31–60 | Hoàn thiện 6 brief ưu tiên; tối ưu ảnh hero | Cao về trải nghiệm/qualified lead | 6–10 | Trung bình | Academic/design/dev | Nội dung được duyệt, ảnh không giảm chất lượng, đo CWV thực tế |
| 31–60 | Case study có consent; tác giả/reviewer; thư viện bài mẫu | Cao về trust | 4–7 | Trung bình | Giáo viên + consent | Kết quả có provenance, không lộ dữ liệu; không suy ra hiệu quả đại diện |
| 61–90 | Mở rộng 14 cụm theo nhu cầu GSC/lead, earned coverage thật | Trung bình–cao | 6–12 | Trung bình | Content + đối tác thật | Không nhân bản mỏng; outreach trung thực; theo dõi lead chất lượng |
| 61–90 | Benchmark lặp lại và quyết định giữ/cắt | Cao về quyết định | 2–3 | Cao về phương pháp | Analyst | So sánh cùng panel/config, báo variance và phần chưa test |

## 6. Khung đo lường

- **Eligible response**: câu trả lời thực sự đã nhận, có raw evidence và cấu hình; không tính NOT TESTED, unsupported API hay lỗi mạng vào mẫu số. UI/API tách dashboard.
- **Brand mention rate** = số eligible response nhắc đúng thương hiệu / eligible response. Tách branded/unbranded; branded chủ yếu kiểm tra tính chính xác, không coi là discovery.
- **Citation rate** = số eligible response có URL domain chính thức / eligible response; phân biệt citations tự trỏ, bên thứ ba và chỉ text mention. Một response tính một lần cho rate, lưu URL-level riêng.
- **Share of mentions**: mentions đúng thực thể của PTE Intensive / tổng mentions trong tập đối thủ cố định; công bố tập và cách đếm. Không gọi là market share.
- **Accuracy**: người duyệt gắn đúng/sai/không đủ bằng chứng cho từng claim; critical error như nhầm đơn vị/điểm visa được báo riêng.
- **Qualified leads**: người có mục tiêu, thời hạn, nhu cầu phù hợp và consent; tỉ lệ completed placement → qualified → enrolled theo cohort. Không đưa email, tên hoặc payment data vào benchmark.
- **AI referrals**: GA4 referrer quan sát được + self-reported “biết đến từ đâu”; không coi referrer là attribution đầy đủ hoặc chứng minh citation. Không trộn direct với AI khi chưa có bằng chứng.
- **Technical**: verified crawler success/redirect/challenge, GSC index/queries, title/schema coverage, LCP/INP/CLS theo thiết bị. Không có số baseline hiện tại cho GA4/GSC/CWV.

Lịch đề xuất: 20 câu core × 6 UI mỗi tuần khi có truy cập; đủ 60 câu hàng tháng; lặp 3 lần cấu hình cố định cho panel so sánh. Báo ngày giờ, country/locale, model/search mode, đăng nhập và phiên mới. Thay model hoặc locale phải tạo cohort mới, không gộp như cùng phép đo. Mục tiêu định lượng chỉ chốt sau baseline thật; hiện không đặt mức “tăng X% AI”.