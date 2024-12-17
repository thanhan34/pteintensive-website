import React from 'react';
import TaskGuide from '@/app/components/TaskGuide';
import { taskData } from '@/lib/taskData';

const MultipleChoiceMultipleAnswerPage = () => {
  const mcmaData = taskData['mcma'];
  
  if (!mcmaData) {
    return <div>Loading...</div>;
  }

  return <TaskGuide {...mcmaData} />;
};

export default MultipleChoiceMultipleAnswerPage;
