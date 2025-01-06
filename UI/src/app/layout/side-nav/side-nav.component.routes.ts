import { Routes } from '@angular/router';
import { SubscriptionComponent } from '../../pages/subscription/subscription.component';
import { HomePageComponent } from '../../pages/home-page/home-page.component';
import { TrendingPageComponent } from '../../pages/trending-page/trending-page.component';
import { LibraryPageComponent } from '../../pages/library-page/library-page.component';
import { HistoryPageComponent } from '../../pages/history-page/history-page.component';

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
        component: LibraryPageComponent,
    },
    {
        path: 'history',
        component: HistoryPageComponent,
    },
];
