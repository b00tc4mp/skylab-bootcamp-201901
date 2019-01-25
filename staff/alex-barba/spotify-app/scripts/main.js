spotifyApi.token ='BQAKtcIpvUQvNVpWg1tlfXxjcpQ57zXvEn2DiuH--Ajc0fgYdtI6qDXZXTwBLfP3aW2DbId5ZbSGnRPji9ZCxVhscFv9ohty4WhjgCRuka0iS6IyjUca1rrnVTUxL_d8mxvUsRH71_WCit_jDg'

const searchPanel = new SearchPanel
const artistPanel = new ArtistPanel
const albumPanel = new AlbumPanel
const tracksPanel = new TracksPanel
const trackPanel = new TrackPanel
const errorPanel = new ErrorPanel

const $root = $('#root')

artistPanel.hide()
albumPanel.hide()
tracksPanel.hide()
trackPanel.hide()
errorPanel.hide()

$root.append(searchPanel.$container)
$root.append(artistPanel.$container)
$root.append(albumPanel.$container)
$root.append(tracksPanel.$container)
$root.append(trackPanel.$container)

searchPanel.onSearch = function (query) {
    try {
        logic.searchArtists (query, function (error, artists){
            if (error) searchPanel.error = error.message
            else {
                artistPanel.artists = artists

                artistPanel.show()
            }
        })
    } catch (err) {
        searchPanel.error = err.message
    }

}

artistPanel.onArtistSelected = function(artistId) {
    try {
        logic.retrieveAlbums(artistId, function(error, albums) {
            if(error) artistPanel.error = err.message
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

albumPanel.onAlbumSelected = function (albumId) {
    try {
        logic.retrieveTracks (albumId, function(error, tracks) {
            if (error) albumPanel.error = error.message
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

tracksPanel.onTrackSelected = function(trackId) {
    try {
        logic.retrieveTrack (trackId, function (error, track) {
            if (error) tracksPanel.error = error.message
            else {
                tracksPanel.hide()
        
                trackPanel.track = track

                trackPanel.show()
            }
        })
        
    } catch (err) {
        tracksPanel.error = error.message
    }
}
