import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { AuthRequestPayload } from '../types';

export const signAccessToken = (payload: AuthRequestPayload) => jwt.sign(payload, env.jwtSecret, { expiresIn: '15m' });
export const signRefreshToken = (payload: AuthRequestPayload) => jwt.sign(payload, env.jwtRefreshSecret, { expiresIn: '30d' });
export const verifyAccessToken = (token: string) => jwt.verify(token, env.jwtSecret) as AuthRequestPayload;
export const verifyRefreshToken = (token: string) => jwt.verify(token, env.jwtRefreshSecret) as AuthRequestPayload;
