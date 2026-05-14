import { View, Text, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { api } from '../../src/services/api';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  return <View className="flex-1 bg-zinc-950 p-6 justify-center">
    <Text className="text-3xl text-cyan-300 mb-6">Create account</Text>
    <TextInput value={name} onChangeText={setName} placeholder="Name" className="bg-zinc-900 text-white p-4 rounded-xl mb-3" />
    <TextInput value={email} onChangeText={setEmail} placeholder="Email" className="bg-zinc-900 text-white p-4 rounded-xl mb-3" />
    <TextInput value={password} onChangeText={setPassword} secureTextEntry placeholder="Password" className="bg-zinc-900 text-white p-4 rounded-xl mb-3" />
    <Pressable onPress={async ()=>{await api.post('/auth/register',{email,password,name}); router.replace('/(auth)/login');}} className="bg-cyan-500 p-4 rounded-xl"><Text className="text-center font-bold">Register</Text></Pressable>
  </View>;
}
