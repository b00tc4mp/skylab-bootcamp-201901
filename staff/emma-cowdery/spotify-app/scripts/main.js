const searchPanel = new SearchPanel
const artistPanel = new ArtistPanel

const $root = $('#root')

artistPanel.hide()

$root.append(searchPanel.$container)
$root.append(artistPanel.$container)

searchPanel.onSearch = function(query) {
    try {
        logic.searchArtists(query, function(error, artists) {
            if (error) searchPanel.error = erro
            else {
                artistPanel.artists = artists
            }
        })
    } catch(err) {

    }
}

