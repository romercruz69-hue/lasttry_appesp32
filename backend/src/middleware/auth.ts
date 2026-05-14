import { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '../auth/jwt';

export interface AuthedRequest extends Request { user?: { userId: string; email: string }; }

export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Missing token' });
  try {
    req.user = verifyAccessToken(token);
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
