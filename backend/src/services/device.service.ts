import { nanoid } from 'nanoid';
import crypto from 'crypto';
import { supabase } from '../database/supabase';

export async function listDevices(ownerId: string) { return (await supabase.from('devices').select('*').eq('owner_id', ownerId)).data; }
export async function addDevice(ownerId: string, name: string, roomId?: string) {
  const deviceId = `esp32_${nanoid(12)}`;
  const token = crypto.randomBytes(32).toString('hex');
  const { data, error } = await supabase.from('devices').insert({ owner_id: ownerId, device_id: deviceId, name, room_id: roomId }).select('*').single();
  if (error) throw error;
  await supabase.from('device_credentials').insert({ device_id: data.id, token_hash: crypto.createHash('sha256').update(token).digest('hex') });
  return { ...data, plainToken: token };
}
