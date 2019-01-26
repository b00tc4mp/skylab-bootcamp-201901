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
        <input type="text" name="query" placeholder="Search Artist...">
        <button class="submit">Search</button>
    </form>
</section>`))

        this.__$form__ = this.$container.find('form')
        this.__$query__ = this.__$form__.find('input')

        var errorPanel = new ErrorPanel;
        this.$container.append(errorPanel.$container);
        this.__errorPanel__ = errorPanel;
    }


    set onSearch(callback) {
        this.__$form__.on("submit", event => {
            event.preventDefault()

            const query = this.__$query__.val()

            artistsPanel.clear()
            albumsPanel.clear()
            tracksPanel.clear()
            playPanel.clear()

            albumsPanel.hide()
            tracksPanel.hide()
            playPanel.hide()

            callback(query)
        })

    }

    set error(message){
        this.__errorPanel__.message=message
        this.__errorPanel__.show()
    }
}

class ArtistsPanel extends Panel {
    constructor(){
        super($(`<section class="results container p-3">
    <h3>Artists</h3>
    <ul class="row container"></ul>
</section>`))

        this.__$listArtists__=this.$container.find('ul')

        var errorPanel = new ErrorPanel;
        this.$container.append(errorPanel.$container);
        this.__errorPanel__ = errorPanel;

    }

    set artists(artists){
        artists.forEach (({id, name, images}) => {
            const image = images[0] ? images[0].url :  'https://cdn.pixabay.com/photo/2016/06/01/09/21/music-1428660_960_720.jpg'
            const $item=$(`<div  data-id=${id} class="card col-12 col-sm-6 col-md-4">
            <li>
                <img "card-img-top" src=${image} width="150px">
                <p "card-title">${name}</p>
            </li>
        </div>`)


            $item.click(() => {
                const id = $item.data('id')

                this.__onItemSelected__(id)                
            })

            this.__$listArtists__.append($item)

        })  
  
    }

    clear(){
        this.__$listArtists__.html('')
    }

    set onItemSelected(callback) {
        this.__onItemSelected__ = callback
    }

    set error(message){
        this.__errorPanel__.message=message
        this.__errorPanel__.show()
    }
    
}

class AlbumsPanel extends Panel{
    constructor(){
        super($(`<section class="results container">
        <h3>Albums</h3>
        <ul class="row container"></ul>
    </section>`))

    this.__$listAlbums__=this.$container.find('ul')

    var errorPanel = new ErrorPanel;
    this.$container.append(errorPanel.$container);
    this.__errorPanel__ = errorPanel;
    }

    set albums(albums){
        albums.forEach (({id, name, images}) => {
            const image = images[0] ? images[0].url :  'https://www.tunefind.com/i/album-art-empty.png'
            const $item=$(`<div  data-id=${id} class="card col-12 col-sm-6 col-md-4">
            <li>
                <img "card-img-top" src=${image} width="150px">
                <p "card-title">${name}</p>
            </li>
        </div>`)

            $item.click(() => {
                const id = $item.data('id')

                this.__onItemSelected__(id)                
            })

            this.__$listAlbums__.append($item)
        })
    }

    clear(){
        this.__$listAlbums__.html('')
    }

    set onItemSelected(callback) {
        this.__onItemSelected__ = callback
    }

    set error(message){
        this.__errorPanel__.message=message
        this.__errorPanel__.show()
    }
}

class TracksPanel extends Panel{
    constructor(){
        super($(`<section class="results container">
        <h3>Tracks</h3>
        <ul></ul>
    </section>`))
    
    this.__$listTracks__=this.$container.find('ul')

    var errorPanel = new ErrorPanel;
    this.$container.append(errorPanel.$container);
    this.__errorPanel__ = errorPanel;

    }


    set tracks(tracks){
        tracks.forEach (({id, name}) => {
            const $item=$(`<li data-id=${id}>${name}</li>`)

            $item.click(() => {
                const id = $item.data('id')

                this.__onItemSelected__(id)                
            })

            this.__$listTracks__.append($item)
        })
    }

    set onItemSelected(callback) {
        this.__onItemSelected__ = callback
    }

    clear(){
        this.__$listTracks__.html('')
    }

    set error(message){
        this.__errorPanel__.message=message
        this.__errorPanel__.show()
    }
}

class PlayPanel extends Panel{
    constructor(){
        super($(`<section class="results container">
        <h3>Play</h3>
        <ul></ul>
    </section>`))
    
    this.__$song__=this.$container.find('ul')

    var errorPanel = new ErrorPanel;
    this.$container.append(errorPanel.$container);
    this.__errorPanel__ = errorPanel;

    }

    set song(song){
        const $item=$(`<li data-id=${song.id}>${song.name}
            <audio controls>
                <source src=${song.preview_url} type="audio/mpeg">${song.preview_url}
            </audio>
        </li>`)
        this.__$song__.append($item)
    }

    set error(message){
        this.__errorPanel__.message=message
        this.__errorPanel__.show()
    }

    clear(){
        this.__$song__.html('')
    }

}

class ErrorPanel extends Panel{
    constructor(){
        super($(`<section class="error"></section>`))
    }

    set message(message){
        this.$container.text(message)
    }
}