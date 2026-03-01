const prisma = require('../config/prisma');

const listSongs = async (req, res) => {
  const { q } = req.query;
  const songs = await prisma.song.findMany({
    where: q
      ? { OR: [{ title: { contains: q, mode: 'insensitive' } }, { artist: { contains: q, mode: 'insensitive' } }] }
      : undefined,
    orderBy: { createdAt: 'desc' },
  });
  res.json(songs);
};

const createSong = async (req, res) => {
  const { title, artist, album, duration, url, coverUrl } = req.body;
  if (!title || !artist || !url) return res.status(400).json({ error: 'Campos obrigatórios faltando.' });

  const song = await prisma.song.create({
    data: { title, artist, album, duration: Number(duration || 180), url, coverUrl, uploadedBy: req.user?.id },
  });
  return res.status(201).json(song);
};

const addToHistory = async (req, res) => {
  const songId = Number(req.params.songId);
  const history = await prisma.listenHistory.create({ data: { songId, userId: req.user.id } });
  res.status(201).json(history);
};

const toggleFavorite = async (req, res) => {
  const songId = Number(req.params.songId);
  const exists = await prisma.favorite.findUnique({ where: { userId_songId: { userId: req.user.id, songId } } });

  if (exists) {
    await prisma.favorite.delete({ where: { userId_songId: { userId: req.user.id, songId } } });
    return res.json({ favorited: false });
  }

  await prisma.favorite.create({ data: { userId: req.user.id, songId } });
  return res.json({ favorited: true });
};

module.exports = { listSongs, createSong, addToHistory, toggleFavorite };
