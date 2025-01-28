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
  GetVideosBySearch: (searchValue: string, offset?: number, limit?: number) => {
    let base = `/api/videos/search/?search_query=${searchValue}`;
    if (offset != undefined) base = `${base}&offset=${offset}`;
    if (limit) base = `${base}&limit=${limit}`;
    return base;
  },

  PostSubscription: () => `/api/subscriptions`,
  DeleteSubscription: (channelId: string) => `/api/subscriptions/${channelId}`,
  GetTrendingVideos: (category?: number) =>
    category == undefined
      ? '/api/videos/trending'
      : `/api/videos/trending/${category}`,
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
  FetchSubscription: () => `/api/subscriptions/subscribed`,

  GetHistoryByUserId: () => `/api/history`,
  AddVideoToHistory: () => `/api/history/save`,
  GetLibrary: () => `/api/playlist`,
  GetLibraryVideos: (libraryId: string) => `/api/playlist/${libraryId}`,
};
