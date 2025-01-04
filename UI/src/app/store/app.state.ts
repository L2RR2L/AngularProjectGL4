import { ActionReducerMap } from '@ngrx/store';
import { LayoutState } from './layout/layout.state';
import { layoutReducer } from './layout/layout.reducer';
import { AuthState } from './auth/auth.state';
import { authReducer } from './auth/auth.reducer';
import { UploadState } from './upload/upload.state';
import { uploadReducer } from './upload/upload.reducer';

export interface AppState {
  layout: LayoutState;
  auth: AuthState;
  upload: UploadState
}

export const reducers: ActionReducerMap<AppState> = {
  layout: layoutReducer,
  auth: authReducer,
  upload: uploadReducer,
};
