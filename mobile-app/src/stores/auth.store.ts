import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { api } from '../services/api';
import { connectRealtime, disconnectRealtime } from '../services/realtime';

type AuthStore = {
  accessToken: string | null;
  refreshToken: string | null;
  isHydrated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setHydrated: (value: boolean) => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      isHydrated: false,
      setHydrated: (value) => set({ isHydrated: value }),
      login: async (email, password) => {
        const { data } = await api.post('/auth/login', { email, password });
        set({ accessToken: data.accessToken, refreshToken: data.refreshToken });
        connectRealtime();
      },
      logout: () => {
        disconnectRealtime();
        set({ accessToken: null, refreshToken: null });
      },
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
        if (state?.accessToken) connectRealtime();
      },
    },
  ),
);
