import React from 'react';
import TaskGuide from '@/app/components/TaskGuide';
import { taskData } from '@/lib/taskData';

const ReadingFillBlanksPage = () => {
  const rwfibData = taskData['rwfib'];
  
  if (!rwfibData) {
    return <div>Loading...</div>;
  }

  return <TaskGuide {...rwfibData} />;
};

export default ReadingFillBlanksPage;
