class SearcherApp extends React.Component {
  constructor() {
    super();
    this.state = {
      showSearcherHeader: true,
      showArtistsList: false,
      showAlbumsList: false,
      showTracksList: false,
      currentAlbum: null,
      feedback: '',
      artists: null,
      albums: null,
      tracks: null
    };
  }

  handleSearch = query => {
    try {
      logic.searchArtists(query, (error, artists) => {
        if (error) this.setState({ feedback: error.message });
        else {
          this.setState({ artists });
          this.setState({ showArtistsList: true, showSearcherHeader: false });
        }
      });
    } catch ({ message }) {
      this.setState({ feedback: message });
    }
  };

  handleSearchAlbums = artistId => {
    try {
      logic.retrieveAlbums(artistId, (error, albums) => {
        if (error) this.setState({ feedback: error.message });
        else {
          this.setState({ albums });
          this.setState({ showArtistsList: false, showAlbumsList: true });
        }
      });
    } catch ({ message }) {
      this.setState({ feedback: message });
    }
  };

  handleSearchTracks = album => {
    try {
      this.setState({ currentAlbum: album });
      logic.retrieveTracks(album.id, (error, tracks) => {
        if (error) this.setState({ feedback: error.message });
        else {
          this.setState({ tracks });
          this.setState({ showArtistsList: false, showAlbumsList: false, showTracksList: true });
        }
      });
    } catch ({ message }) {
      this.setState({ feedback: message });
    }
  };

  handleAddFavoriteToggle = trackId => {
    const { props: {user, updateUserState} } = this;
    try {
      logic.addFavoriteToggle(trackId, user, (error, user) => {
        if (error) this.setState({ feedback: error.message });
        else {
          updateUserState(user);
        }
      });
    } catch ({ message }) {
      this.setState({ feedback: message });
    }
  };

  handleBackToArtists = () => {
    this.setState({ showArtistsList: true, showAlbumsList: false });
  };

  handleBackToAlbums = () => {
    this.setState({ showTracksList: false, showAlbumsList: true });
  };

  render() {
    const {
      handleSearch,
      handleSearchAlbums,
      handleSearchTracks,
      handleBackToArtists,
      handleBackToAlbums,
      handleAddFavoriteToggle,
      state: { feedback, artists, albums, tracks, currentAlbum },
      props: { user }
    } = this;

    return (
      <div>
        <Searcher onSearch={handleSearch} feedback={feedback} />
        {this.state.showSearcherHeader && (
          <SearcherHeader />
        )}
        {this.state.showArtistsList && (
          <ArtistsList onClickArtist={handleSearchAlbums} artists={artists} />
        )}
        {this.state.showAlbumsList && (
          <AlbumsList onClickAlbum={handleSearchTracks} onBackToArtists={handleBackToArtists} albums={albums} />
        )}
        {this.state.showTracksList && (
          <TracksList tracks={tracks} onBackToAlbums={handleBackToAlbums} album={currentAlbum} addFavoriteToggle={handleAddFavoriteToggle} user={user} />
        )}
      </div>
    );
  }
}
