import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { isDevMode } from '@angular/core';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { reducers } from './store/app.state';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { AuthEffects } from './store/auth/auth.effects';
import { provideEffects } from '@ngrx/effects';
import { apiInterceptor } from './interceptors/api-interceptor/api.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideStore(reducers),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideHttpClient(withFetch(), withInterceptors([apiInterceptor])),
    provideEffects([AuthEffects]),
  ],
};
