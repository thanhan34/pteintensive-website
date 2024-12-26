export interface Teacher {
  id: string;
  name: string;
  image: string;
  qualifications: string[];
  position: string;
  experience: string;
  specialization: string;
  currentWork: string;
  location: string;
  hobbies: string;
  quotes: string[];
  achievements: string[];
}

export const teacherData: Teacher[] = [
  {
    id: '1',
    name: 'Đoàn Thanh An',
    image: '/images/trainers/an doan 1.jpg',
    qualifications: ["Master of Computer Science in Queensland University of Technology"],
    position: "Founder",
    experience: "Từ tháng 8/2019",
    specialization: "Coaching 1:1, Speaking, Reading",
    currentWork: "",
    location: "Brisbane, Queensland",
    hobbies: "Teaching, Learning, Programming, Apply new technology for PTE Teaching",
    quotes: [
      "Every morning you have two choices: Continue to sleep with your dreams or wake up and chase them. – Carmelo Anthony",
      "To give is to receive. - Gerald Jampolsky"
    ],
    achievements: [
      'Chuyên gia luyện thi PTE với hơn 5 năm kinh nghiệm',
      'Đã đào tạo hơn 1000+ học viên đạt điểm cao',
      'Phương pháp giảng dạy độc quyền và hiệu quả',
      'Tận tâm với từng học viên'
    ]
  },
  {
    id: '2',
    name: 'Trần Thị Bạch Yến',
    image: '/images/trainers/bach yen.jpg',
    qualifications: [
      "Thạc sỹ Kinh doanh quốc tế (ĐH Monash, Úc)",
      "Tiến sỹ ngành Marketing (Đại học Charles Darwin)"
    ],
    position: "Trainer",
    experience: "Từ 2019",
    specialization: "1-1 Coaching",
    currentWork: "Giảng viên Đại học Cần Thơ (từ 2009 - nay), Student advisor tại Charles Darwin University",
    location: "Darwin, Northern Territory",
    hobbies: "Tư vấn du học miễn phí",
    quotes: [
      "Không một hành động tử tế nào, dù nhỏ đến đâu, lại bị lãng phí – Aesop",
      "Đừng sợ kết thúc, hãy sợ việc không bắt đầu. – Buddha"
    ],
    achievements: [
      'Giảng viên cao cấp với hơn 4 năm kinh nghiệm',
      'Chuyên gia về Speaking và Writing',
      'Phương pháp giảng dạy sinh động và dễ hiểu',
      'Luôn đồng hành cùng học viên đến thành công'
    ]
  },
  {
    id: '3',
    name: 'Phạm Bích Diệp',
    image: '/images/trainers/BichDiep.jpg',
    qualifications: ["English language studies in Banking Academy of Vietnam"],
    position: "Trainer - Tutor",
    experience: "Từ tháng 8/2022",
    specialization: "Speaking",
    currentWork: "SBS Trainer",
    location: "Hà Nội, Việt Nam",
    hobbies: "Teaching, Travelling",
    quotes: ["Success consists of going from failure to failure without losing enthusiasm in the heart."],
    achievements: [
      'Chuyên gia về kỹ năng Writing PTE',
      'Phương pháp cải thiện điểm số nhanh chóng',
      'Kinh nghiệm giảng dạy phong phú',
      'Tận tình hướng dẫn từng học viên'
    ]
  },
  {
    id: '4',
    name: 'Nguyễn Phương Tuyết',
    image: '/images/trainers/PhuongTuyet.jpg',
    qualifications: ["Bachelor of Tourism and Hospitality Management (Ha Noi University)"],
    position: "Trainer",
    experience: "Từ tháng 10/2023",
    specialization: "Speaking",
    currentWork: "Teaching PTE, IELTS",
    location: "Hà Nội, Việt Nam",
    hobbies: "Teaching, Speaking, Eating, Travelling, Singing",
    quotes: ["Happiness is like a butterfly; the more you chase it, the more it will evade you"],
    achievements: [
      'Chuyên gia về kỹ năng Speaking PTE',
      'Phương pháp phát âm chuẩn và tự nhiên',
      'Kinh nghiệm luyện thi đa dạng',
      'Nhiệt tình và tâm huyết với nghề'
    ]
  },
  {
    id: '5',
    name: 'Lương Thanh Hương',
    image: '/images/trainers/ThanhHuong.png',
    qualifications: [
      "Master of Business Administration (Solvay Brussel-NeU)",
      "Master of TESOL (University of Queensland, Australia)"
    ],
    position: "Trainer",
    experience: "From April 2023",
    specialization: "Speaking",
    currentWork: "Lecturer at Banking Academy of Vietnam (from 2010 to present)",
    location: "Hà Nội, Việt Nam",
    hobbies: "Teaching and learning",
    quotes: [
      "Life is like riding a bicycle. To keep your balance, you must keep moving – Albert Einstein",
      "If you've never tried, how will you ever know if there's any chance? - Jack Ma"
    ],
    achievements: [
      'Chuyên gia về kỹ năng Speaking và Reading PTE',
      'Phương pháp đọc hiểu hiệu quả',
      'Kinh nghiệm giảng dạy chuyên sâu',
      'Tận tâm với sự tiến bộ của học viên'
    ]
  },
  {
    id: '6',
    name: 'Trịnh Thị Thanh Tâm',
    image: '/images/trainers/ThanhTam.png',
    qualifications: ["Bachelor of English language studies, Đà Lạt University"],
    position: "Trainer",
    experience: "Từ 27-7-2023",
    specialization: "Speaking",
    currentWork: "Teaching PTE, teaching E communication",
    location: "Da Lat City, Lam Dong Province",
    hobbies: "Helping everything (plants, animals, human, nature...) in positive ways",
    quotes: [
      "Build your own dreams, or someone else will hire you to build theirs (Farrah Gray)",
      "Cuộc sống của chúng ta được định hình bởi chính tâm trí của chúng ta. Chúng ta sẽ trở thành những gì chúng ta nghĩ. (Buddha)"
    ],
    achievements: [
      'Chuyên gia về kỹ năng Speaking và Listening PTE',
      'Phương pháp nghe hiểu độc đáo',
      'Kinh nghiệm đào tạo phong phú',
      'Luôn quan tâm đến từng học viên'
    ]
  },
  {
    id: '7',
    name: 'Trần Thu Hương',
    image: '/images/trainers/ThuHuong.png',
    qualifications: ["Tiến sĩ ngành Kinh doanh quốc tế (Đại học quốc gia Đài Loan)"],
    position: "Tutor",
    experience: "Từ tháng 7/2023",
    specialization: "Speaking",
    currentWork: "Giảng viên Khoa Kinh doanh quốc tế, Trường Kinh tế, Đại học Cần Thơ (từ 2014 - nay)",
    location: "Can Tho City, Vietnam",
    hobbies: "Teaching",
    quotes: [
      "Always do your best. What you plant now, you will harvest later – Og Mandino",
      "It never too late to be what you might have been – George Eliot"
    ],
    achievements: [
      'Giảng viên toàn diện các kỹ năng PTE, đặc biệt Speaking',
      'Phương pháp giảng dạy khoa học',
      'Kinh nghiệm luyện thi đa dạng',
      'Tận tụy với sự phát triển của học viên'
    ]
  },
  {
    id: '8',
    name: 'Nguyễn Hải Hà',
    image: '/images/trainers/HaiHa.png',
    qualifications: ["Engineer's Degree in Electronics and Telecommunications, Hanoi University of Science and Technology"],
    position: "Trainer",
    experience: "Từ tháng 7/2023",
    specialization: "Reading",
    currentWork: "M.Sc Student in Electronics Engineering, The University of Adelaide",
    location: "Adelaide, South Australia",
    hobbies: "Teaching, Learning, Watching movies",
    quotes: [
      "Give me six hours to chop down a tree and I will spend the first four sharpening the axe. - Abraham Lincoln",
      "Practice makes perfect. After a long time of practicing, our work will become natural, skillful, swift and steady. - Bruce Lee"
    ],
    achievements: [
      'Chuyên gia về kỹ năng Reading PTE',
      'Phương pháp giảng dạy hiệu quả',
      'Kinh nghiệm đào tạo chuyên sâu',
      'Tận tâm hướng dẫn học viên'
    ]
  },
  {
    id: '9',
    name: 'Nguyễn Vũ Hoàng Dung',
    image: '/images/trainers/DungNguyen.jpg',
    qualifications: [
      "Bachelor of Marketing (ĐH Swinburne, Úc)",
      "Master of Accounting (ĐH Kaplan, Úc)"
    ],
    position: "Trainer",
    experience: "Từ 2024",
    specialization: "1-1 Coaching (Speaking and Listening)",
    currentWork: "PTE Trainer, Accountant",
    location: "TP. Hồ Chí Minh",
    hobbies: "Watching TV Shows",
    quotes: ["Chúng ta phải thay đổi bản thân trước thì mới có thể thay đổi cuộc sống của mình."],
    achievements: [
      'Chuyên gia về kỹ năng Speaking và Listening PTE',
      'Phương pháp giảng dạy hiệu quả',
      'Kinh nghiệm đào tạo chuyên sâu',
      'Tận tâm hướng dẫn học viên'
    ]
  }
];
