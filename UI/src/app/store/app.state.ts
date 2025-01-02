import { ActionReducerMap } from '@ngrx/store';
import { LayoutState } from './layout/layout.state';
import { layoutReducer } from './layout/layout.reducer';
import { ChannelState } from './channel/channel.state';
import { channelReducer } from './channel/channel.reducer';
import { UploadState } from './upload/upload.state';
import { uploadReducer } from './upload/upload.reducer';

export interface AppState {
  layout: LayoutState;
  channel: ChannelState;
  upload: UploadState
}

export const reducers: ActionReducerMap<AppState> = {
  layout: layoutReducer,
  channel: channelReducer,
  upload: uploadReducer,
};
