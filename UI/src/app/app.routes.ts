import { Routes } from '@angular/router';
import { WatchComponent } from './watch/watch.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ChannelPageComponent } from './pages/channel-page/channel-page.component';
import { sideNavRoutes } from './layout/side-nav/side-nav.component.routes';
import { SearchResultPageComponent } from './pages/search-result-page/search-result-page.component';

export const routes: Routes = [
  ...sideNavRoutes,
  {
    path: 'watch',
    component: WatchComponent,
  },
  {
    path: 'channel/:id',
    component: ChannelPageComponent,
  },
  {
    path: 'videos/search/:search_query',
    component: SearchResultPageComponent,
  },
];
