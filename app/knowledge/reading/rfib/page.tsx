import React from 'react';
import TaskGuide from '@/app/components/TaskGuide';
import { taskData } from '@/lib/taskData';

const ReadingFillInBlanksPage = () => {
  const rfibData = taskData['rfib'];
  
  if (!rfibData) {
    return <div>Loading...</div>;
  }

  return <TaskGuide {...rfibData} />;
};

export default ReadingFillInBlanksPage;
