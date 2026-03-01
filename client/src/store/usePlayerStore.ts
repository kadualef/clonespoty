import { create } from 'zustand';
import type { Song } from '@/types';

interface PlayerState {
  playlist: Song[];
  currentSong: Song | null;
  index: number;
  isPlaying: boolean;
  volume: number;
  progress: number;
  setPlaylist: (songs: Song[], startIndex?: number) => void;
  togglePlay: () => void;
  next: () => void;
  prev: () => void;
  setVolume: (v: number) => void;
  setProgress: (p: number) => void;
}

const usePlayerStore = create<PlayerState>((set, get) => ({
  playlist: [],
  currentSong: null,
  index: 0,
  isPlaying: false,
  volume: 0.8,
  progress: 0,
  setPlaylist: (songs, startIndex = 0) => set({ playlist: songs, index: startIndex, currentSong: songs[startIndex] ?? null, isPlaying: true }),
  togglePlay: () => set((s) => ({ isPlaying: !s.isPlaying })),
  next: () => {
    const { playlist, index } = get();
    if (!playlist.length) return;
    const newIndex = (index + 1) % playlist.length;
    set({ index: newIndex, currentSong: playlist[newIndex], progress: 0, isPlaying: true });
  },
  prev: () => {
    const { playlist, index } = get();
    if (!playlist.length) return;
    const newIndex = (index - 1 + playlist.length) % playlist.length;
    set({ index: newIndex, currentSong: playlist[newIndex], progress: 0, isPlaying: true });
  },
  setVolume: (volume) => set({ volume }),
  setProgress: (progress) => set({ progress }),
}));

export default usePlayerStore;
