'use client'

import { useState } from 'react'
import { X, Music, Check } from 'lucide-react'
import api from '@/lib/api'

interface AddSongModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddSongModal({ isOpen, onClose }: AddSongModalProps) {
    const [audioFile, setAudioFile] = useState<File | null>(null)
    const [title, setTitle] = useState('')
    const [artist, setArtist] = useState('')
    const [coverUrl, setCoverUrl] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    if (!isOpen) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')
        setSuccess(false)

        try {
            if (!audioFile) {
                throw new Error('Selecione um arquivo MP3')
            }

            const formData = new FormData()
            formData.append('title', title)
            formData.append('artist', artist)
            formData.append('coverUrl', coverUrl)
            formData.append('audio', audioFile)

            await api.post('/songs', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })

            setSuccess(true)
            setTimeout(() => {
                onClose()
                setSuccess(false)
                setAudioFile(null)
                setTitle('')
                setArtist('')
                setCoverUrl('')
                window.location.reload()
            }, 1200)
        } catch (err: any) {
            setError(err.response?.data?.error || err.message || 'Failed to add song')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-[#282828] w-full max-w-md rounded-lg p-6 shadow-2xl relative animate-fade-in">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-x-2">
                    <Music className="text-green-500" />
                    Add New Song
                </h2>

                {success ? (
                    <div className="flex flex-col items-center justify-center py-8 text-green-500">
                        <div className="h-16 w-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                            <Check size={32} />
                        </div>
                        <p className="text-xl font-bold">Song Added!</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
                        <div>
                            <label className="text-sm font-bold text-gray-300 block mb-1">MP3 File</label>
                            <input
                                type="file"
                                accept="audio/mpeg,.mp3"
                                required
                                onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                                className="w-full bg-[#121212] border border-gray-600 rounded p-3 text-white"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-bold text-gray-300 block mb-1">Title</label>
                            <input
                                type="text"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full bg-[#121212] border border-gray-600 rounded p-3 text-white"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-bold text-gray-300 block mb-1">Artist</label>
                            <input
                                type="text"
                                required
                                value={artist}
                                onChange={(e) => setArtist(e.target.value)}
                                className="w-full bg-[#121212] border border-gray-600 rounded p-3 text-white"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-bold text-gray-300 block mb-1">Cover Image URL (Optional)</label>
                            <input
                                type="url"
                                value={coverUrl}
                                onChange={(e) => setCoverUrl(e.target.value)}
                                className="w-full bg-[#121212] border border-gray-600 rounded p-3 text-white"
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <button type="submit" disabled={isLoading} className="bg-green-500 text-black font-bold rounded-full py-3 mt-2">
                            {isLoading ? 'Adding...' : 'Add Song'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}
