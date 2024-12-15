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
}

export const courseData: Record<string, BaseCourse> = {
  'pre-pte': {
    title: 'Khóa Học Foudation',
    description: 'Khóa học dành cho người mới bắt đầu, giúp xây dựng nền tảng vững chắc trước khi bước vào PTE Academic.',
    duration: '3 tháng',
    classSize: '8-10 học viên',
    schedule: '2 buổi/tuần',
    guarantee: 'Cam kết đầu ra',
    image: '/images/courses/foundation.jpg',
    features: [
      'Phương pháp học tập hiệu quả',
      'Giảng viên giàu kinh nghiệm',
      'Tài liệu học tập độc quyền',
      'Hỗ trợ 1-1 sau mỗi buổi học'
    ]
  },
  'pte-30-36': {
    title: 'Khóa Học PTE 30-36',
    description: 'Khóa học chuyên sâu giúp học viên đạt mục tiêu 30-36 điểm trong kỳ thi PTE Academic.',
    duration: '3 tháng',
    classSize: '8-10 học viên',
    schedule: '2 buổi/tuần',
    guarantee: 'Cam kết đầu ra',
    image: '/images/courses/30-36.jpg',
    features: [
      'Phương pháp học tập hiệu quả',
      'Giảng viên giàu kinh nghiệm',
      'Tài liệu học tập độc quyền',
      'Hỗ trợ 1-1 sau mỗi buổi học'
    ]
  },
  'pte-42-50': {
    title: 'Khóa Học PTE 42-50',
    description: 'Khóa học nâng cao dành cho học viên muốn đạt điểm số cao trong kỳ thi PTE Academic.',
    duration: '3 tháng',
    classSize: '8-10 học viên',
    schedule: '2 buổi/tuần',
    guarantee: 'Cam kết đầu ra',
    image: '/images/courses/42-50.jpg',
    features: [
      'Phương pháp học tập hiệu quả',
      'Giảng viên giàu kinh nghiệm',
      'Tài liệu học tập độc quyền',
      'Hỗ trợ 1-1 sau mỗi buổi học'
    ]
  },
  'pte-50': {
    title: 'Khóa Học PTE 50+',
    description: 'Khóa học nâng cao dành cho học viên muốn đạt điểm số cao trong kỳ thi PTE Academic.',
    duration: '3 tháng',
    classSize: '8-10 học viên',
    schedule: '2 buổi/tuần',
    guarantee: 'Cam kết đầu ra',
    image: '/images/courses/42-50.jpg',
    features: [
      'Phương pháp học tập hiệu quả',
      'Giảng viên giàu kinh nghiệm',
      'Tài liệu học tập độc quyền',
      'Hỗ trợ 1-1 sau mỗi buổi học'
    ]
  },
  'pte-1-1': {
    title: 'Khóa Học PTE 1 kèm 1',
    description: 'Khóa học nâng cao dành cho học viên muốn đạt điểm số cao trong kỳ thi PTE Academic với thời gian linh hoạt.',
    duration: '3 tháng',
    classSize: '8-10 học viên',
    schedule: '2 buổi/tuần',
    guarantee: 'Cam kết đầu ra',
    image: '/images/courses/1-1.jpg',
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
