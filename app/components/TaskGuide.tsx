"use client";

import React from 'react';

interface PracticeGoalPoint {
  points: number;
  description: string;
}

interface TaskGuideProps {
  taskName: string;
  about: string;
  tips: string[];
  timeSpan: string;
  practiceGoalWhy: string;
  practiceGoalPoints: PracticeGoalPoint[];
  practiceTask: string;
}

const TaskGuide: React.FC<TaskGuideProps> = ({
  taskName,
  about,
  tips,
  timeSpan,
  practiceGoalWhy,
  practiceGoalPoints,
  practiceTask,
}) => {
  const formatText = (text: string | undefined) => {
    if (!text) return null;
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Title Section */}
      <div className="text-center mb-16">
        <h1 className="relative inline-block">
          <span className="absolute -top-8 left-0 right-0 text-[120px] font-bold text-[#fc5d01] opacity-20">
            STUDY GUIDE
          </span>
          <span className="text-4xl font-bold text-gray-800 relative z-10">
            {taskName}
          </span>
        </h1>
      </div>

      {/* About Section */}
      <div className="mb-12 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b border-gray-200 pb-2">About</h2>
        <div className="text-gray-700 space-y-4">{formatText(about)}</div>
      </div>

      {/* Tips Section */}
      <div className="mb-12 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b border-gray-200 pb-2">Tips</h2>
        <ul className="space-y-4">
          {tips?.map((tip, index) => (
            <li key={index} className="text-gray-700 pl-4 relative">
              <span className="absolute left-0">•</span>
              <div className="pl-2">{formatText(tip)}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* Time Span Section */}
      <div className="mb-12 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b border-gray-200 pb-2">Time Span</h2>
        <div className="text-gray-700 space-y-4">{formatText(timeSpan)}</div>
      </div>

      {/* Practice Goal Section */}
      <div className="mb-12 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b border-gray-200 pb-2">Practice Goal</h2>
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">WHY:</h3>
          <div className="text-gray-700 pl-4">{formatText(practiceGoalWhy)}</div>
        </div>
        <div className="space-y-6">
          {practiceGoalPoints?.map((point, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-[#FF4D00] mb-2">{point.points}+ points:</h3>
              <div className="text-gray-700 pl-4">{formatText(point.description)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Practice Task Section */}
      <div className="mb-12 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b border-gray-200 pb-2">Practice Task</h2>
        <div className="text-gray-700 space-y-4">{formatText(practiceTask)}</div>
      </div>
    </div>
  );
};

export default TaskGuide;
