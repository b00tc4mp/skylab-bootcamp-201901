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
        <input type="text" name="query" placeholder="Search an artist...">
        <button type="submit">Search</button>
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
            const $item = $(`<li class="artist" data-id=${id}>${name}</li>`)
            this.__$list__.append($item)


            $item.click(() => {
                const id = $item.data('id')
                $item.css({"color": "red"})
                this.__onArtistSelectedCallback__(id)
            })
        })
    }

    set onArtistClicked(callback){
        this.__onArtistSelectedCallback__ = callback
    }

    focusOnItem(id){
        this.__$listli__ = $('li')

        for(var i = 0; i < this.__$listli__.length; i++){
            if($(this.__$listli__.eq(i)).data('id') == id){
                $(this.__$listli__.eq(i)).css({"color": "red"})
            }
        }
    }
    clearstyles(){
        $('.artist').css('color', 'black')
    }
    clear(){
        this.__$list__.html('')
    }

    getImageURL(array, id){
        //return array[i]['preview_url']
        for(var i = 0; i < array.length; i++){
            if(array[i]['id'] == id){
                return array[i]['images'][0]
             }
        }
    }
}












class AlbumPanel extends Panel {
    constructor(){
        super($(`<section class="results container album">
    <h3>Albums</h3>
    <ul></ul>
</section`))
        this.__$title__= this.$container.find('h3')
        this.__$list__ = this.$container.find('ul')
    }

    set albums(albums){
        albums.forEach(({ id, name }) => {
            const $item = $(`<li class="album" data-id=${id}>${name}</li>`)
            this.__$list__.append($item)

            $item.click(() => {
                const id = $item.data('id')
                $item.css({"color": "blue"})
                this.__onAlbumSelectedCallback__(id)
            })
        })
    }
    set onAlbumClicked (callback){
        this.__onAlbumSelectedCallback__ = callback
    }

    focusOnItem(id){
        this.__$listli__ = $('li')

        for(var i = 0; i < this.__$listli__.length; i++){
            if($(this.__$listli__.eq(i)).data('id') == id){
                $(this.__$listli__.eq(i)).css({"color": "blue"})
            }
        }
    }

    clearstyles(){
        $('.album').css('color', 'black')
    }

    clear(){
        this.__$list__.html('')
    }
}









class SongPanel extends Panel{
    constructor(){
        super($(`<section class="results container songs">
            <h3>Songs</h3>
            <ul></ul>
        </section`))
        this.__$list__ = this.$container.find('ul')
    }

    set songs(songs){
        songs.forEach(({ id, name }) => {
            const $item = $(`<li class="song" data-id=${id}>${name}</li>`)
            this.__$list__.append($item)

            $item.click(() => {
                const id = $item.data('id')
                this.__onSongselectedCallback__(id)
            })
        })
    }

    set onSongClicked (callback){
        this.__onSongselectedCallback__ = callback
    }


    focusOnItem(id){
        this.__$listli__ = $('li')

        for(var i = 0; i < this.__$listli__.length; i++){
            if($(this.__$listli__.eq(i)).data('id') == id){
                $(this.__$listli__.eq(i)).css({"color": "yellow"})
            }
        }
    }

    clear(){
        this.__$list__.html('')
    }

    clearstyles(){
        $('.song').css('color', 'black')
    }

    retrievesongId(array, id){
        for(var i = 0; array.length; i++){
             if(array[i]['id'] == id){
                return array[i]['preview_url']
             }
        }
    }

}

class Mp3Player extends Panel{
    constructor(){
        super($(`<section class="results container mp3">
            <img>
            <audio controls autoplay></audio>
        </section`))
    }

    set Song(track){
        const audio = document.getElementsByTagName('audio')[0]
        audio.setAttribute("src", track);
    }

    stopAudio(){
        const audiotrack = document.getElementsByTagName('audio')[0]
        audiotrack.pause()
    }


}
