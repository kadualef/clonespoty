const express = require('express');
const { createPlaylist, getPlaylists, addSongToPlaylist } = require('../controllers/playlist.controller');
const { auth } = require('../middleware/auth.middleware');
const router = new express.Router();

router.post('/', auth, createPlaylist);
router.get('/', auth, getPlaylists);
router.post('/add-song', auth, addSongToPlaylist);

module.exports = router;
