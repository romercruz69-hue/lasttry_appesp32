import mqtt from 'mqtt';
import crypto from 'crypto';
import { env } from '../config/env';
import { supabase } from '../database/supabase';
import { logger } from '../utils/logger';

export const mqttClient = mqtt.connect(env.mqttBrokerUrl, { username: env.mqttUsername, password: env.mqttPassword, reconnectPeriod: 3000 });

mqttClient.on('connect', () => {
  mqttClient.subscribe('devices/+/telemetry');
  mqttClient.subscribe('devices/+/status');
});

mqttClient.on('message', async (topic, payload) => {
  const [, deviceId, channel] = topic.split('/');
  const body = JSON.parse(payload.toString());
  if (channel === 'telemetry') {
    await supabase.from('telemetry').insert({ device_id: deviceId, payload: body });
  }
  if (channel === 'status') {
    await supabase.from('devices').update({ online: !!body.online, last_seen: new Date().toISOString() }).eq('device_id', deviceId);
  }
});

export async function verifyDevice(deviceId: string, token: string) {
  const { data } = await supabase.from('devices').select('id,device_credentials(token_hash)').eq('device_id', deviceId).single();
  const hash = crypto.createHash('sha256').update(token).digest('hex');
  return data?.device_credentials?.[0]?.token_hash === hash;
}

export function publishCommand(deviceId: string, command: object) {
  mqttClient.publish(`devices/${deviceId}/commands`, JSON.stringify(command), { qos: 1 });
  logger.info({ deviceId, command }, 'Command published');
}
