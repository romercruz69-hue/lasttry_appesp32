import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { useAuthStore } from '../src/stores/auth.store';

export default function Index() {
  const token = useAuthStore((s) => s.accessToken);
  const isHydrated = useAuthStore((s) => s.isHydrated);

  if (!isHydrated) {
    return (
      <View className="flex-1 items-center justify-center bg-surface">
        <ActivityIndicator color="#22d3ee" />
      </View>
    );
  }

  return <Redirect href={token ? '/(main)/home' : '/(auth)/login'} />;
}
