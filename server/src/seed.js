const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function seed(req, res) {
    try {
        // Check if data already exists
        const existingUser = await prisma.user.findFirst({ where: { email: 'admin@spotify.com' } });
        if (existingUser) {
            return res.status(200).json({ message: 'Database already seeded!' });
        }

        // Create Admin User
        const hashedPassword = await bcrypt.hash('password123', 8);
        const user = await prisma.user.create({
            data: {
                email: 'admin@spotify.com',
                password: hashedPassword,
                name: 'Admin User',
                role: 'ADMIN'
            }
        });

        // Create Sample Songs
        const songs = [
            {
                title: 'Blinding Lights',
                artist: 'The Weeknd',
                duration: 200,
                url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Free sample URL
                coverUrl: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36'
            },
            {
                title: 'Levitating',
                artist: 'Dua Lipa',
                duration: 203,
                url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
                coverUrl: 'https://i.scdn.co/image/ab67616d0000b273bd26ede1ae69327010d49d40'
            },
            {
                title: 'Peaches',
                artist: 'Justin Bieber',
                duration: 198,
                url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
                coverUrl: 'https://i.scdn.co/image/ab67616d0000b273e6f407c7f3a0ec98845e4431'
            }
        ];

        for (const song of songs) {
            await prisma.song.create({ data: song });
        }

        res.status(201).json({ message: 'Database seeded successfully!', user: user.email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = seed;
