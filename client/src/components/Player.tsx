'use client'

import { Play, SkipBack, SkipForward, Volume2, Repeat, Shuffle, Heart, Mic2, Layers, MonitorSpeaker } from 'lucide-react'
import { useState } from 'react'

export default function Player() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolume] = useState(50)

    return (
        <div className="absolute inset-0 grid grid-cols-3 px-4 h-full items-center bg-black">
            {/* Current Song Info */}
            <div className="flex items-center gap-x-4">
                <div className="h-14 w-14 bg-gray-800 rounded-md overflow-hidden shadow-lg relative group cursor-pointer">
                    <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center">
                        <div className="text-white bg-black/50 rounded-full p-1">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" /></svg>
                        </div>
                    </div>
                    {/* <img src="/cover.jpg" alt="Cover" /> */}
                </div>
                <div className="flex flex-col justify-center">
                    <span className="text-sm font-semibold hover:underline cursor-pointer text-white">Song Name</span>
                    <span className="text-xs text-gray-400 hover:underline cursor-pointer hover:text-white transition">Artist Name</span>
                </div>
                <Heart size={18} className="text-green-500 ml-2 cursor-pointer hover:scale-110 transition" />
            </div>

            {/* Player Controls */}
            <div className="flex flex-col items-center justify-center gap-y-1">
                <div className="flex items-center gap-x-6">
                    <Shuffle size={18} className="text-green-500 cursor-pointer hover:text-white transition" />
                    <SkipBack size={24} className="text-gray-400 hover:text-white cursor-pointer transition fill-gray-400 hover:fill-white" />
                    <div
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="h-8 w-8 rounded-full bg-white flex items-center justify-center cursor-pointer hover:scale-105 transition shadow-lg"
                    >
                        {isPlaying ? (
                            <div className="h-4 w-4 bg-black" />
                        ) : (
                            <Play size={18} className="text-black fill-black ml-1" />
                        )}
                    </div>
                    <SkipForward size={24} className="text-gray-400 hover:text-white cursor-pointer transition fill-gray-400 hover:fill-white" />
                    <Repeat size={18} className="text-gray-400 hover:text-white cursor-pointer transition" />
                </div>
                <div className="w-full max-w-[500px] flex items-center gap-x-2 group">
                    <span className="text-xs text-gray-400 w-8 text-right font-mono">0:42</span>
                    <div className="h-1 flex-1 bg-gray-600 rounded-full cursor-pointer relative">
                        <div className="absolute h-full w-1/3 bg-white rounded-full group-hover:bg-green-500 transition-colors">
                            <div className="hidden group-hover:block absolute right-0 -top-1.5 h-4 w-4 bg-white rounded-full shadow-md" />
                        </div>
                    </div>
                    <span className="text-xs text-gray-400 w-8 font-mono">3:45</span>
                </div>
            </div>

            {/* Volume & Extra Controls */}
            <div className="flex items-center justify-end gap-x-3">
                <Mic2 size={18} className="text-gray-400 hover:text-white cursor-pointer transition" />
                <Layers size={18} className="text-gray-400 hover:text-white cursor-pointer transition" />
                <MonitorSpeaker size={18} className="text-gray-400 hover:text-white cursor-pointer transition" />
                <div className="flex items-center gap-x-2 w-32 group">
                    <Volume2 size={20} className="text-gray-400 hover:text-white transition" />
                    <div className="h-1 flex-1 bg-gray-600 rounded-full cursor-pointer relative">
                        <div className="h-full w-2/3 bg-white rounded-full group-hover:bg-green-500 relative">
                            <div className="hidden group-hover:block absolute right-0 -top-1.5 h-4 w-4 bg-white rounded-full shadow" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
