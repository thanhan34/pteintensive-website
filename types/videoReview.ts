export type VideoReview = {
  id?: string;
  name: string;
  videoUrl: string;
  embedUrl?: string;
  achievement: string;
  course: string;
  isActive: boolean;
  displayOrder?: number;
  createdAt?: any;
  updatedAt?: any;
};