interface Review {
  id: string;
  name: string;
  course: string;
  rating: number;
  comment: string;
  image: string;
}

export const reviewData: Review[] = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    course: 'PTE 50+',
    rating: 5,
    comment: 'Tôi đã đạt được 65 điểm PTE sau khóa học. Giảng viên rất nhiệt tình và phương pháp giảng dạy rất hiệu quả.',
    image: '/images/9.jpg'
  },
  {
    id: '2',
    name: 'Trần Thị B',
    course: 'PTE 30-36',
    rating: 5,
    comment: 'Khóa học giúp tôi cải thiện điểm số từ 25 lên 35 trong vòng 2 tháng. Rất hài lòng với kết quả.',
    image: '/images/10.jpg'
  },
  {
    id: '3',
    name: 'Lê Văn C',
    course: 'PRE-PTE',
    rating: 5,
    comment: 'Là người mới bắt đầu, khóa học đã giúp tôi xây dựng nền tảng vững chắc để tiếp cận PTE Academic.',
    image: '/images/11.jpg'
  },
  {
    id: '4',
    name: 'Phạm Thị D',
    course: 'PTE 1 kèm 1',
    rating: 5,
    comment: 'Lịch học linh hoạt và được giảng viên kèm cặp sát sao đã giúp tôi tiến bộ rất nhanh.',
    image: '/images/12.jpg'
  },
  {
    id: '5',
    name: 'Hoàng Văn E',
    course: 'PTE 50+',
    rating: 5,
    comment: 'Tài liệu học tập phong phú và cập nhật. Phương pháp giảng dạy dễ hiểu và hiệu quả.',
    image: '/images/13.jpg'
  }
];
