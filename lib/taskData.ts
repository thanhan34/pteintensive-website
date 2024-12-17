import { TasksData } from './tasks/types';
import { speakingTasks } from './tasks/speaking';
import { writingTasks } from './tasks/writing';
import { readingTasks } from './tasks/reading';
import { listeningTasks } from './tasks/listening';

// Create the combined task data with explicit type
export const taskData: TasksData = {
  // Speaking tasks
  ...speakingTasks,
  
  // Writing tasks
  ...writingTasks,
  
  // Reading tasks
  ...readingTasks,
  
  // Listening tasks
  ...listeningTasks
};

// Add debugging
console.log('Available tasks:', Object.keys(taskData));

export default taskData;
