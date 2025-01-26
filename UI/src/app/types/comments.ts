export interface Comment {
  id: string;
  channelImg: string;
  channelName: string;
  createdAt: Date;
  content: string;
  videoId: string;
  commentTo: string;
  commentBy: string;
}
