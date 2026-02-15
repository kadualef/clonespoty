'use client'

import Link from 'next/link'
import { Play } from 'lucide-react'
import { useEffect, useState } from 'react'
import api from '@/lib/api'
import usePlayerStore from '@/store/usePlayerStore'

interface Song {
    id: number;
    title: string;
    artist: string;
    url: string;
    coverUrl?: string;
    duration: number;
}

export default function Home() {
    const [songs, setSongs] = useState<Song[]>([])
    const { setSong } = usePlayerStore()

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                // Note: In a real app we might have a public endpoint or require auth
                // For now, let's try to fetch if we have a token, or public songs
                const response = await api.get('/songs')
                setSongs(response.data)
            } catch (error) {
                console.error("Failed to fetch songs", error)
            }
        }
        fetchSongs()
    }, [])

    const currentHour = new Date().getHours()
    let greeting = 'Good morning'
    if (currentHour >= 12 && currentHour < 18) greeting = 'Good afternoon'
    if (currentHour >= 18) greeting = 'Good evening'

    return (
        <div className="flex-1 bg-gradient-to-b from-[#1e1e1e] via-black to-black p-8 overflow-y-auto">
            {/* Hero Section */}
            <div className="mb-8 animate-fade-in">
                <h1 className="text-4xl font-bold text-white mb-6 drop-shadow-md">{greeting}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Placeholder for Liked Songs - static for now */}
                    <div className="bg-white/10 group rounded-md overflow-hidden flex items-center gap-x-4 hover:bg-white/20 transition cursor-pointer relative shadow-lg hover:shadow-xl">
                        <div className="h-20 w-20 bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md flex items-center justify-center">
                            <span className="text-2xl">❤️</span>
                        </div>
                        <span className="font-bold text-white text-lg">Liked Songs</span>
                    </div>
                </div>
            </div>

            {/* Database Songs Section */}
            <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-white hover:underline cursor-pointer">Available Songs</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {songs.length > 0 ? songs.map((song) => (
                        <div
                            key={song.id}
                            onClick={() => setSong(song)}
                            className="bg-[#181818] p-4 rounded-md hover:bg-[#282828] transition duration-300 group cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-2"
                        >
                            <div className="aspect-square bg-gray-800 mb-4 rounded-md shadow-lg relative overflow-hidden group">
                                {song.coverUrl ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={song.coverUrl} alt={song.title} className="object-cover w-full h-full" />
                                ) : (
                                    <div className="w-full h-full bg-gray-700" />
                                )}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300" />
                                <div className="absolute bottom-2 right-2 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition duration-300 transform">
                                    <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-400 hover:scale-105 transition">
                                        <Play size={24} className="text-black fill-black ml-1" />
                                    </div>
                                </div>
                            </div>
                            <h3 className="font-bold text-white mb-1 truncate text-lg">{song.title}</h3>
                            <p className="text-sm text-gray-400 line-clamp-2">{song.artist}</p>
                        </div>
                    )) : (
                        <div className="col-span-full text-gray-400">
                            If you see no songs, please run the Seed script in the backend or ensure you are connected to the API.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
