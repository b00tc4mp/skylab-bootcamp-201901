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
        <input type="text" name="query" placeholder="Search an artist">
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

class ArtistPanel extends Panel {
    constructor() {
        super($(`<section class = "results container">
       <h3>Artist</h3>
       <ul></ul>
    </section>`))

        this.__$list__ = this.$container.find('ul')
    }

    set artist(artist) {

        artist.forEach(({ id }) => {
            const $item = $(`<li data-id=${id}>${name}</li>`)

            this.__$list__.append($item)
        })

    }
}