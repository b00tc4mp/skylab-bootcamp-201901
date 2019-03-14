import React, { Component } from "react";
import logic from "../../logic";
import Searcher from "../Searcher/index";
import Results from "../Results/index";
import Tracks from "../Tracks/index";

class Home extends Component {
  state = {
    artists: null,
    albums: null,
    tracks: null,
    currentArtist: null,
    currentAlbum: null
  };

  handleSearch = query =>
    logic.searchArtists(query, (error, artists) => {
      if (error) console.error(error);
      else {
        console.log(artists);
        this.setState({
          artists: artists,
          albums: null,
          tracks: null
        });
      }
    });

  handleArtistSelected = (id, name, image) =>
    logic.retrieveAlbums(id, (error, albums) => {
      console.log(albums);
      if (error) console.error(error);
      else {
        this.setState({
          currentArtist: {
            name,
            image
          },
          albums: albums,
          tracks: null
        });
      }
    });

  handleAlbumSelected = (id, name, image) =>
    logic.retrieveTracks(id, (error, tracks) => {
      if (error) console.error(error);
      else
      console.log(tracks);
        this.setState({
          currentAlbum: {
            name,
            image
          },
          tracks: tracks
        });
    });

  render() {
    const {
      handleSearch,
      handleArtistSelected,
      handleAlbumSelected,
      state: { artists, albums, tracks, currentArtist, currentAlbum }
    } = this;

    return (
      <section className="home">
        <Searcher onSearch={handleSearch} />
        {artists && !albums && (
          <Results
            title="Artists"
            results={artists}
            onItemClick={handleArtistSelected}
          />
        )}
        {albums && !tracks && (
          <Results
            title="Albums"
            results={albums}
            onItemClick={handleAlbumSelected}
          />
        )}
        {tracks && (<Tracks results={tracks} currentArtist={currentArtist} currentAlbum={currentAlbum} />)}
      </section>
    );
  }
}

export default Home;
