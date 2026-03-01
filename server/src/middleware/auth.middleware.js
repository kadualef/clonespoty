const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization') || '';
    const token = authHeader.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Token ausente.' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) return res.status(401).json({ error: 'Usuário inválido.' });

    req.user = user;
    next();
  } catch {
    return res.status(401).json({ error: 'Não autorizado.' });
  }
};

const admin = (req, res, next) => {
  if (req.user.role !== 'ADMIN') return res.status(403).json({ error: 'Somente admin.' });
  return next();
};

module.exports = { auth, admin };
