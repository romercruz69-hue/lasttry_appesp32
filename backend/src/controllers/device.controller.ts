import { Response } from 'express';
import { AuthedRequest } from '../middleware/auth';
import { addDevice, listDevices } from '../services/device.service';

export async function getDevices(req: AuthedRequest, res: Response) { res.json(await listDevices(req.user!.userId)); }
export async function createDevice(req: AuthedRequest, res: Response) { res.status(201).json(await addDevice(req.user!.userId, req.body.name, req.body.roomId)); }
export async function updateDevice(req: AuthedRequest, res: Response) { res.json(await (await import('../database/supabase')).supabase.from('devices').update(req.body).eq('id', req.params.id).eq('owner_id', req.user!.userId).select('*').single()); }
export async function deleteDevice(req: AuthedRequest, res: Response) { await (await import('../database/supabase')).supabase.from('devices').delete().eq('id', req.params.id).eq('owner_id', req.user!.userId); res.status(204).send(); }
