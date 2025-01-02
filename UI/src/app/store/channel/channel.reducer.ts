import { createReducer, on } from '@ngrx/store';
import { setAuth, setChannelInfo } from './channel.actions';
import { initalChannelState } from './channel.state';

export const channelReducer = createReducer(
    initalChannelState,
    on(setChannelInfo, (state, { channelInfo }) => ({
        ...state,
        ...channelInfo,
    })),

    on(setAuth, (state, { isAuthenticated }) => ({
        ...state,
        isAuthenticated, // Update only the isAuthenticated value
    }))
);
