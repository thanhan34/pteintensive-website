import { TaskData } from '../types';

export const retellLectureTask: TaskData = {
  taskName: "Retell Lecture",
  about: "Nhiệm vụ: thuật lại những gì bạn đã nghe từ bài giảng\n\nĐộ dài audio: thường 60-90 giây\n\nThời gian chuẩn bị: 10 giây\n\nThời gian trả lời: 40 giây\n\nSố câu hỏi trong bài thi: 1 - 2 câu",
  tips: [
    "Có 3 bước để trả lời câu hỏi retell lecture:",
    "Bước 1: Lắng nghe cẩn thận và ghi chú.\nKhi ghi chú, viết càng nhiều từ nội dung hoặc cụm từ càng tốt. Và ghi chú của bạn cần dễ đọc.",
    "Bước 2: Sử dụng 10 giây chuẩn bị để chọn các ghi chú để đọc sau.\n- Bỏ qua các ghi chú không thể nhận ra (chữ viết xấu / viết tắt không nhận ra)\n- Bỏ qua các từ khó phát âm",
    "Bước 3: Trong câu trả lời của bạn:\n- Cố gắng đề cập ít nhất 8 từ khóa hoặc cụm từ.\n- Ngữ pháp không quan trọng khi bạn trả lời.",
    "Sự khác biệt về điểm số thường KHÔNG nằm ở nội dung bạn nói. Nó thường do sự khác biệt về độ trôi chảy và phát âm. Vì vậy, hãy đảm bảo bạn nói rõ ràng và trôi chảy."
  ],
  timeSpan: "Mặc dù bạn được cho tối đa 40 giây để nói, bạn không cần phải sử dụng hết thời gian. 25 đến 30 giây là đủ. Tất nhiên, nếu bạn có hơn 8 từ khóa hoặc cụm từ để thuật lại, bạn cũng có thể nói lâu hơn một chút. Nhưng hãy giữ trong vòng 35 giây. Nếu bạn nói quá lâu và chưa kết thúc khi hết 40 giây, bạn sẽ bị trừ điểm về độ trôi chảy. Điều này không đáng.",
  practiceGoalWhy: "Mục tiêu là nắm bắt và thuật lại các điểm chính của bài giảng một cách rõ ràng và trôi chảy.",
  practiceGoalPoints: [
    {
      points: 79,
      description: "Thuật lại được ít nhất 8 từ khóa hoặc cụm từ một cách trôi chảy và rõ ràng, với cấu trúc logic."
    },
    {
      points: 65,
      description: "Thuật lại được 6-7 từ khóa hoặc cụm từ với độ trôi chảy tốt và phát âm rõ ràng."
    },
    {
      points: 50,
      description: "Thuật lại được 4-5 từ khóa hoặc cụm từ với độ trôi chảy và phát âm chấp nhận được."
    }
  ],
  practiceTask: "Thực hành với các bài giảng mẫu, tập trung vào kỹ năng ghi chú nhanh và thuật lại nội dung một cách trôi chảy. Đảm bảo nói trong khoảng thời gian 25-35 giây và bao gồm ít nhất 8 từ khóa hoặc cụm từ quan trọng."
};
