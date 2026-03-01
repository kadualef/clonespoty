'use client';

import { useState, type FormEvent } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    router.push('/');
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto mt-20 bg-zinc-900 p-6 rounded">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <input className="w-full mb-2 bg-black border border-zinc-700 rounded p-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="w-full mb-4 bg-black border border-zinc-700 rounded p-2" placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="w-full bg-green-500 text-black rounded p-2 font-semibold">Entrar</button>
    </form>
  );
}
