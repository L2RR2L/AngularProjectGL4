import { Video } from './video';

export interface Library {
  _id: string;
  name: string;
  userId: string;
  videos: Video[];
  createdAt: Date;
  updatedAt: Date;
}
