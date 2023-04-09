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
  console.log(data);
  return data.playlists.items;
};

let genres = [];
let token = null;
const loadGenres = async (selectedId) => {
  if (!token) token = await getToken();
  if (genres.length === 0) genres = await getCategories(token);
  if (genres.length === 0) return;
  if (!selectedId) selectedId = genres[0].id;
  const genreElement = genres
    .map((genre) => createGenreElement(genre, selectedId))
    .join("");
  document.getElementById(`genres`).innerHTML = genreElement;
  loadPlaylist(selectedId);
};

const loadPlaylist = async (categoryId) => {
  if (!token) token = await getToken();
  const playlist = await getPlaylistByCategory(token, categoryId);
  const playlistElement = playlist.map(createPlaylistElement).join("");
  document.getElementById(`playlists`).innerHTML = playlistElement;
};

const onGenreSelect = async (categoryId) => {
  await loadGenres(categoryId);
  await loadPlaylist(categoryId);
};

const createGenreElement = ({ name, id, icons: [icon] }, selectedId) => {
  const genreClass = selectedId === id ? "genre_active" : "genre";
  return `<button class="${genreClass}" onclick="onGenreSelect('${id}')">
        <img src="${icon.url}" alt="${name}" />
        <h3>${name}</h3>
    </button>`;
};

const createPlaylistElement = ({
  name,
  external_urls: { spotify },
  images: [image],
}) => {
  return `<div class="playlist_card">
    <a href="${spotify}" alt="${name}" target="_blank">
      <img src="${image.url}" />
    </a>
  </div>`;
};

loadGenres();
