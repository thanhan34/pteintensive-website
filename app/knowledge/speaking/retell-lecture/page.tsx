import React from 'react';
import TaskGuide from '@/app/components/TaskGuide';
import taskData from '@/lib/taskData';

const RetellLecturePage = () => {
  return <TaskGuide {...taskData['retell-lecture']} />;
};

export default RetellLecturePage;
