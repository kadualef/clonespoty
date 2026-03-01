const prisma = require('../config/prisma');

const getDashboard = async (_req, res) => {
  const [users, songs, playlists] = await Promise.all([
    prisma.user.count(),
    prisma.song.count(),
    prisma.playlist.count(),
  ]);

  res.json({ users, songs, playlists });
};

const listUsers = async (_req, res) => {
  const users = await prisma.user.findMany({ select: { id: true, name: true, email: true, role: true, plan: true, createdAt: true } });
  res.json(users);
};

const updateUser = async (req, res) => {
  const id = Number(req.params.id);
  const updated = await prisma.user.update({ where: { id }, data: req.body });
  res.json(updated);
};

const deleteUser = async (req, res) => {
  await prisma.user.delete({ where: { id: Number(req.params.id) } });
  res.status(204).send();
};

module.exports = { getDashboard, listUsers, updateUser, deleteUser };
