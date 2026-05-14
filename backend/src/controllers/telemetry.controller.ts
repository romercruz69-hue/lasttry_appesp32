import { Request, Response } from 'express';
import { supabase } from '../database/supabase';

export async function getTelemetry(req: Request, res: Response) {
  const { data } = await supabase.from('telemetry').select('*').eq('device_id', req.params.deviceId).order('created_at', { ascending: false }).limit(200);
  res.json(data);
}
export async function postTelemetry(req: Request, res: Response) {
  const { data, error } = await supabase.from('telemetry').insert(req.body).select('*').single();
  if (error) throw error;
  res.status(201).json(data);
}
