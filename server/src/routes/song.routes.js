const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { getAllSongs, createSong } = require('../controllers/song.controller');
const { auth, admin } = require('../middleware/auth.middleware');

const router = new express.Router();

const uploadsDir = path.resolve(__dirname, '../../uploads');
fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadsDir),
    filename: (_req, file, cb) => {
        const timestamp = Date.now();
        const ext = path.extname(file.originalname) || '.mp3';
        cb(null, `${timestamp}-${Math.round(Math.random() * 1e9)}${ext}`);
    },
});

const fileFilter = (_req, file, cb) => {
    if (file.mimetype === 'audio/mpeg' || file.originalname.toLowerCase().endsWith('.mp3')) {
        cb(null, true);
        return;
    }
    cb(new Error('Only MP3 files are allowed'));
};

const upload = multer({ storage, fileFilter });

router.get('/', getAllSongs);
router.post('/', auth, admin, upload.single('audio'), createSong);

module.exports = router;
