import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { LayoutState } from './layout.state';

export const selectLayoutState = (state: AppState) => state.layout;

export const isDrawerOpen = createSelector(
  selectLayoutState,
  (state: LayoutState) => state.isDrawerOpen
);
