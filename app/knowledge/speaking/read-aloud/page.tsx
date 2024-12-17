import React from 'react';
import TaskGuide from '@/app/components/TaskGuide';
import { taskData } from '@/lib/taskData';

const ReadAloudPage = () => {
  const readAloudData = taskData['read-aloud'];
  
  if (!readAloudData) {
    return <div>Loading...</div>;
  }

  return <TaskGuide {...readAloudData} />;
};

export default ReadAloudPage;
