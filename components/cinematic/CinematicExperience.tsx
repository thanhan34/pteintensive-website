'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { z } from 'zod';

gsap.registerPlugin(ScrollTrigger);

type Chapter = {
  id: string;
  video: string;
  poster: string;
  objectPosition: string;
};

type LeadData = {
  name: string;
  phone: string;
  currentScore: string;
  target: string;
  examTime: string;
  goal: string;
  note: string;
};

const chapters: Chapter[] = [
  { id: 'hero', video: '/media/video/01-founder-arrival.mp4', poster: '/media/posters/01-founder-arrival.webp', objectPosition: '65% center' },
  { id: 'clarity', video: '/media/video/02-confusion-to-clarity.mp4', poster: '/media/posters/02-confusion-to-clarity.webp', objectPosition: '60% center' },
  { id: 'method', video: '/media/video/03-pte-method.mp4', poster: '/media/posters/03-pte-method.webp', objectPosition: '55% center' },
  { id: 'course', video: '/media/video/04-course-score-ascent.mp4', poster: '/media/posters/04-course-score-ascent.webp', objectPosition: 'center center' },
  { id: 'results', video: '/media/video/05-student-results.mp4', poster: '/media/posters/05-student-results.webp', objectPosition: 'center center' },
  { id: 'final', video: '/media/video/06-final-cta.mp4', poster: '/media/posters/06-final-cta.webp', objectPosition: '65% center' },
];

const leadSchema = z.object({
  name: z.string().min(1, 'Vui lòng nhập họ và tên.'),
  phone: z.string().min(1, 'Vui lòng nhập số điện thoại.'),
  currentScore: z.string(),
  target: z.string().min(1, 'Vui lòng nhập target PTE.'),
  examTime: z.string(),
  goal: z.string(),
  note: z.string(),
});

async function submitConsultationLead(data: LeadData) {
  // TODO: replace this mock adapter with Firebase, CRM, or a secure API route.
  await new Promise((resolve) => window.setTimeout(resolve, 650));
  return { ok: true, data };
}

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function layerOpacityForProgress(progress: number) {
  if (progress <= 0 || progress >= 1) return 0;
  const fadeIn = clamp(progress / 0.16);
  const fadeOut = clamp((1 - progress) / 0.18);
  return Math.max(0, Math.min(0.92, fadeIn, fadeOut));
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return reduced;
}

export default function CinematicExperience() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const layerRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const targetTimes = useRef<number[]>(chapters.map(() => 0));
  const displayedTimes = useRef<number[]>(chapters.map(() => 0));
  const [activeScore, setActiveScore] = useState(0);
  const [activeMethod, setActiveMethod] = useState(0);
  const [form, setForm] = useState<LeadData>({ name: '', phone: '', currentScore: '', target: '', examTime: '', goal: 'Du học', note: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof LeadData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const reducedMotion = useReducedMotion();

  const scores = useMemo(() => ['30', '36', '42', '50', '58', '65', '79'], []);
  const methodStages = ['Kiểm tra đầu vào', 'Phân tích kỹ năng', 'Xây dựng lộ trình', 'Luyện tập có sửa lỗi', 'Mock test và theo dõi', 'Sẵn sàng cho ngày thi'];

  useEffect(() => {
    const hidden: HTMLElement[] = [];
    document.querySelectorAll('body > nav, body > footer, header, footer').forEach((node) => {
      if (node instanceof HTMLElement && !rootRef.current?.contains(node)) {
        hidden.push(node);
        node.dataset.ptePreviousDisplay = node.style.display;
        node.style.display = 'none';
      }
    });
    return () => hidden.forEach((node) => { node.style.display = node.dataset.ptePreviousDisplay ?? ''; });
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 0.9, smoothWheel: true });
    const update = (time: number) => lenis.raf(time * 1000);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap.set(layerRefs.current.filter(Boolean), { autoAlpha: 0, scale: 1.03 });
      gsap.set(layerRefs.current[0], { autoAlpha: 0.92, scale: 1 });

      sectionRefs.current.forEach((section, index) => {
        if (!section) return;
        ScrollTrigger.create({
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const video = videoRefs.current[index];
            const duration = video?.duration && Number.isFinite(video.duration) ? video.duration : 5;
            targetTimes.current[index] = self.progress * duration;
            const opacity = layerOpacityForProgress(self.progress);
            gsap.set(layerRefs.current[index], {
              autoAlpha: index === 0 ? Math.max(0.28, opacity) : opacity,
              scale: 1.035 - self.progress * 0.035,
            });
            if (index === 2) setActiveMethod(Math.min(methodStages.length - 1, Math.floor(self.progress * methodStages.length)));
            if (index === 3) setActiveScore(Math.min(scores.length - 1, Math.floor(self.progress * scores.length)));
          },
        });
      });
      ScrollTrigger.refresh();
    }, rootRef);

    let frame = 0;
    const tick = () => {
      videoRefs.current.forEach((video, index) => {
        if (!video) return;
        if (video.readyState < HTMLMediaElement.HAVE_METADATA || !Number.isFinite(video.duration)) return;
        displayedTimes.current[index] += (targetTimes.current[index] - displayedTimes.current[index]) * 0.12;
        const safeTime = clamp(displayedTimes.current[index], 0, Math.max(0, video.duration - 0.04));
        if (Math.abs(video.currentTime - safeTime) > 0.035) {
          try { video.currentTime = safeTime; } catch { /* media not ready yet */ }
        }
      });
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      ctx.revert();
      gsap.ticker.remove(update);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [methodStages.length, reducedMotion, scores.length]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = leadSchema.safeParse(form);
    if (!parsed.success) {
      const nextErrors: Partial<Record<keyof LeadData, string>> = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof LeadData;
        nextErrors[key] = issue.message;
      });
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    await submitConsultationLead(parsed.data);
    setSubmitting(false);
    setSubmitted(true);
  };

  const updateField = (key: keyof LeadData, value: string) => setForm((current) => ({ ...current, [key]: value }));

  return (
    <main ref={rootRef} className="pte-cinema min-h-screen bg-[#070707] text-white">
      <CinematicNav />
      {reducedMotion ? <ReducedMotionExperience /> : <VideoStage />}

      <div className="relative z-10">
        <section ref={(node) => { sectionRefs.current[0] = node; }} id="hero" className="cinema-section min-h-[220vh]">
          <div className="cinema-copy pt-[28vh]">
            <p className="cinema-eyebrow">PTE INTENSIVE</p>
            <h1 className="cinema-title">Chinh phục PTE.<br />Mở cửa tương lai.</h1>
            <p className="cinema-lead">Lộ trình rõ ràng cho người cần điểm thật.</p>
            <p className="cinema-muted">Từ kiểm tra đầu vào đến ngày thi — mỗi giai đoạn đều có người theo sát.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a className="cinema-btn cinema-btn-primary" href="#consultation">Nhận tư vấn lộ trình</a>
              <a className="cinema-btn cinema-btn-secondary" href="#method">Kiểm tra trình độ đầu vào</a>
            </div>
            <p className="mt-7 text-sm text-white/60">Dẫn dắt bởi An Doan — Founder PTE Intensive</p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs tracking-[0.18em] text-[#FEDAC2]/80">
              {scores.map((score) => <span key={score} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">PTE {score}</span>)}
            </div>
          </div>
        </section>

        <section ref={(node) => { sectionRefs.current[1] = node; }} id="clarity" className="cinema-section min-h-[220vh]">
          <div className="cinema-copy sticky top-28 py-24">
            <p className="cinema-eyebrow">VẤN ĐỀ → LỘ TRÌNH</p>
            <h2 className="cinema-title-sm">Không thiếu nỗ lực.<br />Chỉ thiếu một lộ trình đúng.</h2>
            <p className="cinema-muted max-w-xl">Học nhiều nhưng không biết kỹ năng nào đang kéo điểm xuống sẽ khiến bạn mất thời gian, mất động lực và phải thi lại nhiều lần.</p>
            <div className="mt-9 grid max-w-xl grid-cols-2 gap-3">
              {['Học lan man', 'Không biết lỗi', 'Không rõ target', 'Không theo dõi tiến độ'].map((item) => <GlassChip key={item} muted>{item}</GlassChip>)}
              {['Target rõ', 'Kỹ năng rõ', 'Người sửa rõ', 'Tiến độ rõ'].map((item) => <GlassChip key={item}>{item}</GlassChip>)}
            </div>
            <p className="mt-10 font-serif text-3xl text-white">Không học nhiều hơn.<br /><span className="text-[#FC5D01]">Học đúng hơn.</span></p>
          </div>
        </section>

        <section ref={(node) => { sectionRefs.current[2] = node; }} id="method" className="cinema-section min-h-[240vh]">
          <div className="cinema-copy sticky top-24 py-24">
            <p className="cinema-eyebrow">PHƯƠNG PHÁP</p>
            <h2 className="cinema-title-sm">Một hệ thống.<br />Được xây quanh target của bạn.</h2>
            <p className="cinema-muted max-w-xl">Mỗi học viên bắt đầu từ một điểm khác nhau. Vì vậy, lộ trình cũng không thể giống nhau.</p>
            <ol className="mt-8 space-y-3">
              {methodStages.map((stage, index) => (
                <li key={stage} className={`method-stage ${index === activeMethod ? 'is-active' : ''}`}>
                  <span>{String(index + 1).padStart(2, '0')}</span>{stage}
                </li>
              ))}
            </ol>
            <p className="mt-8 text-sm uppercase tracking-[0.24em] text-white/60">Input → Diagnose → Train → Correct → Test → Target</p>
          </div>
        </section>

        <section ref={(node) => { sectionRefs.current[3] = node; }} id="courses" className="cinema-section min-h-[240vh]">
          <div className="cinema-copy sticky top-24 py-24">
            <p className="cinema-eyebrow">LỘ TRÌNH ĐIỂM</p>
            <h2 className="cinema-title-sm">Chọn target.<br />Chúng tôi dựng lộ trình.</h2>
            <div className="score-row mt-8">
              {scores.map((score, index) => <span key={score} className={index === activeScore ? 'active' : ''}>{score}</span>)}
            </div>
            <div className="glass-panel mt-8 max-w-xl">
              <h3>{courseForScore(scores[activeScore]).title}</h3>
              <p>{courseForScore(scores[activeScore]).description}</p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">{['Speaking Support', 'Reading Intensive', 'Mock Test', 'Exam Tracking', 'Bài tập và sửa lỗi', 'Hỗ trợ sau buổi học'].slice(0, 4).map((m) => <GlassChip key={m} muted>{m}</GlassChip>)}</div>
            <a className="cinema-btn cinema-btn-primary mt-8 inline-flex" href="#consultation">Tư vấn khóa học phù hợp</a>
          </div>
        </section>

        <section className="cinema-section min-h-[170vh]">
          <div className="cinema-copy sticky top-20 py-24">
            <p className="cinema-eyebrow">KỸ NĂNG</p>
            <h2 className="cinema-title-sm">Mỗi kỹ năng.<br />Một chiến lược.</h2>
            <div className="mt-8 grid max-w-3xl gap-4 md:grid-cols-2">{skillGroups.map((skill) => <SkillCard key={skill.name} {...skill} />)}</div>
            <p className="mt-8 font-serif text-3xl text-[#FEDAC2]">Từng lỗi nhỏ đều có cách sửa.</p>
          </div>
        </section>

        <section ref={(node) => { sectionRefs.current[4] = node; }} id="results" className="cinema-section min-h-[230vh]">
          <div className="cinema-copy sticky top-20 py-24">
            <p className="cinema-eyebrow">KẾT QUẢ</p>
            <h2 className="cinema-title-sm">Không phải may mắn.<br />Là đúng phương pháp.</h2>
            <p className="cinema-muted max-w-xl">Điểm số là kết quả của một lộ trình rõ, luyện tập đúng và sửa lỗi liên tục.</p>
            <div className="results-track mt-8">
              <ResultCard name="Thanh Giang Tran" target="PTE 65+" overall="69" scores="L 66 · R 69 · S 65 · W 73" review="Kết quả xác thực, dùng làm mẫu dữ liệu thật cho hệ thống review." />
              <ResultCard name="Học viên PTE 50+" target="Placeholder CMS" overall="50+" scores="Đang cập nhật" review="Thẻ trung tính để sau này nạp review thật từ Firebase." />
              <ResultCard name="Học viên PTE 65+" target="Placeholder CMS" overall="65+" scores="Đang cập nhật" review="Không hiển thị tên hoặc claim chưa xác thực." />
            </div>
          </div>
        </section>

        <section ref={(node) => { sectionRefs.current[5] = node; }} id="about" className="cinema-section min-h-[160vh]">
          <div className="cinema-copy sticky top-24 py-24">
            <p className="cinema-eyebrow">FOUNDER-LED</p>
            <h2 className="cinema-title-sm">Người đứng sau phương pháp PTE Intensive.</h2>
            <div className="glass-panel mt-8 max-w-xl">
              <p className="text-sm uppercase tracking-[0.22em] text-[#FC5D01]">An Doan</p>
              <h3>Founder — PTE Intensive</h3>
              <blockquote>“Tôi không muốn học viên học nhiều hơn. Tôi muốn các bạn học đúng hơn — và đến gần target nhanh hơn.”</blockquote>
            </div>
            <ul className="mt-6 grid max-w-xl gap-3 text-white/70">{['Phân tích điểm đầu vào', 'Xác định kỹ năng đang kéo điểm xuống', 'Xây dựng lộ trình theo target', 'Theo dõi tiến độ đến ngày thi'].map((p) => <li key={p}>— {p}</li>)}</ul>
            <p className="mt-8 font-serif text-3xl">Target rõ. Lộ trình rõ. <span className="text-[#FC5D01]">Người sửa rõ.</span></p>
          </div>
        </section>

        <section id="consultation" className="cinema-section min-h-screen pb-24">
          <div className="cinema-copy grid gap-8 py-28 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="cinema-eyebrow">BẮT ĐẦU</p>
              <h2 className="cinema-title-sm">Bạn chưa biết nên bắt đầu từ đâu?</h2>
              <p className="cinema-muted mt-5">Gửi điểm hiện tại, target và thời gian dự kiến thi. PTE Intensive sẽ giúp bạn nhìn rõ lộ trình phù hợp.</p>
              <p className="mt-8 text-[#FEDAC2]">Không cần học thử lan man. Bắt đầu bằng một lộ trình rõ ràng.</p>
            </div>
            <form className="consult-form" onSubmit={handleSubmit} noValidate>
              {submitted ? <div className="success-state"><h3>Đã nhận thông tin.</h3><p>PTE Intensive sẽ liên hệ để tư vấn lộ trình phù hợp cho bạn.</p></div> : <>
                <FormField label="Họ và tên" error={errors.name}><input value={form.name} onChange={(e) => updateField('name', e.target.value)} /></FormField>
                <FormField label="Số điện thoại" error={errors.phone}><input value={form.phone} onChange={(e) => updateField('phone', e.target.value)} /></FormField>
                <FormField label="Điểm hiện tại"><input value={form.currentScore} onChange={(e) => updateField('currentScore', e.target.value)} /></FormField>
                <FormField label="Target PTE" error={errors.target}><input value={form.target} onChange={(e) => updateField('target', e.target.value)} /></FormField>
                <FormField label="Thời gian dự kiến thi"><input value={form.examTime} onChange={(e) => updateField('examTime', e.target.value)} /></FormField>
                <FormField label="Mục tiêu"><select value={form.goal} onChange={(e) => updateField('goal', e.target.value)}>{['Du học', 'Công việc', 'Visa', 'Định cư', 'Nâng cao năng lực', 'Khác'].map((goal) => <option key={goal}>{goal}</option>)}</select></FormField>
                <FormField label="Ghi chú"><textarea rows={4} value={form.note} onChange={(e) => updateField('note', e.target.value)} /></FormField>
                <button className="cinema-btn cinema-btn-primary justify-center" disabled={submitting}>{submitting ? 'Đang gửi...' : 'Nhận tư vấn miễn phí'}</button>
              </>}
            </form>
          </div>
        </section>
      </div>
    </main>
  );

  function VideoStage() {
    return (
      <div className="video-stage" aria-hidden="true">
        {chapters.map((chapter, index) => (
          <video
            key={chapter.id}
            ref={(node) => { videoRefs.current[index] = node; layerRefs.current[index] = node; }}
            className="video-layer"
            src={chapter.video}
            poster={chapter.poster}
            muted
            playsInline
            preload="metadata"
            style={{ objectPosition: chapter.objectPosition }}
          />
        ))}
        <div className="stage-gradient" /><div className="stage-vignette" /><div className="stage-grain" />
      </div>
    );
  }
}

function CinematicNav() {
  const links = [
    ['Phương pháp', '#method'], ['Lộ trình', '#courses'], ['Khóa học', '#courses'], ['Kết quả', '#results'], ['Về PTE Intensive', '#about'],
  ];
  return <nav className="cinema-nav" aria-label="PTE Intensive cinematic navigation"><Image src="/images/logo/white-logo.png" alt="PTE Intensive" width={150} height={44} className="h-9 w-auto" /><div className="hidden items-center gap-5 lg:flex">{links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}</div><a className="cinema-btn cinema-btn-primary hidden sm:inline-flex" href="#consultation">Nhận tư vấn</a></nav>;
}

function ReducedMotionExperience() {
  return <div className="fixed inset-0 z-0 bg-[#070707]" aria-hidden="true"><Image src="/media/master/an-doan-master.webp" alt="" fill priority className="object-cover object-[65%_center] opacity-80" /><div className="stage-gradient" /><div className="stage-vignette" /></div>;
}

function GlassChip({ children, muted = false }: { children: React.ReactNode; muted?: boolean }) {
  return <span className={`glass-chip ${muted ? 'is-muted' : ''}`}>{children}</span>;
}

function courseForScore(score: string) {
  if (['30', '36', '42'].includes(score)) return { title: 'PTE 30–36–42', description: 'Lộ trình tập trung vào các kỹ năng và dạng bài tạo điểm phù hợp với target cơ bản.' };
  if (['50', '58'].includes(score)) return { title: 'PTE 50–58', description: 'Phát triển độ chính xác, chiến lược làm bài và khả năng cân bằng bốn kỹ năng.' };
  return { title: 'PTE 65–79', description: 'Dành cho target cao, yêu cầu sửa lỗi sát, luyện đề có hệ thống và kiểm soát hiệu suất.' };
}

const skillGroups = [
  { name: 'Speaking', tasks: 'Read Aloud · Repeat Sentence · Describe Image · Retell Lecture', focus: 'Phát âm, fluency, nhịp, phản xạ và cấu trúc trả lời.' },
  { name: 'Reading', tasks: 'RWFIB · RFIB · Re-order Paragraph · Reading strategy', focus: 'Từ vựng, ngữ pháp, collocation và logic ngữ cảnh.' },
  { name: 'Writing', tasks: 'Essay · SWT · SST · Write Email', focus: 'Template, cấu trúc, triển khai ý và độ chính xác.' },
  { name: 'Listening', tasks: 'WFD · HIW · LFIB · SST', focus: 'Nghe theo cụm, chính tả, ghi chú và nhận diện thông tin.' },
];

function SkillCard({ name, tasks, focus }: { name: string; tasks: string; focus: string }) {
  return <article className="glass-panel"><p className="text-xs uppercase tracking-[0.24em] text-[#FC5D01]">{name}</p><h3>{tasks}</h3><p>{focus}</p></article>;
}

function ResultCard({ name, target, overall, scores, review }: { name: string; target: string; overall: string; scores: string; review: string }) {
  return <article className="result-card"><p>{target}</p><h3>{name}</h3><strong>{overall}</strong><span>{scores}</span><small>{review}</small></article>;
}

function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return <label className="form-field"><span>{label}</span>{children}{error ? <em>{error}</em> : null}</label>;
}