import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout } from './auth.actions';
import { initialAuthState } from './auth.state';

export const authReducer = createReducer(
  initialAuthState,
  on(loginSuccess, (state, { channel }) => ({
    ...state,
    channel,
    isAuthenticated: true,
  })),
  on(logout, (state) => ({
    ...state,
    channel: null,
    isAuthenticated: false,
  }))
);
