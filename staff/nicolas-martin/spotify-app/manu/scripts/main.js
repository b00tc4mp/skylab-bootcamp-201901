spotifyApi.token = 'BQC79r5eaV8WDsIm8tvud4QwlZS4i5c-r7hM79dINvb7Q4HDNHnRw99hnWBY_63EtHimAqRzqvBC5sI34yOiIIgdeJqKcluatIqG5UV_1QEFe1WMz6-VpIIJAK9-tSFyvdU7b1IT2okerQ'

const searchPanel = new SearchPanel
const artistsPanel = new ArtistsPanel
const paginationPanel = new PaginationPanel

const $root = $('#root')

$root.append(searchPanel.$container)
$root.append(artistsPanel.$container)

artistsPanel.hide()

searchPanel.onSearch = function(query) {
    try {
        logic.searchArtists(query, function(error, artists) {
            if (error) searchPanel.error = error.message
            else {
                artistsPanel.artists = artists
                artistsPanel.show()

                paginationPanel.init = artists.length // we call init on every search
                artistsPanel.$container.append(paginationPanel.__$pagination__) // append at the end of results
                
                paginationPanel.onClickPage = function (pageClicked) {
                    artistsPanel.$container.find('.results__list__artist').hide() // hide all artists container
                    artistsPanel.$container.find(`[data-page="${pageClicked}"]`).show() // show only the page clicked
                    paginationPanel.setPage = pageClicked
                }
                     
            }
        })
    } catch(err) {

    }
}




