import Link from 'next/link';

export function BlogCTA() {
  return <section className="rounded-3xl bg-gradient-to-r from-[#FC5D01] to-[#fd7f33] p-8 text-white shadow-xl md:p-10"><h2 className="text-2xl font-bold md:text-3xl">Bạn cần đạt PTE cho visa Úc?</h2><p className="mt-3 max-w-3xl text-white/90">PTE Intensive có lộ trình học phù hợp cho từng mục tiêu visa như 482, 485, 500, 407, 462 và định cư Úc.</p><Link href="/contact" className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-white px-6 py-3 font-semibold text-[#FC5D01] hover:bg-[#FEDAC2]">Đăng ký tư vấn miễn phí</Link></section>;
}
