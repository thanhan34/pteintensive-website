import { TaskData } from '../types';

export const readAloudTask: TaskData = {
  taskName: "Read Aloud",
  about: "Đây là câu hỏi đầu tiên trong phần thi Speaking. Thí sinh sẽ thấy một đoạn văn và có 40 giây để chuẩn bị, sau đó có thêm 40 giây để đọc to đoạn văn đó. Câu trả lời sẽ chỉ được ghi âm một lần. Phần thi này thường có 6 hoặc 7 câu hỏi.",
  tips: [
    "Đây là câu hỏi khó nhất trong phần Speaking, là phần mà thí sinh ít có khả năng cải thiện nhất. Kỹ thuật trong phần này thậm chí còn là nền tảng cho các phần khác.",
    "Việc chấm điểm RA bao gồm đánh giá về phát âm và độ trôi chảy của thí sinh. Tuy nhiên, phát âm ở đây có ý nghĩa nhiều hơn là sự chính xác và mượt mà.",
    "Pearson sẽ đưa nhiều chi tiết tinh tế vào đánh giá: trọng âm, liên kết âm, mất phá âm và phân chia nhóm ngữ nghĩa."
  ],
  timeSpan: "Thời gian tối đa cho việc ghi âm là 40 giây và khi nói với tốc độ bình thường, 20 đến 30 giây là đủ cho một câu trả lời hoàn chỉnh. Nếu thí sinh mất 40 giây để hoàn thành câu trả lời, điều đó cho thấy họ đã nói quá chậm, và điểm số của họ trong phần này sẽ khá thấp.",
  practiceGoalWhy: "WHV: Thực hiện tốt theo các mẹo được dạy trong các lớp giới thiệu và nói trôi chảy về giọng điệu và giọng nói.",
  practiceGoalPoints: [
    {
      points: 79,
      description: "Lỗi về phát âm từ hoặc trọng âm âm tiết là chấp nhận được nên thí sinh không nên quá lo lắng về các chi tiết nhỏ, và nên ghi nhớ: nói một cách trôi chảy, nhất quán và nhẹ nhàng với tốc độ vừa phải và không có giọng điệu đơn điệu hoặc quá nhấn mạnh."
    },
    {
      points: 65,
      description: "Lỗi về phát âm từ hoặc trọng âm âm tiết là chấp nhận được nên thí sinh không nên quá lo lắng về các chi tiết nhỏ, và nên ghi nhớ: nói một cách trôi chảy, nhất quán và nhẹ nhàng với tốc độ vừa phải và không có giọng điệu đơn điệu hoặc quá nhấn mạnh."
    },
    {
      points: 50,
      description: "Lỗi về phát âm từ hoặc trọng âm âm tiết là chấp nhận được nên thí sinh không nên quá lo lắng về các chi tiết nhỏ, và nên ghi nhớ: nói một cách trôi chảy, nhất quán và nhẹ nhàng với tốc độ vừa phải và không có giọng điệu đơn điệu hoặc quá nhấn mạnh."
    }
  ],
  practiceTask: "Nghe và lặp lại các mẫu RA shadowing hàng ngày. Và đọc to 3 đoạn RA do bạn tự chọn từ ngân hàng câu hỏi của loại câu hỏi này, để đáp ứng các yêu cầu tương ứng với một phần điểm cụ thể."
};
