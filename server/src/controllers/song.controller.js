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
        const song = await prisma.song.create({
            data: { title, artist, duration, url, coverUrl }
        });
        res.status(201).send(song);
    } catch (error) {
        res.status(400).send(error);
    }
};

module.exports = { getAllSongs, createSong };
