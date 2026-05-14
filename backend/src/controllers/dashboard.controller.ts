import { Response } from 'express';
import { AuthedRequest } from '../middleware/auth';
import { supabase } from '../database/supabase';

export async function listDashboards(req: AuthedRequest, res: Response) { res.json((await supabase.from('dashboards').select('*,widgets(*)').eq('owner_id', req.user!.userId)).data); }
export async function createDashboard(req: AuthedRequest, res: Response) { res.status(201).json((await supabase.from('dashboards').insert({ ...req.body, owner_id: req.user!.userId }).select('*').single()).data); }
export async function updateDashboard(req: AuthedRequest, res: Response) { res.json((await supabase.from('dashboards').update(req.body).eq('id', req.params.id).eq('owner_id', req.user!.userId).select('*').single()).data); }
export async function deleteDashboard(req: AuthedRequest, res: Response) { await supabase.from('dashboards').delete().eq('id', req.params.id).eq('owner_id', req.user!.userId); res.status(204).send(); }
