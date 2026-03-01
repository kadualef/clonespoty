'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import SongList from '@/components/SongList';
import type { Song } from '@/types';

export default function HomePage() {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    api.get('/songs').then((res) => setSongs(res.data)).catch(() => null);
  }, []);

  return (
    <section className="p-6 fade-in">
      <h2 className="text-3xl font-bold mb-2">Recomendações para você</h2>
      <p className="text-zinc-400 mb-6">Plano Free/Premium, favoritos e histórico suportados.</p>
      <SongList songs={songs} />
    </section>
  );
}
