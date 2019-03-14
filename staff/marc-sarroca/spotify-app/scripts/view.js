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

  clear() {
    this.$container.find("select").empty();
    const defaultOption = $(
      '<option selected disabled value="">Select...</option>'
    );
    this.$container.find("select").append(defaultOption);
  }
}

class SearchPanel extends Panel {
  constructor() {
    super(
      $(`<section class="search container">
        <h2>Search</h2>
    <form>
        <input type="text" name="query" placeholder="Search an artist...">
        <button type="submit">Search</button>
        <div class="error__search"></div>
    </form>
</section>`)
    );

    this.__$form__ = this.$container.find("form");
    this.__$query__ = this.__$form__.find("input");
    this.__$error__ = this.$container.find(".error__search");
  }

  set onSearch(callback) {
    this.__$form__.on("submit", event => {
      event.preventDefault();
      this.__$error__.empty();
      const query = this.__$query__.val();

      callback(query);
    });
  }

  set error(error) {
    this.__$error__.empty();
    const $item = $(`<p>ERROR: ${error}</p>`);
    this.__$error__.append($item);
  }
}

class ArtistsPanel extends Panel {
  constructor() {
    super(
      $(`<section class="results container">
    <h3>Artists</h3>
    <select></select>
</section>`)
    );

    this.__$list__ = this.$container.find("select");
  }

  set artists(artists) {
    artists.forEach(({ id, name }) => {
      const $item = $(`<option value=${id}>${name}</option>`);
      this.__$list__.append($item);
    });
  }

  set onChange(callback) {
    this.__$list__.on("change", event => {
      event.preventDefault();
      const artistId = this.__$list__.val();
      console.log("artistId", artistId);
      callback(artistId);
    });
  }
}

class AlbumsPanel extends Panel {
  constructor() {
    super(
      $(`<section class="results container">
        <h3>Albums</h3>
        <select>
        </select>
        </section>`)
    );
    this.__$listAlbums__ = this.$container.find("select");
  }
  set albums(albums) {
    albums.forEach(({ id, name }) => {
      const $item = $(`<option value=${id}>${name}</option>`);
      this.__$listAlbums__.append($item);
    });
  }

  set onChange(callback) {
    this.__$listAlbums__.on("change", event => {
      event.preventDefault();
      const albumId = this.__$listAlbums__.val();
      console.log(albumId);
      callback(albumId);
    });
  }
}

class PlayerPanel extends Panel {
  constructor() {
    super(
      $(`<section class="results container">
          <h3>Player</h3>
          <div class="player"></div>
          </section>`)
    );
    this.__$player__ = this.$container.find(".player");
  }

  set albumId(albumId) {
    const $item = $(
      `<iframe src="https://open.spotify.com/embed/album/${albumId}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`
    );
    this.__$player__.append($item);
  }

  clear() {
    this.__$player__.empty();
  }
}
