import { summarizeSpokenTextTask } from './summarizeSpokenText';
import { listeningMcmaTask } from './mcma';
import { listeningFillBlanksTask } from './fillBlanks';
import { highlightCorrectSummaryTask } from './highlightCorrectSummary';
import { listeningMcsaTask } from './listeningMcsa';
import { selectMissingWordsTask } from './selectMissingWords';
import { highlightIncorrectWordsTask } from './highlightIncorrectWords';
import { writeFromDictationTask } from './writeFromDictation';

export const listeningTasks = {
  'summarize-spoken-text': summarizeSpokenTextTask,
  'listening-mcma': listeningMcmaTask,
  'listening-fill-blanks': listeningFillBlanksTask,
  'highlight-correct-summary': highlightCorrectSummaryTask,
  'listening-mcsa': listeningMcsaTask,
  'select-missing-words': selectMissingWordsTask,
  'highlight-incorrect-words': highlightIncorrectWordsTask,
  'write-from-dictation': writeFromDictationTask
};

export {
  summarizeSpokenTextTask,
  listeningMcmaTask,
  listeningFillBlanksTask,
  highlightCorrectSummaryTask,
  listeningMcsaTask,
  selectMissingWordsTask,
  highlightIncorrectWordsTask,
  writeFromDictationTask
};
