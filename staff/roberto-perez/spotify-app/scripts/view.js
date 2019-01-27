class Panel {
  constructor($container) {
    this.$container = $container;
  }

  show() {
    this.$container.show();
  }

  hide() {
    this.$container.hide();
  }

  fadeOut() {
    this.$container.fadeOut();
  }

  fadeIn() {
    this.$container.fadeIn();
  }
}

class HeaderPanel extends Panel {
  constructor() {
    super(
      $(`
            <header class="header" class="text-center">
                <div class="container">
                    <h1 class="header__title">Search in Skytify</h1>
                    <h2 class="header__subtitle">Find your favorite artists.</h2>
                </div>
            </header>
        `)
    );
  }
}

class SearchPanel extends Panel {
  constructor() {
    super(
      $(`<section class="search">
        <div class="container">
                <form>
                    <input type="text" name="query" class="search__query" autocomplete="off" placeholder="Search an artist...">
                </form>
            </div>
        </section>`)
    );

    this.__$form__ = this.$container.find("form");
    this.__$query__ = this.__$form__.find("input");
  }

  set onSearch(callback) {
    this.__$form__.on("submit", event => {
      event.preventDefault();

      const query = this.__$query__.val();

      callback(query);
    });
  }

}

class ArtistsPanel extends Panel {
  constructor() {
    super(
      $(`
            <section class="artists search-section">
                <div class="container">
                    <header class="search-section__header">
                        <h3 class="search-section__title">Artists</h3>
                    </header>
                    <div class="results row"></div>    
                </div>
            </section
        `)
    );

    this.__$list__ = this.$container.find(".results");
  }

  set artists(artists) {
    artists.forEach(({ id, name, images }) => {
      const $item = $(`
                <div data-id="${id}" class="col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-2">
                    <div class="artist">
                        <div class="artist__img-container">
                            <div class="artist__icon">
                                <svg width="80" height="79" viewBox="0 0 80 79" xmlns="http://www.w3.org/2000/svg"><title>Artist Icon</title><path d="M53.043 50.486L46.68 46.83c-.636-.366-1.074-.99-1.2-1.716-.125-.725.077-1.462.555-2.02l5.178-6.072c3.287-3.84 5.097-8.743 5.097-13.803V21.24c0-5.85-2.447-11.497-6.716-15.5C45.266 1.686 39.596-.343 33.66.048c-11.12.718-19.83 10.326-19.83 21.87v1.3c0 5.063 1.81 9.964 5.096 13.802l5.18 6.074c.476.558.678 1.295.553 2.02-.127.723-.563 1.35-1.202 1.717l-12.697 7.3C4.124 57.9 0 64.982 0 72.61v5.92h2.97v-5.92c0-6.562 3.548-12.653 9.265-15.902l12.702-7.3c1.407-.81 2.372-2.19 2.65-3.788.276-1.598-.17-3.22-1.222-4.454l-5.18-6.077C18.356 31.787 16.8 27.57 16.8 23.216v-1.3c0-9.982 7.49-18.287 17.05-18.906 5.124-.326 9.99 1.41 13.712 4.9 3.727 3.493 5.778 8.227 5.778 13.332v1.977c0 4.352-1.557 8.57-4.385 11.872l-5.18 6.074c-1.05 1.234-1.496 2.858-1.22 4.456.278 1.597 1.242 2.977 2.647 3.785l4.51 2.59c1.048-.61 2.16-1.12 3.33-1.51zM66.84 37.133v22.71c-2.038-2.203-4.942-3.592-8.17-3.592-6.143 0-11.14 5-11.14 11.14 0 6.143 4.996 11.14 11.14 11.14 6.142 0 11.14-4.997 11.14-11.14V42.28l8.705 5.027L80 44.732l-13.16-7.6zM58.67 75.56c-4.504 0-8.17-3.664-8.17-8.17 0-4.504 3.664-8.168 8.17-8.168 4.504 0 8.168 3.664 8.168 8.17 0 4.504-3.664 8.168-8.17 8.168z" fill="currentColor" fill-rule="evenodd"></path></svg>
                            </div>
                            <div class="artist__image"></div>
                        </div>
                        <header class="artist__header">
                            <h4 class="artist__name">${name}</h4>
                        </header>
                    </div>
                </div>
            `);

      if (images[0]) {
        $item.find(".artist__image").css("background-image", 'url(' + images[0].url + ')');
      }

      $item.on("click", () => {
        const id = $item.data("id");

        this.__onArtistSelectedCallback__(id);
      });

      this.__$list__.append($item);
    });

  }

  set onArtistSelected(callback) {
    this.__onArtistSelectedCallback__ = callback;
  }

  clear() {
    this.__$list__.empty();
  }
}

class AlbumsPanel extends Panel {
  constructor() {
    super(
      $(`
            <section class="albums search-section">
                <div class="container">
                    <header class="search-section__header">
                        <h3 class="search-section__title">Albums  <a href="#" class="search-section__back float-right"><i class="fas fa-chevron-left"></i> Back</a></h3>
                    </header>
                    <div class="results row"></div>    
                </div>
            </section
        `)
    );

    this.__$list__ = this.$container.find(".results");
    this.__$backButton__ = this.$container.find(".search-section__back");
  }

  set albums(albums) {
    // albums.forEach(({ id, name, images, artists: [{ name: artist }] }) => {
    albums.forEach((album) => {
      const $item = $(`
                <div data-id="${album.id}" class="col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-2">
                    <div class="album">
                        <div class="album__img-container">
                            <div class="album__image"></div>
                        </div>
                        <header class="album__header">
                            <h4 class="album__name">${album.name}</h4>
                            <h5 class="album__artist">${album.artist}</h5>
                        </header>
                    </div>
                </div>
            `);

      if (album.images[0]) {
        $item.find(".album__image").css("background-image", 'url(' + album.images[0].url + ')');
      }

      $item.on("click", () => {
        const id = $item.data("id");

        this.__onAlbumSelectedCallback__(album);
      });

      this.__$list__.append($item);
    });

  }

  set onAlbumSelected(callback) {
    this.__onAlbumSelectedCallback__ = callback;
  }

  set onBackToArtists(callback) {
    this.__$backButton__.on("click", callback);
  }

  clear() {
    this.__$list__.empty();
  }
}

class TracksPanel extends Panel {
  constructor() {
    super(
      $(`
            <section class="tracks">
                <div class="container">
                    <header class="search-section__header">
                        <h3 class="search-section__title"><a href="#" class="search-section__back float-right"><i class="fas fa-chevron-left"></i> Back</a></h3>
                    </header>
                    <div class="row">
                        <aside class="col-md-4 album-info">
                        <div class="album">
                            <div class="album__img-container">
                                <div class="album__image"></div>
                            </div>
                            <header class="album__header">
                                <h4 class="album__name"></h4>
                                <h5 class="album__artist"></h5>
                            </header>
                        </div>
                        </aside>
                        <div class="col-md-8">
                            <ul class="results tracks-list"></ul>
                        </div>
                    </div>
                </div>
            </section
        `)
    );

    this.__$list__ = this.$container.find(".results");
    this.__$backButton__ = this.$container.find(".search-section__back");
  }

  set tracks({tracks, album}) {

    $('.tracks .album__name').text(album.name);
    $('.tracks .album__artist').text(album.artists[0].name);
    if (album.images[0]) {
        $(".tracks .album__image").css("background-image", 'url(' + album.images[0].url + ')');
    }

    tracks.forEach(({ id, name, duration_ms, preview_url }) => {
      let minutes = Math.floor(duration_ms / 60000);
      let seconds = ((duration_ms % 60000) / 1000).toFixed(0);
      const duration = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

      const $item = $(`
                <li data-id="${id}" class="tracks-list__track">
                    <div class="tracks-list__icons">
                        <button class="tracks-list__music"><i class="fas fa-music"></i></button>
                        <button class="tracks-list__play"><i class="fas fa-play"></i></button>
                        <button class="tracks-list__pause"><i class="fas fa-pause"></i></button>
                    </div>
                    <div class="tracks-list__name">${name}</div>
                    <div class="tracks-list__time">${duration}</div>
                    <audio class="tracks-list__audio" src="${preview_url}"></audio>
                </li>
            `);

      const $play = $item.find(".tracks-list__play");
      const $pause = $item.find(".tracks-list__pause");
      const $audio = $item.find(".tracks-list__audio");

      $play.on("click", event => {
        this.__onPlayTrackCallback__($item);
      });

      $pause.on("click", event => {
        this.__onPauseTrackCallback__($item);
      });

      $audio.on("ended", event => {
        this.__onEndTrackCallback__($item);
      });

      this.__$list__.append($item);
    });
  }

  set onPlayTrack(callback) {
    this.__onPlayTrackCallback__ = callback;
  }

  set onPauseTrack(callback) {
    this.__onPauseTrackCallback__ = callback;
  }

  set onEndTrack(callback) {
    this.__onEndTrackCallback__ = callback;
  }

  set onBackToAlbums(callback) {
    this.__$backButton__.on("click", callback);
  }

  clear() {
    this.__$list__.empty();
  }
}

class TrackPanel extends Panel {
  constructor() {
    super(
      $(`<section class="results container">
    <h3>Track</h3>
    <ul></ul>
</section`)
    );

    this.__$list__ = this.$container.find("ul");
  }

  set track(track) {
    console.log(track);
    // tracks.forEach(({ id, name }) => {
    //     const $item = $(`<li data-id=${id}>${name}</li>`)

    //     $item.on('click', () => {
    //         const id = $item.data('id')

    //         //this.__onTrackSelectedCallback__(id)
    //     })

    //     this.__$list__.append($item)
    // })
  }
}

class ErrorPanel extends Panel {
  constructor() {
    super(
      $(`
            <section class="error">
                <a href="#" class="error__close"><i class="fas fa-times"></i></a>
                <p class="error__text"></p>
            </section>
        `)
    );
    
    this.__MAX_SECONDS_CLOSE = 4000;

    this.__$closeButton__ = this.$container.find('.error__close');
  }

  set error(message) {
    this.$container.find('.error__text').text(message);
    this.$container.show();
    setTimeout(() => {
        this.$container.fadeOut();
    }, this.__MAX_SECONDS_CLOSE);
  }

  set onClose(callback) {
    this.__$closeButton__ .on('click', callback);
  }
}
