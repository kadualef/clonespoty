const express = require('express');
const { listSongs, createSong, addToHistory, toggleFavorite } = require('../controllers/song.controller');
const { auth, admin } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', listSongs);
router.post('/', auth, admin, createSong);
router.post('/:songId/history', auth, addToHistory);
router.post('/:songId/favorite', auth, toggleFavorite);

module.exports = router;
