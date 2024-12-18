import React from 'react';

interface SkillBar {
  name: string;
  tasks: {
    name: string;
    percentage: number;
    color: string;
  }[];
}

const skillBars: SkillBar[] = [
  {
    name: 'Speaking',
    tasks: [
      { name: 'RA', percentage: 33, color: 'bg-[#2B4016]' },
      { name: 'RS', percentage: 30, color: 'bg-[#4C6B33]' },
      { name: 'DI', percentage: 22, color: 'bg-[#8FB573]' },
      { name: 'RL', percentage: 10, color: 'bg-[#B5D4A7]' },
      { name: 'ASQ', percentage: 5, color: 'bg-[#D6E6CD]' },
    ],
  },
  {
    name: 'Writing',
    tasks: [
      { name: 'WFD', percentage: 28, color: 'bg-[#8B4513]' },
      { name: 'RW-FIB', percentage: 25, color: 'bg-[#CD853F]' },
      { name: 'L-FIB', percentage: 18, color: 'bg-[#DEB887]' },
      { name: 'WE', percentage: 17, color: 'bg-[#F4A460]' },
      { name: 'SST', percentage: 6, color: 'bg-[#FFE4B5]' },
      { name: 'SWT', percentage: 6, color: 'bg-[#FFEFD5]' },
    ],
  },
  {
    name: 'Reading',
    tasks: [
      { name: 'RW-FIB', percentage: 29, color: 'bg-[#8B6914]' },
      { name: 'RA', percentage: 27, color: 'bg-[#B8860B]' },
      { name: 'R-FIB', percentage: 20, color: 'bg-[#DAA520]' },
      { name: 'HIW', percentage: 9, color: 'bg-[#F0E68C]' },
    ],
  },
  {
    name: 'Listening',
    tasks: [
      { name: 'WFD', percentage: 25, color: 'bg-[#000080]' },
      { name: 'RS', percentage: 23, color: 'bg-[#0000CD]' },
      { name: 'HIW', percentage: 16, color: 'bg-[#4169E1]' },
      { name: 'L-FIB', percentage: 12, color: 'bg-[#6495ED]' },
      { name: 'RL', percentage: 9, color: 'bg-[#87CEEB]' },
    ],
  },
];

const ScoreDistributionChart = () => {
  return (
    <div className="space-y-12">
      {skillBars.map((skill) => (
        <div key={skill.name}>
          <div className="text-xl font-bold mb-2">{skill.name}</div>
          <div className="relative h-16 flex rounded overflow-hidden">
            {skill.tasks.map((task) => (
              <div
                key={task.name}
                className={`${task.color} relative flex items-center justify-center`}
                style={{ width: `${task.percentage}%` }}
              >
                {task.percentage >= 9 && (
                  <div className="text-center text-white">
                    <div className="text-xl font-bold mb-1">{task.name}</div>
                    <div className="text-lg">{task.percentage}%</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScoreDistributionChart;
