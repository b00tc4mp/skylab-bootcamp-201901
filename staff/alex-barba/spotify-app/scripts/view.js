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
    constructor(){
        super($(`<section class="search container">
    <h2>Search</h2>
    <form>
        <input type="text" name="query" placeholder="Search an artisit"></input>
        <button type="submit">Search</button>
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
        this.__errorPanel__.message = message;
        this.__errorPanel__.show();
    }
}

class ArtistPanel extends Panel {
    constructor() {
        super($(`<section class="resultsArtist container">
    <h3>Artists</h3>
    <ul></ul>    
</section>`))

        this.__$list__ = this.$container.find('ul')

        var errorPanel = new ErrorPanel;
        this.$container.append(errorPanel.$container);
        this.__errorPanel__ = errorPanel;
    }
    set artists (artists){
        artists.forEach(({ id, name, images }) =>{
            const image = images[0] ? images[0].url :  'https://cdn.pixabay.com/photo/2016/06/01/09/21/music-1428660_960_720.jpg'
            const $item =$(`<li data-id=${id}>${name}<img width="200px" src="${image}"></li>`)

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
        this.__errorPanel__.show();
    }
}

class AlbumPanel extends Panel {
    constructor() {
        super($(`<section class="resultsAlbum container">
    <h3>Albums</h3>
    <ul></ul>    
</section>`))

        this.__$list__ = this.$container.find('ul')

        var errorPanel = new ErrorPanel;
        this.$container.append(errorPanel.$container);
        this.__errorPanel__ = errorPanel;
    }
    set albums (albums){
        albums.forEach(({ id, name, images }) =>{
            const image = images[0] ? images[0].url :  'https://cdn.pixabay.com/photo/2016/06/01/09/21/music-1428660_960_720.jpg'
            const $item = $(`<li data-id=${id}>${name}<img width ="100px" src="${image}"></li>`)

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
        this.__errorPanel__.show();
    }
}

class TracksPanel extends Panel {
    constructor(){
        super($(`<section class="tracksAlbum container">
    <h3>Tracks</h3>
    <ul></ul>    
</section>`))

    this.__$list__ = this.$container.find('ul')

    var errorPanel = new ErrorPanel;
    this.$container.append(errorPanel.$container);
    this.__errorPanel__ = errorPanel;
    }

    set tracks (tracks) {
        tracks.forEach(({id, name}) => {
            const $item = $(`<li data-id=${id}>${name}</li>`)

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
        this.__errorPanel__.message = message;
        this.__errorPanel__.show();
    }
}

class TrackPanel extends Panel {
    constructor() {
        super($(`<section class="trackChosen container">
    <h3>Track</h3>
    <ul></ul>    
</section>`))

        this.__$list__ = this.$container.find('ul')
       
        var errorPanel = new ErrorPanel;
        this.$container.append(errorPanel.$container);
        this.__errorPanel__ = errorPanel;
    }

    set track ({id, name, preview_url}) {
            const $item = $(`<li data-id=${id}>${name}</li><li><source src=${preview_url} type="audio/mpeg"></li>`)

            this.__$list__.append($item)
    }

    set error(message) {
        this.__errorPanel__.message = message;
        this.__errorPanel__.show();
    }
}

class ErrorPanel extends Panel {
    constructor() {
        super($(`<section class="error"></section>`));
    }
    set message(message) {
        this.$container.text(message);
    }
}
