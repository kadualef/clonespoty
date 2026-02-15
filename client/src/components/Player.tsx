'use client'

import { Play, SkipBack, SkipForward, Volume2, Repeat, Shuffle } from 'lucide-react'
import { useState } from 'react'

export default function Player() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolume] = useState(50)

    return (
        <div className="grid grid-cols-3 h-full px-4 text-white">
            {/* Current Song Info */}
            <div className="flex items-center gap-x-4">
                <div className="h-14 w-14 bg-gray-800 rounded overflow-hidden">
                    {/* <img src="/cover.jpg" alt="Cover" /> */}
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-semibold hover:underline cursor-pointer">Song Name</span>
                    <span className="text-xs text-gray-400 hover:underline cursor-pointer">Artist Name</span>
                </div>
            </div>

            {/* Player Controls */}
            <div className="flex flex-col items-center justify-center gap-y-2">
                <div className="flex items-center gap-x-6">
                    <Shuffle size={20} className="text-gray-400 hover:text-white cursor-pointer transition" />
                    <SkipBack size={24} className="text-gray-400 hover:text-white cursor-pointer transition fill-gray-400 hover:fill-white" />
                    <div
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="h-8 w-8 rounded-full bg-white flex items-center justify-center cursor-pointer hover:scale-110 transition"
                    >
                        {isPlaying ? (
                            <div className="h-4 w-4 bg-black" /> // Pause Icon substitute
                        ) : (
                            <Play size={20} className="text-black fill-black ml-1" />
                        )}
                    </div>
                    <SkipForward size={24} className="text-gray-400 hover:text-white cursor-pointer transition fill-gray-400 hover:fill-white" />
                    <Repeat size={20} className="text-gray-400 hover:text-white cursor-pointer transition" />
                </div>
                <div className="w-full flex items-center gap-x-2">
                    <span className="text-xs text-gray-400">0:00</span>
                    <div className="h-1 flex-1 bg-gray-600 rounded-full">
                        <div className="h-full w-1/3 bg-white rounded-full group hover:bg-green-500 relative">
                            <div className="hidden group-hover:block absolute right-0 -top-1 h-3 w-3 bg-white rounded-full" />
                        </div>
                    </div>
                    <span className="text-xs text-gray-400">3:45</span>
                </div>
            </div>

            {/* Volume Controls */}
            <div className="flex items-center justify-end gap-x-2">
                <Volume2 size={20} className="text-gray-400" />
                <div className="w-24 h-1 bg-gray-600 rounded-full">
                    <div className="h-full w-1/2 bg-white rounded-full group hover:bg-green-500 relative">
                        <div className="hidden group-hover:block absolute right-0 -top-1 h-3 w-3 bg-white rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    )
}
