'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  ['/', 'Início'],
  ['/search', 'Buscar'],
  ['/library', 'Biblioteca'],
  ['/playlists', 'Playlists'],
  ['/spotify', 'Spotify'],
  ['/admin', 'Admin'],
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-black p-4 border-r border-zinc-800 hidden md:block">
      <h1 className="text-2xl font-bold mb-6 text-green-500">Clonespoty</h1>
      <nav className="space-y-2">
        {links.map(([href, label]) => (
          <Link
            key={href}
            href={href}
            className={`block rounded px-3 py-2 transition ${pathname === href ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
