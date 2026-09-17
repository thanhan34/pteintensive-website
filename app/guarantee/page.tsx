import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpenCheck,
  CalendarCheck2,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Flame,
  HeartHandshake,
  Medal,
  RefreshCcw,
  Route,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  UserCheck,
} from 'lucide-react';
import { DrawLine, Float, Heartbeat, Reveal, Stagger, StaggerItem } from './GuaranteeMotion';

export const metadata: Metadata = {
  title: 'Cam Kết Đầu Ra PTE - Dạy Đến Khi Bạn Đậu',
  description: 'PTE Intensive cam kết đồng hành và dạy đến khi bạn đạt mục tiêu nếu tham gia đầy đủ lớp, hoàn thành bài tập hằng ngày và nghiêm túc theo lộ trình.',
  alternates: {
    canonical: 'https://www.pteintensive.com/guarantee',
  },
  openGraph: {
    title: 'Cam Kết Đầu Ra PTE | PTE Intensive',
    description: 'Bạn giữ vững kỷ luật, PTE Intensive giữ trọn cam kết đồng hành đến khi bạn đạt mục tiêu.',
    url: 'https://www.pteintensive.com/guarantee',
    type: 'website',
  },
};

const centerCommitments = [
  { icon: Route, title: 'Lộ trình rõ ràng', text: 'Xác định đúng điểm xuất phát, mục tiêu và từng chặng cần chinh phục.' },
  { icon: UserCheck, title: 'Sửa bài sát sao', text: 'Trainer theo dõi tiến độ, chỉ ra lỗi sai và hướng dẫn cách cải thiện.' },
  { icon: RefreshCcw, title: 'Không bỏ cuộc giữa đường', text: 'Tiếp tục dạy và đồng hành theo chính sách cam kết đến khi bạn đạt mục tiêu.' },
];

const studentCommitments = [
  { icon: CalendarCheck2, title: 'Tham gia đầy đủ lớp học', text: 'Có mặt đúng giờ và học trọn vẹn các buổi trong chương trình.' },
  { icon: BookOpenCheck, title: 'Làm bài tập hằng ngày', text: 'Duy trì luyện tập đều đặn và hoàn thành bài theo hướng dẫn của Trainer.' },
  { icon: Flame, title: 'Giữ tinh thần nghiêm túc', text: 'Chủ động hỏi, sửa lỗi và kiên trì đi theo lộ trình đã thống nhất.' },
];

const journey = [
  { number: '01', icon: Target, title: 'Chọn đúng đích', text: 'Đánh giá đầu vào và xác định mức điểm phù hợp với mục tiêu du học, làm việc hoặc định cư.' },
  { number: '02', icon: Route, title: 'Đi đúng đường', text: 'Học theo lộ trình cá nhân hóa, ưu tiên những kỹ năng và dạng bài tạo điểm.' },
  { number: '03', icon: ClipboardCheck, title: 'Đo từng bước tiến', text: 'Bài tập, sửa lỗi và mock test giúp bạn nhìn thấy tiến bộ bằng kết quả cụ thể.' },
  { number: '04', icon: Trophy, title: 'Bền bỉ đến đích', text: 'Chưa đạt thì tiếp tục củng cố. Không dừng lại chỉ vì một lần thi chưa như ý.' },
];

const eligibility = [
  'Tham gia đầy đủ các buổi học theo lịch của khóa',
  'Hoàn thành bài tập được giao hằng ngày',
  'Tham gia các mốc đánh giá và mock test theo lộ trình',
  'Tiếp nhận phản hồi và thực hiện kế hoạch cải thiện của Trainer',
];

export default function GuaranteePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fffaf6] pt-24 text-[#211a16]">
      <section className="relative isolate overflow-hidden bg-[#0a171f] text-white">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_12%_10%,rgba(252,93,1,0.2),transparent_26%),radial-gradient(circle_at_82%_55%,rgba(252,93,1,0.24),transparent_30%)]" />
        <div className="absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:58px_58px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />

        <div className="mx-auto grid max-w-7xl gap-14 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:px-8 lg:py-24">
          <Stagger>
            <StaggerItem>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ff8a4c]/30 bg-[#fc5d01]/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[#ff9a68]">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Cam kết đầu ra tại PTE Intensive
            </div>
            </StaggerItem>
            <StaggerItem>
            <h1 className="mt-7 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Chúng tôi dạy đến khi
              <span className="relative mt-2 block text-[#ff7133]">
                bạn đậu.
                <DrawLine className="absolute -bottom-3 left-0 h-3 w-48 text-[#fc5d01]/70 sm:w-64" />
              </span>
            </h1>
            </StaggerItem>
            <StaggerItem>
            <p className="mt-9 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
              Bạn không cần hoàn hảo ngay từ đầu. Bạn chỉ cần có mặt đầy đủ, làm bài mỗi ngày và không ngừng cố gắng. Phần còn lại, hãy để PTE Intensive đồng hành cùng bạn.
            </p>
            </StaggerItem>
            <StaggerItem>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/register" className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#fc5d01] px-7 text-sm font-extrabold uppercase tracking-wide text-white shadow-[0_14px_34px_rgba(252,93,1,0.32)] transition hover:-translate-y-0.5 hover:bg-[#ff7025] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff9a68]">
                Bắt đầu hành trình <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <a href="#cam-ket" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5 px-7 text-sm font-bold text-white transition hover:border-white/40 hover:bg-white/10">
                Hiểu rõ cam kết
              </a>
            </div>
            </StaggerItem>
            <StaggerItem>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/10 pt-6 text-sm text-white/65">
              {['Lộ trình cá nhân hóa', 'Trainer theo sát', 'Đồng hành bền bỉ'].map((item) => (
                <span key={item} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#ff7133]" aria-hidden="true" />{item}</span>
              ))}
            </div>
            </StaggerItem>
          </Stagger>

          <Reveal direction="right" delay={0.18} className="relative mx-auto w-full max-w-lg lg:ml-auto">
            <div className="absolute -inset-8 rounded-full bg-[#fc5d01]/15 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.07] p-3 shadow-[0_32px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl">
              <div className="relative h-[420px] overflow-hidden rounded-[1.4rem] sm:h-[490px]">
                <Image src="/images/hero/5.png" alt="PTE Intensive đồng hành cùng học viên chinh phục mục tiêu" fill priority sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071117] via-[#071117]/10 to-transparent" />
                <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/15 bg-[#0b1720]/85 p-5 backdrop-blur-md sm:inset-x-7 sm:bottom-7 sm:p-6">
                  <Sparkles className="h-6 w-6 text-[#ff8a4c]" aria-hidden="true" />
                  <blockquote className="mt-3 font-[family-name:var(--font-display)] text-xl font-semibold leading-8 text-white sm:text-2xl">
                    “Chậm một chút không sao. Miễn là bạn vẫn tiếp tục.”
                  </blockquote>
                  <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-[#ff9a68]">PTE Intensive · Học là đậu</p>
                </div>
              </div>
            </div>
            <Float className="absolute -left-4 top-12 flex h-20 w-20 rotate-[-8deg] items-center justify-center rounded-2xl border border-white/15 bg-[#fc5d01] text-white shadow-xl sm:-left-8 sm:h-24 sm:w-24">
              <Medal className="h-9 w-9 sm:h-11 sm:w-11" aria-hidden="true" />
            </Float>
          </Reveal>
        </div>
      </section>

      <section id="cam-ket" className="scroll-mt-28 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Một cam kết từ hai phía" title="Bạn giữ kỷ luật. Chúng tôi giữ lời." description="Kết quả bền vững được tạo nên khi phương pháp đúng gặp một người học thật sự quyết tâm." />

          <Stagger className="mt-14 grid gap-6 lg:grid-cols-2">
            <StaggerItem className="h-full"><CommitmentCard label="PTE Intensive cam kết" title="Dạy đúng và không bỏ bạn lại phía sau" icon={HeartHandshake} items={centerCommitments} dark /></StaggerItem>
            <StaggerItem className="h-full"><CommitmentCard label="Bạn cam kết" title="Có mặt, luyện tập và không bỏ cuộc" icon={Flame} items={studentCommitments} /></StaggerItem>
          </Stagger>

          <Reveal direction="scale" className="relative z-20 mx-auto -mt-2 max-w-4xl lg:-mt-10">
            <div className="absolute left-8 right-8 top-1/2 -z-10 h-24 -translate-y-1/2 rounded-full bg-[#fc5d01]/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-[#ff8a4c]/35 bg-[#0b1720] px-5 py-6 text-white shadow-[0_28px_65px_rgba(11,23,32,0.24),0_0_0_5px_rgba(255,250,246,1)] sm:px-8 sm:py-7">
              <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:32px_32px]" />
              <div className="absolute -left-16 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-[#fc5d01]/25 blur-2xl" />
              <div className="absolute -right-16 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-[#fc5d01]/25 blur-2xl" />

              <div className="relative grid items-center gap-5 sm:grid-cols-[1fr_auto_1fr] sm:gap-7">
                <div className="flex items-center justify-center gap-3 text-center sm:justify-end sm:text-right">
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#ff9a68]">PTE Intensive</p>
                    <p className="mt-1 text-sm font-bold text-white/85 sm:text-base">Đồng hành đến cùng</p>
                  </div>
                  <span className="hidden h-px w-10 bg-gradient-to-r from-[#fc5d01] to-[#ffb18a] sm:block" />
                </div>

                <Heartbeat className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#ffb18a]/50 bg-gradient-to-br from-[#ff7a2f] to-[#e94f00] text-white">
                  <div className="absolute inset-1 rounded-full border border-white/20" />
                  <HeartHandshake className="relative h-9 w-9" aria-hidden="true" />
                </Heartbeat>

                <div className="flex items-center justify-center gap-3 text-center sm:justify-start sm:text-left">
                  <span className="hidden h-px w-10 bg-gradient-to-r from-[#ffb18a] to-[#fc5d01] sm:block" />
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#ff9a68]">Bạn</p>
                    <p className="mt-1 text-sm font-bold text-white/85 sm:text-base">Nỗ lực mỗi ngày</p>
                  </div>
                </div>
              </div>

              <div className="relative mt-6 border-t border-white/10 pt-5 text-center">
                <div className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#ff9a68]">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Sức mạnh của sự đồng lòng
                </div>
                <p className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
                  Hai cam kết <span className="text-[#ff7133]">—</span> Một đích đến
                </p>
                <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-400/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-emerald-300">
                  <Trophy className="h-4 w-4" aria-hidden="true" />
                  Điểm PTE mục tiêu của bạn
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-[#eee2da] bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Hành trình về đích" title="Chưa đạt không có nghĩa là không thể đạt" description="Mỗi lần sửa đúng một lỗi, hoàn thành thêm một bài tập, bạn đã tiến gần mục tiêu hơn ngày hôm qua." />
          <Stagger className="relative mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <div className="absolute left-[12%] right-[12%] top-9 hidden h-px bg-gradient-to-r from-transparent via-[#f3aa7d] to-transparent lg:block" />
            {journey.map((step) => {
              const Icon = step.icon;
              return (
                <StaggerItem key={step.number} className="h-full">
                  <article className="group relative h-full rounded-[1.5rem] border border-[#eadfd8] bg-[#fffaf6] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#fc5d01]/40 hover:shadow-[0_20px_45px_rgba(79,50,31,0.09)]">
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl bg-white text-[#e65300] shadow-sm transition group-hover:bg-[#fc5d01] group-hover:text-white"><Icon className="h-7 w-7" aria-hidden="true" /></div>
                      <span className="font-[family-name:var(--font-display)] text-4xl font-semibold text-[#eadfd8]">{step.number}</span>
                    </div>
                    <h3 className="mt-6 text-xl font-extrabold">{step.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-gray-500">{step.text}</p>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0d1b24] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
        <div className="absolute right-0 top-0 h-96 w-96 translate-x-1/3 -translate-y-1/3 rounded-full border-[60px] border-[#fc5d01]/10" />
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal direction="left" className="relative">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#ff8a4c]">Điều kiện áp dụng</p>
            <h2 className="mt-4 max-w-xl font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl">Cam kết mạnh mẽ bắt đầu từ sự minh bạch</h2>
            <p className="mt-5 max-w-xl leading-7 text-white/60">Chúng tôi không hứa một kết quả không cần nỗ lực. Chúng tôi cam kết một hành trình có phương pháp, có người đồng hành và không dừng lại khi bạn vẫn đang nghiêm túc cố gắng.</p>
            <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-[#ff8a4c]/25 bg-[#fc5d01]/10 px-5 py-4 text-sm font-bold text-[#ffb18a]">
              <ShieldCheck className="h-5 w-5 shrink-0" aria-hidden="true" />
              Chi tiết được xác nhận theo chính sách của khóa học đăng ký
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.12} className="relative rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-6 shadow-[0_28px_70px_rgba(0,0,0,0.22)] backdrop-blur sm:p-8">
            <div className="flex items-center gap-4 border-b border-white/10 pb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fc5d01] text-white"><ClipboardCheck className="h-6 w-6" aria-hidden="true" /></div>
              <div><p className="font-extrabold">Điều kiện để duy trì cam kết</p><p className="mt-1 text-sm text-white/45">Những việc đơn giản, được thực hiện đều đặn</p></div>
            </div>
            <Stagger className="mt-6 space-y-4" delay={0.18}>
              {eligibility.map((item, index) => (
                <StaggerItem key={item}>
                  <div className="flex items-start gap-4 rounded-xl bg-white/[0.045] p-4 text-sm leading-6 text-white/75">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300"><Check className="h-4 w-4" aria-hidden="true" /></span>
                    <span><strong className="mr-2 text-white">0{index + 1}.</strong>{item}</span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <Reveal direction="scale" className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#fc5d01] to-[#df4c00] px-6 py-12 text-white shadow-[0_28px_70px_rgba(252,93,1,0.24)] sm:px-10 lg:px-16 lg:py-16">
          <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full border-[55px] border-white/10" />
          <div className="absolute -bottom-28 left-1/3 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex flex-col items-start justify-between gap-9 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/70">Tin vào bản thân thêm một lần nữa</p>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight sm:text-4xl">Bạn mang theo quyết tâm. Chúng tôi mang theo cam kết.</h2>
              <p className="mt-4 leading-7 text-white/80">Bắt đầu bằng một buổi tư vấn để biết chính xác bạn đang ở đâu và con đường phù hợp nhất để về đích.</p>
            </div>
            <Link href="/register" className="group inline-flex min-h-14 shrink-0 items-center justify-center gap-3 rounded-full bg-white px-7 text-sm font-extrabold uppercase tracking-wide text-[#df5200] shadow-xl transition hover:-translate-y-0.5 hover:bg-[#fff7f2]">
              Nhận tư vấn miễn phí <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

type CommitmentItem = {
  icon: typeof Route;
  title: string;
  text: string;
};

function CommitmentCard({ label, title, icon: Icon, items, dark = false }: { label: string; title: string; icon: typeof Route; items: CommitmentItem[]; dark?: boolean }) {
  return (
    <article className={`relative overflow-hidden rounded-[1.75rem] border p-6 sm:p-8 ${dark ? 'border-[#172f3d] bg-[#0d1b24] text-white shadow-[0_24px_60px_rgba(13,27,36,0.18)]' : 'border-[#eadfd8] bg-white shadow-[0_24px_60px_rgba(79,50,31,0.07)]'}`}>
      <div className={`absolute -right-16 -top-16 h-48 w-48 rounded-full ${dark ? 'bg-[#fc5d01]/10' : 'bg-[#fedac2]/30'}`} />
      <div className="relative flex items-center gap-4 border-b border-current/10 pb-6">
        <div className="flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center rounded-2xl bg-[#fc5d01] text-white"><Icon className="h-6 w-6" aria-hidden="true" /></div>
        <div><p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#ed5700]">{label}</p><h3 className="mt-1 text-xl font-extrabold sm:text-2xl">{title}</h3></div>
      </div>
      <div className="relative mt-6 space-y-4">
        {items.map((item) => {
          const ItemIcon = item.icon;
          return <div key={item.title} className={`flex gap-4 rounded-2xl border p-4 ${dark ? 'border-white/10 bg-white/[0.045]' : 'border-[#f0e4dc] bg-[#fffaf6]'}`}><div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${dark ? 'bg-[#fc5d01]/15 text-[#ff8a4c]' : 'bg-white text-[#e65300] shadow-sm'}`}><ItemIcon className="h-5 w-5" aria-hidden="true" /></div><div><h4 className="font-extrabold">{item.title}</h4><p className={`mt-1 text-sm leading-6 ${dark ? 'text-white/55' : 'text-gray-500'}`}>{item.text}</p></div></div>;
        })}
      </div>
    </article>
  );
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <Reveal className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#df5200]">{eyebrow}</p>
      <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl">{title}</h2>
      <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-600">{description}</p>
    </Reveal>
  );
}