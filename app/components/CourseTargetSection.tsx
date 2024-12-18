import Image from 'next/image';

interface TargetPointProps {
  number: number;
  title: string;
  description: string;
}

const targetPoints: TargetPointProps[] = [
  {
    number: 1,
    title: "Cần chứng chỉ tiếng Anh để hoàn thiện hồ sơ du học, làm việc hoặc định cư",
    description: "Phục vụ các mục tiêu như xin visa (462, 482, 500, 189, 190), nhập học trường nghề, Cao đẳng, Đại học hoặc sử dụng trong công việc quốc tế."
  },
  {
    number: 2,
    title: "Bận rộn, cần lịch học linh hoạt",
    description: "Phù hợp cho người không thể tham gia các lớp học cố định do lịch trình công việc hoặc học tập dày đặc."
  },
  {
    number: 3,
    title: "Muốn rút ngắn thời gian đạt mục tiêu tiếng Anh",
    description: "Các khóa học cấp tốc (1-4 tháng) giúp bạn nhanh chóng đạt điểm số PTE cần thiết, tiết kiệm thời gian chuẩn bị."
  },
  {
    number: 4,
    title: "Mất gốc hoặc lâu không sử dụng tiếng Anh",
    description: "Được thiết kế riêng cho người học mất căn bản hoặc lâu ngày không sử dụng tiếng Anh, cần xây dựng lại nền tảng từ đầu với sự hỗ trợ của giáo viên."
  },
  {
    number: 5,
    title: "Gặp khó khăn với các chứng chỉ tiếng Anh khác",
    description: "Dành cho những ai từng thất bại với IELTS, TOEFL hoặc các kỳ thi tiếng Anh khác, muốn thử sức với một định dạng thi thân thiện và dễ tiếp cận hơn."
  },
  {
    number: 6,
    title: "Giảm áp lực học tập và tiết kiệm chi phí",
    description: "Hỗ trợ sinh viên cần chứng chỉ gấp để giảm áp lực tốt nghiệp, hoặc người muốn tiết kiệm từ 5.000 AUD – 10.000 AUD chi phí học tiếng Anh khi xin visa Partner hoặc Đầu tư."
  }
];

const TargetPoint = ({ number, title, description }: TargetPointProps) => (
  <div className="flex items-start gap-4 mb-8">
        <div className="space-y-2">
    <div className="w-8 h-8 rounded-full bg-[#FF4D00] text-white flex items-center justify-center font-bold text-sm">
        {number}
      </div>
      <h3 className="font-bold text-base mb-1">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

export default function CourseTargetSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2">
          Khóa học này <span className="text-[#FF4D00]">dành cho ai?</span>
        </h2>
        <p className="text-gray-600 mb-12">Hãy tìm nơi dành cho bạn!</p>
        
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-5/12">
            <div className="relative">
              <div className="bg-white rounded-lg overflow-hidden">
                <Image
                  src="/images/andoan.png"
                  alt="Course Target"
                  width={600}
                  height={800}
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-[#fc5d01] text-white p-3 rounded-lg flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-full flex-shrink-0 overflow-hidden">
                    <Image
                      src="/images/andoan.png"
                      alt="WebDemo"
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Học ở PTE tại Intensive</p>
                    <p className="text-xs opacity-90">bạn sẽ có &quot;Lộ trình trình cá nhân hóa&quot;</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-7/12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              <div>
                {targetPoints.slice(0, 3).map((point) => (
                  <TargetPoint key={point.number} {...point} />
                ))}
              </div>
              <div>
                {targetPoints.slice(3, 6).map((point) => (
                  <TargetPoint key={point.number} {...point} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
