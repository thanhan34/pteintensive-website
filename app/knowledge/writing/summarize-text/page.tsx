import React from 'react';
import TaskGuide from '@/app/components/TaskGuide';
import taskData from '@/lib/taskData';

const SummarizeWrittenTextPage = () => {
  return <TaskGuide {...taskData['summarize-written-text']} />;
};

export default SummarizeWrittenTextPage;
