# Kiến trúc nội dung: 14 cụm đề xuất

**Giới hạn phạm vi:** bản tóm tắt bàn giao nhắc “14 cụm được yêu cầu” nhưng không chứa danh sách gốc. Vì vậy 14 cụm dưới đây là **đề xuất để đối chiếu**, không tuyên bố đã khớp một danh sách không được cung cấp. Mỗi cụm có một trang đại diện đầy đủ brief; bài vệ tinh chỉ phát triển khi có nhu cầu và bằng chứng, không tạo hàng loạt.

URL giữ nguyên khi đã có trang tương đương. Các URL mới dưới đây là đề xuất, chưa được tạo/publish. Metadata là bản nháp biên tập; schema chỉ phản ánh nội dung hiển thị, không bảo đảm rich result hoặc citation. CTA chính: kiểm tra đầu vào/tư vấn đúng nhu cầu, không dùng cam kết điểm thiếu điều kiện.

## 01. Nhận diện PTE Intensive
- **Intent/đối tượng:** branded verification; người đang cân nhắc đăng ký.
- **Câu hỏi:** Đơn vị này là ai, domain chính thức nào và kiểm chứng thông tin ở đâu?
- **URL:** `/about` (cải thiện trang hiện có).
- **Title:** PTE Intensive: giới thiệu, đội ngũ và cách liên hệ chính thức.
- **Description:** Tìm hiểu PTE Intensive, quy trình học, đội ngũ và kênh liên hệ chính thức; xem nguồn xác minh thông tin và chính sách trước khi đăng ký.
- **Outline:** định danh chính thức → đối tượng phục vụ → cách dạy/đánh giá → đội ngũ → địa chỉ và loại hoạt động → kênh chính chủ → chính sách/giới hạn.
- **Bằng chứng:** chủ doanh nghiệp xác nhận tên/pháp lý, ownership domain/social, nơi dạy thật; hồ sơ giáo viên có consent. Không điền tư cách Pearson khi chưa có nguồn từ Pearson.
- **Schema:** Organization/EducationalOrganization có `@id` ổn định; Person thật chỉ trên hồ sơ thật; không sao chép địa chỉ chưa xác minh.
- **Liên kết:** `/contact`, `/courses`, `/terms`, `/guarantee`, hồ sơ tác giả sau khi duyệt.
- **GEO:** một đoạn định danh nhất quán và ghi rõ tên thương hiệu so với tên khóa học của đơn vị khác nếu cần, không cáo buộc nhầm lẫn.
- **Business impact:** giảm nhầm thực thể, tăng lead có thông tin; ưu tiên P1.

## 02. PTE cho người mới
- **Intent/đối tượng:** informational; người chưa phân biệt các bài thi.
- **Câu hỏi:** PTE Academic là gì và khi nào cần kiểm tra PTE Core thay vì Academic?
- **URL:** `/knowledge` (hub hiện có).
- **Title:** PTE Academic là gì? Hướng dẫn cho người mới bắt đầu.
- **Description:** Hiểu mục đích PTE Academic, kỹ năng được đánh giá và cách kiểm tra bài thi phù hợp trước khi chọn lộ trình học.
- **Outline:** trả lời định nghĩa → Academic/Core khác mục đích → kiểm tra yêu cầu tổ chức tiếp nhận → tự đánh giá đầu vào → chọn bài đọc theo kỹ năng → bước tiếp theo.
- **Bằng chứng:** Pearson về sản phẩm; yêu cầu thật của trường/cơ quan tiếp nhận, không tự khái quát mọi visa.
- **Schema:** WebPage/CollectionPage và BreadcrumbList; Article cho bài giải thích riêng.
- **Liên kết:** scoring, format, bốn hub kỹ năng, course pre-pte.
- **GEO:** bảng phân biệt có phạm vi; link nguồn sát từng loại bài thi.
- **Business impact:** thu hút đúng nhu cầu, giảm lead nhầm bài thi; P1.

## 03. Lộ trình theo trình độ và mục tiêu
- **Intent/đối tượng:** consideration; mất gốc, người đi làm, target 50/65/79.
- **Câu hỏi:** Từ đầu vào hiện tại, cần làm gì để lập lộ trình thực tế?
- **URL:** `/blog/lo-trinh-hoc-pte-mat-goc-50plus` (cập nhật bài tương đương).
- **Title:** Lộ trình học PTE từ đầu: đánh giá đầu vào và các mốc tiến bộ.
- **Description:** Cách xây lộ trình PTE theo nền tảng, thời gian và mục tiêu; dùng bài kiểm tra đầu vào và mốc đánh giá thay vì hứa thời gian đạt điểm cố định.
- **Outline:** dữ kiện cần có → test đầu vào → nền tảng → kỹ năng tích hợp → mock test → điều chỉnh → điều kiện học/ngoại lệ.
- **Bằng chứng:** quy trình đào tạo được academic xác nhận, rubric Pearson; ví dụ lịch học ghi rõ minh họa, không kết quả thực tế.
- **Schema:** Article, BreadcrumbList; không Course nếu trang chỉ là bài tư vấn.
- **Liên kết:** pre-pte, pte-42-50, pte-50, bài luyện từng kỹ năng.
- **GEO:** ma trận đầu vào/thời gian/điểm cần kiểm tra, không câu “8 tuần chắc chắn đạt”.
- **Business impact:** tăng completed placement có bối cảnh; P1.

## 04. Khóa học, học phí và điều kiện
- **Intent/đối tượng:** transactional; người so sánh trước thanh toán.
- **Câu hỏi:** Khóa nào phù hợp, bao gồm gì, học thế nào và điều khoản nào áp dụng?
- **URL:** `/courses` cùng 5 trang khóa hiện có; trang đại diện `/courses/pte-50`.
- **Title:** Khóa PTE nâng cao: đầu vào, nội dung và điều kiện đăng ký.
- **Description:** Xem đối tượng phù hợp, nội dung, hình thức và quy trình đăng ký khóa PTE nâng cao; kiểm tra học phí và điều khoản được xác nhận trước thanh toán.
- **Outline:** tên khóa đúng catalog → phù hợp/không phù hợp → đầu vào → kết quả học tập dự kiến không bảo đảm → nội dung → lịch/hình thức → giá đã duyệt → hỗ trợ/hoàn phí → test đầu vào.
- **Bằng chứng:** catalog và chính sách kinh doanh hiện hành; chưa xác minh không tự công bố giá/sĩ số/địa điểm.
- **Schema:** Course/CourseInstance; Offer chỉ giá/currency thật; duration ISO khi có thời lượng xác nhận.
- **Liên kết:** `/guarantee`, `/terms`, `/register`, lộ trình và nội dung mẫu.
- **GEO:** SSR phần mô tả/H1; facts table có ngày kiểm tra; tên/title/schema khớp sản phẩm dù slug giữ lại.
- **Business impact:** lead đủ điều kiện, giảm hỏi sai khóa; P0/P1.

## 05. Cấu trúc bài thi hiện hành
- **Intent/đối tượng:** informational; tất cả người ôn Academic.
- **Câu hỏi:** Bài thi hiện hành có các dạng nào và thay đổi từ 07/08/2025 ra sao?
- **URL:** `/blog/cau-truc-de-thi-pte-2025` (giữ URL đang có, kiểm tra trùng bài MDX trước chỉnh).
- **Title:** Cấu trúc PTE Academic hiện hành và các thay đổi từ 2025.
- **Description:** Tổng hợp phần thi và dạng bài PTE Academic theo Pearson, phân biệt phiên bản trước và sau ngày 7/8/2025 với nguồn và ngày kiểm tra rõ ràng.
- **Outline:** phạm vi theo ngày thi → các phần → danh sách dạng bài → Summarize Group Discussion/Respond to a Situation → cách luyện → changelog.
- **Bằng chứng:** Pearson updates 2025 và tài liệu score guide hiện hành; không copy câu “20 dạng” nếu tài liệu mới không phù hợp.
- **Schema:** Article, BreadcrumbList; bảng phiên bản trong nội dung thật.
- **Liên kết:** bốn kỹ năng, scoring, hai trang dạng bài mới sau khi viết và duyệt.
- **GEO:** đầu bài nêu rõ phiên bản, source date khác dateModified; không chỉ đổi năm trong title.
- **Business impact:** tránh học sai format, nâng trust; P0 học thuật.

## 06. Chấm điểm và PTE–IELTS
- **Intent/đối tượng:** informational/decision; người có target và hồ sơ tiếp nhận.
- **Câu hỏi:** Điểm overall và từng kỹ năng có ý nghĩa gì, bảng đối chiếu dùng được trong phạm vi nào?
- **URL:** `/knowledge/scoring-system`.
- **Title:** Cách tính điểm PTE Academic và giới hạn đối chiếu IELTS.
- **Description:** Hiểu điểm overall, điểm kỹ năng và rubric PTE Academic; kiểm tra phạm vi bảng đối chiếu IELTS thay vì dùng một phép quy đổi cho mọi hồ sơ.
- **Outline:** score report → overall/kỹ năng → scoring theo dạng → giới hạn equivalence → yêu cầu tổ chức tiếp nhận → FAQ có nguồn.
- **Bằng chứng:** Pearson score guide/concordance hiện hành; tổ chức tiếp nhận cho claim điều kiện đầu vào.
- **Schema:** Article/WebPage, BreadcrumbList; không HowTo nếu chỉ giải thích scoring.
- **Liên kết:** format, bốn kỹ năng, migration English.
- **GEO:** một H1 chính; trả lời trực tiếp “không suy ra trung bình cộng” kèm nguồn đã kiểm tra; bảng có phạm vi/ngày.
- **Business impact:** tư vấn target đúng; P0 học thuật/P1 kỹ thuật.

## 07. Speaking
- **Intent/đối tượng:** skill problem-solving; người Speaking yếu.
- **Câu hỏi:** Read Aloud và các task Speaking nên luyện theo tiêu chí nào?
- **URL:** `/knowledge/speaking/read-aloud` (trang đại diện; hub đề xuất `/knowledge/speaking`).
- **Title:** Read Aloud PTE: tiêu chí đánh giá và cách luyện có phản hồi.
- **Description:** Hướng dẫn luyện Read Aloud theo tiêu chí Pearson, nhận diện lỗi phát âm và độ trôi chảy bằng bài tập và checklist tự kiểm tra.
- **Outline:** yêu cầu task → rubric → lỗi thường gặp → ví dụ tự tạo → luyện/ghi âm → tự đánh giá → khi cần feedback.
- **Bằng chứng:** rubric Pearson; giáo viên duyệt ví dụ, quyền sử dụng âm thanh.
- **Schema:** Article, BreadcrumbList; AudioObject chỉ khi có audio thật với quyền sử dụng.
- **Liên kết:** repeat-sentence, describe-image, task mới, course phù hợp.
- **GEO:** định nghĩa từng tiêu chí; chỉ ra mẹo không có bằng chứng; không hứa template thắng scoring.
- **Business impact:** lead cần phản hồi chuyên môn; P1.

## 08. Writing
- **Intent/đối tượng:** học kỹ năng; người khó đạt điểm viết.
- **Câu hỏi:** Summarize Written Text đáp ứng hình thức và nội dung thế nào?
- **URL:** `/knowledge/writing/summarize-text`.
- **Title:** Summarize Written Text PTE: yêu cầu và bài mẫu có giải thích.
- **Description:** Xem yêu cầu Summarize Written Text theo Pearson, ví dụ tự tạo và phân tích lỗi; phân biệt phản hồi luyện tập với điểm thi chính thức.
- **Outline:** task/form → đọc và chọn ý → viết câu → kiểm tra grammar/vocabulary → ví dụ annotated → giới hạn chấm luyện.
- **Bằng chứng:** rubric hiện hành, bài mẫu original và reviewer; giới hạn từ/thời gian phải kiểm tra trước publish.
- **Schema:** Article/BreadcrumbList; không Review/rating cho điểm mô phỏng.
- **Liên kết:** essay, scoring, bài so sánh feedback AI/giáo viên, khóa học.
- **GEO:** tách quy định chính thức và lời khuyên luyện thi; nguồn sát từng claim.
- **Business impact:** chứng minh chất lượng phản hồi không bằng claim quảng cáo; P1.

## 09. Reading
- **Intent/đối tượng:** kỹ năng; người yếu từ vựng/collocation.
- **Câu hỏi:** Fill in the Blanks nên luyện và sửa lỗi ra sao?
- **URL:** `/knowledge/reading/rfib`.
- **Title:** Reading Fill in the Blanks PTE: collocation và cách sửa lỗi.
- **Description:** Luyện Reading Fill in the Blanks bằng ngữ cảnh, ngữ pháp và collocation; xem ví dụ có giải thích thay vì chỉ học đáp án.
- **Outline:** phân biệt task gần tên → quy định → collocation/grammar → ví dụ → sổ lỗi → luyện định kỳ.
- **Bằng chứng:** Pearson cho task/scoring, bài tập original, giáo viên duyệt.
- **Schema:** Article, BreadcrumbList; không thêm Quiz nếu không có bài trắc nghiệm thực.
- **Liên kết:** rwfib, rop, mcma, vocabulary theo lỗi.
- **GEO:** bảng so sánh RFIB/RWFIB, giải thích đáp án tự đủ ngữ cảnh.
- **Business impact:** engagement và lead có nhu cầu học thật; P2.

## 10. Listening
- **Intent/đối tượng:** kỹ năng; người mất từ khi nghe/ghi chép.
- **Câu hỏi:** Write from Dictation nên luyện thế nào và theo dõi lỗi ra sao?
- **URL:** `/knowledge/listening/write-dictation`.
- **Title:** Write from Dictation PTE: quy trình luyện và phân tích lỗi.
- **Description:** Luyện Write from Dictation theo quy trình nghe, ghi nhớ và kiểm tra; dùng sổ lỗi để theo dõi chính tả, ngữ pháp và độ chính xác.
- **Outline:** task/rubric → nghe/chunking như phương pháp luyện → ghi nhớ → kiểm tra → ví dụ/audio → sổ lỗi → review.
- **Bằng chứng:** Pearson hiện hành, audio tự sản xuất hoặc được cấp phép; không dùng đề rò rỉ.
- **Schema:** Article/BreadcrumbList, AudioObject khi đủ metadata thật.
- **Liên kết:** summarize-spoken, highlight-incorrect, speaking/listening integration.
- **GEO:** tách kỹ thuật ôn tập và quy định thi, ví dụ có transcript đúng quyền.
- **Business impact:** cho thấy phương pháp dạy hữu ích; P1/P2.

## 11. Đăng ký và ngày thi
- **Intent/đối tượng:** practical; người sắp đặt lịch.
- **Câu hỏi:** Đăng ký ở đâu, cần giấy tờ gì, đổi lịch/phí kiểm tra thế nào?
- **URL:** `/blog/dang-ky-thi-pte-academic` (đối chiếu bài tương đương trước tạo).
- **Title:** Đăng ký thi PTE Academic: kênh chính thức và checklist ngày thi.
- **Description:** Cách tìm lịch thi và chính sách PTE từ Pearson, kiểm tra giấy tờ, phí và điều kiện đổi lịch trước khi hoàn tất đăng ký.
- **Outline:** kiểm tra đúng bài thi → tài khoản Pearson → lịch/địa điểm → ID → phí/đổi lịch → ngày thi → gửi kết quả.
- **Bằng chứng:** Pearson booking/ID/rescheduling hiện hành; không hardcode giá nếu biến đổi theo thị trường.
- **Schema:** Article/BreadcrumbList; HowTo chỉ nếu hướng dẫn thật đáp ứng schema, không kỳ vọng rich result.
- **Liên kết:** knowledge, checklist chuẩn bị, contact cho hỗ trợ học, link Pearson chính thức.
- **GEO:** ngày kiểm tra và quốc gia rõ ràng; trung tâm không tự nhận là nơi tổ chức thi khi chưa xác minh.
- **Business impact:** hỗ trợ người gần chuyển đổi, giảm nhầm bên thu phí; P2.

## 12. Tiếng Anh cho di trú Úc
- **Intent/đối tượng:** high-stakes informational; người chuẩn bị visa.
- **Câu hỏi:** Yêu cầu PTE nào áp dụng cho ngày thi và loại hồ sơ của tôi?
- **URL:** `/migration/english-language` (hub đề xuất; sửa bài visa hiện có sau review).
- **Title:** PTE và yêu cầu tiếng Anh visa Úc: cách kiểm tra đúng điều kiện.
- **Description:** Hướng dẫn kiểm tra yêu cầu tiếng Anh từ Home Affairs theo loại visa, ngày thi và từng kỹ năng; phân biệt mốc thay đổi từ 7/8/2025.
- **Outline:** phạm vi không tư vấn cá nhân → visa/English category → ngày thi trước/sau mốc → điểm từng kỹ năng → hiệu lực/ngoại lệ → link trang yêu cầu → tìm người tư vấn đủ thẩm quyền.
- **Bằng chứng:** trang cụ thể Home Affairs competent/proficient/superior và visa liên quan; reviewer có năng lực; ghi ngày truy xuất.
- **Schema:** Article/BreadcrumbList, tác giả/reviewer thật; không claim tổ chức có giấy phép migration nếu không có hồ sơ.
- **Liên kết:** visa-189 và bài liên quan đã kiểm tra, scoring, Pearson.
- **GEO:** mỗi bảng phải có ngày thi/phạm vi, không đưa “50/65/79 cho mọi trường hợp”; ưu tiên link nguồn thay suy đoán.
- **Business impact:** lead đúng yêu cầu, giảm rủi ro tư vấn sai; P0 học thuật.

## 13. Chuyên gia và case study
- **Intent/đối tượng:** trust verification; người muốn bằng chứng thực tế.
- **Câu hỏi:** Ai dạy và kết quả học được ghi nhận thế nào?
- **URL:** `/reviews` (cải thiện), hồ sơ người viết đề xuất `/authors/[slug]` khi có dữ liệu thật.
- **Title:** Kết quả học viên PTE Intensive: bối cảnh và phương pháp xác minh.
- **Description:** Xem câu chuyện học viên có sự đồng ý công bố, bối cảnh đầu vào và cách kiểm chứng kết quả; không suy ra kết quả bảo đảm cho mọi người.
- **Outline:** cách chọn case → consent/ẩn dữ liệu → đầu vào → can thiệp → kết quả có nguồn → giới hạn/không đại diện → người hướng dẫn.
- **Bằng chứng:** phiếu điểm/quyền công bố, ngày và phạm vi; không đưa dữ liệu nhận diện nhạy cảm lên repo; hồ sơ giáo viên đã xác minh.
- **Schema:** Article cho từng case, Person cho tác giả thật; không self-serving AggregateRating dựa ảnh/chọn mẫu.
- **Liên kết:** khóa liên quan, guarantee/terms, hồ sơ người hướng dẫn.
- **GEO:** câu chuyện có provenance và giới hạn, không bịa số thành công hoặc testimonial.
- **Business impact:** trust và lead chất lượng; P1 sau consent.

## 14. So sánh và tiêu chí chọn trung tâm
- **Intent/đối tượng:** commercial investigation; người đang shortlist.
- **Câu hỏi:** Chọn đơn vị học PTE theo dữ kiện nào, không dựa xếp hạng tự phong?
- **URL:** `/blog/cach-chon-trung-tam-pte` (đề xuất).
- **Title:** Cách chọn trung tâm PTE: checklist kiểm chứng trước khi đăng ký.
- **Description:** So sánh khóa PTE theo đầu vào, phản hồi, điều khoản, học phí và bằng chứng; nhận diện điều chưa xác minh thay vì tin xếp hạng quảng cáo.
- **Outline:** mục tiêu cá nhân → tiêu chí/weights tự chọn → evidence checklist → lớp nhóm/1:1 → chính sách → câu hỏi tư vấn → giới hạn so sánh.
- **Bằng chứng:** chính sách/catalog từng đơn vị nếu so sánh tên thật, snapshot/ngày; liên hệ xác minh khi thông tin chưa rõ; công bố xung đột lợi ích của đơn vị viết.
- **Schema:** Article/BreadcrumbList; không Review/rating so sánh do chính bên bán tự gán.
- **Liên kết:** `/courses`, `/terms`, `/guarantee`, `/about`, placement.
- **GEO:** bảng “đã công bố/chưa xác minh” thay ranking tốt nhất; không claim đối thủ kém.
- **Business impact:** lead hiểu điều kiện và phù hợp dịch vụ; P2.

## Trình tự biên tập

Sửa 05/06/12 trước vì rủi ro nội dung; 01/04/03 để hỗ trợ định danh và chuyển đổi; 07/08/10 cho bằng chứng chuyên môn; sau đó 02/09/11/13/14 theo nguồn lực và nhu cầu thật. Giữ URL cũ có giá trị, lập content map trước tách/gộp để tránh cannibalization. Không redirect hoặc noindex chỉ vì năm 2025 trong slug.