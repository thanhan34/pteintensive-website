import { TaskData } from '../types';

export const selectMissingWordsTask: TaskData = {
  taskName: "Select Missing Words",
  about: "Thí sinh thường sẽ nghe một bài giảng/đối thoại (20s-70s) kết thúc bằng một tiếng bíp che đi một hoặc nhiều từ, trước khi được yêu cầu chọn một từ duy nhất phù hợp để thay thế cho tiếng bíp từ 3 đến 5 lựa chọn cho sẵn. Loại câu hỏi này thường có 1 hoặc 2 bài.",
  tips: [
    "Câu hỏi SMW chiếm một lượng điểm không đáng kể trong phần Listening, vì vậy chúng xứng đáng được ưu tiên rất thấp trong việc chuẩn bị cho PTE.",
    "Luôn chú ý đến thanh tiến trình phát audio, và khi nó gần kết thúc, hãy ghi nhớ câu cuối cùng với sự chú ý cao độ, điều này giúp xác định từ nào bị thiếu trong tiếng bíp."
  ],
  timeSpan: "Câu hỏi SMW chiếm một lượng điểm không đáng kể trong phần Listening, vì vậy hãy hoàn thành chúng càng nhanh càng tốt, để dành nhiều thời gian hơn cho WFD có giá trị hơn. Nếu chắc chắn trả lời đúng, có thể dành nhiều nhất 1,5 phút cho mỗi câu hỏi (bao gồm cả thời gian phát audio). Nếu không, đừng dành quá nhiều thời gian ở đây, chỉ cần đưa ra lựa chọn sơ bộ ngay sau khi phát audio và chuyển sang nhiệm vụ tiếp theo.",
  practiceGoalWhy: "Mục tiêu là tập trung vào việc nghe và hiểu phần cuối của audio để dự đoán từ bị thiếu.",
  practiceGoalPoints: [
    {
      points: 79,
      description: "Chọn chính xác từ thiếu trong thời gian quy định."
    },
    {
      points: 65,
      description: "Hiểu được ngữ cảnh và chọn từ phù hợp."
    },
    {
      points: 50,
      description: "Hoàn thành câu hỏi trong thời gian quy định."
    }
  ],
  practiceTask: "Trước các bài thi thử/thật, thực hành 1 bộ câu hỏi hoàn chỉnh để làm quen với chúng. Và chú ý đến việc quản lý thời gian."
};
