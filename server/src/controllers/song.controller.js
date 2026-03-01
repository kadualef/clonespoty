const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllSongs = async (req, res) => {
    try {
        const songs = await prisma.song.findMany({
            orderBy: { createdAt: 'desc' },
        });
        res.send(songs);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch songs' });
    }
};

const createSong = async (req, res) => {
    try {
        const { title, artist, coverUrl } = req.body;

        if (!title || !artist) {
            return res.status(400).send({ error: 'Title and artist are required.' });
        }

        if (!req.file) {
            return res.status(400).send({ error: 'MP3 file is required.' });
        }

        const song = await prisma.song.create({
            data: {
                title,
                artist,
                audioUrl: `/uploads/${req.file.filename}`,
                coverUrl: coverUrl || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
            },
        });

        res.status(201).send(song);
    } catch (error) {
        console.error('Error creating song:', error);
        res.status(400).send({ error: error.message || 'Failed to create song' });
    }
};

module.exports = { getAllSongs, createSong };
