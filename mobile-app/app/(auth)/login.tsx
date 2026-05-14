import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';
import { useAuthStore } from '../../src/stores/auth.store';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((s) => s.login);

  const onLogin = async () => {
    try {
      setLoading(true);
      await login(email.trim(), password);
      router.replace('/(main)/home');
    } catch {
      Alert.alert('Login failed', 'Please verify your credentials and backend URL.');
    } finally {
      setLoading(false);
    }
  };

  return <View className="flex-1 bg-surface p-6 justify-center"><Text className="text-4xl text-cyan-300 mb-2 font-semibold">IoT Nexus</Text><Text className="text-zinc-400 mb-8">Control your devices in real time</Text>
    <TextInput autoCapitalize="none" autoCorrect={false} value={email} onChangeText={setEmail} placeholder="Email" placeholderTextColor="#71717a" className="bg-zinc-900 text-white p-4 rounded-2xl mb-3 border border-zinc-800" />
    <TextInput value={password} onChangeText={setPassword} secureTextEntry placeholder="Password" placeholderTextColor="#71717a" className="bg-zinc-900 text-white p-4 rounded-2xl mb-6 border border-zinc-800" />
    <Pressable disabled={loading} onPress={onLogin} className="bg-cyan-500 p-4 rounded-2xl"><Text className="text-center font-bold text-zinc-950">{loading ? 'Signing in...' : 'Login'}</Text></Pressable></View>;
}
