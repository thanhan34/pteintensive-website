import React from 'react';

interface TargetScore {
  target: number;
  tasks: string;
}

const targetScores: TargetScore[] = [
  {
    target: 30,
    tasks: '1, 3, 4, 20'
  },
  {
    target: 50,
    tasks: '1, 3, 4, 6, 7, 8, 11, 13, 20'
  },
  {
    target: 65,
    tasks: '1, 2, 3, 4, 6, 7, 8, 11, 13, 19, 20 (Optional 10)'
  },
  {
    target: 79,
    tasks: '1, 2, 3, 4, 5, 6, 7, 8, 11, 13, 15, 19, 20'
  }
];

const TargetScoreTable = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gradient-to-r from-[#fc5d01] to-[#ff8142] text-white">
              <th className="px-6 py-3 text-left text-lg font-semibold">Target</th>
              <th className="px-6 py-3 text-left text-lg font-semibold">Focused tasks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {targetScores.map((score) => (
              <tr key={score.target} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-lg font-semibold">Target {score.target}</td>
                <td className="px-6 py-4">{score.tasks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-gray-500 italic">
        * Các số trong bảng tương ứng với thứ tự câu hỏi trong bảng phân tích điểm chi tiết
      </p>
    </div>
  );
};

export default TargetScoreTable;
