import { createReducer, on } from '@ngrx/store';
import { toggleDrawer, setDrawer } from './layout.actions';
import { initialState, LayoutState } from './layout.state';

export const layoutReducer = createReducer(
  initialState,
  on(toggleDrawer, (state) => ({
    ...state,
    isDrawerOpen: !state.isDrawerOpen,
  })),
  on(setDrawer, (state, { isDrawerOpen }) => ({ ...state, isDrawerOpen }))
);
