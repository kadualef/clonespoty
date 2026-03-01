export interface Song {
  id: number;
  title: string;
  artist: string;
  album?: string;
  duration: number;
  url: string;
  coverUrl?: string;
}

export interface Playlist {
  id: number;
  name: string;
  description?: string;
  isPublic: boolean;
  songs?: { song: Song }[];
}
