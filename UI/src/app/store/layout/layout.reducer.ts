import { createReducer, on } from '@ngrx/store';
import { toggleDrawer, setDrawer } from './layout.actions';
import { intialLayoutState } from './layout.state';

export const layoutReducer = createReducer(
  intialLayoutState,
  on(toggleDrawer, (state) => ({
    ...state,
    isDrawerOpen: !state.isDrawerOpen,
  })),
  on(setDrawer, (state, { isDrawerOpen }) => ({ ...state, isDrawerOpen }))
);
