import { TaskData } from '../types';

export const repeatSentenceTask: TaskData = {
  taskName: "Repeat Sentence",
  about: "Nhiệm vụ: Bạn sẽ nghe một câu được phát duy nhất một lần. Nhiệm vụ của bạn là lặp lại chính xác những gì bạn đã nghe.\n\nĐộ dài câu: thường từ 9-14 từ\n\nThời gian trả lời tối đa: 15 giây\n\nSố câu hỏi trong bài thi: 10-12 câu",
  tips: [
    "RS là một trong những phần thi quan trọng nhất trong PTE vì nó đóng góp điểm cho CẢ HAI kỹ năng speaking và listening. Sử dụng Phương pháp 258 để đạt điểm tối đa có thể.",
    "Phương pháp 258 là cách tốt nhất để cân bằng giữa yêu cầu nội dung và độ trôi chảy. Đây thực chất là ba phương pháp lặp lại khác nhau:",
    "Phương pháp 2:\nNếu không hiểu được hầu hết nội dung khi câu quá khó, lặp lại 2-4 từ, chủ yếu là các từ nội dung. Và đảm bảo nói tự nhiên và trôi chảy.",
    "Phương pháp 5:\nNếu chỉ có thể hiểu hoặc nhớ được một nửa nội dung khi câu quá dài, chỉ tập trung vào một nửa câu khi nghe (nửa đầu / nửa sau / vài từ đầu + vài từ cuối). Và lặp lại một nửa câu rõ ràng và trôi chảy.",
    "Phương pháp 8:\nNếu có thể hiểu hầu hết nội dung, bỏ qua các từ không nhớ rõ, và lặp lại 80% câu một cách rõ ràng và trôi chảy.",
    "3 bước trả lời RS:\n1. Lắng nghe câu cẩn thận. Nhanh chóng quyết định nên sử dụng phương pháp nào (2/5/8).\n2. Sau khi audio kết thúc, dùng 1-2 giây để nhớ lại và sắp xếp câu trả lời trong đầu.\n3. Nói câu trả lời rõ ràng và trôi chảy. Không thêm thắt / ngập ngừng."
  ],
  timeSpan: "Thời gian trả lời tối đa cho mỗi câu hỏi RS là 15 giây, nhưng có thể bạn không cần nhiều thời gian như vậy. Đảm bảo trả lời trôi chảy và với tốc độ bình thường, không ngập ngừng.\n\nQuy tắc 3 giây: giống như tất cả các câu hỏi nói khác, bản ghi sẽ tự động dừng nếu bạn im lặng trong 3 giây.\n\nKhông có tiếng bíp trước khi bắt đầu ghi âm. Sau khi audio kết thúc, chú ý đến thanh tiến trình ghi âm. Chỉ bắt đầu nói khi việc ghi âm bắt đầu.",
  practiceGoalWhy: "Mục tiêu là sử dụng phương pháp phù hợp với trình độ để đạt được điểm số mong muốn",
  practiceGoalPoints: [
    {
      points: 79,
      description: "Sử dụng Phương pháp 8 cho câu ngắn, và Phương pháp 5 cho câu dài"
    },
    {
      points: 65,
      description: "Sử dụng Phương pháp 5 cho tất cả các câu"
    },
    {
      points: 50,
      description: "Sử dụng Phương pháp 2 cho tất cả các câu"
    }
  ],
  practiceTask: "Để cải thiện kỹ năng nghe, nên thực hiện Repeat Sentence Drill với APEUni MP3:\n\nBước 1: Nghe và lặp lại\n- Đặt khoảng thời gian phát lại trong APEUni MP3 là 5 hoặc 10 giây\n- Phát lại audio 5 lần\n- Lặp lại câu càng nhiều càng tốt trong khoảng thời gian đó\n- Không nhìn vào script ở bước này\n\nBước 2: Học và hiểu\n- Xem script và tra từ điển những từ không quen\n- Hiểu nghĩa của câu\n\nBước 3: Lặp lại Bước 1 & 2\n- Thực hiện cho đến khi hoàn toàn hiểu\n- Có thể lặp lại 80% câu"
};
