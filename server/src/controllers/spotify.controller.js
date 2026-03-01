const prisma = require('../config/prisma');
const { getSpotifyAuthUrl, exchangeCode, fetchMyPlaylists } = require('../services/spotify.service');

const authUrl = async (_req, res) => res.json({ url: getSpotifyAuthUrl() });

const callback = async (req, res) => {
  try {
    const { code } = req.query;
    const tokenData = await exchangeCode(code);

    await prisma.spotifyAccount.upsert({
      where: { userId: req.user.id },
      update: {
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
        expiresAt: tokenData.expires_in ? new Date(Date.now() + tokenData.expires_in * 1000) : null,
      },
      create: {
        userId: req.user.id,
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
        expiresAt: tokenData.expires_in ? new Date(Date.now() + tokenData.expires_in * 1000) : null,
      },
    });

    return res.json({ connected: true });
  } catch (error) {
    return res.status(500).json({ error: error.response?.data || error.message });
  }
};

const importPlaylists = async (req, res) => {
  const account = await prisma.spotifyAccount.findUnique({ where: { userId: req.user.id } });
  if (!account) return res.status(400).json({ error: 'Conta Spotify não conectada.' });

  const playlists = await fetchMyPlaylists(account.accessToken);

  const imported = [];
  for (const item of playlists) {
    const playlist = await prisma.playlist.upsert({
      where: { spotifyId: item.id },
      update: { name: item.name, description: item.description || '', isPublic: item.public ?? false },
      create: {
        spotifyId: item.id,
        name: item.name,
        description: item.description || '',
        isPublic: item.public ?? false,
        importedFromApi: true,
        userId: req.user.id,
      },
    });
    imported.push(playlist);
  }

  res.json({ importedCount: imported.length, playlists: imported });
};

module.exports = { authUrl, callback, importPlaylists };
