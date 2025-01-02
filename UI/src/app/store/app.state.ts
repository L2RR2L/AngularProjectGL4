import { ActionReducerMap } from '@ngrx/store';
import { LayoutState, initialState } from './layout/layout.state';
import { layoutReducer } from './layout/layout.reducer';

export interface AppState {
  layout: LayoutState;
}

export const reducers: ActionReducerMap<AppState> = {
  layout: layoutReducer,
};
