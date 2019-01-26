/**
 * view.js of Sporify App 
 */

/* Panel class defined with a jQuery element. Two functions created for this object. */ 

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

/* SearchPanel defined from Panel. Constructor defined creating and HTML snippet. Two sets defined: onSearch to send the query value to the callback function  when clicking on the search button and error to send the error message to the error panel and display it. errorClear function created to hide errorPanel when needed. */

class SearchPanel extends Panel {
    constructor(){
        super($(`<section class="search">
    <form class="input-group input-group-sm mb-3">
        <input class="form-control" id="inputGroup-sizing-sm" placeholder="Search an artist" aria-describedby="button-addon2" type="text" name="query"></input>
        <div class="input-group-append">
            <button class="btn btn-sm btn-outline-secondary green" id="button-addon2" type="submit">Search</button>
        </div>
    <form>
</section>`))
        
        this.__$form__ = this.$container.find('form')

        this.__$query__ = this.__$form__.find('input')

        var errorPanel = new ErrorPanel;
        this.$container.append(errorPanel.$container);
        this.__errorPanel__ = errorPanel;
    }
    set onSearch(callback) {
        this.__$form__.on('submit',  event => {
            event.preventDefault()

            const query = this.__$query__.val()

            callback(query)
        })
    }
    set error(message) {
        this.__errorPanel__.message = message
        this.__errorPanel__.show()
    }
    errorClear(){
        this.__errorPanel__.hide()
    } 
    
}

/* ArtistPanel defined from Panel. Constructor defined creating and HTML snippet. Three sets defined: artists to get artists data to be displayed, add a click function to each of them with another set to get the id from the artist to know which one has been chosen. Error to send the error message to the error panel and display it. clear function created to empty the results list when needed. */

class ArtistPanel extends Panel {
    constructor() {
        super($(`<section class="resultsArtist container">
    <h3>Artists</h3>
    <div class="card-columns"></div>    
</section>`))

        this.__$list__ = this.$container.find('div')

        var errorPanel = new ErrorPanel;
        this.$container.append(errorPanel.$container);
        this.__errorPanel__ = errorPanel;
    }
    set artists (artists){
        artists.forEach(({ id, name, images, popularity, genres }) =>{
            const genre = genres[0] ? genres[0] : 'No genre defined'
            const image = images[0] ? images[0].url :  'https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png'
            const $item =$(`<div data-id=${id} class="card">
    <img src="${image}" class="card-img-top">
    <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">Rank #${popularity}</p>
    </div>
    <div class="card-footer">
        <small class="text-muted">Genre: ${genre}</small>
    </div>
</div>`)

            $item.click(() => {
                const id = $item.data('id')

                this.__onArtistSelected__(id)                
            })
            this.__$list__.append($item)
        })
    }
    set onArtistSelected (callback) {
        this.__onArtistSelected__ = callback
    }
    set error(message) {
        this.__errorPanel__.message = message;
        this.__errorPanel__.show()
    }
    clear () {
        this.__$list__.empty()
    } 
}

/* AlbumPanel defined from Panel. Constructor defined creating and HTML snippet. Four sets defined: albums to get album data to be displayed, add a click function to each of them with another set to get the id from the album to know which one has been chosen. onBackToArtists to trigger callback function when back button is clicked. Error to send the error message to the error panel and display it. clear function created to empty the results list when needed. */

class AlbumPanel extends Panel {
    constructor() {
        super($(`<section class="resultsAlbum container">
    <div class="row">
        <h3 class="col">Albums</h3>
        <div class="col text-right">
            <button class="btn btn-light btn-sm">Back to Artists</button>
        </div>
    </div>
    <article class="card-columns"></article>   
</section>`))

        this.__$list__ = this.$container.find('article')

        this.__$backBtn__ = this.$container.find('button')

        var errorPanel = new ErrorPanel;
        this.$container.append(errorPanel.$container);
        this.__errorPanel__ = errorPanel;
    }
    set albums (albums){
        albums.forEach(({ id, name, images, release_date, total_tracks }) =>{
            const image = images[0] ? images[0].url :  'https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png'
            const $item =$(`<div data-id=${id} class="card">
    <img src="${image}" class="card-img-top">
    <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">Tracks :${total_tracks}</p>
    <div class="card-footer">
        <small class="text-muted">Released date: ${release_date}</small>
    </div>
</div>`)
           
            $item.click(() => {
                const id = $item.data('id')

                this.__onAlbumSelected__(id)                
            })
            this.__$list__.append($item)
        })
    }
    set onAlbumSelected (callback) {
        this.__onAlbumSelected__ = callback
    }
    set error(message) {
        this.__errorPanel__.message = message;
        this.__errorPanel__.show()
    }
    set onBackToArtists (callback) {
        this.__$backBtn__.on('click', callback)
    }
    clear () {
        this.__$list__.empty()
    } 
}

/* TracksPanel defined from Panel. Constructor defined creating and HTML snippet. Four sets defined: tracks to get tracks data to be displayed, add a click function to each of them with another set to get the id from the track to know which one has been chosen. onBackToAlbumsto trigger callback function when back button is clicked. Error to send the error message to the error panel and display it. clear function created to empty the results list when needed. */

class TracksPanel extends Panel {
    constructor(){
        super($(`<section class="tracksAlbum container">
    <div class="row">
        <h3 class="col">Tracks</h3>
        <div class="col text-right">
            <button class="btn btn-light btn-sm">Back to Albums</button>
        </div>
    </div>
    <ul class="list-group"></ul>    
</section>`))

    this.__$list__ = this.$container.find('ul')

    this.__$backBtn__ = this.$container.find('button')

    var errorPanel = new ErrorPanel;
    this.$container.append(errorPanel.$container);
    this.__errorPanel__ = errorPanel;
    }

    set tracks (tracks) {
        tracks.forEach(({id, name}) => {
            const $item = $(`<li data-id=${id} class="list-group-item list-group-item-action list-group-item-light">${name}</li>`)

            $item.click(() => {
                const id = $item.data('id')

                this.__onTrackSelected__(id)
            })
            this.__$list__.append($item)
        })
    }
    set onTrackSelected (callback) {
        this.__onTrackSelected__ = callback
    }
    set error(message) {
        this.__errorPanel__.message = message
        this.__errorPanel__.show()
    }
    set onBackToAlbums (callback) {
        this.__$backBtn__.on('click', callback)
    }
    clear() {
        this.__$list__.empty()
    } 
}

/* TrackPanel defined from Panel. Constructor defined creating and HTML snippet. Three sets defined: track to get track data to be displayed, onBackToTracks to trigger callback function when back button is clicked. Error to send the error message to the error panel and display it. clear function created to empty the results list when needed. */

class TrackPanel extends Panel {
    constructor() {
        super($(`<section class="trackChosen container">
    <div class="row">
        <h3 class="col">Track</h3>
        <div class="col text-right">
            <button class="btn btn-light btn-sm">Back to Tracks</button>
        </div>
    </div>
    <div class="d-flex justify-content-center">
        <article class="card" style="width: 18rem;"></article>
    </div>    
</section>`))

        this.__$list__ = this.$container.find('article')

        this.__$backBtn__ = this.$container.find('button')
       
        var errorPanel = new ErrorPanel;
        this.$container.append(errorPanel.$container)
        this.__errorPanel__ = errorPanel
    }
    set track ({id, name, preview_url}) {
            const image = 'https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png'
            const $item = $(`<img data-id=${id} class="card-img-top" src="${image}" alt="Card image cap">
<div class=""card-body"">
    <h5 class="card-text">${name}</h5>
    <audio src=${preview_url} controls> </audio>
</div>`)

            this.__$list__.append($item)
    }
    set error(message) {
        this.__errorPanel__.message = message
        this.__errorPanel__.show()
    }
    set onBackToTracks (callback) {
        this.__$backBtn__.on('click', callback)
    }
    clear() {
        this.__$list__.empty()
    } 
}

/* ErrorPanel defined from Panel. Constructor defined creating and HTML snippet to display the erros. Set defined to get and send message to be displayed in the errorPanel */

class ErrorPanel extends Panel {
    constructor() {
        super($(`<section class="error p-1"></section>`))
    }
    set message(message) {
        this.$container.text(message)
    }
}
