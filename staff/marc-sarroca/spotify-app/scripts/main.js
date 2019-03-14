const searchPanel = new SearchPanel();
const artistsPanel = new ArtistsPanel();
const albumsPanel = new AlbumsPanel();
const playerPanel = new PlayerPanel();
const $root = $("#root");

artistsPanel.hide();
albumsPanel.hide();
playerPanel.hide();

$root.append(searchPanel.$container);
$root.append(artistsPanel.$container);
$root.append(albumsPanel.$container);
$root.append(playerPanel.$container);

searchPanel.onSearch = function(query) {
  try {
    logic.searchArtists(query, function(error, artists) {
      artistsPanel.clear();
      artistsPanel.hide();
      albumsPanel.hide();
      playerPanel.hide();
      playerPanel.clear();

      if (error) {
        console.log("error", error);
        searchPanel.error = error.message;
      } else {
        if (artists.length === 0) {
          searchPanel.error = "No he oído este artista en mi vida Hulio";
        } else {
          artistsPanel.artists = artists;
          artistsPanel.show();
        }
      }
    });
  } catch (err) {}
};

artistsPanel.onChange = function(query) {
  console.log(query);
  try {
    logic.searchAlbums(query, function(error, albums) {
      if (error) artistsPanel.error = error.message;
      else {
        albumsPanel.hide();
        playerPanel.hide();
        albumsPanel.clear();
        albumsPanel.albums = albums;
        albumsPanel.show();
      }
    });
  } catch (err) {}
};

albumsPanel.onChange = function(albumId) {
  playerPanel.clear();
  playerPanel.albumId = albumId;
  playerPanel.show();
};
