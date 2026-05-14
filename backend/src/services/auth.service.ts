import bcrypt from 'bcryptjs';
import { supabase } from '../database/supabase';
import { signAccessToken, signRefreshToken } from '../auth/jwt';

export async function register(email: string, password: string) {
  const hash = await bcrypt.hash(password, 12);
  const { data, error } = await supabase.from('users').insert({ email, password_hash: hash }).select('*').single();
  if (error) throw error;
  const payload = { userId: data.id, email: data.email };
  return { user: data, accessToken: signAccessToken(payload), refreshToken: signRefreshToken(payload) };
}

export async function login(email: string, password: string) {
  const { data, error } = await supabase.from('users').select('*').eq('email', email).single();
  if (error || !data) throw new Error('Invalid credentials');
  const ok = await bcrypt.compare(password, data.password_hash);
  if (!ok) throw new Error('Invalid credentials');
  const payload = { userId: data.id, email: data.email };
  return { user: data, accessToken: signAccessToken(payload), refreshToken: signRefreshToken(payload) };
}
