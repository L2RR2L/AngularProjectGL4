import { Routes } from '@angular/router';
import { WatchComponent } from './watch/watch.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'watch',
    component: WatchComponent,
  },
];
