import { io } from 'socket.io-client';
import { config } from '../config';
import { useAuthStore } from '../stores/auth.store';

export const socket = io(config.socketUrl, {
  autoConnect: false,
  transports: ['websocket'],
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelayMax: 10000,
});

export function connectRealtime() {
  const token = useAuthStore.getState().accessToken;
  if (!token) return;
  socket.auth = { token };
  if (!socket.connected) socket.connect();
}

export function disconnectRealtime() {
  if (socket.connected) socket.disconnect();
}
