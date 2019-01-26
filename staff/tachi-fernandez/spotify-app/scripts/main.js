spotifyApi.token = 'BQA3anbwu6JSLCjwq7jJjfFmNy_mLQRnr9oP0WhJRZBfoqcVCpXKXg2kyF8dNoENXtyazGoJE5tprzbJhTBtCvCggCPKCoBc2Zpp4EGWTXh-nwEfoU3gnQFSNdSOGVc_mpVtL8kg2offVz3t6Tg'

const searchPanel = new SearchPanel
const artistsPanel = new ArtistsPanel
// const retrievePanel = new RetrieveAlbums

const $root = $('#root')

artistsPanel.hide()

$root.append(searchPanel.$container)
$root.append(artistsPanel.$container)
// $root.append(retrievePanel.$container)

searchPanel.onSearch = function(query) {
    try {
        logic.searchArtists(query, function(error, artists) {
            if (error) searchPanel.error = error.message
            else {
                artistsPanel.artists = artists

                artistsPanel.show()
            }
        })
    } catch(err) {

    }
}

// retrieveAlbums.Click = function(click){
//     try{
//         logic.retrieveAlbums(click)
//     }

// }