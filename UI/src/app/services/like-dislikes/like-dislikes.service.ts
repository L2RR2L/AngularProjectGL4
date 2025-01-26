import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, signal } from '@angular/core';
import { Rating } from '../../types/rating';
import { API } from '../../api';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LikeDislikesService {
  constructor(protected http: HttpClient) {}

  fetchRating(type: 'video' | 'comment', id: string, videoId: string) {
    return firstValueFrom(
      this.http.get<{ ratings: Rating }>(API.GetRating(type, id, videoId))
    );
  }
  fetchUserRating(type: 'video' | 'comment', id: string, videoId: string) {
    return firstValueFrom(
      this.http.get<{ rating: number }>(API.GetUserRating(type, id, videoId))
    );
  }

  createUserRating(
    type: 'video' | 'comment',
    id: string,
    videoId: string,
    rating: number
  ) {
    return firstValueFrom(
      this.http.post(API.UpdateUserRating(type, id, videoId), {
        rating,
      })
    );
  }

  updateUserRating(
    type: 'video' | 'comment',
    id: string,
    videoId: string,
    rating: number
  ) {
    return firstValueFrom(
      this.http.patch(API.UpdateUserRating(type, id, videoId), {
        rating,
      })
    );
  }

  deleteUsersRating(type: 'video' | 'comment', id: string, videoId: string) {
    return firstValueFrom(
      this.http.delete(API.UpdateUserRating(type, id, videoId))
    );
  }
}
