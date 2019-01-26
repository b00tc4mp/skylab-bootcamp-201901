class Panel {
    constructor($container) {
        this.$container = $container
    }

    show() {
        this.$container.show()
    }

    hide() {
        this.$container.hide()
    }
}

class SearchPanel extends Panel {
    constructor() {
        super($(`<section class="search container">
    <form class="searchingForm">
        <span class="searchingForm__headphones">🎧</span><input type="text" name="query" class="searchingForm__input" placeholder="Search an artist...">
        <button type="submit" class="searchingForm__button">Search</button>
    </form>
</section>`))

        this.__$form__ = this.$container.find('form')
        this.__$query__ = this.__$form__.find('input')
    }

    set onSearch(callback) {
        this.__$form__.on('submit', event => {
            event.preventDefault()

            const query = this.__$query__.val()

            callback(query)
        })
    }
}

class ArtistsPanel extends Panel {
    constructor() {
        super($(`<section class="results container">
    <h3>Artists</h3>
    <ul></ul>
</section`))

        this.__$list__ = this.$container.find('ul')
    }

    set artists(artists) {
        artists.forEach(({ id, name }) => {
            const $artist = $(`<li data-id=${id}>${name}</li>`)

            $artist.click(() => {
                const id = $artist.data('id')
    
                this.__onArtistSelectedCallback__(id)                
            })

            this.__$list__.append($artist)
        })
    }

    clear() {
        this.__$list__.html('');
    }

    set onArtistSelected(callback) {
        this.__onArtistSelectedCallback__ = callback
    }

}

class AlbumsPanel extends Panel {
    constructor() {
        super($(`<section class="results container">
    <h3>Albums</h3>
    <ul></ul>
</section`))

        this.__$list__ = this.$container.find('ul')
    }

    set albums(albums) {
        albums.forEach(({ id, name }) => {
            const $album = $(`<li data-id=${id}>${name}</li>`)

            $album.click(() => {
                const id = $album.data('id')
    
                this.__onAlbumSelectedCallback__(id)                
            })

            this.__$list__.append($album)
        })
    }

    clear() {
        this.__$list__.html('');
    }

    set onAlbumSelected(callback) {
        this.__onAlbumSelectedCallback__ = callback
    }

}

class TracksPanel extends Panel {
    constructor() {
        super($(`<section class="results container">
    <h3>Tracks</h3>
    <ul></ul>
</section`))

        this.__$list__ = this.$container.find('ul')
    }

    set tracks(tracks) {
        tracks.forEach(({ id, name }) => {
            const $track = $(`<li data-id=${id}>${name}</li>`)

            $track.click(() => {
                const id = $track.data('id')
    
                this.__onTrackSelectedCallback__(id)                
            })

            this.__$list__.append($track)
        })
    }

    clear() {
        this.__$list__.html('');
    }

    set onTrackSelected(callback) {
        this.__onTrackSelectedCallback__ = callback
    }

}

class TrackPanel extends Panel {
    constructor() {
        super($(`<section class="results container">
    <h3>Track</h3>
    <ul></ul>
</section`))

        this.__$list__ = this.$container.find('ul')
    }

    set track(track) {
        track.forEach(({ id, name }) => {
            const $track = $(`<li data-id=${id}>${name}</li>`)

            // $track.click(() => {
            //     const id = $track.data('id')
    
            //     this.__onTrackSelectedCallback__(id)                
            // })

            this.__$list__.append($track)
        })
    }

    clear() {
        this.__$list__.html('');
    }

    // set onTrackSelected(callback) {
    //     this.__onTrackSelectedCallback__ = callback
    // }

}