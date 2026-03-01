'use client';

import { useState } from 'react';
import api from '@/lib/api';
import SongList from '@/components/SongList';
import type { Song } from '@/types';

export default function SearchPage() {
  const [q, setQ] = useState('');
  const [songs, setSongs] = useState<Song[]>([]);

  const search = async () => {
    const res = await api.get('/songs', { params: { q } });
    setSongs(res.data);
  };

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4">Busca</h1>
      <div className="flex gap-2 mb-4">
        <input className="bg-zinc-900 border border-zinc-700 rounded px-3 py-2 w-full" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Música ou artista" />
        <button className="bg-green-500 text-black px-4 rounded" onClick={search}>Buscar</button>
      </div>
      <SongList songs={songs} />
    </section>
  );
}
