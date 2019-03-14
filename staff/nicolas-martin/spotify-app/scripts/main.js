spotifyApi.token = 'BQBGuZLpjOxynjuuS_XUL-SX_t-fNAUOMM0bR0Z48KK9UcoFfo5f5pMwHtCCJ5dd7sF_qQ-kRCk2HmYw6jf6e2NX4kqhxxe9IeycS0AbaLYhFzvAeUH4sTXL1on-U9oBqH8uTHI75cpUcw'

const artistsPanel = new ArtistsPanel
const searchPanel = new SearchPanel
const paginationPanel = new PaginationPanel

const $root = $('#root')

$root.append(searchPanel.$container)
$root.append(artistsPanel.$container)

searchPanel.onSearch = function(query) {
    try {
        logic.searchArtists(query, function(error, artists) {
            if (error) searchPanel.error = error.message
            else {
                paginationPanel.hide()
                artistsPanel.artists =  artists

                if (artists.length > paginationPanel.numberResults){
                    paginationPanel.createNavBody = artists.length
                    paginationPanel.show()
                    artistsPanel.$container.append(paginationPanel.$container)
                    artistsPanel.hideShowPage()
                }

                paginationPanel.onClickPage = function (pageClicked) { 
                    paginationPanel.activePage = pageClicked
                    paginationPanel.disableNav()
                    artistsPanel.hideShowPage(pageClicked)
                } 
            }
        })
    } catch(err) {

    }
}




