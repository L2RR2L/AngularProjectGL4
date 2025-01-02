import { createAction, props } from '@ngrx/store';
import { ChannelState } from './channel.state';

export const setChannelInfo = createAction(
    '[Channel] Set Channel Info',
    props<{ channelInfo: ChannelState }>()
);

export const setAuth = createAction(
    '[Channel] Set Auth',
    props<{ isAuthenticated: boolean }>()
);
