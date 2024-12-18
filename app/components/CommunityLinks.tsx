import { motion } from 'framer-motion';

export default function CommunityLinks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const stats = [
    {
      platform: "Facebook Group",
      url: "https://www.facebook.com/groups/pteintensive",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/>
        </svg>
      ),
      stats: "10,000+ thành viên",
      description: "Tham gia cộng đồng học tập sôi động",
      benefits: ["Chia sẻ kinh nghiệm", "Tài liệu miễn phí", "Hỗ trợ 24/7"]
    },
    {
      platform: "Facebook Fanpage",
      url: "https://www.facebook.com/pteintensive",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/>
        </svg>
      ),
      stats: "Cập nhật hàng ngày",
      description: "Theo dõi tin tức và sự kiện mới nhất",
      benefits: ["Thông báo khóa học", "Ưu đãi đặc biệt", "Tin tức PTE"]
    },
    {
      platform: "YouTube Channel",
      url: "https://www.youtube.com/@pteintensive",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      stats: "Video hướng dẫn miễn phí",
      description: "Học mọi lúc, mọi nơi với video chất lượng cao",
      benefits: ["Tips làm bài thi", "Luyện phát âm", "Giải đề PTE"]
    }
  ];

  return (
    <motion.div 
      className="bg-gradient-to-br from-[#FF4D00] to-[#ff7e3c] text-white rounded-2xl shadow-xl overflow-hidden relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '20px 20px'
        }}/>
      </div>

      {/* Content */}
      <div className="relative p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Tham Gia Cộng Đồng</h2>
          <div className="flex space-x-2">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"/>
            <span className="w-2 h-2 bg-white rounded-full animate-pulse delay-100"/>
            <span className="w-2 h-2 bg-white rounded-full animate-pulse delay-200"/>
          </div>
        </div>

        <div className="space-y-4">
          {stats.map((item, index) => (
            <motion.a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="block bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  {item.icon}
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-semibold truncate">{item.platform}</h3>
                    <span className="text-sm bg-white/20 px-2 py-1 rounded-full">{item.stats}</span>
                  </div>
                  <p className="text-sm text-white/90 mb-2">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.benefits.map((benefit, i) => (
                      <span key={i} className="text-xs bg-white/10 px-2 py-1 rounded-full">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-white/80">
            Tham gia ngay để không bỏ lỡ những thông tin hữu ích!
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '10px 10px'
          }}/>
        </div>
        <div className="absolute bottom-0 left-0 w-16 h-16 opacity-10 transform rotate-45">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white)',
            backgroundSize: '8px 8px'
          }}/>
        </div>
      </div>
    </motion.div>
  );
}
