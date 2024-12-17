import { readAloudTask } from './readAloud';
import { repeatSentenceTask } from './repeatSentence';
import { describeImageTask } from './describeImage';
import { retellLectureTask } from './retellLecture';
import { answerShortQuestionTask } from './answerShortQuestion';

export const speakingTasks = {
  'read-aloud': readAloudTask,
  'repeat-sentence': repeatSentenceTask,
  'describe-image': describeImageTask,
  'retell-lecture': retellLectureTask,
  'answer-short-question': answerShortQuestionTask
};
