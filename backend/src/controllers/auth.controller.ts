import { Request, Response } from 'express';
import { z } from 'zod';
import { login, register } from '../services/auth.service';
import { signAccessToken, verifyRefreshToken } from '../auth/jwt';

const schema = z.object({ email: z.string().email(), password: z.string().min(8) });

export const registerController = async (req: Request, res: Response) => {
  const parsed = schema.parse(req.body);
  const result = await register(parsed.email, parsed.password);
  res.status(201).json(result);
};
export const loginController = async (req: Request, res: Response) => res.json(await login(...Object.values(schema.parse(req.body)) as [string,string]));
export const refreshController = async (req: Request, res: Response) => {
  const payload = verifyRefreshToken(req.body.refreshToken);
  res.json({ accessToken: signAccessToken(payload) });
};
export const logoutController = async (_req: Request, res: Response) => res.status(204).send();
