'use client';

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="vi">
      <body className="flex min-h-screen items-center justify-center bg-gray-50 px-4 text-center">
        <main className="max-w-lg">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#fc5d01]">PTE Intensive</p>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Nội dung chưa thể hiển thị</h1>
          <p className="mt-4 text-gray-600">Đã có lỗi khi tải nội dung trang. Vui lòng thử lại thay vì sử dụng một trang rỗng.</p>
          <button onClick={reset} className="mt-8 min-h-11 rounded-xl bg-[#fc5d01] px-6 py-3 font-semibold text-white">
            Thử lại
          </button>
        </main>
      </body>
    </html>
  );
}