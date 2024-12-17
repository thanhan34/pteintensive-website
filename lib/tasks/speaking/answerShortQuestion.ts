import { TaskData } from '../types';

export const answerShortQuestionTask: TaskData = {
  taskName: "Answer Short Question",
  about: "Đây là câu hỏi thứ 5 trong phần thi Speaking. Thí sinh sẽ được hỏi một câu hỏi về kiến thức thông thường, và cần trả lời chỉ một từ hoặc một cụm từ rất đơn giản. Phần thi này thường có 5 đến 6 câu hỏi.",
  tips: [
    "Không nên do dự trong việc trả lời vì điểm số của loại câu hỏi này chỉ chiếm một tỷ lệ rất nhỏ trong phần Speaking.",
    "Nếu có nhiều thời gian, chỉ cần thỉnh thoảng xem qua chúng trong ngân hàng câu hỏi; nếu không, có thể bỏ qua loại câu hỏi này trong quá trình chuẩn bị PTE."
  ],
  timeSpan: "Thời gian tối đa cho việc ghi âm là 15 giây. Nếu thí sinh dừng lại trong 3 giây trong quá trình ghi âm, microphone sẽ tự động tắt.",
  practiceGoalWhy: "Mục tiêu là trả lời nhanh và chính xác các câu hỏi kiến thức thông thường.",
  practiceGoalPoints: [
    {
      points: 79,
      description: "Trả lời nhanh và chính xác với phát âm rõ ràng."
    },
    {
      points: 65,
      description: "Trả lời đúng với độ trôi chảy tốt."
    },
    {
      points: 50,
      description: "Trả lời cơ bản với phát âm chấp nhận được."
    }
  ],
  practiceTask: "Xem qua các câu hỏi mẫu trong ngân hàng câu hỏi để làm quen với các loại câu hỏi thường gặp về kiến thức thông thường."
};
