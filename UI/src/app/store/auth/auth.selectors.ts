import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectCurrentChannel = createSelector(
  selectAuthState,
  (state) => state.channel
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state) => state.isAuthenticated
);

export const selectIsLoaded = createSelector(
  selectAuthState,
  (state) => state.isLoaded
);

export const selectIsAuthenticatedAndLoaded = createSelector(
  selectIsAuthenticated,
  selectIsLoaded,
  (isAuthenticated, isLoaded) => isAuthenticated && isLoaded
);
