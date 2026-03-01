const express = require('express');
const { register, login, profile, updatePlan } = require('../controllers/auth.controller');
const { auth } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, profile);
router.patch('/me/plan', auth, updatePlan);

module.exports = router;
