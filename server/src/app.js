const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const multer = require('multer');

dotenv.config();

const app = express();
const upload = multer({ dest: path.resolve(__dirname, 'uploads') });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));

app.get('/', (_req, res) => res.send('Spotify-like API online'));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/songs', require('./routes/song.routes'));
app.use('/api/playlists', require('./routes/playlist.routes'));
app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/spotify', require('./routes/spotify.routes'));

app.get('/api/seed', require('./seed'));

app.post('/api/admin/upload', upload.single('file'), (req, res) => {
  res.json({ filename: req.file.filename, url: `/uploads/${req.file.filename}` });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Erro interno.' });
});

const PORT = process.env.PORT || 5000;
if (require.main === module) app.listen(PORT, () => console.log(`Server running on ${PORT}`));

module.exports = app;
