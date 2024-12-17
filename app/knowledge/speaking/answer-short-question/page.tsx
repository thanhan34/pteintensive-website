import React from 'react';
import TaskGuide from '@/app/components/TaskGuide';
import taskData from '@/lib/taskData';

const AnswerShortQuestionPage = () => {
  return <TaskGuide {...taskData['answer-short-question']} />;
};

export default AnswerShortQuestionPage;
