const express = require('express');
const {
    createPlaylist,
    getPlaylists,
    addSongToPlaylist,
    getPlaylistSongs,
} = require('../controllers/playlist.controller');
const { auth } = require('../middleware/auth.middleware');

const router = new express.Router();

router.post('/', auth, createPlaylist);
router.get('/', auth, getPlaylists);
router.post('/:playlistId/songs', auth, addSongToPlaylist);
router.get('/:playlistId/songs', auth, getPlaylistSongs);

module.exports = router;
