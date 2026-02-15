'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'

export default function RegisterPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState('')

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await api.post('/auth/register', { email, password, name })
            localStorage.setItem('token', response.data.token)
            router.push('/')
        } catch (err: any) {
            setError(err.response?.data?.error || 'Registration failed')
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
            <div className="w-full max-w-sm flex flex-col items-center gap-y-8">
                <div className="flex items-center gap-x-2">
                    <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center">
                        <div className="h-6 w-6 bg-black rounded-full" />
                    </div>
                    <h1 className="text-3xl font-bold">Spotify Clone</h1>
                </div>

                <div className="w-full bg-black border border-gray-800 p-8 rounded-lg shadow-xl">
                    <h2 className="text-center text-xl font-bold mb-8">Sign up</h2>

                    {error && <div className="bg-red-500 text-white p-3 rounded mb-4 text-sm">{error}</div>}

                    <form onSubmit={handleRegister} className="flex flex-col gap-y-4">
                        <div className="flex flex-col gap-y-2">
                            <label className="text-sm font-bold text-gray-400">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-black border border-gray-600 rounded p-3 text-white focus:outline-none focus:border-white transition"
                                placeholder="Your Name"
                            />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <label className="text-sm font-bold text-gray-400">Email address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-black border border-gray-600 rounded p-3 text-white focus:outline-none focus:border-white transition"
                                placeholder="name@domain.com"
                            />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <label className="text-sm font-bold text-gray-400">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-black border border-gray-600 rounded p-3 text-white focus:outline-none focus:border-white transition"
                                placeholder="Password"
                            />
                        </div>

                        <button type="submit" className="bg-green-500 text-black font-bold rounded-full py-3 mt-4 hover:scale-105 transition">
                            Sign Up
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-gray-800 text-center">
                        <p className="text-gray-400">Already have an account?</p>
                        <Link href="/login" className="text-white hover:underline font-bold mt-2 block">
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
