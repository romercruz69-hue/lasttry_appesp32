import { View, Text } from 'react-native';

export const ToggleWidget = ({ label, value }: { label: string; value: boolean }) => <View className="bg-zinc-900 rounded-2xl p-4"><Text className="text-cyan-300">{label}</Text><Text className="text-white">{value ? 'ON':'OFF'}</Text></View>;
export const GaugeWidget = ({ label, value }: { label: string; value: number }) => <View className="bg-zinc-900 rounded-2xl p-4"><Text className="text-cyan-300">{label}</Text><Text className="text-white text-2xl">{value}</Text></View>;
