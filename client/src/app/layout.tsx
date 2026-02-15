import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar' // Will create next
import Player from '@/components/Player'   // Will create next

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Spotify Clone',
    description: 'A full stack Spotify clone',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="flex h-screen bg-black text-white overflow-hidden">
                    <Sidebar />
                    <div className="flex-1 flex flex-col bg-gradient-to-b from-spotify-darkgray to-black overflow-y-auto">
                        {children}
                    </div>
                </div>
                <div className="fixed bottom-0 w-full h-24 bg-spotify-black border-t border-gray-800">
                    <Player />
                </div>
            </body>
        </html>
    )
}
