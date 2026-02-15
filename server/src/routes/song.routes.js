const express = require('express');
const { getAllSongs, createSong } = require('../controllers/song.controller');
const { auth, admin } = require('../middleware/auth.middleware');
const router = new express.Router();

router.get('/', getAllSongs);
router.post('/', auth, admin, createSong);

module.exports = router;
