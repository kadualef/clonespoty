const axios = require('axios');

const spotifyApi = axios.create({ baseURL: 'https://api.spotify.com/v1' });

const getSpotifyAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: process.env.SPOTIFY_CLIENT_ID,
    response_type: 'code',
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    scope: 'playlist-read-private playlist-read-collaborative user-read-email',
  });

  return `https://accounts.spotify.com/authorize?${params.toString()}`;
};

const exchangeCode = async (code) => {
  const form = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
  });

  const basic = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');
  const { data } = await axios.post('https://accounts.spotify.com/api/token', form, {
    headers: { Authorization: `Basic ${basic}`, 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  return data;
};

const fetchMyPlaylists = async (token) => {
  const { data } = await spotifyApi.get('/me/playlists?limit=20', { headers: { Authorization: `Bearer ${token}` } });
  return data.items;
};

module.exports = { getSpotifyAuthUrl, exchangeCode, fetchMyPlaylists };
