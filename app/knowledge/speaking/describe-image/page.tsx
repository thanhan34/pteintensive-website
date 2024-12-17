import React from 'react';
import TaskGuide from '@/app/components/TaskGuide';
import taskData from '@/lib/taskData';

const DescribeImagePage = () => {
  return <TaskGuide {...taskData['describe-image']} />;
};

export default DescribeImagePage;
