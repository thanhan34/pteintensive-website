import { ropTask } from './rop';
import { mcmaTask } from './mcma';
import { mcsaTask } from './mcsa';
import { rfibTask } from './rfib';
import { rwfibTask } from './rwfib';

export const readingTasks = {
  'rop': ropTask,
  'mcma': mcmaTask,
  'mcsa': mcsaTask,
  'rfib': rfibTask,
  'rwfib': rwfibTask
};

export {
  ropTask,
  mcmaTask,
  mcsaTask,
  rfibTask,
  rwfibTask
};
