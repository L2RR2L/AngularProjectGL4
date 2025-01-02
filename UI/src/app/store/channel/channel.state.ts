export interface ChannelState {
    id: number | null;
    isAuthenticated: boolean;
    name: string | null;
    email: string | null;
    image: string | null;
}
export const initalChannelState: ChannelState = {
    id: null,
    isAuthenticated: false,
    name: null,
    email: null,
    image: null,
};
