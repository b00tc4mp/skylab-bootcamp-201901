class TracksList extends React.Component {
  state = {
    pause: true,
    playingTrackId: "",
    user: this.props.user,
    click: false
  };

  audio = null;

  handlePlay = (id, preview_url) => {
    const { state: playingTrackId } = this;

    if (playingTrackId === id && pause) {
      this.audio.play();
    } else {
      if (this.audio) this.audio.pause();
      this.setState({ playingTrackId: id, pause: false });
      this.audio = new Audio(preview_url);
      this.audio.play();
    }

    this.audio.onended = () => {
      this.setState({ playingTrackId: "" });
    };
  };

  handlePause = id => {
    this.setState({ pause: true });
    this.audio.pause();
  };

  handleBackToAlbums = event => {
    event.preventDefault();
    const {
      props: { onBackToAlbums }
    } = this;
    if (this.audio) this.audio.pause();
    onBackToAlbums();
  };

  handleAddFavoriteToggle = trackId => {
    const {
      props: { addFavoriteToggle }
    } = this;
    addFavoriteToggle(trackId);
    this.setState({ click: !this.state.click});
  }

  render() {
    const {
      handlePlay,
      handlePause,
      handleBackToAlbums,
      handleAddFavoriteToggle,
      props: { tracks, album, user },
      state: { pause, playingTrackId }
    } = this;

    return (
      <div className="container">
        <header className="search-section__header">
          <h3 className="search-section__title">
            <a
              href="#"
              className="search-section__back float-right"
              onClick={handleBackToAlbums}
            >
              <i className="fas fa-chevron-left" /> Back
            </a>
          </h3>
        </header>

        <div className="results row">
          <aside className="col-md-4 album-info">
            <div className="album">
              <div className="album__img-container">
                {album.images[0] ? (
                  <div
                    className="album__image"
                    style={{
                      backgroundImage: "url(" + album.images[0].url + ")"
                    }}
                  />
                ) : (
                  ""
                )}
              </div>
              <header className="album__header">
                <h4 className="album__name">{album.name}</h4>
                <h5 className="album__artist">{album.artists[0].name}</h5>
              </header>
            </div>
          </aside>
          <div className="col-md-8">
            <ul className="results tracks-list">
              {tracks.map(({ id, name, duration_ms, preview_url }) => {
                let minutes = Math.floor(duration_ms / 60000);
                let seconds = ((duration_ms % 60000) / 1000).toFixed(0);
                const duration =
                  minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
                  
                  let favorite;

                  if(user.favorites) {
                    favorite = user.favorites.find(fav => fav.trackId === id);
                  }


                let liClass =
                  playingTrackId === id && !pause
                    ? "tracks-list__track tracks-list__track--selected"
                    : "tracks-list__track";

                return (
                  <li key={id} className={liClass}>
                    <div className="tracks-list__icons">
                      <button className="tracks-list__music">
                        <i className="fas fa-music" />
                      </button>
                      <button
                        className="tracks-list__play"
                        onClick={() => handlePlay(id, preview_url)}
                      >
                        <i className="fas fa-play" />
                      </button>
                      <button
                        className="tracks-list__pause"
                        onClick={() => handlePause(id)}
                      >
                        <i className="fas fa-pause" />
                      </button>
                    </div>
                    <div className="tracks-list__name">{name}</div>
                    {
                      (typeof favorite === 'undefined')
                        ? (<div className="tracks-list__favorite" onClick={() => handleAddFavoriteToggle(id)}><i className="far fa-heart"></i></div>)
                        : (<div className="tracks-list__favorite" onClick={() => handleAddFavoriteToggle(id)}><i className="fas fa-heart"></i></div>)
                    }
                    
                    <div className="tracks-list__time">{duration}</div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
