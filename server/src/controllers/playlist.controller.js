const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createPlaylist = async (req, res) => {
    try {
        const { name, isPublic } = req.body;
        const playlist = await prisma.playlist.create({
            data: {
                name,
                isPublic,
                userId: req.user.id
            }
        });
        res.status(201).send(playlist);
    } catch (error) {
        res.status(400).send(error);
    }
};

const getPlaylists = async (req, res) => {
    try {
        const playlists = await prisma.playlist.findMany({
            where: {
                OR: [
                    { isPublic: true },
                    { userId: req.user.id }
                ]
            },
            include: { user: true }
        });
        res.send(playlists);
    } catch (error) {
        res.status(500).send(error);
    }
};

const addSongToPlaylist = async (req, res) => {
    try {
        const { playlistId, songId } = req.body;
        // Check if playlist belongs to user
        const playlist = await prisma.playlist.findUnique({ where: { id: parseInt(playlistId) } });
        if (!playlist || playlist.userId !== req.user.id) {
            return res.status(403).send({ error: 'Cannot modify this playlist' });
        }

        const playlistSong = await prisma.playlistSong.create({
            data: {
                playlistId: parseInt(playlistId),
                songId: parseInt(songId)
            }
        });
        res.status(201).send(playlistSong);
    } catch (error) {
        res.status(400).send(error);
    }
};

module.exports = { createPlaylist, getPlaylists, addSongToPlaylist };
