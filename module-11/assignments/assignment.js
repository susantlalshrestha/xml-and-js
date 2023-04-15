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

const getGenres = async (token) => {
  const locale = "sv_US";
  const limit = 10;
  const result = await fetch(
    `https://api.spotify.com/v1/browse/categories?locale=${locale}&limit=${limit}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const data = await result.json();
  return data.categories.items;
};

const getPlaylistByGenre = async (token, genreId) => {
  const limit = 8;
  const result = await fetch(
    `https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const data = await result.json();
  return data.playlists.items;
};

const getTracksByPlaylist = async (token, playlistId) => {
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

let genres = [];
let token = null;

const loadGenres = async (gname, showPlaylist) => {
  if (!token) token = await getToken();
  if (genres.length === 0) genres = await getGenres(token);
  if (showPlaylist) {
    genres = await Promise.all(
      genres.map(async (genre) => {
        if (genre.playlist) return genre;
        const playlist = await loadPlaylist(genre.id);
        return { ...genre, playlist };
      })
    );
  }
  if (gname) {
    return genres.filter(({ name }) =>
      name.toLowerCase().includes(gname.toLowerCase())
    );
  }
  console.log(genres);
  return genres;
};

const loadPlaylist = async (genreId) => {
  let playlist = [];
  if (!genreId) return playlist;
  if (!token) token = await getToken();
  playlist = await getPlaylistByGenre(token, genreId);
  playlist = await Promise.all(
    playlist.map(async (playlist) => {
      if (playlist.tracklist) return playlist;
      const tracklist = await loadTracks(playlist.id);
      return { ...playlist, tracklist };
    })
  );
  return playlist;
};

const loadTracks = async (playlistId) => {
  if (!playlistId) return [];
  if (!token) token = await getToken();
  return await getTracksByPlaylist(token, playlistId);
};

const renderGenresWithPlaylist = (genres) => {
  const html = genres.map(createGenreElementWithPlaylist).join("");
  document.getElementById(`genre-container`).className = "genre-container";
  document.getElementById(`genre-container`).innerHTML = html;
};

const renderGenres = (genres) => {
  const html = genres.map(createGenreElement).join("");
  document.getElementById(`genre-container`).className = "genre-container-grid";
  document.getElementById(`genre-container`).innerHTML = html;
};

const createGenreElement = ({ name, icons: [icon] }) => `
    <div class="genre-card-grid">
        <img src="${icon.url}" alt"${name}" />
        <div class="genre-info-grid">
            <h3>${name}</h3>
        </div>
    </div>
`;

const createGenreElementWithPlaylist = ({
  name,
  id,
  icons: [icon],
  playlist,
}) => {
  if (playlist && playlist.length > 0) {
    return `
      <div class="genre-card">
        <div class="genre-title">
          <img src="${icon.url}" alt"${name}" />
          <h3>${name}</h3>
        </div>
        <div class="playlist-container">
          ${playlist.map((p, i) =>
            createPlaylistElement(p, i >= playlist.length - 2)
          )}
        </div>
      </div>
  `;
  }
};

const createPlaylistElement = (
  { name, external_urls: { spotify }, images: [image], tracklist },
  last
) => `
  <div class="playlist-card">
    <img src="${image.url}" alt"${name}" />
    <div class="${last ? "playlist-info-last" : "playlist-info"}">
      <div class="playlist-name">${name}</div>
    </div>
    <div class="${last ? "tracks-container-last" : "tracks-container"}">
      <div class="track-head">
        <div class="track-row">
          <p>Title</p>
          <p>Artists</p>
          <p>Album</p>
        </div>
      </div>
      <div class="track-body">
        ${tracklist.map(createTracksElement).join("")}
      </div>
    </div>
  </div>
`;

const createTracksElement = ({ track: { name, album, artists } }) => `
  <div class="track-row">
    <p>${name}</p>
    <p>${artists.map(({ name }) => name).join(", ")}</p>
    <p>${album.name}</p>
  </div>
`;

const onSubmit = (event) => {
  event.preventDefault();
  const name = event.target.name.value;
  const showPlaylist = event.target.showPlaylist.checked;
  const render = showPlaylist ? renderGenresWithPlaylist : renderGenres;
  loadGenres(name, showPlaylist).then(render);
};

const onReset = () => {
  loadGenres().then(renderGenres);
};

loadGenres().then(renderGenres);
