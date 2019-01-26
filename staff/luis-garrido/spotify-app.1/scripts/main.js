spotifyApi.token = 'BQAKOM1rSQSCRhZIS4iTxA0HGPH2HPH-Qfzgoc5sFK52-9o3rWmgNuW3aNKgZHC36TXHbQRRmM1XxzDaQSfdJEHUUy4CSalhqzArtkJQ0Quyt2kmbdeqxhYyCD98bOChP6v_hSzohVADVvJGu9gx-tDZhpms0Q'

const searchPanel = new SearchPanel
const artistsPanel = new ArtistsPanel
const albumsPanel = new AlbumsPanel
const tracksPanel = new TracksPanel
const trackPanel = new TrackPanel 

const $root = $('#root')

artistsPanel.hide()
albumsPanel.hide()
tracksPanel.hide()
trackPanel.hide()

$root.append(searchPanel.$container)
$root.append(artistsPanel.$container)
$root.append(albumsPanel.$container)
$root.append(tracksPanel.$container)
$root.append(trackPanel.$container)

searchPanel.onSearch = function(query) {
    artistsPanel.clear()
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

artistsPanel.onArtistSelected = function (artistId) {
    try {
        logic.retrieveAlbums(artistId, function (error, albums) {
            if (error) console.error(error)
            else {
                
                artistsPanel.hide()

                albumsPanel.albums = albums

                albumsPanel.show()
            }
        })
    } catch (err) {
        console.error(err)
    }
}

albumsPanel.onAlbumSelected = function (albumId) {
    try {
        logic.retrieveTracks(albumId, function (error, tracks) {
            if (error) console.error(error)
            else {
                
                albumsPanel.hide()

                tracksPanel.tracks = tracks

                tracksPanel.show()
            }
        })
    } catch (err) {
        console.error(err)
    }
}

tracksPanel.onTrackSelected = function (trackId) {
    try {
        logic.retrieveTrack(trackId, function (error, track) {
            if (error) console.error(error)
            else {
                
                tracksPanel.hide()

                trackPanel.track = track

                trackPanel.show()
            }
        })
    } catch (err) {
        console.error(err)
    }
}