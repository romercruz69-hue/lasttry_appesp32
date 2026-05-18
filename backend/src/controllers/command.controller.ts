import { Response } from 'express';
import { AuthedRequest } from '../middleware/auth';
import { publishCommand } from '../mqtt/broker';

export async function sendDeviceCommand(req: AuthedRequest, res: Response) {
  publishCommand(req.params.id, { ...req.body, requestedBy: req.user?.userId, at: new Date().toISOString() });
  res.json({ status: 'queued', deviceId: req.params.id });
}
