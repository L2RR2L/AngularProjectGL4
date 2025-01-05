export const API = {
  GetVideo: (videoId: string) => `/api/videos/${videoId}`,
  GetSubscribers: () => '/api/subscriptions/count',
};
