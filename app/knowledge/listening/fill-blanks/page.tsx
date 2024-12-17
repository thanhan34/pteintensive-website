import React from 'react';
import TaskGuide from '@/app/components/TaskGuide';
import { taskData } from '@/lib/taskData';

const ListeningFillBlanksPage = () => {
  const fillBlanksData = taskData['listening-fill-blanks'];
  
  if (!fillBlanksData) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        <div className="space-y-2">
          <p>Available tasks: {Object.keys(taskData).join(', ')}</p>
        </div>
      </div>
    );
  }

  return <TaskGuide {...fillBlanksData} />;
};

export default ListeningFillBlanksPage;