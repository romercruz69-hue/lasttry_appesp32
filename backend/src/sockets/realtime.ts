import { Server } from 'socket.io';

let ioRef: Server | null = null;
export const setIo = (io: Server) => { ioRef = io; };
export const emitDeviceEvent = (deviceId: string, event: string, payload: unknown) => ioRef?.to(`device:${deviceId}`).emit(event, payload);
