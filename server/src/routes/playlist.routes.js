const express = require('express');
const { auth } = require('../middleware/auth.middleware');
const { listPlaylists, createPlaylist, updatePlaylist, deletePlaylist, addSong, removeSong } = require('../controllers/playlist.controller');

const router = express.Router();

router.get('/', auth, listPlaylists);
router.post('/', auth, createPlaylist);
router.patch('/:id', auth, updatePlaylist);
router.delete('/:id', auth, deletePlaylist);
router.post('/:id/songs', auth, addSong);
router.delete('/:id/songs/:songId', auth, removeSong);

module.exports = router;
