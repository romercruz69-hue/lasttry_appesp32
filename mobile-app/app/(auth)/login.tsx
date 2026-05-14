import { View, Text, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { useAuthStore } from '../../src/stores/auth.store';

export default function Login() {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
  const login = useAuthStore((s) => s.login);
  return <View className="flex-1 bg-zinc-950 p-6 justify-center"><Text className="text-3xl text-cyan-300 mb-6">IoT Nexus</Text>
    <TextInput value={email} onChangeText={setEmail} placeholder="Email" className="bg-zinc-900 text-white p-4 rounded-xl mb-3" />
    <TextInput value={password} onChangeText={setPassword} secureTextEntry placeholder="Password" className="bg-zinc-900 text-white p-4 rounded-xl mb-3" />
    <Pressable onPress={async ()=>{await login(email,password);router.replace('/(main)/home');}} className="bg-cyan-500 p-4 rounded-xl"><Text className="text-center font-bold">Login</Text></Pressable></View>;
}
