import React, { Component } from "react";
// import "./index.sass";

class Tracks extends Component {
  render() {
    const {
      props: { results, currentArtist, currentAlbum }
    } = this;

    return (
      <div className="container">
        <header className="search-section__header">
          <h3 className="search-section__title" />
        </header>
        <div className="results row">
          <aside className="col-md-4 album-info">
            <div className="result">
              <div className="result__img-container">
                {currentAlbum.image ? (
                  <div
                    className="result__image"
                    style={{
                      backgroundImage: "url(" + currentAlbum.image + ")"
                    }}
                  />
                ) : (
                  ""
                )}
              </div>
              <header className="result__header">
                <h4 className="result__name">{currentAlbum.name}</h4>
                <h5 className="result__artist">{currentArtist.name}</h5>
              </header>
            </div>
          </aside>

          <div className="col-md-8">
            <ul className="results tracks-list">
              {results &&
                results.map(({ id, name, duration_ms, preview_url }) => {
                  let minutes = Math.floor(duration_ms / 60000);
                  let seconds = ((duration_ms % 60000) / 1000).toFixed(0);
                  const duration =
                    minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

                  return "";
                })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Tracks;
