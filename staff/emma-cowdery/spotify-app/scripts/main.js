spotifyApi.token = 'BQBSK5Z3BlbTHw16cXH4w-NWHZShwQbqUHF-MxLlJpF3qglNub5LmDuKbdcFxhMMmibyq47bGgo-EPs9G2LHRcrBpWPwIL5gRsXFjrNn23j6Bin_cyvX0JUsq0M6c4gIKgWcIbX5HxGt'

const searchPanel = new SearchPanel
const artistPanel = new ArtistPanel
const albumPanel = new AlbumPanel
const tracksPanel = new TracksPanel
const trackPanel = new TrackPanel
const errorPanel = new ErrorPanel

artistPanel.hide()
albumPanel.hide()
tracksPanel.hide()
trackPanel.hide()
errorPanel.hide()

const $root = $('#root')

$root.append(searchPanel.$container)
$root.append(artistPanel.$container)
$root.append(albumPanel.$container)
$root.append(tracksPanel.$container)
$root.append(trackPanel.$container)
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
        searchPanel.error = err.message
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

tracksPanel.selectedTrack = function(id) {
    console.log('hello')
    try {
        console.log('hello2')
        logic.retrieveTrack(id, function(error, track) {
            console.log('hello3')
            if(error) tracksPanel.error = error.message
            else {
                console.log('hello4')
                tracksPanel.hide()

                trackPanel.track = track

                trackPanel.show()
            }
        })
    } catch (err) {
        tracksPanel.error = err.message
    }
}

trackPanel.backToTracks = function() {
    trackPanel.hide()

    tracksPanel.show()
}



