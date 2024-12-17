import { TaskData } from '../types';

export const describeImageTask: TaskData = {
  taskName: "Describe Image",
  about: "Nhiệm vụ: mô tả những gì biểu đồ đang thể hiện\n\nThời gian chuẩn bị: 25 giây\n\nThời gian trả lời: 40 giây\n\nSố câu hỏi trong bài thi: 3 - 4 câu",
  tips: [
    "DI là một loại câu hỏi tương đối đơn giản. Bạn có thể mô tả hình ảnh theo nhiều cách khác nhau miễn là chúng liên quan đến hình ảnh. Bạn có thể nói về các mối quan hệ, tên các mục hoặc kết luận.",
    "Cố gắng chọn các từ khóa hoặc cụm từ từ các phần khác nhau của biểu đồ.",
    "Sự khác biệt về điểm số thường KHÔNG nằm ở nội dung bạn nói, mà thường do sự khác biệt về độ trôi chảy và phát âm. Vì vậy, hãy đảm bảo bạn nói rõ ràng và trôi chảy."
  ],
  timeSpan: "Mặc dù bạn được cho tối đa 40 giây để nói, bạn không cần phải sử dụng hết thời gian. 25 đến 30 giây là đủ. Nếu bạn nói quá lâu và chưa kết thúc câu khi hết 40 giây, bạn sẽ bị trừ điểm về độ trôi chảy. Điều này không đáng.",
  practiceGoalWhy: "Mục tiêu là nói rõ ràng và trôi chảy, tập trung vào việc mô tả các điểm chính của hình ảnh một cách có cấu trúc.",
  practiceGoalPoints: [
    {
      points: 79,
      description: "Mô tả đầy đủ và chi tiết với độ trôi chảy cao, phát âm rõ ràng và cấu trúc logic."
    },
    {
      points: 65,
      description: "Mô tả các điểm chính với độ trôi chảy tốt và phát âm rõ ràng."
    },
    {
      points: 50,
      description: "Mô tả cơ bản các yếu tố chính của hình ảnh với độ trôi chảy và phát âm chấp nhận được."
    }
  ],
  practiceTask: "Thực hành mô tả các loại biểu đồ và hình ảnh khác nhau từ ngân hàng câu hỏi, tập trung vào việc nói trôi chảy và rõ ràng trong khoảng thời gian 25-30 giây."
};
