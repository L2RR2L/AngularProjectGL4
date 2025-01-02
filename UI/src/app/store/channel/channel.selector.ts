import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { ChannelState } from './channel.state';

export const selectChannelState = (state: AppState) => state.channel;

export const isAuthenticated = createSelector(
    selectChannelState,
    (state: ChannelState) => state.isAuthenticated
);
