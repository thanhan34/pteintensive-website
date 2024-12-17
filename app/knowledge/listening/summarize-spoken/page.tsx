import React from 'react';
import TaskGuide from '@/app/components/TaskGuide';
import { taskData } from '@/lib/taskData';

const SummarizeSpokenTextPage = () => {
  const sstData = taskData['summarize-spoken-text'];
  
  if (!sstData) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        <div className="space-y-2">
          <p>Available tasks: {Object.keys(taskData).join(', ')}</p>
        </div>
      </div>
    );
  }

  return <TaskGuide {...sstData} />;
};

export default SummarizeSpokenTextPage;
