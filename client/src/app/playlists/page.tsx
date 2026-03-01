'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function PlaylistPage() {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [name, setName] = useState('');

  const load = () => api.get('/playlists').then((res) => setPlaylists(res.data)).catch(() => null);

  useEffect(() => { load(); }, []);

  const create = async () => {
    await api.post('/playlists', { name, isPublic: false });
    setName('');
    load();
  };

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4">Playlists</h1>
      <div className="flex gap-2 mb-6">
        <input className="bg-zinc-900 border border-zinc-700 rounded px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nova playlist" />
        <button className="bg-green-500 text-black px-4 rounded" onClick={create}>Criar</button>
      </div>
      <div className="space-y-3">
        {playlists.map((p) => (
          <div key={p.id} className="bg-zinc-900 rounded p-3 flex items-center justify-between">
            <div>
              <p className="font-semibold">{p.name}</p>
              <p className="text-xs text-zinc-400">{p.isPublic ? 'Pública' : 'Privada'} • {p.songs?.length || 0} músicas</p>
            </div>
            <button className="text-red-400" onClick={async () => { await api.delete(`/playlists/${p.id}`); load(); }}>Excluir</button>
          </div>
        ))}
      </div>
    </section>
  );
}
