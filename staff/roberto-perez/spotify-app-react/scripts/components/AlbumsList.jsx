class AlbumsList extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSearchTracks = (album) => {
    const {
      props: { onClickAlbum }
    } = this;
    onClickAlbum(album);
  };

  handleBackToArtists = event => {
    event.preventDefault();
    const {
      props: { onBackToArtists }
    } = this;
    onBackToArtists();
  }

  render() {
    const {
      handleSearchTracks,
      handleBackToArtists,
      props: { albums }
    } = this;

    return (
      <div className="container">
        <header className="search-section__header">
          <h3 className="search-section__title">Albums <a href="#" className="search-section__back float-right" onClick={handleBackToArtists}><i className="fas fa-chevron-left"></i> Back</a></h3>
        </header>
        <div className="results row">
          {albums.map((album) => {
            return (
              <div key={album.id} className="col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-2">
                <div className="album" onClick={() => handleSearchTracks(album)}>
                  <div className="album__img-container">
                    {album.images[0] ? <div className="album__image" style={{backgroundImage: 'url(' + album.images[0].url+ ')'}}></div> : ''}
                  </div>
                  <header className="album__header">
                    <h4 className="album__name">{album.name}</h4>
                  </header>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );

  }
}
