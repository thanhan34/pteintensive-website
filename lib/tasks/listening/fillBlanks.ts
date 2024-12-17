import { TaskData } from '../types';

export const listeningFillBlanksTask: TaskData = {
  taskName: "Fill in Blanks (Listening)",
  about: "Thí sinh thường sẽ nghe một đoạn audio và xem một đoạn văn bản có các chỗ trống, trước khi được yêu cầu điền một từ chính xác vào mỗi chỗ trống theo đoạn audio. Loại câu hỏi này thường có 2 hoặc 3 bài.",
  tips: [
    "LFIB, một trong những loại câu hỏi chính trong phần Listening, xứng đáng được nỗ lực lớn để đảm bảo tỷ lệ chính xác.",
    "Trong các bài thi thực tế, khoảng cách giữa hai chỗ trống thường rất nhỏ, vì vậy hãy rút ngắn thời gian gõ và theo kịp audio. Do đó không cần phải gõ từ hoàn chỉnh ngay khi bạn nghe thấy nó, vì bạn có thể dành thời gian để hoàn thành nó sau khi audio kết thúc.",
    "Lưu ý: Nhấn phím Tab để nhanh chóng chuyển sang chỗ trống tiếp theo."
  ],
  timeSpan: "Mặc dù LFIB có ý nghĩa quan trọng về điểm số trong phần Listening, đừng dành quá nhiều thời gian cho nó, tối đa 2 phút cho mỗi bài.",
  practiceGoalWhy: "WHV: Thí sinh thi WHV không cần phải chú ý nhiều đến loại câu hỏi này.",
  practiceGoalPoints: [
    {
      points: 79,
      description: "Cố gắng giới hạn lỗi trong vòng 1 cho mỗi bài."
    },
    {
      points: 65,
      description: "Đối với mỗi bài, cố gắng giới hạn lỗi là 1, không bao giờ trên 2; hoặc trung bình trong vòng 1.5 lỗi cho mỗi 5 chỗ trống."
    },
    {
      points: 50,
      description: "Đạt tỷ lệ chính xác 50% trở lên."
    }
  ],
  practiceTask: "Thực hành tập trung vào các câu hỏi WFD là đủ, điều này giúp cải thiện khả năng cho FIB."
};
