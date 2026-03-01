const prisma = require('../config/prisma');

const listPlaylists = async (req, res) => {
  const playlists = await prisma.playlist.findMany({
    where: { OR: [{ userId: req.user.id }, { isPublic: true }] },
    include: { songs: { include: { song: true } }, user: { select: { name: true } } },
    orderBy: { updatedAt: 'desc' },
  });
  res.json(playlists);
};

const createPlaylist = async (req, res) => {
  const { name, description, isPublic } = req.body;
  const playlist = await prisma.playlist.create({
    data: { name, description, isPublic: Boolean(isPublic), userId: req.user.id },
  });
  res.status(201).json(playlist);
};

const updatePlaylist = async (req, res) => {
  const id = Number(req.params.id);
  const playlist = await prisma.playlist.findUnique({ where: { id } });
  if (!playlist || (playlist.userId !== req.user.id && req.user.role !== 'ADMIN')) {
    return res.status(403).json({ error: 'Sem permissão.' });
  }

  const updated = await prisma.playlist.update({ where: { id }, data: req.body });
  return res.json(updated);
};

const deletePlaylist = async (req, res) => {
  const id = Number(req.params.id);
  const playlist = await prisma.playlist.findUnique({ where: { id } });
  if (!playlist || (playlist.userId !== req.user.id && req.user.role !== 'ADMIN')) {
    return res.status(403).json({ error: 'Sem permissão.' });
  }

  await prisma.playlist.delete({ where: { id } });
  return res.status(204).send();
};

const addSong = async (req, res) => {
  const id = Number(req.params.id);
  const { songId } = req.body;

  const playlist = await prisma.playlist.findUnique({ where: { id } });
  if (!playlist || (playlist.userId !== req.user.id && req.user.role !== 'ADMIN')) {
    return res.status(403).json({ error: 'Sem permissão.' });
  }

  const created = await prisma.playlistSong.create({ data: { playlistId: id, songId: Number(songId) } });
  return res.status(201).json(created);
};

const removeSong = async (req, res) => {
  const id = Number(req.params.id);
  const songId = Number(req.params.songId);

  await prisma.playlistSong.delete({ where: { playlistId_songId: { playlistId: id, songId } } });
  return res.status(204).send();
};

module.exports = { listPlaylists, createPlaylist, updatePlaylist, deletePlaylist, addSong, removeSong };
