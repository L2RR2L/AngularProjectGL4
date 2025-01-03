import { Channel } from '../../types/channel';

export interface AuthState {
  channel: Channel | null;
  isAuthenticated: boolean;
}

export const initialAuthState: AuthState = {
  channel: null,
  isAuthenticated: false,
};
