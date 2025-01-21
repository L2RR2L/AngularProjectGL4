import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, EMPTY, map, Observable, switchMap, take, tap } from 'rxjs';
import { API } from '../../api';
import { Channel } from '../../types/channel';
import { HttpClient } from '@angular/common/http';
import { ChannelService } from '../../services/channel/channel.service';
import { AsyncPipe } from '@angular/common';
import { Video } from '../../types/video';
import { VideoService } from '../../services/video/video.service';
import { ListVideosSummaryComponent } from "../home-page/list-videos-summary/list-videos-summary.component";

@Component({
  selector: 'app-channel-page',
  standalone: true,
  imports: [AsyncPipe, ListVideosSummaryComponent],
  templateUrl: './channel-page.component.html',
  styleUrl: './channel-page.component.css'
})
export class ChannelPageComponent {
  channel$: Observable<Channel | null>;
  videos$: Observable<Video[]>;

  subscriberCount$: BehaviorSubject<number>;
  isCurrentUserSubscribed$: BehaviorSubject<boolean>;

  constructor(
    private route: ActivatedRoute,
    private channelService: ChannelService,
    private videoService: VideoService
  ) {
    this.channel$ = this.route.paramMap.pipe(
      switchMap(params => {
        const channelId: string | null = params.get("id");
        return this.channelService.getChannel(channelId!);
      })
    );

    this.subscriberCount$ = new BehaviorSubject<number>(0);
    this.refreshSubscriberCount();

    this.isCurrentUserSubscribed$ = new BehaviorSubject<boolean>(false);

    this.route.paramMap.pipe(
      switchMap(params => {
        const channelId: string | null = params.get("id");
        return this.channelService.getSubscriptionState(channelId!);
      })
    ).subscribe(state => {
      this.isCurrentUserSubscribed$.next(state);
    });

    this.videos$ = this.route.paramMap.pipe(
      switchMap(params => {
        const channelId: string | null = params.get("id");
        return this.videoService.getChannelVideos(channelId!);
      })
    );
  }

  onSubscriptionToggle() {
    this.isCurrentUserSubscribed$.pipe(
      take(1),
      tap(isSubscribed => {
        if (isSubscribed) {
          this.handleUnsubscription();
        }
        else {
          this.handleSubscription();
        }
      }),
    ).subscribe();
  }

  handleSubscription() {
    this.channel$.pipe(
      switchMap(channel => this.channelService.subscribeToChannel(channel!.id)),
      tap(success => {
        if (success) {
          this.isCurrentUserSubscribed$.next(true);
        }
        this.refreshSubscriberCount();
      })
    ).subscribe();
  }

  handleUnsubscription() {
    this.channel$.pipe(
      switchMap(channel => this.channelService.unsubscribeFromChannel(channel!.id)),
      tap(message => {
        if (message === 'success') {
          this.isCurrentUserSubscribed$.next(false);
        }
        this.refreshSubscriberCount();
      })
    ).subscribe();
  }

  private refreshSubscriberCount() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const channelId: string | null = params.get("id");
        return this.channelService.getSubscriberCount(channelId!);
      })
    ).subscribe(count => {
      this.subscriberCount$.next(count);
    });
  }
}
