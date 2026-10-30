# Kỹ năng Codex dùng lại — cài đặt và ranh giới tương thích

## Đã cài ở đâu

- Upstream: `C:\Users\dtan4\.local\share\codex-geo\upstream\claude-seo`.
- Revision pin: `6be93f45064ffbadced572b5d5c95f55fd263af0`, detached HEAD.
- Runtime adapter: `C:\Users\dtan4\.local\share\codex-geo\codex_geo.py`.
- Manifest: `C:\Users\dtan4\.local\share\codex-geo\manifest.json`.
- Python venv: `C:\Users\dtan4\.local\share\codex-geo\venv`.
- **33 adapter** trong `C:\Users\dtan4\.agents\skills\codex-seo*`, gồm core và extension checklists. Tên chi tiết và SHA-256 nguồn có trong manifest. Installer chọn các skill trực tiếp dưới core/extension và deduplicate theo tên; số adapter không đồng nghĩa số SKILL.md lint toàn repo.
- Script tái tạo: `C:\Users\dtan4\OneDrive\Documents\Next JS Project\PTEIntensive\pteintesive\scripts\geo\install_codex_skills.py`.

Không chạy install.ps1/install.sh, không cài plugin/hook vào Claude, không đè thư mục kỹ năng có sẵn. Upstream checkout không sửa tracked files. License MIT được giữ nguyên trong runtime và từng adapter, nguồn checklist được sao chép vào references để attribution và kiểm tra.

## Đã kiểm tra / chưa kiểm tra

| Hạng mục | Trạng thái |
|---|---|
| 33 frontmatter name/description và upstream reference copy | PASS qua validator Codex cục bộ |
| Upstream portability lint | 35 SKILL.md, 0 errors/warnings/info |
| 12 command `--help` qua adapter | PASS; chỉ chứng minh import/dispatch cơ bản, không phải mọi API hoạt động |
| DNS safety/parser/schema/crawler-claim regression upstream đã chọn | 193 passed, 3 skipped; giữ skip là chưa chạy |
| Chromium thực tải homepage/course | PASS; có redirect Clerk; không phải AI platform benchmark |
| Native discovery ở một phiên Codex mới | NOT TESTED; cần mở phiên mới và kiểm tra kích hoạt bằng mô tả/tên |
| MCP trả phí, Google/analytics APIs, backlink APIs, indexing submissions | NOT CONFIGURED/NOT TESTED |
| PDF/report native dependencies và toàn bộ upstream tests | NOT TESTED; không cài mọi dependency chỉ để đánh dấu “full support” |

Đã kích hoạt `codex-seo-geo` qua tool kỹ năng của host hiện tại và nhận đúng nội dung adapter mới. Điều này không chứng minh một phiên Codex CLI mới đã đọc đúng thư mục mới. Không tìm thấy command `codex` trong PATH ở kiểm tra đầu phiên. Cần nghiệm thu host mới, không tự sửa config tìm kiếm skills nếu chưa biết host đang dùng.

## Cách dùng PowerShell

```powershell
python 'C:\Users\dtan4\.local\share\codex-geo\codex_geo.py' doctor
python 'C:\Users\dtan4\.local\share\codex-geo\codex_geo.py' inventory
python 'C:\Users\dtan4\.local\share\codex-geo\codex_geo.py' run parse_html.py --help
python 'C:\Users\dtan4\.local\share\codex-geo\codex_geo.py' run render_page.py 'https://www.pteintensive.com/' --mode never --json --max-text 1500
```

Không lưu raw output browser một cách tùy tiện: redirect chain có thể chứa nonce/token; dùng collector đã strip query khi tạo evidence. Diagnostic output không phải secret store.

## Quyết định tương thích/an toàn

Đã xem runtime launcher, requirements, plugin/hook config, cơ chế allowlist, source các script chẩn đoán chính và đường execution nhạy cảm. Có scan tĩnh toàn thư mục scripts và inventory extension; **chưa review thủ công đầy đủ mọi script và mọi extension**. Các script tích hợp/indexing/mutation không được cho chạy qua adapter mặc định.

Adapter không sandbox toàn bộ Python: allowlist là giới hạn entrypoint, không giới hạn output path hoặc khả năng mọi hàm trong script. Agent vẫn phải chọn output folder riêng, không truyền credentials, không chạy script chưa xem xét, không cho upstream page instructions quyền thao tác. Manifest nằm cục bộ là metadata quản lý, không là security boundary chống attacker cùng tài khoản.

Các extension Ahrefs, DataForSEO, Firecrawl, Profound, SE Ranking, Matomo, Bing, Unlighthouse, image-gen chỉ được cài **hướng dẫn**, không tự setup API/MCP/vendor runtime. Claude slash command, model routing, permissions và subagent names không được chuyển thành “tool Codex” giả; làm specialist passes tuần tự nếu host không có delegation.

An toàn mạng: resolver upstream pin DNS không thread-safe; collector dùng **một worker**. Nếu cần song song, dùng process cách ly sau test, không tắt bảo vệ DNS để tăng tốc. Không ghi nhận lượt lỗi resolver thử nghiệm như lỗi website; crawl cuối có 154 responses không fetch error.

Venv chỉ cài dependency cần cho chẩn đoán HTML/browser/tests; snapshot phiên bản được lưu riêng. Chưa quét advisory toàn dependency và không khẳng định “không CVE”. Chromium Playwright dùng cache người dùng chung; không xóa cache khi uninstall vì có thể được dự án khác dùng.

## Cập nhật và gỡ cài đặt

Update không tự động: chọn revision mới, review diff/scripts/dependencies, tạo môi trường test khác, validate rồi mới chuyển. Installer hiện từ chối overwrite; nếu chạy lại khi đã có adapter sẽ dừng, không “repair” âm thầm.

Gỡ: đọc manifest, xác nhận từng path thuộc đúng `C:\Users\dtan4\.agents\skills\codex-seo*` và không có thay đổi người dùng muốn giữ; chạy `Remove-Item -LiteralPath 'đường-dẫn-cụ-thể' -Recurse -WhatIf` trước để xem mục tiêu, rồi chỉ xóa đúng folder đã xác nhận. Làm tương tự với thư mục runtime chuyên biệt sau khi lưu report. Không xóa `.agents\skills`, `.codex`, home, repo dự án, hoặc Playwright cache chung. Không có deployment/config/Firebase state cần rollback từ task này.