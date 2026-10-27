'use client';
import Link from 'next/link';
import { ArrowRight, Check, LockKeyhole, MessageSquareText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { placementTestUrl, type PlacementDeclaration } from '@/lib/billing/placement';
import type { CourseGuidanceStep } from '@/lib/billing/guidance';

export function PlacementJourney({ declaration, onChange, ready, busy, onContinue, guidanceStep, onStart }: { declaration: PlacementDeclaration; onChange: (value: PlacementDeclaration) => void; ready: boolean; busy: boolean; onContinue: () => void; guidanceStep?: CourseGuidanceStep; onStart?: () => void }) {
  const currentStep = !declaration.completed ? 1 : !ready ? 2 : 3;
  return <section id="placement-declaration" onFocusCapture={onStart} className="student-placement scroll-mt-28" aria-labelledby="placement-heading">
    <div className="student-placement-intro">
      <h2 id="placement-heading">Mỗi mục tiêu lớn đều bắt đầu<br />từ <span>một bước nhỏ.</span></h2>
      <p>Bạn không cần giỏi ngay từ đầu. Hãy bắt đầu bằng việc hiểu mình đang ở đâu — để mỗi bước học tiếp theo đều có hướng đi rõ ràng.</p>
      <p className="student-placement-intro-guide">Làm bài kiểm tra, nhận định hướng từ đội học thuật, rồi chọn khóa phù hợp với bạn. <strong>Hoàn thành cả bài kiểm tra và nhận xét trước khi thêm khóa vào giỏ.</strong></p>
      <p className="student-placement-progress" role="status">{ready ? 'Đã đủ thông tin tự khai · Có thể chọn khóa' : `Bước ${currentStep}/3 · ${currentStep === 1 ? 'Bắt đầu bằng bài kiểm tra đầu vào' : 'Tiếp theo: nhập nhận xét đã nhận'}`}</p>
      <div className="student-placement-track" aria-hidden="true"><span data-complete={declaration.completed} /><span data-complete={ready} /><span data-complete={ready} /></div>
    </div>
    <ol className="student-placement-actions">
      <li className="student-placement-action" data-current={currentStep === 1} aria-current={currentStep === 1 ? 'step' : undefined}>
        <div className="student-placement-step-heading"><span className="student-placement-number">{declaration.completed ? <Check aria-hidden="true" /> : '1'}</span><div><span className="student-placement-step-status">{declaration.completed ? 'Đã tự xác nhận' : 'Bắt đầu tại đây · Bắt buộc'}</span><h3>Làm bài kiểm tra đầu vào</h3></div></div>
        <p>Hiểu điểm mạnh và những kỹ năng cần trau dồi là bước đầu để tiến xa hơn. Làm bài kiểm tra, rồi quay lại đây để xác nhận bạn đã hoàn thành.</p>
        <Button asChild size="lg" variant={declaration.completed ? 'outline' : 'default'} className="student-placement-test" data-guidance={!busy && guidanceStep === 'test'}><Link href={placementTestUrl} onClick={onStart} target="_blank" rel="noopener noreferrer">{declaration.completed ? 'Mở lại bài kiểm tra' : 'Làm bài kiểm tra đầu vào'}<ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" /><span className="sr-only"> (mở tab mới)</span></Link></Button>
        <span className="student-placement-field-hint">Bài kiểm tra mở ở tab mới. Giữ trang này để tiếp tục.</span>
        <label className="student-placement-checkbox" data-guidance={!busy && guidanceStep === 'test'}><input type="checkbox" name="placementCompleted" disabled={busy} checked={declaration.completed} onChange={(event) => onChange({ ...declaration, completed: event.target.checked })} aria-controls="academic-feedback" /><span>Tôi đã hoàn thành bài kiểm tra đầu vào.</span></label>
      </li>
      <li className="student-placement-action" data-current={currentStep === 2} aria-current={currentStep === 2 ? 'step' : undefined}>
        <div className="student-placement-step-heading"><span className="student-placement-number">{ready ? <Check aria-hidden="true" /> : '2'}</span><div><span className="student-placement-step-status">{ready ? 'Đã nhập nhận xét' : 'Phải có nhận xét từ đội học thuật'}</span><h3>Nhận & nhập nhận xét học thuật</h3></div></div>
        <p>Bạn không cần tự tìm lối đi. Nhận xét từ đội học thuật sẽ giúp bạn hiểu kết quả và chọn khóa phù hợp. <strong>Cần nhận và nhập nhận xét trước khi chọn khóa.</strong></p>
        <div className="student-placement-contact"><MessageSquareText aria-hidden="true" /><div><strong>Chưa nhận được nhận xét?</strong><p>Liên hệ đội học thuật để được đánh giá trước. Khi đã có nhận xét, quay lại nhập bên dưới.</p><Link href="/contact" target="_blank" rel="noopener noreferrer" className="billing-link">Liên hệ đội học thuật <ArrowRight aria-hidden="true" className="h-4 w-4" /><span className="sr-only"> (mở tab mới)</span></Link></div></div>
        <fieldset disabled={busy} className="student-placement-fields">
      <legend className="sr-only">Nhận xét học thuật bắt buộc</legend>
      <label htmlFor="academic-feedback" className="billing-label">Nhập nhận xét bạn đã nhận <span className="student-placement-field-hint">Bắt buộc · Nhập lại nhận xét và khóa được đề xuất. Không tự viết nhận xét thay đội học thuật.</span></label>
      <div className="course-guide-field" data-guidance={!busy && guidanceStep === 'feedback'}><textarea id="academic-feedback" data-guidance={!busy && guidanceStep === 'feedback'} name="academicFeedback" rows={4} minLength={10} maxLength={2000} disabled={!declaration.completed || busy} value={declaration.feedback} onChange={(event) => onChange({ ...declaration, feedback: event.target.value })} placeholder="Nhập nhận xét từ đội học thuật và khóa học được đề xuất…" aria-describedby="placement-feedback-help placement-privacy" /></div>
      <div className="student-placement-field-footer"><p id="placement-feedback-help">{!declaration.completed ? 'Xác nhận đã làm bài để nhập nhận xét.' : 'Nhận xét cần từ 10 đến 2.000 ký tự; không tính khoảng trắng đầu/cuối vào độ dài tối thiểu.'}</p><span>{declaration.feedback.length}/2.000</span></div>
    </fieldset>
      </li>
      <li className="student-placement-action student-placement-unlock" data-current={currentStep === 3} aria-current={currentStep === 3 ? 'step' : undefined}>
        <div className="student-placement-step-heading"><span className="student-placement-number">3</span><div><span className="student-placement-step-status">{ready ? 'Đã mở bước chọn khóa' : 'Chưa mở · Cần hoàn thành bước 1 & 2'}</span><h3>Chọn khóa theo nhận xét</h3></div></div>
        <p>{ready ? 'Bạn đã sẵn sàng cho bước tiếp theo. Dựa trên thông tin bạn tự khai, hãy chọn khóa đội học thuật đề xuất và bắt đầu hành trình của mình.' : 'Lộ trình phù hợp bắt đầu từ việc hiểu đúng trình độ. Hoàn thành bài kiểm tra và nhập nhận xét ở trên để mở bước chọn khóa.'}</p>
        <Button size="lg" data-guidance={!busy && guidanceStep === 'continue'} disabled={busy || !ready} onClick={onContinue}>{ready ? <Check aria-hidden="true" className="mr-2 h-4 w-4" /> : <LockKeyhole aria-hidden="true" className="mr-2 h-4 w-4" />}Tiếp tục chọn khóa<ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" /></Button>
      </li>
    </ol>
    <p id="placement-privacy" className="student-placement-disclosure">Đây là thông tin do bạn tự khai, chưa được hệ thống xác minh với đội học thuật. Nhận xét được lưu theo tài khoản để trung tâm đối chiếu; tải lại trang không cần nhập lại. Sau 30 phút, hãy kiểm tra lại bản nháp, không cần làm lại bài kiểm tra.</p>
  </section>;
}