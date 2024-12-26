interface Review {
  id: string;
  name: string;
  course: string;
  rating: number;
  comment: string;
  studentImage: string;
  scoreImage: string;
  score?: string;
  date?: string;
  platform?: string;
  achievement?: string;
  beforeScore?: string;
  afterScore?: string;
  studyDuration?: string;
  facebookLink: string;
}

export const reviewData: Review[] = [
  {
    id: "1",
    name: "Trần Ngọc Bích",
    course: "PTE 1-1",
    rating: 5,
    comment: "Xin chào mọi người.\n Mình là học viên lớp 1-1 của PTE Intensive.\n Target mình là 58 và sau khi thi 2 tiếng thì mình có kết quả đã đạt Target.\n Hôm nay mình muốn chia sẽ một số thông tin về quá trình ôn luyện hơn tháng rưỡi và đi thi của mình.",
    studentImage: "/images/students/student1.jpg",
    scoreImage: "/images/scores/score1.jpg",  
    date: "15/12/2023",
    platform: "Facebook",
    studyDuration: "3 tháng",
    facebookLink: "https://www.facebook.com/groups/pteintensive/posts/8347521285270546/",
  },
  {
    id: "2",
    name: "Bùi Hải Yến",
    course: "PTE 50+",
    rating: 5,
    comment: "Hi cả nhà, mình đã thi xong hôm 19/7 và có điểm sau hơn 2 giờ chờ đợi.🎉\n Nói sơ qua về background thì mình đã có IELTS 6.0 nhưng mình vẫn chưa đủ điều kiện nên mình quyết định tìm học PTE với target là 50.",
    studentImage: "/images/students/student2.jpg",
    scoreImage: "/images/scores/score2.jpg",    
    date: "20/12/2023",
    platform: "Facebook",
    studyDuration: "3 tháng",
    facebookLink: "https://www.facebook.com/groups/pteintensive/posts/6585371431485549/",
  },
  {
    id: "3",
    name: "Trần Thanh Giang",
    course: "PTE 65",
    rating: 5,
    comment: "Hello mọi người!\n Mình là học viên 1:1 PTE65 all bands của trainer Hà Nguyễn.\n Mình có em bé nhỏ nên việc học hành khá lộn xộn (chỉ học được sau 22h) nên đã bỏ rất nhiều thời gian vô ích trong quá trình tự ôn (6 tháng).",
    studentImage: "/images/students/student3.jpg",
    scoreImage: "/images/scores/score3.jpg",    
    date: "22/04/2023",
    platform: "Facebook",
    studyDuration: "3 tháng",
    facebookLink: "https://www.facebook.com/groups/pteintensive/posts/8229805137042162/",
  },
  {
    id: "4",
    name: "Nguyễn Thị Thanh Thảo",
    course: "PTE 1-1 Target 65",
    rating: 5,
    comment: "Cuối cùng mình cũng chinh phục được PTE 65 all bands, sau 4 lần thất bại!!!\n Tất cả đều nhờ sự tận tình giảng dạy và cỗ vũ nhiệt tình từ cô Thanh Huong Luong Dam và sự quan tâm từ thầy An.",
    studentImage: "/images/students/student4.jpg",
    scoreImage: "/images/scores/score4.jpg",    
    date: "20/12/2023",
    platform: "Facebook",
    studyDuration: "3 tháng",
    facebookLink: "https://www.facebook.com/groups/pteintensive/posts/8098394396849904/",
  },
  {
    id: "5",
    name: "Nguyễn Dạ Thảo",
    course: "PTE 50+",
    rating: 5,
    comment: "Chào cả nhà, Hà Nội hôm nay thì mưa gió rầm rì nên muốn gửi tới mọi người chút động lực cho việc ôn luyện và thi PTE.\n Hôm nay tròn 1 tuần sau lần thi mình đạt target.\n Target của mình là overall và all bands là 50, cuối cùng mình cũng cán đích với overall 60 và all bands không dưới 50.",
    studentImage: "/images/students/student5.jpg",
    scoreImage: "/images/scores/score5.jpg",    
    date: "20/12/2023",
    platform: "Facebook",
    studyDuration: "3 tháng",
    facebookLink: "https://www.facebook.com/groups/pteintensive/posts/6743010162388341/",
  },
  {
    id: "6",
    name: "Tạ Đào Phương Anh",
    course: "PTE 1-1 Target 65",
    rating: 5,
    comment: "Cuối cùng mình cũng xuống núi sau một năm đi cùng PTE Intensive - Hãy học PTE theo cách thông minh.\n Chắc thầy và cô mừng lắm vì đuổi được cái đứa lỳ như mình.\n Thầy An Doan bảo mình là người đặc biệt nhất vì học với thầy sau 3 buổi 1:1 thì mình bảo với thầy mình học với thầy đủ rồi, mình tự học.",
    studentImage: "/images/students/student6.jpg",
    scoreImage: "/images/scores/score6.jpg",    
    date: "20/12/2023",
    platform: "Facebook",
    studyDuration: "3 tháng",
    facebookLink: "https://www.facebook.com/groups/pteintensive/posts/8696952783660726/",
  },
  {
    id: "7",
    name: "Phan Ngọc Phát",
    course: "PTE 1-1 Target",
    rating: 5,
    comment: "Hi mọi người, mình vừa thi xong PTE lần đầu ở EMG SG ngày 8/11.\n Mình có mail hoàn thành sau 1 tiếng và có điểm sau 2 tiếng rưỡi...\n\n ⏰ Thời gian mình bắt đầu học là 23/9, nhưng vì có việc phát sinh nên mãi đến 17/10 mình mới bắt đầu lao vào ôn chính thức.",
    studentImage: "/images/students/student7.jpg",
    scoreImage: "/images/scores/score7.jpg",    
    date: "20/12/2023",
    platform: "Facebook",
    studyDuration: "3 tháng",
    facebookLink: "https://www.facebook.com/groups/pteintensive/posts/6962581773764511/",
  },
  {
    id: "8",
    name: "Vọng Gia An",
    course: "PTE 1-11",
    rating: 5,
    comment: "Hôm nay mình xin được chia sẻ một câu chuyện không thể không bốc phốt về trung tâm luyện thi PTE SBS.\n Chuyến hành trình của mình vượt qua 65+ không chỉ là một hành trình đầy cảm xúc mà còn là một câu chuyện hài hước đến từ đội ngũ dí-er, đội ngũ dí, ép, dọa nạt, năn nỉ mình để làm bài & nộp bài tập.",
    studentImage: "/images/students/student8.jpg",
    scoreImage: "/images/scores/score8.jpg",    
    date: "20/12/2023",
    platform: "Facebook",    
    studyDuration: "3 tháng",
    facebookLink: "https://www.facebook.com/groups/pteintensive/posts/7318716614817690/",
  },
  {
    id: "9",
    name: "Daphne Pham",
    course: "PTE 1-1",
    rating: 5,
    comment: "Chào các bạn,\n Sau 2 lần thi muốn khóc thì mình cũng đã có thể yên tâm bình an ngồi xuống viết bài review cho Trung tâm SBS của tụi mình rồi.\n Target PTE của mình là 65+ all bands và self-goal là AHPRA Nursing Registration.",
    studentImage: "/images/students/student9.jpg",
    scoreImage: "/images/scores/score9.jpg",    
    date: "20/12/2023",
    platform: "Facebook",    
    studyDuration: "3 tháng",
    facebookLink: "https://www.facebook.com/groups/pteintensive/posts/7086095661413121/",
  }
];
