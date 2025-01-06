import { Routes } from '@angular/router';
import { WatchComponent } from './watch/watch.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { sideNavRoutes } from './layout/side-nav/side-nav.component.routes';

export const routes: Routes = [
  ...sideNavRoutes,
  {
    path: 'watch',
    component: WatchComponent,
  },
];
