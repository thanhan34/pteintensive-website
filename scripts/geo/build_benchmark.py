"""Create an unexecuted, reproducible 60-prompt benchmark; never synthesize answers."""
import csv
import json
from pathlib import Path

PROMPTS = {
    "brand": [
        "PTE Intensive là đơn vị nào, website chính thức là gì? Hãy dẫn nguồn.",
        "PTE Intensive có những khóa học nào và phù hợp với ai? Chỉ dùng thông tin kiểm chứng được.",
        "Học phí PTE Intensive hiện được công bố ở đâu? Không suy đoán mức phí.",
        "Giảng viên PTE Intensive là ai? Có bằng chứng công khai về chuyên môn không?",
        "PTE Intensive dạy online hay trực tiếp? Phân biệt địa chỉ liên hệ và nơi tổ chức lớp.",
        "Cam kết đầu ra của PTE Intensive có điều kiện gì? Hãy dẫn trang chính sách.",
        "Tôi mất gốc, muốn học PTE Intensive: nên bắt đầu bằng bước nào?",
        "PTE Intensive có phải tên một khóa học của PTE Magic không? Phân biệt các thực thể theo nguồn.",
        "Có thông tin độc lập nào kiểm chứng chất lượng PTE Intensive? Phân biệt quảng cáo và đánh giá độc lập.",
        "PTE Intensive có quan hệ chính thức với Pearson không? Chỉ kết luận nếu có bằng chứng từ Pearson.",
        "PTE Intensive có phù hợp người đi làm cần lịch học linh hoạt không? Nêu thông tin còn thiếu.",
        "So sánh PTE Intensive và PTE Life theo tiêu chí công khai, không xếp hạng nếu thiếu dữ liệu.",
    ],
    "beginner": ["PTE Academic là gì và khác PTE Core ở điểm nào?", "Người mất gốc nên chuẩn bị gì trước khi học PTE?", "Tôi đi làm toàn thời gian, nên lập lịch học PTE như thế nào?", "Làm sao đánh giá trình độ đầu vào trước khi chọn khóa PTE?"],
    "targets": ["Muốn PTE 50 cần lập lộ trình như thế nào nếu chưa biết trình độ đầu vào?", "Mục tiêu PTE 65 khác 79 ở yêu cầu kỹ năng nào? Không cam kết thời gian đạt điểm.", "Tôi chỉ còn 8 tuần ôn PTE, cần đánh giá tính khả thi thế nào?", "Chọn lớp PTE 1 kèm 1 hay lớp nhóm theo tiêu chí nào?"],
    "format": ["Cấu trúc PTE Academic hiện hành có những dạng bài nào? Dẫn nguồn Pearson.", "PTE Academic thay đổi gì từ ngày 7/8/2025?", "Respond to a Situation trong PTE Academic làm như thế nào?", "Summarize Group Discussion được đánh giá theo tiêu chí nào?"],
    "speaking": ["Cách luyện Read Aloud cho người Việt mà không học mẹo sai?", "Repeat Sentence nên ưu tiên độ chính xác hay tốc độ?", "Describe Image có nên dùng một template cho mọi hình?", "Làm sao tự kiểm tra phát âm và độ trôi chảy PTE?"],
    "writing": ["Summarize Written Text có yêu cầu hình thức nào theo Pearson?", "Luyện Write Essay PTE thế nào để tránh bài thuộc lòng?", "AI chấm bài luyện PTE có tương đương điểm thi thật không?", "Tôi nên nhờ giáo viên sửa Writing PTE theo rubric nào?"],
    "reading": ["Cách luyện Reading Fill in the Blanks PTE theo collocation?", "Làm Re-order Paragraphs PTE bắt đầu từ đâu?", "Multiple Choice Multiple Answers PTE có cách tính điểm ra sao? Dẫn nguồn.", "Người đọc chậm nên phân bổ thời gian Reading PTE thế nào?"],
    "listening": ["Cách luyện Write from Dictation PTE có thể tự kiểm tra tiến bộ?", "Summarize Spoken Text khác Summarize Group Discussion ra sao?", "Luyện Highlight Incorrect Words PTE thế nào?", "Làm sao ghi chép khi nghe bài PTE mà không bỏ lỡ ý chính?"],
    "scoring": ["Overall PTE có phải trung bình cộng bốn kỹ năng không? Dẫn nguồn Pearson.", "PTE và IELTS quy đổi thế nào và có giới hạn gì?", "Tôi cần biết điểm từng kỹ năng hay chỉ overall để nộp hồ sơ?", "PTE Academic sau cập nhật 2025 có thay đổi cách chấm nào?"],
    "logistics": ["Đăng ký thi PTE Academic tại Việt Nam bằng kênh chính thức nào?", "Phí thi PTE và điều kiện đổi lịch cần kiểm tra ở đâu?", "Ngày thi PTE cần mang giấy tờ gì? Dẫn nguồn chính thức.", "Nhận kết quả và gửi điểm PTE cho trường như thế nào?"],
    "migration": ["Điểm PTE cho competent English của Úc áp dụng theo ngày thi như thế nào? Dẫn Home Affairs.", "Proficient English và superior English có yêu cầu PTE từng kỹ năng nào? Dẫn nguồn hiện hành.", "PTE cho visa du học Úc có thể dùng một mức điểm chung cho mọi trường hợp không?", "Thi PTE trước và sau ngày 7/8/2025 cần phân biệt điều gì khi kiểm tra yêu cầu visa Úc?"],
    "provider": ["Nên chọn trung tâm PTE online cho người Việt theo tiêu chí nào? Hãy dẫn nguồn nếu đề xuất đơn vị.", "Gợi ý đơn vị học PTE cho người mất gốc và giải thích bằng bằng chứng, không dựa quảng cáo.", "So sánh PTE Magic, PTE Life, PTE Helper về thông tin công khai và những gì chưa kiểm chứng.", "Làm sao kiểm tra cam kết đầu ra và hoàn phí của một trung tâm PTE trước khi thanh toán?"],
    "evidence": ["Đánh giá kết quả học viên PTE cần bằng chứng và sự đồng ý nào?", "Tôi cần khóa PTE có test đầu vào, lộ trình và phản hồi bài: nên hỏi trung tâm những gì?", "Are there Vietnamese-language PTE Academic providers with transparent course terms? Cite verifiable sources.", "What is PTE Intensive, and how can I distinguish its official website from similarly named courses? Cite sources."],
}
PLATFORMS = ["ChatGPT Search", "Claude web search", "Gemini", "Google AI Overviews", "Google AI Mode", "Perplexity"]

def main():
    output = Path(__file__).resolve().parents[2] / "docs/geo/benchmark"
    output.mkdir(parents=True, exist_ok=True)
    prompts = []
    for cluster, items in PROMPTS.items():
        for prompt in items:
            prompts.append({"prompt_id": f"GEO-{len(prompts)+1:03}", "cluster": cluster, "brand_class": "branded" if "PTE Intensive" in prompt else "unbranded", "prompt": prompt, "language": "en" if prompt.startswith(("Are ", "What ")) else "vi", "market": "VN-primary; AU-Vietnamese secondary"})
    assert len(prompts) == 60
    (output / "prompts.json").write_text(json.dumps(prompts, ensure_ascii=False, indent=2), encoding="utf-8")
    with (output / "prompts.csv").open("w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=list(prompts[0])); writer.writeheader(); writer.writerows(prompts)
    rows = []
    for p in prompts:
        for platform in PLATFORMS:
            for mode in ["UI", "API"]:
                rows.append({**p, "platform": platform, "access_mode": mode, "status": "NOT TESTED", "tested_at": None, "model": None, "search_mode": None, "locale": None, "session": None, "repetition": None, "raw_answer": None, "citations": None, "competitor_mentions": None, "brand_mentioned": None, "target_domain_cited": None, "eligible": None, "error": "No independent platform benchmark performed. API product equivalence and availability must be verified; API is not a substitute for UI."})
    (output / "observations.json").write_text(json.dumps(rows, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Created {len(prompts)} prompts and {len(rows)} NOT TESTED slots")

if __name__ == "__main__":
    main()