import { create } from 'zustand';

interface Song {
    id: string;
    title: string;
    artist: string;
    audioUrl: string;
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
