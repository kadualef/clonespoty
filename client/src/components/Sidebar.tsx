'use client'

// ... imports
import AddSongModal from './AddSongModal'

export default function Sidebar() {
    const router = useRouter()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    // ... useEffect and handleLogout

    return (
        <>
            <div className="w-64 bg-black/95 h-full flex flex-col gap-y-2 p-2">
                {/* ... links ... */}

                <div className="flex-1 bg-spotify-card rounded-lg p-4 flex flex-col overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-x-2 text-gray-400 hover:text-white transition cursor-pointer">
                            <Library size={24} />
                            <span className="font-bold">Your Library</span>
                        </div>
                        <button onClick={() => setIsModalOpen(true)} className="text-gray-400 hover:text-white cursor-pointer transition">
                            <Plus size={20} />
                        </button>
                    </div>
                    {/* ... rest of sidebar ... */}
                </div>
            </div>
            <AddSongModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    )
}
const router = useRouter()
const [isLoggedIn, setIsLoggedIn] = useState(false)

useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
}, [])

const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    router.push('/login')
}

return (
    <div className="w-64 bg-black/95 h-full flex flex-col gap-y-2 p-2">
        <div className="bg-spotify-card rounded-lg p-5 flex flex-col gap-y-4">
            <Link href="/" className="flex items-center gap-x-4 text-gray-400 hover:text-white transition duration-300">
                <Home size={24} />
                <span className="font-bold">Home</span>
            </Link>
            <Link href="/search" className="flex items-center gap-x-4 text-gray-400 hover:text-white transition duration-300">
                <Search size={24} />
                <span className="font-bold">Search</span>
            </Link>
        </div>

        <div className="flex-1 bg-spotify-card rounded-lg p-4 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-x-2 text-gray-400 hover:text-white transition cursor-pointer">
                    <Library size={24} />
                    <span className="font-bold">Your Library</span>
                </div>
                <Plus size={20} className="text-gray-400 hover:text-white cursor-pointer transition" />
            </div>

            <div className="flex gap-x-2 mb-4">
                <span className="px-3 py-1 bg-[#232323] rounded-full text-sm font-semibold text-white hover:bg-[#2a2a2a] cursor-pointer transition">Playlists</span>
                <span className="px-3 py-1 bg-[#232323] rounded-full text-sm font-semibold text-white hover:bg-[#2a2a2a] cursor-pointer transition">Artists</span>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-2">
                <Link href="/liked" className="flex items-center gap-x-3 p-2 rounded-md hover:bg-white/5 transition cursor-pointer group">
                    <div className="h-12 w-12 bg-gradient-to-br from-indigo-700 to-indigo-300 rounded-md flex items-center justify-center shadow-lg group-hover:scale-105 transition">
                        <Heart size={20} className="text-white fill-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-white">Liked Songs</span>
                        <span className="text-sm text-gray-400 flex items-center gap-x-1">
                            <span className="text-green-500"><Music size={12} className="inline mr-1" /></span>
                            34 songs
                        </span>
                    </div>
                </Link>

                {/* Simulated Playlists */}
                {['Chill Vibes', 'Workout Mix', 'Top Hits 2024', 'Focus Flow', 'Late Night Jazz'].map((playlist, i) => (
                    <div key={i} className="flex items-center gap-x-3 p-2 rounded-md hover:bg-white/5 transition cursor-pointer group">
                        <div className="h-12 w-12 bg-[#282828] rounded-md flex items-center justify-center group-hover:bg-[#333] transition">
                            <Music size={20} className="text-gray-400" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold text-white truncate">{playlist}</span>
                            <span className="text-sm text-gray-400">Playlist • User</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Auth Buttons */}
            <div className="mt-4 pt-4 border-t border-gray-800">
                {!isLoggedIn ? (
                    <div className="flex flex-col gap-y-2">
                        <Link href="/register" className="w-full py-2 rounded-full text-gray-400 font-bold hover:text-white hover:scale-105 transition text-center border border-gray-600 hover:border-white">
                            Sign up
                        </Link>
                        <Link href="/login" className="w-full bg-white text-black py-2 rounded-full font-bold hover:scale-105 transition text-center">
                            Log in
                        </Link>
                    </div>
                ) : (
                    <button
                        onClick={handleLogout}
                        className="w-full bg-[#1e1e1e] text-white py-2 rounded-full font-bold hover:bg-red-900 transition text-center border border-transparent hover:border-red-500"
                    >
                        Log out
                    </button>
                )}
            </div>
        </div>
    </div>
)
}
