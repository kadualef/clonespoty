'use client'

import { Clock, Play, Heart } from 'lucide-react'
import usePlayerStore from '@/store/usePlayerStore'

interface Song {
    id: number;
    title: string;
    artist: string;
    album?: string;
    duration: number;
    url: string;
    coverUrl?: string;
}

interface SongListProps {
    songs: Song[];
}

export default function SongList({ songs }: SongListProps) {
    const { setSong, currentSong, isPlaying, setPlaying } = usePlayerStore()

    const handlePlay = (song: Song) => {
        if (currentSong?.id === song.id) {
            setPlaying(!isPlaying)
        } else {
            setSong(song)
        }
    }

    const formatDuration = (seconds: number) => {
        const min = Math.floor(seconds / 60)
        const sec = seconds % 60
        return `${min}:${sec < 10 ? '0' : ''}${sec}`
    }

    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-[16px_4fr_3fr_minmax(120px,1fr)] gap-4 px-4 py-2 border-b border-gray-800 text-gray-400 text-sm sticky top-0 bg-black/90 z-10">
                <div>#</div>
                <div>Title</div>
                <div>Album</div>
                <div className="flex justify-end"><Clock size={16} /></div>
            </div>

            <div className="flex flex-col">
                {songs.map((song, index) => (
                    <div
                        key={song.id}
                        className="grid grid-cols-[16px_4fr_3fr_minmax(120px,1fr)] gap-4 px-4 py-2 text-gray-400 hover:bg-white/10 rounded-md group transition items-center"
                    >
                        <div className="flex items-center justify-center relative">
                            <span className="group-hover:hidden">{index + 1}</span>
                            <Play
                                size={16}
                                className="hidden group-hover:block text-white fill-white cursor-pointer"
                                onClick={() => handlePlay(song)}
                            />
                        </div>
                        <div className="flex items-center gap-x-4">
                            {song.coverUrl && (
                                <div className="h-10 w-10 bg-gray-800 overflow-hidden">
                                    {/* <img src={song.coverUrl} /> */}
                                </div>
                            )}
                            <div className="flex flex-col">
                                <span className={`font-semibold truncate ${currentSong?.id === song.id ? 'text-green-500' : 'text-white'}`}>
                                    {song.title}
                                </span>
                                <span className="text-sm group-hover:text-white transition">
                                    {song.artist}
                                </span>
                            </div>
                        </div>
                        <div className="text-sm group-hover:text-white transition truncate">
                            {song.album || 'Single'}
                        </div>
                        <div className="flex items-center justify-end gap-x-4">
                            <Heart size={16} className="opacity-0 group-hover:opacity-100 transition hover:text-green-500 cursor-pointer" />
                            <span className="text-sm">{formatDuration(song.duration)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
