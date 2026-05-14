import Constants from 'expo-constants';

const extra = (Constants.expoConfig?.extra ?? {}) as Record<string, string | undefined>;

export const config = {
  apiUrl: process.env.EXPO_PUBLIC_API_URL ?? extra.apiUrl ?? 'http://10.0.2.2:4000/api',
  socketUrl: process.env.EXPO_PUBLIC_SOCKET_URL ?? extra.socketUrl ?? 'http://10.0.2.2:4000',
};
