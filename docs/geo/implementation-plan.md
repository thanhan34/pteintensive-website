# Kế hoạch Next.js — bản vá cô lập, không triển khai production

Stack đã kiểm tra trong package.json: Next.js 16, React, TypeScript, Tailwind, Clerk, Firebase, MDX/gray-matter và Framer Motion. Không thêm thư viện web mới. Styling hiện tại có nền sáng/trắng, cam `#fc5d01`, tông đào, Manrope/Playfair, card bo góc. **Giữ phong cách này**, không áp fallback dark glass như một lần redesign.

Trong phiên này chỉ thêm scripts/tài liệu/bản vá review-only, chưa sửa app, globals.css, navigation, billing hoặc proxy.

## P0: public access — cần phê duyệt riêng

- Mục tiêu: public page, robots và sitemap không cần Clerk dev handshake; private route vẫn bảo vệ.
- Kiểm tra deployment environment/Clerk instance theo quy trình quản trị, không in key vào log hoặc report. Không sửa key hoặc `proxy.ts` trong phiên này.
- Đối chiếu firewall logs với verified UA/IP theo tài liệu; không allow toàn site dựa một user-agent spoofable.
- Không bypass payment/admin, không trả HTML riêng cho bot khác người dùng. Robots không phải lớp authorization.
- Nghiệm thu: GET public URL với `Accept: */*` và `text/html`, không cookie, desktop/mobile/search UA đều trả nội dung phù hợp; protected routes giữ yêu cầu auth; logged-in flow không regression. Kiểm tra robots/sitemap Content-Type đúng. Thực hiện staging trước production.

## P1: course SSR

Tệp đích: `app/courses/[slug]/CourseContent.tsx` và `CourseDetailClient.tsx` (đường dẫn tính từ root dự án; root tuyệt đối ghi trong README bàn giao).

`patches/001-course-ssr.patch` đổi primary detail sang static import, giữ các khối phụ dynamic như hiện tại. Đây là bước đầu nhỏ, không khẳng định giải quyết toàn bộ SEO hoặc hydration. Bản vá chưa được áp dụng; chỉ kiểm tra patch context và cú pháp TypeScript trong bộ nhớ.

Sau khi áp dụng ở nhánh riêng: kiểm tra CourseDetailClient không đọc window/localStorage ở render ban đầu; motion không ẩn toàn bộ nội dung với opacity 0 khi JS tắt. Nếu còn phụ thuộc browser, tách overview/H1/objectives thành server component; giữ placement/cart/CTA trong client island, không đụng billing logic. Không render hai H1 hoặc nhân đôi nội dung ẩn.

Nghiệm thu cả 5 course: raw HTML có một H1 và mô tả/đối tượng/outline thật; DOM không duplicate; title/H1/schema đồng nhất với catalog; không hydration warnings; mobile và keyboard/CTA không regression. Build staging không ghi dữ liệu production.

## P1: server JSON-LD và metadata

- Dùng `<script type="application/ld+json">` trong server page/layout, serialize JSON với escape `<` thành `\\u003c` theo hướng dẫn Next.js; không đưa HTML không tin cậy vào `dangerouslySetInnerHTML`.
- Tạo `lib/structured-data.ts` cho serializer/type helpers sau khi chốt data contract; không gom claim chưa xác minh vào helper dùng sitewide.
- Organization/WebSite có `@id` ổn định; Course/Article link đúng organization/publisher. Tác giả tổ chức dùng Organization, người dùng Person khi có hồ sơ thật.
- Article `dateModified` chỉ khi sửa nội dung thực; image absolute URL; course duration theo ISO khi xác minh được, delivery đúng catalog, không gán capacity bằng prose.
- Knowledge client pages: bọc server page hoặc server layout hẹp để export Metadata; không export metadata trong file `use client`. Metadata tường minh canonical/OG URL/title/description cho 21 trang, không kế thừa homepage URL.
- Nghiệm thu: JSON-LD có trong raw HTML, JSON parse hợp lệ, không self-serving rating, không schema claim không hiển thị; metadata unique có ý nghĩa, không chỉ unique bằng nhồi từ khóa.

## P1: robots và sitemap

- `app/robots.ts`: bỏ chặn `/_next/` cần thiết cho render. Đồng bộ nhóm Googlebot/Bingbot/search bots với wildcard exclusions, hoặc bỏ nhóm riêng không cần thiết. Training policy chốt độc lập theo lựa chọn chủ sở hữu.
- Kiểm tra `/admin` và `/admin/`, `/api` và `/api/` riêng để tránh lỗ prefix. Không công bố private URL có token trong sitemap.
- `app/sitemap.ts`: không `new Date()` giả freshness. Blog/migration lấy ngày frontmatter hợp lệ, nếu không có ngày đáng tin thì bỏ lastModified; static/course dùng ngày content revision thật hoặc bỏ. Không dùng fs mtime build làm ngày biên tập.
- Archives: đánh giá từng category theo bài liên quan/nội dung riêng/nhu cầu; noindex archive mỏng chỉ sau review và đồng bộ sitemap. Không tạo canonical sai sang homepage chỉ để giảm URL.
- Auth noindex: đề xuất layout metadata hẹp cho sign-in/up; thay đổi liên quan auth phải được duyệt riêng. Kiểm tra robots meta và X-Robots-Tag thực, không chỉ suy từ sitemap.
- Nghiệm thu parser robots cho mỗi bot/path và sitemap XML, canonical 200, indexable thật, date hợp lệ. Tests phải hiểu route group `/cart` `/login`, sửa inventory check-seo ở task riêng trước coi nó là release gate.

## P1/P2: ảnh và editorial

- Hero SVG chứa raster base64: tạo AVIF/WebP từ nguồn chất lượng, không đặt raster vào SVG lớn; responsive `sizes`, width/height và chỉ priority ảnh LCP thực. Mobile PNG cũng cần tối ưu; không claim tiết kiệm wire bytes bằng chênh lệch file decoded.
- `ReviewSection.tsx`: bỏ priority hàng loạt, lazy ảnh dưới fold, xem consent/alt. Đo chất lượng hình và LCP/CLS thực, không suy từ kích thước.
- `CommonQuestions`, scoring và 45 MDX: academic reviewer kiểm tra format mới, mốc 07/08/2025 và visa từng kỹ năng. Không thay hàng loạt 2025→2026.
- Chỉ xuất bản tác giả, đối tác, chứng chỉ, đánh giá và case study đã xác minh. Lưu consent ngoài public repo.

## Kiểm thử và an toàn

Các script GEO chạy bằng Python venv riêng, không sửa package.json/lockfile. `test_geo.py` kiểm thử parser, JSON-LD lỗi, redaction URL, sitemap, schema, dispatch blocklist và benchmark không chứa dữ liệu giả. Tests upstream được chọn có thể skip theo nền tảng; không gọi toàn bộ repository đã audit security chỉ vì tests pass.

Không chạy full Next build trong phiên này vì không sửa app và build có thể thực thi static-data integrations. TypeScript project check chạy `--noEmit --incremental false` để không tạo tsbuildinfo. Bản vá cần live render/hydration và build nghiệm thu ở nhánh/staging trước khi apply production.