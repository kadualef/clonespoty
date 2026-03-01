'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function LibraryPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    api.get('/auth/me').then((res) => setData(res.data)).catch(() => null);
  }, []);

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4">Sua Biblioteca</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-zinc-900 rounded p-4">
          <h2 className="font-semibold mb-3">Favoritos</h2>
          <ul className="text-sm text-zinc-300 space-y-1">{data?.favorites?.map((f: any) => <li key={f.id}>{f.song.title} - {f.song.artist}</li>) || 'Sem favoritos.'}</ul>
        </div>
        <div className="bg-zinc-900 rounded p-4">
          <h2 className="font-semibold mb-3">Histórico</h2>
          <ul className="text-sm text-zinc-300 space-y-1">{data?.history?.map((h: any) => <li key={h.id}>{h.song.title}</li>) || 'Sem histórico.'}</ul>
        </div>
      </div>
    </section>
  );
}
