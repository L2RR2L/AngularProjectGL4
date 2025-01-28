import { Routes } from '@angular/router';
import { SubscriptionComponent } from '../../pages/subscription/subscription.component';
import { HomePageComponent } from '../../pages/home-page/home-page.component';
import { TrendingPageComponent } from '../../pages/trending-page/trending-page.component';
import { LibraryPageComponent } from '../../pages/library-page/library-page.component';
import { HistoryPageComponent } from '../../pages/history-page/history-page.component';
import { LibraryVideosComponent } from '../../pages/library-videos/library-videos.component';

export const sideNavRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'subscriptions',
    component: SubscriptionComponent,
  },
  {
    path: 'trending',
    component: TrendingPageComponent,
  },
  {
    path: 'library',
    children: [
      {
        path: '',
        component: LibraryPageComponent,
      },
      {
        path: ':libraryId',
        component: LibraryVideosComponent,
      },
    ],
  },
  {
    path: 'history',
    component: HistoryPageComponent,
  },
];
