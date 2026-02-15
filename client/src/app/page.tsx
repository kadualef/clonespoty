import Link from 'next/link'

export default function Home() {
    return (
        <div className="bg-gradient-to-b from-indigo-900 to-black flex-1 p-6">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-white">Good afternoon</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {/* Quick access cards */}
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-white/10 group rounded overflow-hidden flex items-center gap-x-4 hover:bg-white/20 transition cursor-pointer">
                        <div className="h-20 w-20 bg-indigo-500 shadow-lg"></div>
                        <span className="font-bold text-white">Liked Songs</span>
                    </div>
                ))}
            </div>

            <h2 className="text-2xl font-bold text-white mb-4">Made for You</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="bg-black/40 p-4 rounded-md hover:bg-white/10 transition group cursor-pointer">
                        <div className="aspect-square bg-gray-800 mb-4 rounded-md shadow-lg relative">
                            <button className="absolute bottom-2 right-2 h-12 w-12 bg-green-500 rounded-full items-center justify-center shadow-xl translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition flex">
                                <svg className="h-6 w-6 text-black fill-black" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </button>
                        </div>
                        <h3 className="font-bold text-white mb-1 truncate">Daily Mix {i}</h3>
                        <p className="text-sm text-gray-400 line-clamp-2">Julia Wolf, The Weeknd, SZA and more</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
