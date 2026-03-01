const jwt = require('jsonwebtoken');

const signToken = (user) => jwt.sign(
  { id: user.id, role: user.role, plan: user.plan },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

module.exports = { signToken };
