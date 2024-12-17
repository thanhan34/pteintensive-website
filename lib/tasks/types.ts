export interface TaskData {
  taskName: string;
  about: string;
  tips: string[];
  timeSpan: string;
  practiceGoalWhy: string;
  practiceGoalPoints: {
    points: number;
    description: string;
  }[];
  practiceTask: string;
}

export interface TasksData {
  [key: string]: TaskData;
}
