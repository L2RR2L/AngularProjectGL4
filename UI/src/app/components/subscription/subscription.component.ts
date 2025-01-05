import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { catchError, map, Observable, of, startWith, switchMap, take, tap } from 'rxjs';
import { AppState } from '../../store/app.state';
import { selectIsAuthenticated } from '../../store/auth/auth.selectors';
import { SubscriptionService, SubscriptionState } from '../../services/side-nav-options/subscription/subscription.service';
import { AsyncPipe } from '@angular/common';
import { SignInButtonComponent } from "../../layout/top-nav/end-nav/sign-in-button/sign-in-button.component";
import { Video } from '../../types/video';
import { ListVideosSummaryComponent } from "../../pages/home-page/list-videos-summary/list-videos-summary.component";
@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [AsyncPipe, SignInButtonComponent, ListVideosSummaryComponent],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css'
})
export class SubscriptionComponent {
  state$: Observable<SubscriptionState>;

  constructor(private store: Store<AppState>, private subscriptionService: SubscriptionService) {
    this.state$ = this.store.select(selectIsAuthenticated).pipe(
      switchMap(isAuthenticated => {
        if (isAuthenticated) {
          return this.subscriptionService.getSubscriptionVideos().pipe(
            map(videos => Array.isArray(videos) ? videos : videos.videos || Object.values(videos) as Video[]),
            map(videos => ({
              type: 'authenticated' as const,
              videosByChannelName: this.subscriptionService.groupVideosByChannelName(videos)
            })),
            startWith({
              type: 'authenticated' as const,
              videosByChannelName: {}
            }),
            catchError(error => {
              console.error('Error fetching subscription videos:', error);
              return of({
                type: 'authenticated' as const,
                videosByChannelName: {}
              });
            })
          );
        } else {
          return of({
            type: 'notAuthenticated' as const,
            subscriptionOption: this.subscriptionService.getSideNavOption()
          });
        }
      })
    );
  }

  getChannelNames(videosByChannelName: { [key: string]: Video[] }): string[] {
    return Object.keys(videosByChannelName);
  }
}
