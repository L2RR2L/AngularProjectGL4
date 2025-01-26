import { environment } from '../../environments/environment';

export const API = {
  GetVideo: (videoId: string) => `/api/videos/${videoId}`,
  GetSubscribers: () => '/api/subscriptions/count',
  GetSubscriptionVideos: () => '/api/videos/subscription',
  PostUploadVideo: () => '/api/videos/upload',
  PostUploadFile: () => '/api/videos',
  GetThumbnails: () => '/api/videos/thumbnails',
  GetRecommendedVideos: () => '/api/videos/recommended',
  GetTrendingVideos: () => '/api/videos/trending',
  GetChannel: () => `/api/channels/owner`,
  Login: () => `${environment.apiURL}/api/auth/google`,
  Logout: () => `/api/auth/google/logout`,
  GetSubscriptionsCount: () => `/api/subscriptions/count`,
  GetVideoComments: (videoId: string) => `/api/comments/${videoId}`,
  createVideoComments: () => `/api/comments`,
  GetRating: (type: 'video' | 'comment', id: string, videoId: string) =>
    `/api/ratings/${type}/${videoId}/${id}`,
  GetUserRating: (type: 'video' | 'comment', id: string, videoId: string) =>
    `/api/ratings/user/${type}/${videoId}/${id}`,
  UpdateUserRating: (type: 'video' | 'comment', id: string, videoId: string) =>
    `/api/ratings/${type}/${videoId}/${id}`,
  DeleteSubscription: (channelId: string) => `/api/subscriptions/${channelId}`,
  PostSubscription: () => `/api/subscriptions`,
  FetchSubscription: () => `/api/subscriptions/subscribed`,
};
