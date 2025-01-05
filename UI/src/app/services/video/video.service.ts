import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../../api';

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
}
