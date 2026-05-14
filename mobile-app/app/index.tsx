import { Redirect } from 'expo-router';
import { useAuthStore } from '../src/stores/auth.store';

export default function Index() {
  const token = useAuthStore((s) => s.accessToken);
  return <Redirect href={token ? '/(main)/home' : '/(auth)/login'} />;
}
