import { TaskData } from '../types';

export const summarizeWrittenTextTask: TaskData = {
  taskName: "Summarize Written Text",
  about: "Nhiệm vụ: đọc một đoạn văn và tóm tắt nó thành một câu.\n\nĐộ dài đoạn văn: thường trong khoảng 300 từ\n\nGiới hạn từ cho câu trả lời: 5 - 75 từ\n\nSố câu hỏi trong bài thi: 1 - 2 câu",
  tips: [
    "SWT là một loại câu hỏi rất đơn giản. Có hai bước để trả lời:",
    "1. Tìm các câu chính trong đoạn văn",
    "2. Kết nối các câu chính thành một câu đúng ngữ pháp",
    "Tuân theo 3 Quy tắc sau để tìm câu chính:",
    "Quy tắc #1: Xác định chủ đề của đoạn văn. Bất kỳ câu nào không liên quan chặt chẽ đến chủ đề đều không phải là câu chính.",
    "Quy tắc #2: Không chọn các câu ví dụ hoặc câu giải thích chi tiết.",
    "Quy tắc #3: Chọn các câu kết luận. Chọn các câu chủ đề được giải thích chi tiết. Không chọn các câu có thông tin lặp lại.",
    "Khi kết nối các câu, bạn không cần phải diễn đạt lại câu. Đảm bảo sử dụng các liên từ chính xác. Ví dụ, các từ như 'however / therefore / moreover' không phải là liên từ. Chúng không thể được sử dụng để liên kết hai câu thành một câu. Và hãy chú ý đến dấu câu và khoảng cách."
  ],
  timeSpan: "Thời gian tối đa cho mỗi câu hỏi SWT là 10 phút. Đây là một câu hỏi được tính thời gian riêng, nghĩa là ngay cả khi bạn hoàn thành câu hỏi này sớm, ví dụ như trong TÁM phút, thì hai phút còn lại sẽ KHÔNG được cộng vào câu hỏi tiếp theo. Do đó, không cần phải vội vàng, và nên kiểm tra câu trả lời cẩn thận trước khi nộp.",
  practiceGoalWhy: "Mục tiêu là đạt điểm tối đa trong các phần Ngữ pháp, Từ vựng và Hình thức.",
  practiceGoalPoints: [
    {
      points: 79,
      description: "Tóm tắt đầy đủ các ý chính với ngữ pháp hoàn hảo và cấu trúc câu phức tạp."
    },
    {
      points: 65,
      description: "Tóm tắt được các ý chính với ngữ pháp tốt và cấu trúc câu rõ ràng."
    },
    {
      points: 50,
      description: "Tóm tắt cơ bản với ngữ pháp chấp nhận được và cấu trúc câu đơn giản."
    }
  ],
  practiceTask: "Thực hành cho đến khi bạn có thể đạt gần như điểm tối đa trên trang web APEUni. Bạn phải đạt điểm tối đa trong phần Ngữ pháp, Từ vựng và Hình thức."
};
