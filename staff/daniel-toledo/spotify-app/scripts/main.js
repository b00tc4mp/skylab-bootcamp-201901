spotifyApi.token = 'BQCiE5uL_sJGlENzZylNL1SSOGamImZG_Tro9anF6gda2t8q3XZvEPpL7LR40GkP_TdrG2XQ_mfMbL4v9z0QRDnWeHv7jhDM-JZRyk2NhvRzLfRCHmNb2Xly7_s43XRi_TlyRtcWEiE_TKDzjG8'

const searchPanel = new SearchPanel
const artistsPanel = new ArtistsPanel
const albumsPanel = new AlbumsPanel
const tracksPanel = new TracksPanel
const playPanel = new PlayPanel
const errorPanel = new ErrorPanel

const $root = $('#root')

artistsPanel.hide()
albumsPanel.hide()
tracksPanel.hide()
playPanel.hide()

$root.append(searchPanel.$container)
$root.append(artistsPanel.$container)
$root.append(albumsPanel.$container)
$root.append(tracksPanel.$container)
$root.append(playPanel.$container)
$root.append(errorPanel.$container)


searchPanel.onSearch = function (query) {
    try {
        logic.searchArtists(query, function (error, artists) {
            if (error) searchPanel.error = error
            else {
                artistsPanel.artists = artists

                artistsPanel.show()
            }
        })

    } catch (err) {

    }
}

artistsPanel.onItemSelected = function (id) {
    try {
        logic.retrieveAlbums(id, function (error, albums) {
            if (error) console.error(error) // ?
            else {
                artistsPanel.hide()

                albumsPanel.albums = albums

                albumsPanel.show()
            }
        })
    } catch (err) {
        console.error(err) // ?
    }
}

albumsPanel.onItemSelected = function (id) {
    try {
        logic.retrieveTracks(id, function (error, tracks) {
            if (error) console.error(error) // ?
            else {
                albumsPanel.hide()

                tracksPanel.tracks = tracks

                tracksPanel.show()
            }
        })
    } catch (err) {
        console.error(err) // ?
    }
}

tracksPanel.onItemSelected = function (id) {
    try {
        logic.retrieveSong(id, function (error, song) {
            if (error) console.log(error) //?
            else {
                tracksPanel.hide()

                playPanel.song = song

                playPanel.show()
            }
        })
    } catch (err) {
        console.error(err) // ?
    }
}