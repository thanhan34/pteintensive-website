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
  }
];
