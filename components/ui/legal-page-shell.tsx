import Link from 'next/link';
import { ReactNode } from 'react';

type LegalSection = {
  title: string;
  content: ReactNode;
};

type LegalPageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  updatedAt: string;
  sections: LegalSection[];
};

export default function LegalPageShell({
  eyebrow,
  title,
  description,
  updatedAt,
  sections,
}: LegalPageShellProps) {
  return (
    <main className="app-shell-bg min-h-screen pt-24 text-white">
      <section className="relative mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <div className="absolute inset-x-4 top-10 h-40 rounded-[32px] bg-[#fc5d01]/10 blur-3xl md:inset-x-12" />

        <div className="relative mx-auto max-w-4xl space-y-8">
          <div className="glass glass-hover rounded-[24px] p-6 md:p-8 lg:p-10">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="accent-glow inline-flex min-h-11 items-center rounded-full border border-[#fc5d01]/30 bg-[#fc5d01]/12 px-4 text-xs font-semibold uppercase tracking-[0.24em] text-white/90">
                {eyebrow}
              </span>
              <span className="inline-flex min-h-11 items-center rounded-full border border-white/15 bg-white/5 px-4 text-sm text-white/70">
                Cập nhật lần cuối: {updatedAt}
              </span>
            </div>

            <h1 className="text-[28px] font-bold leading-tight text-white md:text-[36px]">
              {title}
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/70 md:text-base">
              {description}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="accent-glow focus-visible:accent-ring inline-flex min-h-11 items-center justify-center rounded-[18px] bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(252,93,1,0.28)] active:translate-y-0.5"
              >
                Liên hệ hỗ trợ
              </Link>
              <Link
                href="/"
                className="glass-strong focus-visible:accent-ring inline-flex min-h-11 items-center justify-center rounded-[18px] px-5 py-3 text-sm font-semibold text-white/90 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/30 active:translate-y-0.5"
              >
                Về trang chủ
              </Link>
            </div>
          </div>

          <div className="grid gap-6">
            {sections.map((section) => (
              <article
                key={section.title}
                className="glass legal-prose glass-hover rounded-[24px] p-6 md:p-8"
              >
                <h2>{section.title}</h2>
                <div className="mt-4 space-y-4">{section.content}</div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}