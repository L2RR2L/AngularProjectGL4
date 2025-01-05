import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { map, Observable, of, switchMap, take, tap } from 'rxjs';
import { AppState } from '../../store/app.state';
import { selectIsAuthenticated } from '../../store/auth/auth.selectors';
import { SubscriptionService } from '../../services/side-nav-options/subscription/subscription.service';
import { SideNavOption } from '../../types/side-nav-option';
import { AsyncPipe } from '@angular/common';
import { SignInButtonComponent } from "../../layout/top-nav/end-nav/sign-in-button/sign-in-button.component";
import { Video } from '../../types/video';

interface AuthenticatedState {
  type: 'authenticated';
  videos: Video[];
}

interface NotAuthenticatedState {
  type: 'notAuthenticated';
  subscriptionOption: SideNavOption;
}

type SubscriptionState = AuthenticatedState | NotAuthenticatedState;

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [AsyncPipe, SignInButtonComponent],
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
            map(videos => ({ type: 'authenticated' as const, videos }))
          );
        } else {
          return of({ type: 'notAuthenticated' as const, subscriptionOption: this.subscriptionService.getSideNavOption() });
        }
      })
    );
  }
}
