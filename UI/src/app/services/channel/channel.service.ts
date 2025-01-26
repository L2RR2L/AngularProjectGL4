import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../api';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  constructor(private http: HttpClient) {}

  getChannelSubscriptionsCount(channelId: string): Observable<number> {
    return this.http
      .post<{ subscribers: number }>(API.GetSubscriptionsCount(), {
        channel: channelId,
      })
      .pipe(
        map((data) => {
          console.log(data);

          return data.subscribers;
        })
      );
  }
}
