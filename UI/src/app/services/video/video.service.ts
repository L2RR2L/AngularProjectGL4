import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../../api';
import { map, Observable } from 'rxjs';
import { Video } from '../../types/video';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor(private http: HttpClient) {}
  getVideo(videoId: string) {
    return this.http.patch(API.GetVideo(videoId), {
      updateViews: true,
    });
  }
  getSubscriptionVideos(): Observable<Video[]> {
    return this.http
      .get<any>(API.GetSubscriptionVideos())
      .pipe(
        map((data) =>
          Array.isArray(data)
            ? data
            : data.videos || (Object.values(data) as Video[])
        )
      );
  }
  getRecommendedVideos(): Observable<Video[]> {
    return this.http
      .get<{ videos: Video[] }>(API.GetRecommendedVideos())
      .pipe(map((data) => data.videos));
  }

  getTrendingVideos(): Observable<Video[]> {
    return this.http
      .get<{ videos: Video[] }>(API.GetTrendingVideos())
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
}
