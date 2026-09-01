const CLIENT_ID = process.env.REACT_APP_JAMENDO_CLIENT_ID;
const BASE_URL = "https://api.jamendo.com/v3.0";

export function getAlbumsEndpoint({ search = "", offset = 0, limit = 30 } = {}) {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    format: "json",
    limit: String(limit),
    offset: String(offset),
    imagesize: "400",
  });

  if (search.trim()) {
    params.set("namesearch", search.trim());
  } else {
    params.set("order", "popularity_total");
  }

  return `${BASE_URL}/albums/?${params.toString()}`;
}

export function getAlbumTracksEndpoint(albumId) {
  return `${BASE_URL}/albums/tracks/?client_id=${CLIENT_ID}&format=json&id=${albumId}&imagesize=400`;
}

// Maps a Jamendo /albums/ list response onto the Spotify "featured playlists" shape
// so the existing playlist-grid components don't need to know the data source changed.
export function mapAlbumsToPlaylistsResponse(jamendoData, message = "Popular Albums") {
  const albums = jamendoData?.results || [];

  return {
    message,
    playlists: {
      items: albums.map((album) => ({
        id: album.id,
        name: album.name,
        description: `Album by ${album.artist_name}`,
        owner: { display_name: album.artist_name },
        releaseDate: album.releasedate,
        images: [{ url: album.image }],
      })),
    },
  };
}

// Maps a Jamendo /albums/tracks/ response onto the Spotify "playlist" shape
// so the playlist-detail and track-list components don't need to know the data source changed.
export function mapAlbumTracksToPlaylistResponse(jamendoData) {
  const album = jamendoData?.results?.[0];

  if (!album) {
    return {};
  }

  return {
    id: album.id,
    name: album.name,
    description: `Album by ${album.artist_name}`,
    releaseDate: album.releasedate,
    images: [{ url: album.image }],
    tracks: {
      items: (album.tracks || []).map((track) => ({
        track: {
          id: track.id,
          duration: Number(track.duration),
          name: track.name,
          artists: [{ name: album.artist_name }],
          album: { images: [{ url: album.image }] },
          audio: track.audio,
          external_urls: { jamendo: `https://www.jamendo.com/album/${album.id}` },
        },
      })),
    },
  };
}
