import { TaskData } from '../types';

export const listeningMcmaTask: TaskData = {
  taskName: "Listening Multiple Choice Multiple Answer",
  about: "Thí sinh thường sẽ nghe một bài giảng/đối thoại (40s-90s) trước khi được yêu cầu chọn 2 hoặc 3 câu trả lời đúng từ 5 đến 7 lựa chọn cho sẵn. Đối với mỗi lựa chọn sai sẽ bị trừ 1 điểm trừ khi việc trừ điểm này làm cho điểm của bài này dưới 0. Loại câu hỏi này thường có 1 hoặc 2 bài.",
  tips: [
    "Câu hỏi nhiều lựa chọn-nhiều câu trả lời chiếm một lượng điểm không đáng kể trong phần Listening, vì vậy chúng xứng đáng được ưu tiên rất thấp trong việc chuẩn bị cho PTE.",
    "Trước khi mỗi audio được phát, hãy bắt đầu đọc những gì được hỏi và sau đó lắng nghe audio một cách có mục tiêu, điều này sẽ giúp lấy được thông tin chính để trả lời câu hỏi.",
    "Theo cách tính điểm của loại câu hỏi này, thí sinh đạt 1 điểm cho mỗi lựa chọn đúng và mất 1 điểm cho mỗi lựa chọn sai. Vì vậy, đừng chọn nhiều hơn những gì bạn chắc chắn. Mặt khác, ít nhất phải chọn 1 lựa chọn."
  ],
  timeSpan: "Câu hỏi nhiều lựa chọn-nhiều câu trả lời chiếm một lượng điểm không đáng kể trong phần Listening, vì vậy hãy hoàn thành chúng càng nhanh càng tốt, để dành nhiều thời gian hơn cho WFD có giá trị hơn. Nếu chắc chắn trả lời đúng, có thể dành nhiều nhất 1,5 phút cho mỗi câu hỏi (bao gồm cả thời gian phát audio). Nếu không, đừng dành quá nhiều thời gian ở đây, chỉ cần đưa ra lựa chọn sơ bộ ngay sau khi phát audio và chuyển sang nhiệm vụ tiếp theo.",
  practiceGoalWhy: "Mục tiêu là quản lý thời gian hiệu quả và chọn câu trả lời một cách thận trọng.",
  practiceGoalPoints: [
    {
      points: 79,
      description: "Chọn chính xác các câu trả lời trong thời gian quy định."
    },
    {
      points: 65,
      description: "Chọn được các câu trả lời hợp lý và tránh chọn quá nhiều đáp án không chắc chắn."
    },
    {
      points: 50,
      description: "Hoàn thành câu hỏi trong thời gian quy định và chọn ít nhất một đáp án."
    }
  ],
  practiceTask: "Trước các bài thi thử/thật, thực hành 1 bộ câu hỏi hoàn chỉnh để làm quen với chúng. Và chú ý đến việc quản lý thời gian."
};
