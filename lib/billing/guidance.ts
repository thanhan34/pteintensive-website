import { validPlacementDeclaration, type PlacementDeclaration } from './placement';

export type CourseGuidanceStep = 'start' | 'test' | 'feedback' | 'continue' | 'courses' | 'cart' | 'done';

export function courseGuidanceStep(declaration: PlacementDeclaration, started: boolean, continued: boolean, added: boolean, cartOpened: boolean): CourseGuidanceStep {
  if (!declaration.completed) return started ? 'test' : 'start';
  if (!validPlacementDeclaration(declaration)) return 'feedback';
  if (added) return cartOpened ? 'done' : 'cart';
  return continued ? 'courses' : 'continue';
}

export const courseGuidanceCopy: Record<CourseGuidanceStep, string> = {
  start: 'Bắt đầu tại nút kiểm tra đầu vào để được hướng dẫn từng bước.',
  test: 'Mở bài kiểm tra ở tab mới. Khi làm xong, quay lại và tích xác nhận đã hoàn thành.',
  feedback: 'Tiếp theo: nhập nhận xét bạn đã nhận từ đội học thuật vào khung bên dưới.',
  continue: 'Đã đủ thông tin tự khai. Bấm “Tiếp tục chọn khóa” để xem các khóa phù hợp.',
  courses: 'Chọn khóa được đội học thuật đề xuất, rồi bấm “Thêm vào giỏ”.',
  cart: 'Đã thêm khóa. Bấm biểu tượng giỏ hàng trên thanh điều hướng để tiếp tục.',
  done: 'Bạn đã mở giỏ hàng. Có thể chọn thêm khóa nếu cần.',
};