const clientId = `49a52240e7834478a7de53557cca503e`;
const clientSecret = `5d0fbd61f69848c1b50df2cb8ef7a26b`;

const getToken = async () => {
  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(`${clientId}:${clientSecret}`),
    },
    body: "grant_type=client_credentials",
  });

  const data = await result.json();
  return data.access_token;
};

const getCategories = async (token) => {
  const result = await fetch(
    `https://api.spotify.com/v1/browse/categories?locale=sv_US`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const data = await result.json();
  return data.categories.items;
};

const getPlaylistByCategory = async (token, categoryId) => {
  const limit = 10;

  const result = await fetch(
    `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists?limit=${limit}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const data = await result.json();
  return data.playlists.items;
};

const getTracksByPlaylist = async (token, playlistId) => {
  const limit = 10;

  const result = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const data = await result.json();
  return data.items;
};

let categories = [];
let playlists = {};
let tracks = {};
let token = null;
const loadCategories = async (selectedId) => {
  if (!token) token = await getToken();
  if (categories.length === 0) categories = await getCategories(token);
  if (categories.length === 0) return;
  if (!selectedId) selectedId = categories[0].id;
  const genreElement = categories
    .map((genre) => createGenreElement(genre, selectedId))
    .join("");
  document.getElementById(`genres`).innerHTML = genreElement;
  loadPlaylist(selectedId);
};

const loadPlaylist = async (categoryId) => {
  if (!token) token = await getToken();
  if (!playlists[categoryId])
    playlists[categoryId] = await getPlaylistByCategory(token, categoryId);
  const playlistElement = (
    await Promise.all(
      playlists[categoryId].map(async (playlist) => {
        if (!tracks[playlist.id])
          tracks[playlist.id] = await getTracksByPlaylist(token, playlist.id);
        return createPlaylistElement(playlist, tracks[playlist.id]);
      })
    )
  ).join("");
  document.getElementById(`playlists`).innerHTML = playlistElement;
};

const onCategorySelect = async (categoryId) => {
  await loadCategories(categoryId);
};

const createGenreElement = ({ name, id, icons: [icon] }, selectedId) => {
  const genreClass = selectedId === id ? "genre_active" : "genre";
  return `<button class="${genreClass}" onclick="onCategorySelect('${id}')">
        <img src="${icon.url}" alt="${name}" />
        <h3>${name}</h3>
    </button>`;
};

const createPlaylistElement = (
  { name, description, external_urls: { spotify }, images: [image] },
  tracks
) => {
  return `<div class="playlist_card">
    <div class="playlist_img">
      <a href="${spotify}" alt="${name}" target="_blank">
        <img src="${image.url}" />
      </a>
    </div>
    <div class="playlist_info">
      <a href="${spotify}" alt="${name}" target="_blank"><h2>${name}</h2></a>
      <p>${description}</p>
    </div>
    <div class="playlist_tracks">
      <div class="track_row">
        <p>Title</p>
        <p>Artists</p>
        <p>Album</p>
      </div>
      ${tracks.map(createTrackElement).join("")}
    </div>
  </div>`;
};

const createTrackElement = ({ track: { name, album, artists } }) => {
  return `<div class="track_row">
    <p>${name}</p>
    <p>${artists.map(({ name }) => name).join(", ")}</p>
    <p>${album.name}</p>
  </div>`;
};

loadCategories();
