'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await api.post('/auth/login', { email, password })
            localStorage.setItem('token', response.data.token)
            router.push('/')
        } catch (err: any) {
            setError(err.response?.data?.error || 'Login failed')
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#1e1e1e] to-black text-white p-4 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-green-500/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-[450px] flex flex-col items-center gap-y-6 z-10 animate-fade-in">
                <div className="flex items-center gap-x-2 mb-4">
                    <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <div className="h-8 w-8 bg-black rounded-full" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tighter">Spotify Clone</h1>
                </div>

                <div className="w-full bg-black/40 backdrop-blur-xl border border-white/10 p-10 rounded-xl shadow-2xl">
                    <h2 className="text-center text-3xl font-bold mb-8">Log in</h2>

                    {error && <div className="bg-red-500/80 text-white p-3 rounded mb-6 text-sm text-center font-bold">{error}</div>}

                    <form onSubmit={handleLogin} className="flex flex-col gap-y-4">
                        <div className="flex flex-col gap-y-2">
                            <label className="text-sm font-bold text-gray-300 ml-1">Email address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-[#121212] border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition duration-300 placeholder-gray-500"
                                placeholder="name@domain.com"
                            />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <label className="text-sm font-bold text-gray-300 ml-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-[#121212] border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition duration-300 placeholder-gray-500"
                                placeholder="Password"
                            />
                        </div>

                        <button type="submit" className="bg-green-500 text-black font-bold rounded-full py-3.5 mt-6 hover:bg-green-400 hover:scale-[1.02] active:scale-[0.98] transition duration-200 shadow-lg text-lg uppercase tracking-wider">
                            Log In
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-gray-700 text-center">
                        <p className="text-gray-400 mb-4">Don't have an account?</p>
                        <Link href="/register" className="text-white hover:text-green-400 hover:underline font-bold text-lg transition duration-200">
                            Sign up for Spotify Clone
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
