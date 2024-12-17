import React from 'react';
import TaskGuide from '@/app/components/TaskGuide';
import taskData from '@/lib/taskData';

const WriteEssayPage = () => {
  return <TaskGuide {...taskData['write-essay']} />;
};

export default WriteEssayPage;
