import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server } from 'socket.io';
import routes from './routes';
import { env } from './config/env';
import { errorHandler } from './middleware/error-handler';
import { registerSocket } from './sockets/socket';
import { setIo } from './sockets/realtime';
import './mqtt/broker';

const app = express();
app.use(helmet());
app.use(cors({ origin: env.clientUrl }));
app.use(express.json({ limit: '1mb' }));
app.use(rateLimit({ windowMs: 60_000, limit: 120 }));
app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/api', routes);
app.use(errorHandler);

const server = createServer(app);
const io = new Server(server, { cors: { origin: env.clientUrl } });
registerSocket(io);
setIo(io);

server.listen(env.port, () => console.log(`API on ${env.port}`));
