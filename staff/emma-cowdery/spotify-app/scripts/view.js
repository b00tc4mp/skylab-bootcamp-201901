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
        super($(`<section class="section container">
    <nav class="level">
        <div class="level-left">
            <div class="level-item">
                <h2 class="subtitle">Search</h2>
            </div>
            <div class="level-item">
                <form class="field has-addons">
                    <p class="control">
                        <input class="input level-item" type="text" name="query" placeholder="search artist...">
                    </p>
                    <p class="control">
                        <button class="button is-link is-inverted is-outlined level-item" type="submit" id="button-addon2"><i class="fas fa-search"></i></button>
                    <p/>
                </form>
            </div>
        </div>
        <div class="level-right">
            <p class="level-item">user</p>
        </div>
    </nav>
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
        super($(`<section class="container panel">
    <h3>Artists</h3>
    <div class="columns is-multiline is-centered is-mobile cards"></div>
</section>`))

        this.__$list__ = this.$container.find('div')

        var errorPanel = new ErrorPanel;
        this.$container.append(errorPanel.$container);
        this.__errorPanel__ = errorPanel;
    }

    set artists(artists) {
        artists.forEach(({ id, images, name, genres, followers, popularity }) => {
            const image = images[0] ? images[0].url : 'https://i.pinimg.com/originals/35/87/f8/3587f8e9df02e2990b93afb9cd6d2323.jpg'
            let $item = $(`<div class="card column is-one-quarter-widescreen is-one-third-desktop is-half-tablet is-three-quarters-mobile is-centered card" data-id=${id}>
    <div class="card-image">
        <figure class="image is-128by128">
            <img class="is-rounded" src=${image}>
        </figure>
    </div>
    <div class="card-content">
        <p class="tittle">${name}</p>
        <p class="content">${genres}</p>
    </div>
    <footer class="card-footer">
        <div class="card-footer-item">
            <p>Followers:<br>${followers.total}</p>
        </div>
        <div class="card-footer-item">
            <p>Popularity:<br>${popularity}</p>
        </div>
    </footer>   
</div>`)
            
            $item.click(function(event) {
                event.preventDefault()
                //console.log($item.data('id'))
                //console.log('selected',this.__$selectedArtist__)
                this.__$selectedArtist__($item.data('id'))
            }.bind(this)) 
            
            this.__$list__.append($item)
        })
    }

    set selectedArtist(callback) {
        this.__$selectedArtist__ = callback
        //console.log(this.__$selectedArtist__)

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
        super($(`<section class="container panel">
    <h3>Albums</h3>
    <button class="button">Back to Artists</button>
    <div class="columns is-multiline is-centered is-mobile cards"></div>
</section>`))

        this.__$list__ = this.$container.find('div')

        this.__$backButton__ = this.$container.find('button')

        var errorPanel = new ErrorPanel;
        this.$container.append(errorPanel.$container);
        this.__errorPanel__ = errorPanel;
    }

    set albums(albums) {
        albuoms.forEach(({ id, images, name, release_date }) => {
            const image = images[0] ? images[0].url : 'https://i.pinimg.com/originals/35/87/f8/3587f8e9df02e2990b93afb9cd6d2323.jpg'
            const $item = $(`<div class="card column is-one-quarter-widescreen is-one-third-desktop is-half-tablet is-three-quarters-mobile is-centered card" data-id=${id}>
    <div class="card-image">
        <figure class="image is-128by128">
            <img class="is-rounded" src=${image}>
        </figure>
    </div>
    <div class="card-content">
        <p class="titte">${name}</p>
        <p class="content">${release_date}</p>
    </div>
</div>`)
            
            $item.click(function(event) {
                event.preventDefault()
                //console.log($item.data('id'))
                //console.log('selected',this.__$selectedAlbum__)
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
        super($(`<section class="container panel">
    <h3>Tracks</h3>
    <button class="button">Back to Albums</button>
    <div class="columns is-multiline is-centered is-mobile cards"></div>
</section>`))

        this.__$list__ = this.$container.find('div')

        this.__$backButton__ = this.$container.find('button')

        var errorPanel = new ErrorPanel;
        this.$container.append(errorPanel.$container);
        this.__errorPanel__ = errorPanel;
    }

    set tracks (tracks) {
        tracks.forEach(({ id, name, album, duration_ms }) => {
            const $item = $(`<div class="card column is-one-quarter-widescreen is-one-third-desktop is-half-tablet is-three-quarters-mobile is-centered card" data-id=${id}>
    <div class="card-content">
        <p class="titte">${name}</p>
        <p class="content>Album: ${album}</p>
        <p class="content">${Math.round((duration_ms / 60000) * 100) / 100}min</p>
    </div>
</div>`)
            
            $item.click(function(event) {
                console.log($item.data('id'))
                event.preventDefault()

                this.__$selectedTrack__($item.data('id'))
            }.bind(this))

            this.__$list__.append($item)    
        })
    }

    set selectedTrack (callback) {
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

class TrackPanel extends Panel {    
    constructor() {
        super($(`<section class="container panel">
    <h3>Track</h3>
    <button class="button">Back to Tracks</button>
</section>`))

        this.__$backButton__ = this.$container.find('button')

        var errorPanel = new ErrorPanel;
        this.$container.append(errorPanel.$container);
        this.__errorPanel__ = errorPanel;
    }

    set track(track) {
        const $track = $(`<div data-id=${track.id}>
    <h3>${track.name}</h3>
    <audio controls autoplay loop class="audio">
        <source src=${track.preview_url} type="audio/mpeg">${track.preview_url}
    </audio>
</div>`)

        this.$container.append($track)
    }

    set error(message) {
        this.__errorPanel__.message = message
        this.__errorPanel__.show()
    }

    set backToTracks (callback) {
        this.__$backButton__.on('click', callback)
    }
}

class ErrorPanel extends Panel {
    constructor() {
        super($(`<section class="error"></section>`))
    }
    set message(message) {
        this.$container.text(message)
    }
}

        
