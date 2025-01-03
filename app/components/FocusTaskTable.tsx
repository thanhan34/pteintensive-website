import React from 'react';

interface FocusTask {
  target: string;
  tasks: string;
}

const focusTasks: FocusTask[] = [
  {
    target: 'Target 30',
    tasks: '1, 3, 4, 20',
  },
  {
    target: 'Target 50',
    tasks: '1, 3, 4, 6, 7, 8, 11, 13, 20',
  },
  {
    target: 'Target 65',
    tasks: '1, 2, 3, 4, 6, 7, 8, 11, 13, 19, 20 (Optional 10)',
  },
  {
    target: 'Target 79',
    tasks: '1, 2, 3, 4, 5, 6, 7, 8, 11, 13, 15, 19, 20',
  },
];

const FocusTaskTable = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Chiến Lược Học Tập Theo Mục Tiêu</h2>
      <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
        Đối với từng mục tiêu điểm số khác nhau, sẽ có thứ tự ưu tiên học khác nhau. 
        Vì vậy, PTE Intensive đã xây dựng chiến lược học tập sao cho đảm bảo tính hiệu 
        quả và trọng tâm nhất. Dưới đây là các phần thi đề xuất cho từng mục tiêu điểm số:
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gradient-to-r from-[#fc5d01] to-[#ff8142] text-white">
              <th className="px-3 sm:px-6 py-2 sm:py-4 text-left text-base sm:text-lg font-semibold">Target</th>
              <th className="px-3 sm:px-6 py-2 sm:py-4 text-left text-base sm:text-lg font-semibold">Focused tasks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {focusTasks.map((task) => (
              <tr key={task.target} className="hover:bg-gray-50">
                <td className="px-3 sm:px-6 py-2 sm:py-4 text-base sm:text-lg font-semibold whitespace-normal">{task.target}</td>
                <td className="px-3 sm:px-6 py-2 sm:py-4 text-sm sm:text-base whitespace-normal">{task.tasks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500 italic">
        * Các số trong bảng tương ứng với thứ tự câu hỏi trong bảng phân tích điểm chi tiết
      </p>
    </div>
  );
};

export default FocusTaskTable;
