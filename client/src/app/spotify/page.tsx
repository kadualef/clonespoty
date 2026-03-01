'use client';

import { useState } from 'react';
import api from '@/lib/api';

export default function SpotifyPage() {
  const [result, setResult] = useState('');

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4">Integração Spotify OAuth</h1>
      <div className="flex gap-3">
        <button className="bg-green-500 text-black px-4 py-2 rounded" onClick={async () => {
          const { data } = await api.get('/spotify/auth-url');
          window.open(data.url, '_blank');
        }}>Conectar Spotify</button>
        <button className="border border-zinc-700 px-4 py-2 rounded" onClick={async () => {
          const { data } = await api.post('/spotify/import-playlists');
          setResult(`Importadas: ${data.importedCount}`);
        }}>Importar Playlists</button>
      </div>
      <p className="mt-4 text-zinc-300">{result}</p>
    </section>
  );
}
