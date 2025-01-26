import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../../api';
import { firstValueFrom, map, Observable } from 'rxjs';
import { Video } from '../../types/video';
import { Category } from '../../types/category.enum';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor(private http: HttpClient) {}
  getVideo(videoId: string): Promise<Video> {
    return firstValueFrom(
      this.http
        .patch<{ video: Video }>(API.GetVideo(videoId), {
          updateViews: true,
        })
        .pipe(
          map((data) => {
            return data.video;
          })
        )
    );
  }
  getSubscriptionVideos(): Observable<Video[]> {
    return this.http
      .get<{ videos: Video[] }>(API.GetSubscriptionVideos())
      .pipe(map(data => data.videos));
  }
  getRecommendedVideos(): Observable<Video[]> {
    return this.http
      .get<{ videos: Video[] }>(API.GetRecommendedVideos())
      .pipe(map((data) => data.videos));
  }

  getTrendingVideos(category?: Category): Observable<Video[]> {
    return this.http
      .get<{ videos: Video[] }>(API.GetTrendingVideos(category))
      .pipe(map((data) => data.videos));
  }

  postUploadVideo(state: any) {
    return this.http.post(API.PostUploadVideo(), {
      ...state.details,
      uploader: state.uploader,
      thumbnailFilename: state.thumbnailFileName,
      visibility: state.visibility,
      filename: state.filename,
    });
  }

  getChannelVideos(channelId: string): Observable<Video[]> {
    return this.http.get<{ videos: Video[] }>(API.GetChannelVideos(channelId)).pipe(
      map(data => data.videos)
    );
  }
}
