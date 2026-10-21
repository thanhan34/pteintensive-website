'use client';

import { useEffect } from 'react';
import Link from 'next/link';

// Keep capabilities in the fragment: they must never be sent to the server.
export default function LegacyStudentRedirect() {
  useEffect(() => {
    window.location.replace(`/cart${window.location.search}${window.location.hash}`);
  }, []);
  return <main className="billing-shell"><div className="billing-container"><p role="status">Đang chuyển đến trang Giỏ hàng & Học phí…</p><noscript>Vui lòng bật JavaScript để giữ thông tin liên kết học phí khi chuyển trang.</noscript><Link href="/cart" className="billing-link">Mở trang Giỏ hàng & Học phí</Link></div></main>;
}