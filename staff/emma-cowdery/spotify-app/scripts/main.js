spotifyApi.token = 'BQAR3zZFYNHlGYd2baG8tEOjEfeuoQqkoC-O8Qnd1riB__Eu_BNb63P74NKuC7-7N-yoCmJlnvAcUoS3hwTdiUbT1ubIfle02h927pMfR8o3LnC3c_TcjfoWw1H3ibF1qEfgeDtFxTqi'

const searchPanel = new SearchPanel
const artistPanel = new ArtistPanel
const albumPanel = new AlbumPanel
const tracksPanel = new TracksPanel
const errorPanel = new ErrorPanel

artistPanel.hide()
albumPanel.hide()
tracksPanel.hide()
errorPanel.hide()

const $root = $('#root')

$root.append(searchPanel.$container)
$root.append(artistPanel.$container)
$root.append(albumPanel.$container)
$root.append(tracksPanel.$container)
$root.append(errorPanel.$container)

searchPanel.onSearch = function(query) {
    try {
        logic.searchArtists(query, function(error, artists) {
            if (error) searchPanel.error = error.message
            else {
                artistPanel.artists = artists

                artistPanel.show()
            }
        })
    } catch(err) {

    }
}

artistPanel.selectedArtist = function(artistId) {
    try {
        logic.retrieveAlbums(artistId, function(error, albums) {
            if(error) artistPanel.error = error.message
            else {
                artistPanel.hide()

                albumPanel.albums = albums

                albumPanel.show()
            }
        })
    } catch (err) {
        artistPanel.error = err.message
    }
}

albumPanel.backToArtists = function() {
    albumPanel.hide()

    artistPanel.show()
}

albumPanel.selectedAlbum = function(albumId) {
    try {
        logic.retrieveTracks(albumId, function(error, tracks) {
            if(error) albumPanel.error = error.message
            else {
                albumPanel.hide()

                tracksPanel.tracks = tracks

                tracksPanel.show()
            }
        })
    } catch (err) {
        albumPanel.error = err.message
    }
}

tracksPanel.backToAlbums = function() {
    tracksPanel.hide()

    albumPanel.show()
}



