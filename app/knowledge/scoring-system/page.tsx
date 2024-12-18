import React from 'react';
import { FaMicrophone } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { IoBookSharp } from 'react-icons/io5';
import { AiOutlineAudio } from 'react-icons/ai';
import ScoreDistributionChart from '@/app/components/ScoreDistributionChart';
import FocusTaskTable from '@/app/components/FocusTaskTable';

const ScoringSystemPage = () => {
  const sections = [
    {
      title: 'Speaking',
      icon: <FaMicrophone className="text-2xl" />,
      color: 'bg-blue-500',
      description: 'Đánh giá khả năng giao tiếp bằng tiếng Anh trong môi trường học thuật.',
    },
    {
      title: 'Writing',
      icon: <MdEdit className="text-2xl" />,
      color: 'bg-green-500',
      description: 'Đánh giá kỹ năng viết và khả năng tổ chức ý tưởng.',
    },
    {
      title: 'Reading',
      icon: <IoBookSharp className="text-2xl" />,
      color: 'bg-yellow-500',
      description: 'Đánh giá khả năng hiểu tiếng Anh học thuật dưới dạng văn bản.',
    },
    {
      title: 'Listening',
      icon: <AiOutlineAudio className="text-2xl" />,
      color: 'bg-purple-500',
      description: 'Đánh giá khả năng hiểu tiếng Anh nói trong bối cảnh học thuật.',
    },
  ];

  const tableData = [
    // Speaking Section
    { order: 1, type: 'RA', items: '6 - 7', time: { prep: '35 - 40 giây', answer: '40 giây' }, scores: { speaking: 33, listening: 27 } },
    { order: 2, type: 'RS', items: '10 - 12', time: { prep: 'Không chuẩn bị', answer: '15 giây' }, scores: { speaking: 30, listening: 23 } },
    { order: 3, type: 'DI', items: '3 - 4', time: { prep: '25 giây', answer: '40 giây' }, scores: { speaking: 22 } },
    { order: 4, type: 'RL', items: '1 - 2', time: { prep: '10 giây', answer: '40 giây' }, scores: { speaking: 10, listening: 9 } },
    { order: 5, type: 'ASQ', items: '5 - 6', time: { prep: 'Không chuẩn bị', answer: '10 giây' }, scores: { speaking: 5, listening: 4 } },
    
    // Writing Section
    { order: 6, type: 'SWT', items: '1 - 2', time: { answer: '10 phút/câu' }, scores: { writing: 6, reading: 4 } },
    { order: 7, type: 'WE', items: '1 - 2', time: { answer: '20 phút/câu' }, scores: { writing: 17 } },
    
    // Reading Section
    { order: 8, type: 'FIB-RW', items: '5 - 6', time: { answer: '< 2 phút' }, scores: { writing: 25, reading: 29 } },
    { order: 9, type: 'MCM-R', items: '1 - 2', time: { answer: '< 1 - 1.5 phút' }, scores: { reading: 2 } },
    { order: 10, type: 'RO', items: '2 - 3', time: { answer: '< 1.5 - 2 phút' }, scores: { reading: 7 } },
    { order: 11, type: 'FIB-R', items: '4 - 5', time: { answer: '< 2 phút' }, scores: { reading: 20 } },
    { order: 12, type: 'MCS-R', items: '1 - 2', time: { answer: '< 1 - 1.5 phút' }, scores: { reading: 1 } },
    
    // Listening Section
    { order: 13, type: 'SST', items: '1 - 2', time: { answer: '10 phút/câu' }, scores: { writing: 6, listening: 6 } },
    { order: 14, type: 'MCM-L', items: '1 - 2', time: { answer: '< 1 - 1.5 phút' }, scores: { listening: 2 } },
    { order: 15, type: 'FIB-L', items: '2 - 3', time: { answer: '< 2 phút' }, scores: { writing: 18, listening: 12 } },
    { order: 16, type: 'HCS', items: '1 - 2', time: { answer: '< 1 - 1.5 phút' }, scores: { reading: 1, listening: 1 } },
    { order: 17, type: 'MCS-L', items: '1 - 2', time: { answer: '< 1 - 1.5 phút' }, scores: { listening: 1 } },
    { order: 18, type: 'SMW', items: '1 - 2', time: { answer: '< 1 - 1.5 phút' }, scores: { listening: 1 } },
    { order: 19, type: 'HIW', items: '2 - 3', time: { answer: '< 2 phút' }, scores: { reading: 9, listening: 15 } },
    { order: 20, type: 'WFD', items: '3 - 4', time: { answer: '< 2 phút' }, scores: { writing: 28, listening: 25 } },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="text-center mb-12 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-[120px] font-bold text-[#fc5d01] opacity-10">
            PTE SCORE
          </h1>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 relative z-10 mb-6">
          Hệ Thống Tính Điểm Tích Hợp PTE
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Hiểu cách PTE Academic đánh giá trình độ tiếng Anh của bạn thông qua phương pháp chấm điểm tích hợp độc đáo
        </p>
      </div>

      {/* Skills Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {sections.map((section) => (
          <div key={section.title} className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-200">
            <div className={`${section.color} w-12 h-12 rounded-full flex items-center justify-center text-white mb-4`}>
              {section.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
            <p className="text-gray-600">{section.description}</p>
          </div>
        ))}
      </div>

      {/* Main Description */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Hiểu về Hệ thống Tính điểm Tích hợp PTE</h2>
        <div className="prose max-w-none text-gray-600">
          <p className="text-lg mb-4">
            PTE Academic sử dụng hệ thống tính điểm tích hợp độc đáo, trong đó một số dạng câu hỏi đánh giá nhiều kỹ năng ngôn ngữ cùng lúc. Ví dụ, Read Aloud (RA) đánh giá cả khả năng nói và đọc, mang lại đánh giá toàn diện hơn về trình độ tiếng Anh của bạn.
          </p>
          <p className="text-lg mb-4">
            Phương pháp sáng tạo này đảm bảo:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Đánh giá chính xác hơn kỹ năng ngôn ngữ thực tế</li>
            <li>Đánh giá toàn diện khả năng tiếng Anh của bạn</li>
            <li>Phản ánh tốt hơn cách sử dụng ngôn ngữ trong môi trường học thuật</li>
          </ul>
        </div>
      </div>

      {/* Score Distribution Chart */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Phân Bổ Điểm Số Theo Kỹ Năng</h2>
        <p className="text-gray-600 mb-8">
          Tùy vào mục tiêu điểm số mong muốn, Bảng dưới đây cung cấp thông tin chi tiết về tỷ trọng đánh giá của từng phần thi trong các kỹ năng Nói, Viết, Đọc và Nghe, giúp học viên có cái nhìn tổng quan và xác định được phần nào trọng tâm cần ưu tiên luyện tập để đạt được điểm số mong muốn:
        </p>
        <ScoreDistributionChart />
      </div>

      {/* Focus Task Table */}
      <FocusTaskTable />

      {/* Score Breakdown Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="p-6 bg-gradient-to-r from-[#fc5d01] to-[#ff8142]">
          <h2 className="text-2xl font-bold text-white">Bảng Phân Tích Điểm Chi Tiết</h2>
          <p className="text-white opacity-90">Dựa trên phân tích toàn diện của APEUni</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">STT</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Loại Câu Hỏi</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Số Lượng</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Thời Gian</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-blue-600">Nói</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-green-600">Viết</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-yellow-600">Đọc</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-purple-600">Nghe</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tableData.map((row) => (
                <tr key={row.order} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{row.order}</td>
                  <td className="px-6 py-4 font-medium">{row.type}</td>
                  <td className="px-6 py-4">{row.items}</td>
                  <td className="px-6 py-4">
                    {row.time.prep && <div>Chuẩn bị: {row.time.prep}</div>}
                    <div>Trả lời: {row.time.answer}</div>
                  </td>
                  <td className={`px-6 py-4 text-center ${row.scores.speaking ? 'bg-blue-50 text-blue-700 font-medium' : ''}`}>
                    {row.scores.speaking && `${row.scores.speaking}%`}
                  </td>
                  <td className={`px-6 py-4 text-center ${row.scores.writing ? 'bg-green-50 text-green-700 font-medium' : ''}`}>
                    {row.scores.writing && `${row.scores.writing}%`}
                  </td>
                  <td className={`px-6 py-4 text-center ${row.scores.reading ? 'bg-yellow-50 text-yellow-700 font-medium' : ''}`}>
                    {row.scores.reading && `${row.scores.reading}%`}
                  </td>
                  <td className={`px-6 py-4 text-center ${row.scores.listening ? 'bg-purple-50 text-purple-700 font-medium' : ''}`}>
                    {row.scores.listening && `${row.scores.listening}%`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend and Notes */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Ghi Chú Quan Trọng</h3>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            <span>Điểm kỹ năng Nói được hiển thị màu xanh dương</span>
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            <span>Điểm kỹ năng Viết được hiển thị màu xanh lá</span>
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
            <span>Điểm kỹ năng Đọc được hiển thị màu vàng</span>
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
            <span>Điểm kỹ năng Nghe được hiển thị màu tím</span>
          </li>
        </ul>
        <p className="mt-4 text-sm text-gray-500 italic">
          * Tỷ lệ đóng góp điểm của các loại câu hỏi được ước tính bởi đội ngũ giảng dạy PTE của APEUni. Có thể thay đổi nhẹ trong các bài thi thực tế tùy thuộc vào số lượng câu hỏi bạn nhận được.
        </p>
      </div>
    </div>
  );
};

export default ScoringSystemPage;
