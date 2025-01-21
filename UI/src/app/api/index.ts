import { environment } from '../../environments/environment';

export const API = {
  GetVideo: (videoId: string) => `/api/videos/${videoId}`,
  GetSubscribers: () => '/api/subscriptions/count',
  GetSubscriptionVideos: () => '/api/videos/subscription',
  PostUploadVideo: () => '/api/videos/upload',
  PostUploadFile: () => '/api/videos',
  GetThumbnails: () => '/api/videos/thumbnails',
  GetRecommendedVideos: () => '/api/videos/recommended',
  GetTrendingVideos: (category?: number) =>
    category == undefined
      ? '/api/videos/trending'
      : `/api/videos/trending/${category}`,
  GetChannel: () => `/api/channels/owner`,
  Login: () => `${environment.apiURL}/api/auth/google`,
  Logout: () => `/api/auth/google/logout`,
};
