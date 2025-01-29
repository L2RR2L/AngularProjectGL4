import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API } from '../../api';
import { HttpClient } from '@angular/common/http';
import { Channel } from '../../types/channel';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  constructor(private http: HttpClient) {}

  getChannel(channelId: string): Observable<Channel> {
    return this.http.get<Channel>(API.GetChannel(channelId));
  }

  getSubscriberCount(channelId: string): Observable<number> {
    return this.http
      .post<{ subscribers: number }>(API.GetSubscribers(), {
        channel: channelId,
      })
      .pipe(map((data) => data.subscribers));
  }

  getSubscriptionState(channelId: string): Observable<boolean> {
    return this.http
      .post<{ isSubscribed: boolean }>(API.GetSubscriptionState(), {
        channel: channelId!,
      })
      .pipe(map((data) => data.isSubscribed));
  }

  subscribeToChannel(channelId: string): Observable<boolean> {
    return this.http
      .post<{ success: boolean }>(API.PostSubscription(), {
        channel: channelId,
      })
      .pipe(map((response) => response.success));
  }

  unsubscribeFromChannel(channelId: string): Observable<string> {
    return this.http
      .delete<{ message: string }>(API.DeleteSubscription(channelId))
      .pipe(map((response) => response.message));
  }
  getChannelSubscriptionsCount(channelId: string): Observable<number> {
    return this.http
      .post<{ subscribers: number }>(API.GetSubscriptionsCount(), {
        channel: channelId,
      })
      .pipe(
        map((data) => {
          return data.subscribers;
        })
      );
  }
}
