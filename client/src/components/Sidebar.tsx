import Link from 'next/link'
import { Home, Search, Library, Plus, Heart } from 'lucide-react'

export default function Sidebar() {
    return (
        <div className="w-64 bg-black h-full p-6 flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-4">
                <Link href="/" className="flex items-center gap-x-4 text-gray-400 hover:text-white transition">
                    <Home size={24} />
                    <span className="font-semibold">Home</span>
                </Link>
                <Link href="/search" className="flex items-center gap-x-4 text-gray-400 hover:text-white transition">
                    <Search size={24} />
                    <span className="font-semibold">Search</span>
                </Link>
                <Link href="/library" className="flex items-center gap-x-4 text-gray-400 hover:text-white transition">
                    <Library size={24} />
                    <span className="font-semibold">Your Library</span>
                </Link>
            </div>

            <div className="mt-6 flex flex-col gap-y-4">
                <button className="flex items-center gap-x-4 text-gray-400 hover:text-white transition group">
                    <div className="p-1 bg-gray-400 group-hover:bg-white rounded-sm">
                        <Plus size={16} className="text-black" />
                    </div>
                    <span className="font-semibold">Create Playlist</span>
                </button>
                <Link href="/liked" className="flex items-center gap-x-4 text-gray-400 hover:text-white transition group">
                    <div className="p-1 bg-gradient-to-br from-indigo-700 to-white opacity-70 group-hover:opacity-100 rounded-sm">
                        <Heart size={16} className="text-white fill-white" />
                    </div>
                    <span className="font-semibold">Liked Songs</span>
                </Link>
            </div>

            <div className="mt-4 border-t border-gray-800 pt-4 overflow-y-auto flex-1">
                {/* Playlist list will go here */}
                <p className="text-gray-400 text-sm hover:text-white cursor-pointer py-1">Chill Vibes</p>
                <p className="text-gray-400 text-sm hover:text-white cursor-pointer py-1">Workout Mix</p>
                <p className="text-gray-400 text-sm hover:text-white cursor-pointer py-1">Top Hits 2024</p>
            </div>
        </div>
    )
}
