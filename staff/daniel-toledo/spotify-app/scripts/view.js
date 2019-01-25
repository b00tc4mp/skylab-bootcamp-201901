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
        super($(`<section class="results container">
    <h3>Artists</h3>
    <ul></ul>
</section>`))

        this.__$listArtists__=this.$container.find('ul')

    }

    set artists(artists){
        artists.forEach (({id, name}) => {
            const $item=$(`<li data-id=${id}>${name}</li>`)


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
    
}

class AlbumsPanel extends Panel{
    constructor(){
        super($(`<section class="results container">
        <h3>Albums</h3>
        <ul></ul>
    </section>`))

    this.__$listAlbums__=this.$container.find('ul')
    }

    set albums(albums){
        albums.forEach (({id, name}) => {
            const $item=$(`<li data-id=${id}>${name}</li>`)

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
}

class TracksPanel extends Panel{
    constructor(){
        super($(`<section class="results container">
        <h3>Tracks</h3>
        <ul></ul>
    </section>`))
    
    this.__$listTracks__=this.$container.find('ul')

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
}

class PlayPanel extends Panel{
    constructor(){
        super($(`<section class="results container">
        <h3>Play</h3>
        <ul></ul>
    </section>`))
    
    this.__$listSong__=this.$container.find('ul')

    }

    set song(song){
        const $item=$(`<li data-id=${song.id}>${song.name}
            <audio controls>
                <source src=${song.preview_url} type="audio/mpeg">${song.preview_url}
            </audio>
        </li>`)
        this.__$listSong__.append($item)
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