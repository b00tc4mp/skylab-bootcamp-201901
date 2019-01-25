spotifyApi.token = 'BQABxK23aIs1xin6CeUb_jF1GleCX4MgdKwB9XeNt91VQQ5li-IxDyeSYtqRmgzy6pjlV_PSkYWrB1NzIf-Dbt7Z5HrxqmYwje1OYeI7wPy2P1vlAnn_qBMZDuYTMo7av_JknyNH_dS1KZIJ9H0'

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

