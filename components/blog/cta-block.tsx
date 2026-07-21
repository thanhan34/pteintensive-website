import Link from 'next/link';

export function CTABlock() {
  return (
    <div className="my-12 bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] rounded-lg p-8 text-white">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4">
          PTE Intensive – Học là đậu!
        </h3>
        <p className="text-lg mb-6 opacity-90">
          Cam kết đầu ra, lộ trình cá nhân hóa, giảng viên 1-1 chuyên nghiệp
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
                href="/register"
            className="inline-flex items-center px-8 py-3 bg-white text-[#fc5d01] rounded-md font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            👉 Đăng ký học thử ngay
          </Link>
          
          <Link
                href="https://study.pteintensive.com"
            className="inline-flex items-center px-8 py-3 bg-[#ffffff20] text-white rounded-md font-semibold hover:bg-[#ffffff30] transition-colors border-2 border-white"
          >
            🎧 Làm Mock Test miễn phí
          </Link>
        </div>
        
        <p className="mt-6 text-sm opacity-75">
          Tham gia cộng đồng 1000+ học viên đã đạt điểm mục tiêu với PTE Intensive
        </p>
      </div>
    </div>
  );
}
