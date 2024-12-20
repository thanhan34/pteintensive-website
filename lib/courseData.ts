interface BaseCourse {
  title: string;
  description: string;
  duration: string;
  classSize: string;
  schedule: string;
  guarantee: string;
  image: string;
  features: string[];
  isHot?: boolean;
  targetStudents: string[];
  format: string;
  materials: string;
  phases: string[];
  benefits: string[];
}

export const courseData: Record<string, BaseCourse> = {
  'pre-pte': {
    title: 'Khóa học Foundation Speaking PTE (PRE PTE)',
    description: 'Khóa học dành cho người mới bắt đầu, giúp xây dựng nền tảng vững chắc về phát âm và kỹ năng Speaking trong PTE Academic.',
    duration: '10 buổi (2 tiếng/buổi)',
    classSize: '5-6 học viên/lớp/khóa',
    schedule: '2 buổi/tuần (theo lịch)',
    guarantee: 'Cam kết đầu ra',
    image: '/images/courses/foundation.jpg',
    format: 'Online thông qua phần mềm Zoom',
    materials: 'Miễn phí',
    targetStudents: [
      'Chưa từng tiếp xúc về kiến thức của phát âm trong tiếng Anh',
      'Đang gặp khó khăn vì máy không nhận diện âm đọc, dẫn đến kết quả thấp hoặc liệt trong kỹ năng Speaking',
      'Đang hạn chế trong vấn đề tự điều chỉnh lỗi sai phát âm của bản thân',
      'Đang có dự định cải thiện và nâng cao khả năng giao tiếp',
      'Đang gặp trở ngại kỹ năng phản xạ phát âm chính xác từ, quên cách đọc từ vựng mặc dù có thể biết ý nghĩa của từ vựng'
    ],
    phases: [
      'Đánh giá năng lực_Thiết kế lộ trình học tập',
      'Bảng phiên âm IPA và Trọng âm trong tiếng Anh',
      'Hệ thống hóa từ vựng theo chủ đề',
      'Ứng dụng và Thực hành trong kỹ năng PTE Speaking'
    ],
    benefits: [
      'Xây dựng và củng cố và nền tảng phát âm theo bảng phiên âm IPA',
      'Điều chỉnh khẩu hình cho từng âm cụ thể, đảm bảo phát âm chuẩn xác và rõ ràng',
      'Nhận diện và chỉnh sửa những lỗi sai phát âm đang gặp phải',
      'Nâng cao kỹ năng nghe và khả năng nhận diện âm chính xác',
      'Mở rộng vốn từ vựng thường gặp trong bài thi PTE',
      'Rèn luyện và tăng phản xạ từ, quen dần với các dạng bài trong bài thi PTE',
      'Chuẩn hóa cách phát âm không chỉ trong kỳ thi PTE, mà còn trong hoạt động giao tiếp thông thường'
    ],
    features: [
      'Phương pháp học tập hiệu quả',
      'Giảng viên giàu kinh nghiệm',
      'Tài liệu học tập độc quyền',
      'Hỗ trợ 1-1 sau mỗi buổi học'
    ]
  },
  'pte-30-36': {
    title: 'Khóa PTE30/36/42',
    description: 'Khóa học chuyên sâu giúp học viên đạt mục tiêu 30-36-42 điểm trong kỳ thi PTE Academic.',
    duration: '12 buổi (2 tiếng/buổi) trong thời gian 1.5 tháng (Hỗ trợ lên đến 6 tháng)',
    classSize: '7-8 học viên/lớp/khóa',
    schedule: '2 buổi/tuần + 2 buổi bổ trợ Speaking',
    guarantee: 'Cam kết đầu ra',
    image: '/images/courses/30-36.jpg',
    format: 'Online thông qua phần mềm Zoom, có ghi âm để hỗ trợ khi học viên bỏ lỡ buổi học',
    materials: 'Cập nhật liên tục và hoàn toàn miễn phí',
    targetStudents: [
      'Cần chứng chỉ tiếng Anh để hoàn thiện hồ sơ lao động cho Visa 462, Visa 482 tại Úc',
      'Cần bổ sung hồ sơ đủ đáp ứng yêu cầu nhập học tại các trường Cao đẳng, chương trình Du học nghề',
      'Cần tiết kiệm từ 5,000AUD đến 10,000AUD cho chi phí học thêm khóa học bồi dưỡng tiếng Anh tại trường theo quy định',
      'Đã hoàn thành chương trình học PTE Foundation và muốn tiến đến bước tiếp theo trong lộ trình luyện thi PTE 30-36-42'
    ],
    phases: [
      'Đánh giá năng lực_Thiết kế lộ trình học tập',
      'Cấu trúc đề thi PTE_Tips_Templates',
      'Luyện Tủ_Thực hành_Ôn tập',
      'Làm bài Mocktest và Nhận đánh giá trực tiếp của Trainer'
    ],
    benefits: [
      'Hỗ trợ trong vòng 6 tháng để bạn vững vàng tự tin chinh phục mục tiêu điểm số PTE',
      'Bộ đề thi tủ và tài liệu học tập được cập nhật liên tục, nhanh chóng và được chia sẽ hoàn toàn miễn phí',
      'Được thi thử để nắm vững cấu trúc và cách thức làm bài hiệu quả như thi thực tế',
      'Trainer đánh giá thật kỹ lưỡng và chuẩn xác nhất về kết quả thi thử',
      'Hỗ trợ tư vấn và đặt lịch thi miễn phí'
    ],
    features: [
      'Phương pháp học tập hiệu quả',
      'Giảng viên giàu kinh nghiệm',
      'Tài liệu học tập độc quyền',
      'Hỗ trợ 1-1 sau mỗi buổi học'
    ]
  },
  'pte-42-50': {
    title: 'Khóa PTE36/42/50',
    description: 'Khóa học nâng cao dành cho học viên muốn đạt điểm số cao trong kỳ thi PTE Academic.',
    duration: '3 tháng (Hỗ trợ lên đến 6 tháng)',
    classSize: '7-8 học viên/lớp/khóa',
    schedule: '2 buổi READING INTENSIVE + 2 buổi bổ trợ Speaking/tuần',
    guarantee: 'Cam kết đầu ra',
    image: '/images/courses/42-50.jpg',
    format: 'Online thông qua phần mềm Zoom, có ghi âm để hỗ trợ khi học viên bỏ lỡ buổi học',
    materials: 'Cập nhật liên tục và hoàn toàn miễn phí',
    targetStudents: [
      'Cần bổ sung hồ sơ đủ đáp ứng yêu cầu nhập học tại các trường Cao đẳng, Đại học',
      'Cần đạt chứng chỉ tiếng Anh để đáp ứng yêu cầu tốt nghiệp của các trường trong thời gian ngắn nhất'
    ],
    phases: [
      'Đánh giá năng lực_Thiết kế lộ trình học tập',
      'Cấu trúc đề thi PTE_Tips_Templates',
      'Luyện và Giải đề thi Tủ_Thực hành_Ôn tập',
      'Làm bài Mocktest và Nhận đánh giá trực tiếp của Trainer'
    ],
    benefits: [
      'Hỗ trợ trong vòng 6 tháng để bạn vững vàng tự tin chinh phục mục tiêu điểm số PTE',
      'Bộ đề thi tủ và tài liệu học tập được cập nhật liên tục, nhanh chóng và được chia sẽ hoàn toàn miễn phí',
      'Được thi thử để nắm vững cấu trúc và cách thức làm bài hiệu quả như thi thực tế',
      'Trainer đánh giá thật kỹ lưỡng và chuẩn xác nhất về kết quả thi thử',
      'Hỗ trợ tư vấn và đặt lịch thi miễn phí'
    ],
    features: [
      'Phương pháp học tập hiệu quả',
      'Giảng viên giàu kinh nghiệm',
      'Tài liệu học tập độc quyền',
      'Hỗ trợ 1-1 sau mỗi buổi học'
    ]
  },
  'pte-50': {
    title: 'Khóa PTE58/60/65/79',
    description: 'Khóa học nâng cao dành cho học viên muốn đạt điểm số cao trong kỳ thi PTE Academic.',
    duration: '3 tháng (Hỗ trợ lên đến 6 tháng)',
    classSize: '7-8 học viên/lớp/khóa',
    schedule: '2 buổi READING INTENSIVE + 2 buổi bổ trợ Speaking/tuần',
    guarantee: 'Cam kết đầu ra',
    image: '/images/courses/42-50.jpg',
    format: 'Online thông qua phần mềm Zoom, có ghi âm để hỗ trợ khi học viên bỏ lỡ buổi học',
    materials: 'Cập nhật liên tục và hoàn toàn miễn phí',
    targetStudents: [
      'Cần đạt chứng chỉ tiếng Anh trong thời gian ngắn nhất để đáp ứng nhu cầu nhập học tại các trường quốc tế, hoặc đi du học, làm việc hay định cư tại Anh, Úc, New Zealand, Canada…',
      'Cần đạt chứng chỉ tiếng Anh để hoàn thiện hồ sơ xin visa tay nghề tại Úc như visa 491, 189, 190,…',
      'Cần tìm kiếm một giải pháp chinh phục chứng chỉ tiếng Anh một cách nhanh chóng, hiệu quả và tiết kiệm'
    ],
    phases: [
      'Đánh giá năng lực_Thiết kế lộ trình học tập',
      'Cấu trúc đề thi PTE_Tips_Templates',
      'Luyện và Giải đề thi Tủ_Thực hành_Ôn tập',
      'Làm bài Mocktest và Nhận đánh giá trực tiếp của Trainer'
    ],
    benefits: [
      'Hỗ trợ trong vòng 6 tháng để bạn vững vàng tự tin chinh phục mục tiêu điểm số PTE',
      'Bộ đề thi tủ và tài liệu học tập được cập nhật liên tục, nhanh chóng và được chia sẽ hoàn toàn miễn phí',
      'Được thi thử để nắm vững cấu trúc và cách thức làm bài hiệu quả như thi thực tế',
      'Trainer đánh giá thật kỹ lưỡng và chuẩn xác nhất về kết quả thi thử',
      'Hỗ trợ tư vấn và đặt lịch thi miễn phí'
    ],
    features: [
      'Phương pháp học tập hiệu quả',
      'Giảng viên giàu kinh nghiệm',
      'Tài liệu học tập độc quyền',
      'Hỗ trợ 1-1 sau mỗi buổi học'
    ]
  },
  'pte-1-1': {
    title: 'Khóa PTE1-1',
    description: 'Khóa học 1-1 với thời gian linh hoạt, được thiết kế riêng theo nhu cầu của từng học viên.',
    duration: '7 buổi (Hỗ trợ lên đến 3 tháng)',
    classSize: '1 học viên',
    schedule: '2 buổi/tuần + 2 buổi bổ trợ Speaking',
    guarantee: 'Cam kết đầu ra',
    image: '/images/courses/1-1.jpg',
    format: 'Online thông qua phần mềm Zoom, có ghi âm để hỗ trợ khi học viên bỏ lỡ buổi học',
    materials: 'Cập nhật liên tục và hoàn toàn miễn phí',
    targetStudents: [
      'Không thể thu xếp công việc và thời khóa biểu học tập để tham gia lớp học theo khung giờ cố định',
      'Muốn nhanh chóng đạt mục tiêu tiếng Anh trong thời gian ngắn nhất theo hoạch định của cá nhân',
      'Muốn nhận được sự hướng dẫn và giảng dạy chi tiết từ Trainer đối với năng lực cá nhân',
      'Đang chưa tìm ra giải pháp để cải thiện các kỹ năng một cách toàn diện để chinh phục các điểm số mục tiêu cao'
    ],
    phases: [
      'Kiểm tra năng lực tiếng Anh để xác định lộ trình học tập cá nhân hóa và lịch học phù hợp',
      'Luyện tập chuyên sâu theo giáo trình giảng dạy được thiết kế riêng',
      'Luyện và Giải đề thi Tủ_Thực hành_Ôn tập, Trainer chỉnh sửa chi tiết và đưa ra giải pháp khắc phục từng lỗi sai',
      'Làm bài Mocktest và Nhận đánh giá trực tiếp của Trainer'
    ],
    benefits: [
      'Bộ đề thi tủ và tài liệu học tập được cập nhật liên tục, nhanh chóng và được chia sẽ hoàn toàn miễn phí',
      'Được thi thử để nắm vững cấu trúc và cách thức làm bài hiệu quả như thi thực tế',
      'Trainer đánh giá thật kỹ lưỡng và chuẩn xác nhất về kết quả thi thử',
      'Hỗ trợ tư vấn và đặt lịch thi miễn phí'
    ],
    features: [
      'Phương pháp học tập hiệu quả',
      'Giảng viên giàu kinh nghiệm',
      'Tài liệu học tập độc quyền',
      'Hỗ trợ 1-1 sau mỗi buổi học'
    ]
  }
} as const;

export type CourseSlug = keyof typeof courseData;
export type Course = typeof courseData[CourseSlug];
