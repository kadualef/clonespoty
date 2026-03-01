const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const likeSong = async (req, res) => {
    try {
        const { songId } = req.params;
        const userId = req.user.id;

        const song = await prisma.song.findUnique({ where: { id: songId } });
        if (!song) {
            return res.status(404).send({ error: 'Song not found' });
        }

        const like = await prisma.like.upsert({
            where: {
                userId_songId: { userId, songId },
            },
            update: {},
            create: { userId, songId },
        });

        res.status(201).send(like);
    } catch (error) {
        res.status(400).send({ error: error.message || 'Failed to like song' });
    }
};

module.exports = { likeSong };
