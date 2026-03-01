const bcrypt = require('bcryptjs');
const prisma = require('../config/prisma');
const { signToken } = require('../utils/jwt');

const sanitizeUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  plan: user.plan,
  avatarUrl: user.avatarUrl,
});

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'name, email e password são obrigatórios.' });
    }

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(409).json({ error: 'Email já cadastrado.' });

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: await bcrypt.hash(password, 10),
        role: role === 'ADMIN' ? 'ADMIN' : 'CUSTOMER',
      },
    });

    return res.status(201).json({ user: sanitizeUser(user), token: signToken(user) });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ error: 'Credenciais inválidas.' });

    return res.json({ user: sanitizeUser(user), token: signToken(user) });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const profile = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    include: {
      history: { include: { song: true }, orderBy: { playedAt: 'desc' }, take: 20 },
      favorites: { include: { song: true } },
    },
  });
  return res.json({ user: sanitizeUser(user), history: user.history, favorites: user.favorites });
};

const updatePlan = async (req, res) => {
  const { plan } = req.body;
  if (!['FREE', 'PREMIUM'].includes(plan)) return res.status(400).json({ error: 'Plano inválido.' });
  const user = await prisma.user.update({ where: { id: req.user.id }, data: { plan } });
  return res.json({ user: sanitizeUser(user) });
};

module.exports = { register, login, profile, updatePlan };
