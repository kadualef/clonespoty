const express = require('express');
const { auth, admin } = require('../middleware/auth.middleware');
const { getDashboard, listUsers, updateUser, deleteUser } = require('../controllers/admin.controller');

const router = express.Router();
router.use(auth, admin);

router.get('/dashboard', getDashboard);
router.get('/users', listUsers);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;
