import { courseData } from '@/lib/courseData';
import { Input } from '@/components/ui/input';

export function AcademicApprovalFields() {
  return <fieldset className="space-y-4">
    <legend className="font-bold mb-3">Xác nhận đánh giá đầu vào bắt buộc</legend>
    <p className="billing-message">Chỉ tạo học phí sau khi học viên đã làm bài kiểm tra đầu vào và được đội học thuật đánh giá. Kiểm tra kết quả trên hệ thống bài thi; trang này chưa tự đồng bộ kết quả.</p>
    <label className="billing-label">Khóa được đề xuất<select name="courseId" className="billing-select" required defaultValue=""><option value="" disabled>Chọn khóa sau đánh giá</option>{Object.entries(courseData).map(([id, course]) => <option key={id} value={id}>{course.title}</option>)}</select></label>
    <label className="billing-label">Tham chiếu bài kiểm tra / đánh giá<Input name="assessmentReference" minLength={10} maxLength={500} required placeholder="Mã bài thi, người và ngày đánh giá" /></label>
    <label className="billing-label">Đánh giá bài kiểm tra đầu vào (bắt buộc)<textarea name="assessmentFeedback" className="billing-select min-h-32 resize-y" rows={5} required minLength={10} maxLength={2000} aria-describedby="admin-assessment-feedback-help" placeholder="Nhập kết quả, nhận xét năng lực và lý do đề xuất khóa học từ đội học thuật." /></label>
    <p id="admin-assessment-feedback-help" className="text-sm text-gray-600">Nhập nội dung đánh giá, không chỉ mã bài thi. Tối thiểu 10 ký tự sau khi bỏ khoảng trắng đầu/cuối, tối đa 2.000 ký tự. Nội dung được lưu cùng khoản học phí để admin tra cứu.</p>
    <label className="flex gap-3 items-start text-sm leading-6"><input name="academicConfirmed" type="checkbox" required className="mt-1 h-5 w-5 shrink-0" />Tôi đã kiểm tra học viên hoàn thành bài đầu vào, được đội học thuật đánh giá và đề xuất khóa trên.</label>
  </fieldset>;
}