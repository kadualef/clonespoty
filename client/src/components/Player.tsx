'use client'

import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Shuffle, Heart, Mic2, Layers, MonitorSpeaker } from 'lucide-react'
import { useRef } from 'react'
import usePlayerStore from '@/store/usePlayerStore'

export default function Player() {
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const { isPlaying, setPlaying, currentSong, volume, setVolume } = usePlayerStore()

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
    const apiRoot = baseUrl.endsWith('/api') ? baseUrl.slice(0, -4) : baseUrl
    const songUrl = currentSong?.audioUrl?.startsWith('http')
        ? currentSong.audioUrl
        : currentSong?.audioUrl
            ? `${apiRoot}${currentSong.audioUrl}`
            : ''

    const togglePlay = async () => {
        if (!audioRef.current || !currentSong) return

        if (isPlaying) {
            audioRef.current.pause()
            setPlaying(false)
            return
        }

        await audioRef.current.play()
        setPlaying(true)
    }

    return (
        <div className="absolute inset-0 grid grid-cols-3 px-4 h-full items-center bg-black">
            <div className="flex items-center gap-x-4">
                <div className="h-14 w-14 bg-gray-800 rounded-md overflow-hidden shadow-lg">
                    {currentSong?.coverUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={currentSong.coverUrl} alt={currentSong.title} className="w-full h-full object-cover" />
                    )}
                </div>
                <div className="flex flex-col justify-center min-w-0">
                    <span className="text-sm font-semibold text-white truncate">{currentSong?.title || 'No song selected'}</span>
                    <span className="text-xs text-gray-400 truncate">{currentSong?.artist || '---'}</span>
                </div>
                <Heart size={18} className="text-green-500 ml-2" />
            </div>

            <div className="flex flex-col items-center justify-center gap-y-1">
                <div className="flex items-center gap-x-6">
                    <Shuffle size={18} className="text-green-500" />
                    <SkipBack size={24} className="text-gray-400" />
                    <div
                        onClick={togglePlay}
                        className="h-8 w-8 rounded-full bg-white flex items-center justify-center cursor-pointer"
                    >
                        {isPlaying ? (
                            <Pause size={18} className="text-black" />
                        ) : (
                            <Play size={18} className="text-black fill-black ml-1" />
                        )}
                    </div>
                    <SkipForward size={24} className="text-gray-400" />
                    <Repeat size={18} className="text-gray-400" />
                </div>
                <audio
                    ref={audioRef}
                    src={songUrl}
                    onPlay={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                    onEnded={() => setPlaying(false)}
                    controls
                    className="w-full max-w-[500px] h-8"
                />
            </div>

            <div className="flex items-center justify-end gap-x-3">
                <Mic2 size={18} className="text-gray-400" />
                <Layers size={18} className="text-gray-400" />
                <MonitorSpeaker size={18} className="text-gray-400" />
                <div className="flex items-center gap-x-2 w-32">
                    <Volume2 size={20} className="text-gray-400" />
                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={volume}
                        onChange={(e) => {
                            const newVolume = Number(e.target.value)
                            setVolume(newVolume)
                            if (audioRef.current) {
                                audioRef.current.volume = newVolume / 100
                            }
                        }}
                        className="w-full"
                    />
                </div>
            </div>
        </div>
    )
}
