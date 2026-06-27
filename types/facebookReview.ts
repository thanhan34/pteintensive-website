export type FacebookReview = {
  id?: string;
  name: string;
  avatarUrl?: string;
  content: string;
  postUrl?: string;
  screenshotUrl?: string;
  rating?: number;
  date: string;
  source: 'Facebook Group';
  isActive: boolean;
  createdAt?: any;
  updatedAt?: any;
  randomKey?: number;
  hashtag?: string;
  target?: string;
  score?: string;
};
