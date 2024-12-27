import React from 'react';

const ScoreComparisonTable = () => {
  const scores = [
    { pte: '30', ielts: '4.5' },
    { pte: '36', ielts: '5.0' },
    { pte: '42', ielts: '5.5' },
    { pte: '50', ielts: '6.0' },
    { pte: '58', ielts: '6.5' },
    { pte: '65', ielts: '7.0' },
    { pte: '73', ielts: '7.5' },
    { pte: '79', ielts: '8.0' },
    { pte: '83', ielts: '8.5' },
    { pte: '86', ielts: '9.0' },
  ];

  return (
    <section className="py-8 sm:py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="w-full max-w-6xl mx-auto px-2 sm:px-4">
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#FF4D00] mb-2 sm:mb-4">
            BẢNG QUY ĐỔI ĐIỂM PTE - IELTS
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-2">
            Bảng quy đổi điểm giúp bạn dễ dàng so sánh điểm số giữa hai hệ thống thi tiếng Anh phổ biến: PTE Academic và IELTS Academic.
          </p>
        </div>

        <div className="bg-white rounded-lg sm:rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-2xl">
          <div className="overflow-x-auto -mx-2 sm:mx-0">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-[#fc5d01] to-[#ff7e3f]">
                  <th className="py-3 sm:py-5 px-2 sm:px-4 text-base sm:text-xl md:text-2xl font-bold text-white w-20 sm:w-32 text-center border-r border-orange-400">
                    PTE
                  </th>
                  {scores.map((score, index) => (
                    <th 
                      key={index} 
                      className="py-3 sm:py-5 px-2 sm:px-4 text-base sm:text-xl md:text-2xl font-bold text-white text-center border-r border-orange-400 last:border-r-0"
                    >
                      {score.pte}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="bg-gradient-to-r from-[#fc5d01] to-[#ff7e3f] text-white py-3 sm:py-5 px-2 sm:px-4 text-base sm:text-xl md:text-2xl font-bold text-center">
                    IELTS
                  </td>
                  {scores.map((score, index) => (
                    <td 
                      key={index} 
                      className="bg-white py-3 sm:py-5 px-2 sm:px-4 text-base sm:text-xl md:text-2xl text-center text-[#fc5d01] font-bold border-r border-gray-100 last:border-r-0 transition-colors duration-300 hover:bg-orange-50"
                    >
                      {score.ielts}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default ScoreComparisonTable;
