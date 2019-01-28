spotifyApi.token = 'BQDBYYruAEb3wl4cxwZv238X0lP2_u-FXztJh0lJmggNEOM6_KOiJslUkgTa3oPIIkg22fV5I6de6L-c5AnH0ys2zZ5i7fcpblE8Feb0YOwqNGeR7era8SlvXGMk6RZomliLq331Nkp9A3JBWM-egmrlR-BZ7A'

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
    albumsPanel.clear()
    tracksPanel.clear()
    trackPanel.clear()
    try {
        logic.searchArtists(query, function(error, artists) {
            if (error) searchPanel.error = error.message
            else {
                albumsPanel.hide()
                tracksPanel.hide()
                trackPanel.hide()
                artistsPanel.artists = artists
                artistsPanel.show()
            }
        })
    } catch(err) {

    }
}

artistsPanel.onArtistSelected = function (artistId) {
    artistsPanel.clear()
    albumsPanel.clear()
    tracksPanel.clear()
    trackPanel.clear()
    try {
        logic.retrieveAlbums(artistId, function (error, albums) {
            if (error) console.error(error)
            else {
                
                artistsPanel.hide()
                tracksPanel.hide()
                trackPanel.hide()

                albumsPanel.albums = albums

                albumsPanel.show()
            }
        })
    } catch (err) {
        console.error(err)
    }
}

albumsPanel.onAlbumSelected = function (albumId) {
    artistsPanel.clear()
    albumsPanel.clear()
    tracksPanel.clear()
    trackPanel.clear()
    try {
        logic.retrieveTracks(albumId, function (error, tracks) {
            if (error) console.error(error)
            else {
                
                albumsPanel.hide()
                artistsPanel.hide()
                trackPanel.hide()

                tracksPanel.tracks = tracks

                tracksPanel.show()
            }
        })
    } catch (err) {
        console.error(err)
    }
}

tracksPanel.onTrackSelected = function (trackId) {
    artistsPanel.clear()
    albumsPanel.clear()
    tracksPanel.clear()
    trackPanel.clear()
    try {
        logic.retrieveTrack(trackId, function (error, track) {
            if (error) console.error(error)
            else {
                
                tracksPanel.hide()
                artistsPanel.hide()
                albumsPanel.hide()

                trackPanel.track = track

                trackPanel.show()
            }
        })
    } catch (err) {
        console.error(err)
    }
}