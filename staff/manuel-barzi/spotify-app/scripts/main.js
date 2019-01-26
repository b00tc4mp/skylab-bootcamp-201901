spotifyApi.token = 'BQCnSDHCsm8GsQi_5Lc0XxKxjyDBHtSio2F-ss14hsU0XAf9KBdxQSjmcfc3qRWr7cwj7PcGVhMdsQNzPvdo3KnCAFO-511UHl77w6cK3aUOrOflnTB1d25RN5exwyTz9REo-Vj10eYn_NM'

const searchPanel = new SearchPanel
const artistsPanel = new ArtistsPanel

const $root = $('#root')

artistsPanel.hide()

$root.append(searchPanel.$container)
$root.append(artistsPanel.$container)

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

