import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../../api';
import { map, Observable } from 'rxjs';
import { Video } from '../../../types/video';

@Injectable({
  providedIn: 'root',
})
export class LibraryVideoService {
  constructor(private http: HttpClient) {}

  getLibraryVideos(libraryId: string): Observable<Video[]> {
    return this.http
      .get<Video[]>(API.GetLibraryVideos(libraryId))
      .pipe(map((data) => data.map((video) => video)));
  }
}
