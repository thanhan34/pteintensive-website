import { TaskData } from '../types';

export const mcmaTask: TaskData = {
  taskName: "Multiple Choice Multiple Answer",
  about: "Thí sinh sẽ thấy một đoạn văn từ 200 đến 300 từ, cùng với một câu hỏi và 5 đến 7 lựa chọn, và được yêu cầu trả lời câu hỏi bằng cách chọn các lựa chọn đúng theo đoạn văn. Loại câu hỏi này thường có 1 hoặc 2 câu hỏi.",
  tips: [
    "Các câu hỏi PTE có nhiều lựa chọn và một câu trả lời chiếm tỷ lệ rất nhỏ trong tổng điểm, vì vậy chúng chỉ đáng được ưu tiên tương đối thấp trong việc chuẩn bị thi PTE.",
    "Điều quan trọng nhất là quản lý thời gian, đảm bảo hoàn thành một câu hỏi loại này trong vòng 1 hoặc 2 phút, vì bất kỳ việc sử dụng thời gian quá mức nào ở đây có thể sẽ gây áp lực lên thời gian cần thiết cho những câu hỏi quan trọng, tốn thời gian tiếp theo (FIB).",
    "Trong các câu hỏi có nhiều câu trả lời, thí sinh đạt được 1 điểm cho 1 lựa chọn đúng, mất 1 điểm cho 1 lựa chọn sai, và được 0 điểm cho không chọn.",
    "Vì vậy, trừ khi rất chắc chắn, đừng chọn nhiều hơn một lựa chọn khi trả lời mỗi câu hỏi loại này."
  ],
  timeSpan: "Tất cả các câu hỏi trong Phần Đọc chia sẻ một bộ đếm thời gian duy nhất, vì vậy càng tiêu tốn nhiều thời gian trong một câu hỏi, thời gian cho phép trong các câu khác càng ít. Thí sinh nên đưa ra câu trả lời cho loại câu hỏi này càng nhanh càng tốt để dành đủ thời gian cho các câu hỏi FIB tiếp theo vốn chiếm nhiều điểm hơn. Nếu thí sinh rất chắc chắn trong việc trả lời một câu hỏi cụ thể một cách chính xác, họ có thể dành nhiều nhất 1,5 phút cho nó. Đối với những người không chắc chắn, mỗi câu hỏi loại này chỉ nên chiếm nhiều nhất 1 phút cho việc lựa chọn sơ bộ giữa các lựa chọn đã cho.",
  practiceGoalWhy: "Mục tiêu là quản lý thời gian hiệu quả và chọn câu trả lời một cách thận trọng.",
  practiceGoalPoints: [
    {
      points: 79,
      description: "Chọn chính xác các câu trả lời trong thời gian 1-1.5 phút mỗi câu."
    },
    {
      points: 65,
      description: "Chọn ít nhất một câu trả lời đúng và không chọn câu trả lời sai."
    },
    {
      points: 50,
      description: "Hoàn thành câu hỏi trong thời gian quy định với ít nhất một lựa chọn đúng."
    }
  ],
  practiceTask: "Trước các bài thi thử/thật, thực hành một bộ câu hỏi hoàn chỉnh trong Phần Đọc để làm quen với chúng và việc quản lý thời gian."
};
