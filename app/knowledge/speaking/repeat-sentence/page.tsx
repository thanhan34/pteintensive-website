import React from 'react';
import TaskGuide from '@/app/components/TaskGuide';
import taskData from '@/lib/taskData';

const RepeatSentencePage = () => {
  return <TaskGuide {...taskData['repeat-sentence']} />;
};

export default RepeatSentencePage;
