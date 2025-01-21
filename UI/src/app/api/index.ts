import { environment } from '../../environments/environment';

export const API = {
  GetVideo: (videoId: string) => `/api/videos/${videoId}`,
  GetSubscribers: () => '/api/subscriptions/count',
  GetSubscriptionVideos: () => '/api/videos/subscription',
  PostUploadVideo: () => '/api/videos/upload',
  PostUploadFile: () => '/api/videos',
  GetThumbnails: () => '/api/videos/thumbnails',
  GetRecommendedVideos: () => '/api/videos/recommended',
  Login: () => `${environment.apiURL}/api/auth/google`,
  GetOwnerChannel: () => `/api/channels/owner`,
  GetChannel: (channelId: string) => `/api/channels/${channelId}`,
  GetSubscriptionState: () => `/api/subscriptions/subscribed`,
  GetChannelVideos: (channelId: string) => `/api/videos/channel/${channelId}`,
  PostSubscription: () => `/api/subscriptions`,
  DeleteSubscription: (channelId: string) => `/api/subscriptions/${channelId}`,
  GetTrendingVideos: (category?: number) =>
    category == undefined
      ? '/api/videos/trending'
      : `/api/videos/trending/${category}`,
  Logout: () => `/api/auth/google/logout`,
};
