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
    <h2>Search</h2>
    <form>
        <div class="input-group mb-3">
        <input class="form-control search-input" type="text" name="query" placeholder="search artist...">
        <div>
            <button class="btn btn-outline-secondary" type="submit" id="button-addon2">Search</button>
        </div>
        </div>
    </form>
</section>`))

        this.__$form__ = this.$container.find('form')

        this.__$query__ = this.__$form__.find('input')

        var errorPanel = new ErrorPanel;
        this.$container.append(errorPanel.$container)
        this.__errorPanel__ = errorPanel
    }
    
    set onSearch(callback) {
        this.__$form__.on('submit', event => {
            event.preventDefault()

            const query = this.__$query__.val()

            callback(query)
        })
    }

    clear(){
        this.__errorPanel__.hide()
    } 
}

class ArtistPanel extends Panel {
    constructor() {
        super($(`<section class="container result">
    <h3>Artists</h3>
    <ul class="row center-block artistsList"></ul>
</section>`))

        this.__$list__ = this.$container.find('ul')

        var errorPanel = new ErrorPanel;
        this.$container.append(errorPanel.$container);
        this.__errorPanel__ = errorPanel;
    }

    set artists(artists) {
        artists.forEach(({ id, name }) => {
            let $item = $(`<li class="col-xs-12 col-sm-6 col-md-4 col-lg-2 artists align-middle" data-id=${id}>${name}</li>`)
            
            $item.click(function(event) {
                event.preventDefault()
                console.log($item.data('id'))
                console.log('selected',this.__$selectedArtist__)
                this.__$selectedArtist__($item.data('id'))
            }.bind(this)) 
            
            this.__$list__.append($item)
        })
    }

    set selectedArtist(callback) {
        this.__$selectedArtist__ = callback
        console.log(this.__$selectedArtist__)

    } 

    set error(message) {
        this.__errorPanel__.message = message
        this.__errorPanel__.show()
    }

    clear () {
        this.__$list__.empty()
    }  
}

class AlbumPanel extends Panel {
    constructor() {
        super($(`<section class="container result">
    <h3>Albums</h3>
    <div class="col text-right">
        <button class="btn btn-light btn-sm">Back to Artists</button>
    </div>
    <ul class="row center-block artistsList"></ul>
</section>`))

        this.__$list__ = this.$container.find('ul')

        this.__$backButton__ = this.$container.find('button')

        var errorPanel = new ErrorPanel;
        this.$container.append(errorPanel.$container);
        this.__errorPanel__ = errorPanel;
    }

    set albums(albums) {
        albums.forEach(({ id, name }) => {
            const $item = $(`<li class="col-xs-12 col-sm-6 col-md-4 col-lg-2 artists align-middle" data-id=${id}>${name}</li>`)
            
            $item.click(function(event) {
                event.preventDefault()
                console.log($item.data('id'))
                console.log('selected',this.__$selectedAlbum__)
                this.__$selectedAlbum__($item.data('id'))
            }.bind(this))

            this.__$list__.append($item)
        })
    }

    set selectedAlbum (callback) {
        this.__$selectedAlbum__ = callback
    }

    set error(message) {
        this.__errorPanel__.message = message;
        this.__errorPanel__.show()
    }

    set backToArtists (callback) {
        this.__$backButton__.on('click', callback)
    }

    clear () {
        this.__$list__.empty()
    } 
}

class TracksPanel extends Panel {
    constructor() {
        super($(`<section class="container">
    <h2>Tracks</h2>
    <div>
        <button>Back to Albums</button>
    </div>
    <ul class="row center-black artistsList></ul>
</section>`))

        this.__$list__ = this.$container.find('ul')

        this.__$backButton = this.$container.find('button')

        var errorPanel = new ErrorPanel;
        this.$container.append(errorPanel.$container);
        this.__errorPanel__ = errorPanel;
    }

    set tracks(tracks) {
        tracks.forEach(({ id, name }) => {
            const $item = $(`<li class="col-xs-12 col-sm-6 col-md-4 col-lg-2 artists align-middle" data-id=${id}>${name}</li>`)
            
            this.__$list__.append($item)    
        })
    }

    set selectedTrack(callback) {
        this.__$selectedTrack__ = callback
    }

    set error(message) {
        this.__errorPanel__.message = message;
        this.__errorPanel__.show()
    }

    set backToAlbums (callback) {
        this.__$backButton__.on('click', callback)
    }

    clear () {
        this.__$list__.empty()
    }

}

class ErrorPanel extends Panel {
    constructor() {
        super($(`<section class="error p-1"></section>`))
    }
    set message(message) {
        this.$container.text(message)
    }
}

        
