import { TaskData } from '../types';

export const mcsaTask: TaskData = {
  taskName: "Multiple Choice Single Answer",
  about: "Thí sinh sẽ thấy một đoạn văn khoảng 100 từ, cùng với một câu hỏi và một số lựa chọn, và được yêu cầu trả lời câu hỏi bằng cách chọn lựa chọn đúng theo đoạn văn. Loại câu hỏi này thường có 1 hoặc 2 câu hỏi.",
  tips: [
    "Các câu hỏi PTE có nhiều lựa chọn và một câu trả lời chiếm tỷ lệ rất nhỏ trong tổng điểm, vì vậy chúng chỉ đáng được ưu tiên tương đối thấp trong việc chuẩn bị thi PTE.",
    "Điều quan trọng nhất là quản lý thời gian, đảm bảo hoàn thành một câu hỏi loại này trong vòng 1 hoặc 2 phút, vì bất kỳ việc sử dụng thời gian quá mức nào ở đây có thể sẽ gây áp lực lên thời gian cần thiết cho những câu hỏi quan trọng, tốn thời gian tiếp theo (FIB).",
    "Có một câu hỏi cho mỗi MCS, và thí sinh nên đọc qua đoạn văn và tìm ra các điểm chính của nó trong vòng 1 hoặc 2 phút."
  ],
  timeSpan: "Tất cả các câu hỏi trong phần Reading chia sẻ một bộ đếm thời gian duy nhất, vì vậy càng tiêu tốn nhiều thời gian trong một câu hỏi, thời gian cho phép trong các câu khác càng ít. Thí sinh nên đưa ra câu trả lời cho loại câu hỏi này càng nhanh càng tốt để dành đủ thời gian cho các câu hỏi FIB tiếp theo vốn chiếm nhiều điểm hơn. Nếu thí sinh rất chắc chắn trong việc trả lời một câu hỏi cụ thể một cách chính xác, họ có thể dành nhiều nhất 1,5 phút cho nó. Đối với những người không chắc chắn, mỗi câu hỏi loại này chỉ nên chiếm nhiều nhất 1 phút cho việc lựa chọn sơ bộ giữa các lựa chọn đã cho.",
  practiceGoalWhy: "Mục tiêu là quản lý thời gian hiệu quả và chọn câu trả lời một cách thận trọng.",
  practiceGoalPoints: [
    {
      points: 79,
      description: "Chọn chính xác câu trả lời trong thời gian 1-1.5 phút."
    },
    {
      points: 65,
      description: "Hoàn thành câu hỏi trong thời gian quy định với độ chính xác tốt."
    },
    {
      points: 50,
      description: "Hoàn thành câu hỏi trong thời gian quy định và chọn câu trả lời hợp lý."
    }
  ],
  practiceTask: "Trước các bài thi thử/thật, thực hành một bộ câu hỏi hoàn chỉnh trong phần Reading để làm quen với chúng và việc quản lý thời gian."
};
