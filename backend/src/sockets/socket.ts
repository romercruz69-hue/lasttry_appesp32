import { Server } from 'socket.io';
import { verifyAccessToken } from '../auth/jwt';

export function registerSocket(io: Server) {
  io.use((socket, next) => {
    try { verifyAccessToken(String(socket.handshake.auth?.token)); next(); } catch { next(new Error('Unauthorized')); }
  });
  io.on('connection', (socket) => {
    socket.on('joinDevice', (deviceId: string) => socket.join(`device:${deviceId}`));
  });
}
