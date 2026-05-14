import { io } from 'socket.io-client';
import { useAuthStore } from '../stores/auth.store';

export const socket = io(process.env.EXPO_PUBLIC_SOCKET_URL ?? 'http://localhost:4000', {
  autoConnect: false,
  transports: ['websocket']
});

export function connectRealtime() {
  const token = useAuthStore.getState().accessToken;
  socket.auth = { token };
  socket.connect();
}
