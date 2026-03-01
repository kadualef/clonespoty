const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createPlaylist = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).send({ error: 'Playlist name is required' });
        }

        const playlist = await prisma.playlist.create({
            data: {
                name,
                userId: req.user.id,
            },
        });

        res.status(201).send(playlist);
    } catch (error) {
        res.status(400).send({ error: error.message || 'Failed to create playlist' });
    }
};

const getPlaylists = async (req, res) => {
    try {
        const playlists = await prisma.playlist.findMany({
            where: { userId: req.user.id },
            include: {
                songs: {
                    include: { song: true },
                },
            },
            orderBy: { name: 'asc' },
        });

        res.send(playlists);
    } catch (error) {
        res.status(500).send({ error: error.message || 'Failed to list playlists' });
    }
};

const addSongToPlaylist = async (req, res) => {
    try {
        const { playlistId } = req.params;
        const { songId } = req.body;

        if (!songId) {
            return res.status(400).send({ error: 'songId is required' });
        }

        const playlist = await prisma.playlist.findUnique({ where: { id: playlistId } });
        if (!playlist || playlist.userId !== req.user.id) {
            return res.status(403).send({ error: 'Cannot modify this playlist' });
        }

        const link = await prisma.playlistSong.upsert({
            where: {
                playlistId_songId: {
                    playlistId,
                    songId,
                },
            },
            update: {},
            create: {
                playlistId,
                songId,
            },
        });

        res.status(201).send(link);
    } catch (error) {
        res.status(400).send({ error: error.message || 'Failed to add song to playlist' });
    }
};

const getPlaylistSongs = async (req, res) => {
    try {
        const { playlistId } = req.params;

        const playlist = await prisma.playlist.findUnique({
            where: { id: playlistId },
            include: {
                songs: {
                    include: { song: true },
                },
            },
        });

        if (!playlist || playlist.userId !== req.user.id) {
            return res.status(404).send({ error: 'Playlist not found' });
        }

        res.send(playlist.songs.map((item) => item.song));
    } catch (error) {
        res.status(500).send({ error: error.message || 'Failed to list playlist songs' });
    }
};

module.exports = { createPlaylist, getPlaylists, addSongToPlaylist, getPlaylistSongs };
