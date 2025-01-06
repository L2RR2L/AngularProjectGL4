import { environment } from "../../environments/environment";

export const API = {
  GetVideo: (videoId: string) => `/api/videos/${videoId}`,
  GetSubscribers: () => '/api/subscriptions/count',
  GetSubscriptionVideos: () => '/api/videos/subscription',
  PostUploadVideo: () => '/api/videos/upload',
  PostUploadFile: () => '/api/videos',
  GetThumbnails: () => '/api/videos/thumbnails',
  GetRecommendedVideos: () => '/api/videos/recommended',
  GetTrendingVideos: () => '/api/videos/trending',
  Login: () => `${environment.apiURL}/api/auth/google`,
  GetChannel: () => `/api/channels/owner`
};
