import { View, Text, FlatList } from 'react-native';
import { useDevices } from '../../src/hooks/useDevices';

export default function DevicesScreen(){
  const { data } = useDevices();
  return <View className="flex-1 bg-black p-4"><Text className="text-white text-2xl mb-4">My Devices</Text>
  <FlatList data={data ?? []} keyExtractor={(i:any)=>i.id} renderItem={({item}:any)=><View className="bg-zinc-900/80 p-4 rounded-2xl mb-3"><Text className="text-cyan-300">{item.name}</Text><Text className="text-zinc-400">ID: {item.id}</Text></View>} /></View>;
}
