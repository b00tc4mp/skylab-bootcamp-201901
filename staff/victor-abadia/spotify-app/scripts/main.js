const searchPanel = new SearchPanel
const artistPanel = new ArtistPanel

const $root = $('#root')

artistPanel.hide()

$root.append(searchPanel.$container)
$root.append(artistPanel.$container)

searchPanel.onSearch = function (query) {
    try {
        logic.searchArtist(query, function (error, artist) {
            if (error) searchPanel.error = error
            else {
                artistPanel.artist = artist

                artistPanel.show()
            }
        })
    } catch (err) {

    }
};