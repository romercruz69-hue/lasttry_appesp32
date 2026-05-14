import { FlashList } from '@shopify/flash-list';
import { Text, View } from 'react-native';
import { useDevices } from '../../src/hooks/useDevices';

export default function Home() {
  const { data, isLoading } = useDevices();

  return (
    <View className="flex-1 bg-surface px-4 pt-6">
      <Text className="text-white text-3xl mb-1 font-semibold">Devices</Text>
      <Text className="text-zinc-400 mb-4">Live status & automation</Text>
      <FlashList
        data={data ?? []}
        estimatedItemSize={88}
        keyExtractor={(i: { id: string }) => i.id}
        ListEmptyComponent={<Text className="text-zinc-400 mt-12 text-center">{isLoading ? 'Loading devices...' : 'No devices found'}</Text>}
        renderItem={({ item }: { item: { name: string; online: boolean } }) => (
          <View className="bg-zinc-900/85 p-4 rounded-3xl mb-3 border border-cyan-400/20">
            <Text className="text-cyan-300 text-lg font-medium">{item.name}</Text>
            <Text className="text-zinc-400 mt-1">{item.online ? 'Online' : 'Offline'}</Text>
          </View>
        )}
      />
    </View>
  );
}
