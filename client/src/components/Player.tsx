'use client';

import { useEffect, useRef } from 'react';
import { Pause, Play, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import usePlayerStore from '@/store/usePlayerStore';
import api from '@/lib/api';

export default function Player() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { currentSong, isPlaying, togglePlay, next, prev, volume, setVolume, progress, setProgress } = usePlayerStore();

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.play().catch(() => null);
    else audioRef.current.pause();
  }, [isPlaying, currentSong]);

  return (
    <div className="h-24 bg-zinc-950 border-t border-zinc-800 flex items-center px-4 gap-4">
      <audio
        ref={audioRef}
        src={currentSong?.url}
        onTimeUpdate={(e) => {
          const target = e.currentTarget;
          const percent = target.duration ? (target.currentTime / target.duration) * 100 : 0;
          setProgress(percent);
        }}
        onEnded={() => {
          next();
          if (currentSong) api.post(`/songs/${currentSong.id}/history`).catch(() => null);
        }}
      />
      <div className="w-56 truncate">
        <p className="text-sm text-white font-semibold">{currentSong?.title || 'Escolha uma música'}</p>
        <p className="text-xs text-zinc-400">{currentSong?.artist || '—'}</p>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={prev}><SkipBack size={18} /></button>
        <button onClick={togglePlay} className="bg-white text-black rounded-full p-2">{isPlaying ? <Pause size={18} /> : <Play size={18} />}</button>
        <button onClick={next}><SkipForward size={18} /></button>
      </div>
      <div className="flex-1 px-4">
        <div className="h-1 bg-zinc-800 rounded">
          <div className="h-1 bg-green-500 rounded" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="flex items-center gap-2 w-36">
        <Volume2 size={16} />
        <input type="range" min={0} max={1} step={0.01} value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="w-full" />
      </div>
    </div>
  );
}
