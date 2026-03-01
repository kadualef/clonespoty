const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));

app.get('/', (req, res) => {
    res.send('Spotify Clone API is running');
});

const authRoutes = require('./routes/auth.routes');
const songRoutes = require('./routes/song.routes');
const playlistRoutes = require('./routes/playlist.routes');
const likeRoutes = require('./routes/like.routes');

app.use('/api/auth', authRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/like', likeRoutes);

const seed = require('./seed');
app.get('/api/seed', seed);

const PORT = process.env.PORT || 5000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
