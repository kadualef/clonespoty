import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import Player from '@/components/Player';

export const metadata: Metadata = {
  title: 'Clonespoty',
  description: 'Spotify-like full stack app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="h-screen bg-black text-white flex">
          <Sidebar />
          <main className="flex-1 overflow-y-auto pb-28">{children}</main>
        </div>
        <div className="fixed bottom-0 w-full"><Player /></div>
      </body>
    </html>
  );
}
