import Link from 'next/link'
import { Play } from 'lucide-react'

export default function Home() {
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
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-white/10 group rounded-md overflow-hidden flex items-center gap-x-4 hover:bg-white/20 transition cursor-pointer relative shadow-lg hover:shadow-xl">
                            <div className="h-20 w-20 bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md"></div>
                            <span className="font-bold text-white text-lg">Liked Songs</span>

                            <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg scale-90 group-hover:scale-100">
                                <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-400 hover:scale-105 transition">
                                    <Play size={24} className="text-black fill-black ml-1" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Made For You Section */}
            <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-white hover:underline cursor-pointer">Made for You</h2>
                    <span className="text-sm text-gray-400 font-bold hover:underline cursor-pointer">Show all</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="bg-[#181818] p-4 rounded-md hover:bg-[#282828] transition duration-300 group cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-2">
                            <div className="aspect-square bg-gray-800 mb-4 rounded-md shadow-lg relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover:opacity-100 transition duration-300" />
                                <div className="absolute bottom-2 right-2 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition duration-300 transform">
                                    <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-400 hover:scale-105 transition">
                                        <Play size={24} className="text-black fill-black ml-1" />
                                    </div>
                                </div>
                            </div>
                            <h3 className="font-bold text-white mb-1 truncate text-lg">Daily Mix {i + 1}</h3>
                            <p className="text-sm text-gray-400 line-clamp-2">By Spotify • 2h 30min</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recently Played Section */}
            <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-white hover:underline cursor-pointer">Recently Played</h2>
                    <span className="text-sm text-gray-400 font-bold hover:underline cursor-pointer">Show all</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="bg-[#181818] p-4 rounded-md hover:bg-[#282828] transition duration-300 group cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-2">
                            <div className="aspect-square bg-gray-800 mb-4 rounded-md shadow-lg relative overflow-hidden">
                                {/* Image placeholder */}
                            </div>
                            <h3 className="font-bold text-white mb-1 truncate text-lg">Indie Pop Vibes</h3>
                            <p className="text-sm text-gray-400 line-clamp-2">Best of 2024 Indie Pop</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
