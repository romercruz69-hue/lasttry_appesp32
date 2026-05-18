import { View, Text } from 'react-native';
import { useAuthStore } from '../../src/stores/auth.store';
export default function Profile(){
  const user = useAuthStore((s)=>s.user);
  return <View className="flex-1 bg-black p-6"><Text className="text-2xl text-cyan-300">Profile</Text><Text className="text-zinc-300 mt-3">{user?.email ?? 'No user loaded'}</Text></View>;
}
