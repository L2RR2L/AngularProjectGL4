import { createAction, props } from '@ngrx/store';
import { Channel } from '../../types/channel';

export const loadAuthState = createAction('[Auth] Load State');

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{
    channel: Channel;
  }>()
);

export const logout = createAction('[Auth] Logout');
