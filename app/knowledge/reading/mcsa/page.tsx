import React from 'react';
import TaskGuide from '@/app/components/TaskGuide';
import { taskData } from '@/lib/taskData';

const MultipleChoiceSingleAnswerPage = () => {
  const mcsaData = taskData['mcsa'];
  
  if (!mcsaData) {
    return <div>Loading...</div>;
  }

  return <TaskGuide {...mcsaData} />;
};

export default MultipleChoiceSingleAnswerPage;
