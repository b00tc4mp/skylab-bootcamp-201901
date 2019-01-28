//const numberResults = 4
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
        super($(`<section class="search container col-8">
    <form class="d-flex justify-content-between">
        <input class="search__input form-control-lg flex-grow-1" type="text" name="query" placeholder="Search an artist..." autocomplete="off">
        <button class="btn btn-primary" type="submit">Search</button>
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
        super($(`<section class="results container d-flex flex-column justify-content-center text-center">
    <h3>Artists</h3>
    <section class="results__list d-flex flex-row flex-wrap"></section>
</section`))
        
        this.__$list__ = this.$container.find('.results__list')
    }

    
    set artists(artists) {
        let pageNumber
        artists.forEach((artist, index) => {
            let artistImage = artist.images.length ? artist.images[1].url : ''
            pageNumber = Math.floor(index/4)
            let $item = $(`
                <div class="results__list__artist col-6 d-flex flex-column justify-content-center" data-id="${artist.id}" data-page="${pageNumber+1}" style="background-image: url('${artistImage}')">
                    <h4 class="results__list__artist-title">${artist.name}</h4>
                    <span class="results__list__artist-followers">${artist.followers.total}</span>
                    <span class="results__list__artist-popularity">${artist.popularity}</span>
                    <div class="layer"></div>
                </div>`)
            this.__$list__.append($item)
        })
    }
}

class PaginationPanel extends Panel {
    constructor() {
        super($(`
            <nav class="results__list__artist-nav">
                <ul class="pagination justify-content-center">
                </ul>
            </nav>
        `))

        this.numberResults = 4 // number of result per page
        this.activePage = 1
    }

    set setPage(pageNumber) {
        this.activePage = pageNumber
    }

    set onClickPage(callback) {
        this.$container.find('a').each( (index, pageLink) => {
            $(pageLink).on('click', function(event){
                event.preventDefault()
                //callback($(this).data('page'))
                callback(this.text)
            })
        })       
    }

    set createNavBody(numResults) { // vhange name a result, cambiar a len o algo así

        this.$container.empty() // empty nav from li
        
        let numPages = numResults / 4
        for (let i = 0; i < numPages; i++) {
            var $item = $(`<li class="page-item"><a class="page-link" href="#">${i+1}</a></li>`)
            if (!i) { // first load - page 1
                $item.attr('disabled', 'disabled')
                $item.find('.page-link').attr('aria-disabled', 'true')
            }
            this.$container.append($item)
        }
    }

    disablePageActive() {
        console.log(this.activePage)
        let pageClicked = this.activePage

        // removing attr from li and aria-disabled from a
        this.$container.find('li').removeAttr('disabled')
        this.$container.find('a').removeAttr('aria-disabled')
        
        // adding attr to li and aria-disabled to a
        $(this.$container.find('li')[pageClicked-1]).attr('disabled', 'disabled')
        $(this.$container.find('li')[pageClicked-1]).children('a').attr('aria-disabled', 'true')

    }

}
