import { create } from 'zustand';
import { api } from '../services/api';

type AuthStore = { accessToken: string | null; refreshToken: string | null; login: (email: string, password: string) => Promise<void>; logout: () => void };
export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: null, refreshToken: null,
  login: async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    api.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
    set({ accessToken: data.accessToken, refreshToken: data.refreshToken });
  },
  logout: () => set({ accessToken: null, refreshToken: null })
}));
