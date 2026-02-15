const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllSongs = async (req, res) => {
    try {
        const songs = await prisma.song.findMany();
        res.send(songs);
    } catch (error) {
        res.status(500).send(error);
    }
};

const createSong = async (req, res) => {
    try {
        const { title, artist, duration, url, coverUrl } = req.body;

        // Validate required fields
        if (!title || !artist || !url) {
            return res.status(400).send({ error: 'Title, Artist, and URL are required.' });
        }

        const song = await prisma.song.create({
            data: {
                title,
                artist,
                duration: duration || 0, // Default duration if not provided
                url,
                coverUrl: coverUrl || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop' // Default cover
            }
        });
        res.status(201).send(song);
    } catch (error) {
        console.error("Error creating song:", error);
        res.status(400).send({ error: error.message });
    }
};

module.exports = { getAllSongs, createSong };
