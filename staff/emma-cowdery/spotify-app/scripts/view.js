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
        <input type="text" name="query" placeholder="search artist...">
        <button type="submit">Search</button>
    </form>
</section>`))

        this.__$form__ = this.$container.find('form')

        this.__$query__ = this.__$form__.find('query')
    }
    
    set onSearch(callback) {
        this.__$form__.on('submit', function(event) {
            event.preventDefault()

            const $query = this.__$query__.val()

            callback($query)
        })
    }
}

class ArtistPanel extends Panel {
    constructor() {
        super($(`<section class="result container">
    <h3>Artists</h3>
    <ul></ul>
</section>`))

        this.__$list__ = this.$container.find('ul')
    }

    set artists(artists) {
        artists.forEach(({ id, name }) => {
            const $item = $(`<li data-id=${id}>${name}</li>`)
            this.__$list__.append($item)
        })
    }
}