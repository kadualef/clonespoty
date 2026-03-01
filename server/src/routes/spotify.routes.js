const express = require('express');
const { auth } = require('../middleware/auth.middleware');
const { authUrl, callback, importPlaylists } = require('../controllers/spotify.controller');

const router = express.Router();
router.use(auth);

router.get('/auth-url', authUrl);
router.get('/callback', callback);
router.post('/import-playlists', importPlaylists);

module.exports = router;
