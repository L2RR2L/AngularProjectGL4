import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../api';
import { firstValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionsService {
  constructor(protected http: HttpClient) {}

  getSubscriptions(channelId: string) {
    return firstValueFrom(
      this.http
        .post<{
          isSubscribed: boolean;
        }>(API.FetchSubscription(), { channel: channelId })
        .pipe(map((res) => res.isSubscribed))
    );
  }
  deleteSubscription(channelId: string) {
    return firstValueFrom(this.http.delete(API.DeleteSubscription(channelId)));
  }
  addSubscriptions(userId: string, channelId: string) {
    return firstValueFrom(
      this.http.post(API.PostSubscription(), {
        channel: channelId,

        subscriber: userId,
      })
    );
  }
}
