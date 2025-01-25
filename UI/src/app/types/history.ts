import { Video } from "./video";

export interface History {
  id: string;
  userId: string;
  video: Video;
  watchedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
