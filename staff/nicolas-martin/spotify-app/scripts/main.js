spotifyApi.token = 'BQCzx7AAmNZSSxWotXoPOv7V2kHbKLEaMkaP-dpdhmjCMdTt29amPQVO3d2a3KNS-HMW16Fy9Ud-VhHzOy4WRiM0FzuPKXNoOz_JEO7qVwbLQMTL0XpCFQPtHeg-uG4u-8BH0wPEeKPxUw'

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




