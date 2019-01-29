spotifyApi.token = 'BQBgZG3rV_7gVKIwFnqa1DLEiO0P-VpSCT-Icu1xSQkZLOmjqb258_aexrKF5Jwb-paiScqL6xyIijups5bfkkj1CjU7Ub8_cd59-lE_BkNO4BaGW8xMy-FieBTVBBucuzmzEKZYd6pBDQ'

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




