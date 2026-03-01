'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function AdminPage() {
  const [metrics, setMetrics] = useState<any>({});

  useEffect(() => {
    api.get('/admin/dashboard').then((res) => setMetrics(res.data)).catch(() => null);
  }, []);

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-5">Painel Admin</h1>
      <div className="grid md:grid-cols-3 gap-3">
        {['users', 'songs', 'playlists'].map((k) => (
          <div className="bg-zinc-900 p-4 rounded" key={k}>
            <p className="text-zinc-400 capitalize">{k}</p>
            <p className="text-3xl font-bold">{metrics[k] ?? '-'}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
