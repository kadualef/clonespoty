'use client';
import { Heart, Play } from 'lucide-react';
import type { Song } from '@/types';
import usePlayerStore from '@/store/usePlayerStore';
import api from '@/lib/api';

export default function SongList({ songs }: { songs: Song[] }) {
  const { setPlaylist } = usePlayerStore();

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {songs.map((song, idx) => (
        <article key={song.id} className="bg-zinc-900 hover:bg-zinc-800 rounded p-3 transition">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={song.coverUrl || 'https://placehold.co/400x400'} alt={song.title} className="rounded mb-3 aspect-square object-cover" />
          <h3 className="font-semibold truncate">{song.title}</h3>
          <p className="text-zinc-400 text-sm truncate">{song.artist}</p>
          <div className="flex gap-2 mt-3">
            <button onClick={() => setPlaylist(songs, idx)} className="bg-green-500 text-black px-3 py-1 rounded-full text-sm inline-flex items-center gap-1"><Play size={14} />Tocar</button>
            <button onClick={() => api.post(`/songs/${song.id}/favorite`).catch(() => null)} className="border border-zinc-700 px-2 rounded"><Heart size={14} /></button>
          </div>
        </article>
      ))}
    </div>
  );
}
