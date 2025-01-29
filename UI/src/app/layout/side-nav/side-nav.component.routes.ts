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
    loadComponent: () =>
      import('../../pages/subscription/subscription.component').then(
        (m) => m.SubscriptionComponent
      ),
  },
  {
    path: 'trending',
    loadComponent: () =>
      import('../../pages/trending-page/trending-page.component').then(
        (m) => m.TrendingPageComponent
      ),
  },
  {
    path: 'library',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../../pages/library-page/library-page.component').then(
            (m) => m.LibraryPageComponent
          ),
      },
      {
        path: ':libraryId',
        loadComponent: () =>
          import('../../pages/library-videos/library-videos.component').then(
            (m) => m.LibraryVideosComponent
          ),
      },
    ],
  },
  {
    path: 'history',
    loadComponent: () =>
      import('../../pages/history-page/history-page.component').then(
        (m) => m.HistoryPageComponent
      ),
  },
];
