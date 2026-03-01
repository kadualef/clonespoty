const bcrypt = require('bcryptjs');
const prisma = require('./config/prisma');

async function seed(req, res) {
  try {
    const admin = await prisma.user.findUnique({ where: { email: 'admin@clonespoty.dev' } });
    if (!admin) {
      await prisma.user.create({
        data: {
          name: 'Admin',
          email: 'admin@clonespoty.dev',
          password: await bcrypt.hash('admin123', 10),
          role: 'ADMIN',
          plan: 'PREMIUM',
        },
      });
    }

    if ((await prisma.song.count()) === 0) {
      await prisma.song.createMany({
        data: [
          {
            title: 'Midnight City',
            artist: 'M83',
            duration: 180,
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
            coverUrl: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36',
          },
          {
            title: 'As It Was',
            artist: 'Harry Styles',
            duration: 167,
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
            coverUrl: 'https://i.scdn.co/image/ab67616d0000b273bd26ede1ae69327010d49d40',
          },
          {
            title: 'Starboy',
            artist: 'The Weeknd',
            duration: 201,
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
            coverUrl: 'https://i.scdn.co/image/ab67616d0000b273e6f407c7f3a0ec98845e4431',
          },
        ],
      });
    }

    res.json({ message: 'Seed concluído.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = seed;
