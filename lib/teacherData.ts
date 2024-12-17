interface Teacher {
  id: string;
  name: string;
  experience: string;
  achievements: string[];
  image: string;
}

export const teacherData: Teacher[] = [
  {
    id: '1',
    name: 'An Doan',
    experience: 'PTE Expert - 5+ Years Experience',
    achievements: [
      'Chuyên gia luyện thi PTE với hơn 5 năm kinh nghiệm',
      'Đã đào tạo hơn 1000+ học viên đạt điểm cao',
      'Phương pháp giảng dạy độc quyền và hiệu quả',
      'Tận tâm với từng học viên'
    ],
    image: '/images/trainers/an doan 1.jpg'
  },
  {
    id: '2',
    name: 'Bach Yen',
    experience: 'Senior PTE Instructor - 4+ Years Experience',
    achievements: [
      'Giảng viên cao cấp với hơn 4 năm kinh nghiệm',
      'Chuyên gia về Speaking và Writing',
      'Phương pháp giảng dạy sinh động và dễ hiểu',
      'Luôn đồng hành cùng học viên đến thành công'
    ],
    image: '/images/trainers/bach yen.jpg'
  },
  {
    id: '3',
    name: 'Bích Diệp',
    experience: 'PTE Writing Expert - 3+ Years Experience',
    achievements: [
      'Chuyên gia về kỹ năng Writing PTE',
      'Phương pháp cải thiện điểm số nhanh chóng',
      'Kinh nghiệm giảng dạy phong phú',
      'Tận tình hướng dẫn từng học viên'
    ],
    image: '/images/trainers/BichDiep.png'
  },
  {
    id: '4',
    name: 'Phương Tuyết',
    experience: 'PTE Speaking Specialist - 4+ Years Experience',
    achievements: [
      'Chuyên gia về kỹ năng Speaking PTE',
      'Phương pháp phát âm chuẩn và tự nhiên',
      'Kinh nghiệm luyện thi đa dạng',
      'Nhiệt tình và tâm huyết với nghề'
    ],
    image: '/images/trainers/PhuongTuyet.png'
  },
  {
    id: '5',
    name: 'Thanh Hương',
    experience: 'PTE Reading Expert - 3+ Years Experience',
    achievements: [
      'Chuyên gia về kỹ năng Reading PTE',
      'Phương pháp đọc hiểu hiệu quả',
      'Kinh nghiệm giảng dạy chuyên sâu',
      'Tận tâm với sự tiến bộ của học viên'
    ],
    image: '/images/trainers/ThanhHuong.png'
  },
  {
    id: '6',
    name: 'Thanh Tâm',
    experience: 'PTE Listening Expert - 4+ Years Experience',
    achievements: [
      'Chuyên gia về kỹ năng Listening PTE',
      'Phương pháp nghe hiểu độc đáo',
      'Kinh nghiệm đào tạo phong phú',
      'Luôn quan tâm đến từng học viên'
    ],
    image: '/images/trainers/ThanhTam.png'
  },
  {
    id: '7',
    name: 'Thu Hương',
    experience: 'PTE All-Skills Instructor - 3+ Years Experience',
    achievements: [
      'Giảng viên toàn diện các kỹ năng PTE',
      'Phương pháp giảng dạy khoa học',
      'Kinh nghiệm luyện thi đa dạng',
      'Tận tụy với sự phát triển của học viên'
    ],
    image: '/images/trainers/ThuHuong.png'
  }
];
