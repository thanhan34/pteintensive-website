import { TaskData } from '../types';

export const writeFromDictationTask: TaskData = {
  taskName: "Write From Dictation",
  about: "Loại câu hỏi này kiểm tra kỹ năng nghe và viết. Bạn sẽ nghe một câu được nói chỉ một lần. Bạn phải gõ chính xác những gì người nói đã nói. Các bản ghi âm dài từ 10 đến 11 từ. Bạn sẽ nghe ba hoặc bốn câu.",
  tips: [
    "Bạn cần lắng nghe cẩn thận và hiểu ý nghĩa của các câu WFD, không chỉ ghi nhớ từng từ riêng lẻ, vì trí nhớ không có sự hiểu biết là không đáng tin cậy.",
    "Đừng tin vào tai của bạn, vì những thứ như mất âm nổ, liên kết phụ âm-nguyên âm, âm đôi, và những thứ tương tự sẽ ảnh hưởng đến phán đoán của bạn về những gì bạn nghe. Bạn cần sử dụng kiến thức ngữ pháp để giúp xác định các dạng từ chính xác.",
    "Nếu bạn không chắc chắn về một số từ nhất định trong câu trả lời của mình, bạn có thể thêm các từ có thể có mà không ảnh hưởng đến điểm nghe và viết của bạn, nhưng vui lòng đừng thêm quá 3 từ."
  ],
  timeSpan: "Hãy nhớ rằng đây là loại câu hỏi cuối cùng trong bài thi. Hãy chú ý đến thời gian còn lại để bạn có đủ thời gian để làm mọi câu hỏi. WFD là một nhiệm vụ cực kỳ quan trọng cho phần nghe và viết, vì vậy hãy để lại ít nhất 5-6 phút cho nó.",
  practiceGoalWhy: "Mục tiêu là cải thiện khả năng nghe và viết chính xác.",
  practiceGoalPoints: [
    {
      points: 79,
      description: "Đánh vần chính xác 80% từ trở lên (giới hạn lỗi từ 1-2 từ) trong mỗi câu."
    },
    {
      points: 65,
      description: "Đánh vần chính xác 70% từ trở lên, (giới hạn lỗi từ 3-4 từ) trong mỗi câu."
    },
    {
      points: 50,
      description: "Đánh vần chính xác 50% từ trở lên trong mỗi câu."
    }
  ],
  practiceTask: "Bạn có thể thực hành 30-50 câu hỏi mỗi ngày trên trang web/APP APEUni."
};
