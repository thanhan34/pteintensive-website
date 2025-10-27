export default function ContactInfo() {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Thông Tin Liên Hệ</h2>
        
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-[#FF4D00]/10 p-3 rounded-lg">
              <svg 
                className="w-6 h-6 text-[#FF4D00]" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Địa Chỉ</h3>
              <p className="text-gray-600">48 Derwent Place, Riverhills, 4074, Queensland, Australia.</p>
            </div>
          </div>
  
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-[#FF4D00]/10 p-3 rounded-lg">
              <svg 
                className="w-6 h-6 text-[#FF4D00]" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
              <p className="text-gray-600">admin@pteintensive.com</p>
            </div>
          </div>
  
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-[#FF4D00]/10 p-3 rounded-lg">
              <svg 
                className="w-6 h-6 text-[#FF4D00]" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Điện Thoại</h3>
              <div className="space-y-1">
                <p className="text-gray-600">Vietnam: 0349213852</p>
                <p className="text-gray-600">Australia: 0450669092</p>
              </div>
            </div>
          </div>
  
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-[#FF4D00]/10 p-3 rounded-lg">
              <svg 
                className="w-6 h-6 text-[#FF4D00]" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Giờ Làm Việc</h3>
              <div className="text-gray-600 space-y-1">
                <p>Thứ 2 - Thứ 6: 8:00 - 17:00</p>
                <p>Thứ 7: 8:00 - 12:00</p>
                <p>Chủ nhật: Nghỉ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
