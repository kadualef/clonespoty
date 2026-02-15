import { create } from 'zustand';

interface Song {
    id: number;
    title: string;
    artist: string;
    url: string;
    coverUrl?: string;
}

interface PlayerStore {
    isPlaying: boolean;
    currentSong: Song | null;
    volume: number;
    setPlaying: (isPlaying: boolean) => void;
    setSong: (song: Song) => void;
    setVolume: (volume: number) => void;
}

const usePlayerStore = create<PlayerStore>((set) => ({
    isPlaying: false,
    currentSong: null,
    volume: 50,
    setPlaying: (isPlaying) => set({ isPlaying }),
    setSong: (song) => set({ currentSong: song, isPlaying: true }),
    setVolume: (volume) => set({ volume }),
}));

export default usePlayerStore;
