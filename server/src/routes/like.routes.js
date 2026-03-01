const express = require('express');
const { auth } = require('../middleware/auth.middleware');
const { likeSong } = require('../controllers/like.controller');

const router = new express.Router();

router.post('/:songId', auth, likeSong);

module.exports = router;
