/**
 * main.js of the Spotify App
 */

 /* Token is set in global scope so that it can always be accesed. Has to be updated every hour */

spotifyApi.token ='BQDYL4SBxu1BaQbg4sgga_xG8ttMybdd7gTgKSh76UqwbOAd9o3vgD3QzvCbOckKfauSLtP4Pdto0IjrWfgODY3D4q2tYoAZCZ7LlWQW10GsBRyZlWB9KE60Eu0DZmsqYF86K9jB53UhHhVZoQ'

/*  All the panels are decalred */

const searchPanel = new SearchPanel
const artistPanel = new ArtistPanel
const albumPanel = new AlbumPanel
const tracksPanel = new TracksPanel
const trackPanel = new TrackPanel
const errorPanel = new ErrorPanel

/* All panels that need to be hidden at the beginning */

artistPanel.hide()
albumPanel.hide()
tracksPanel.hide()
trackPanel.hide()
errorPanel.hide()

/* Panels appended to the root (main of the body) */

const $root = $('#root')

$root.append(searchPanel.$container)
$root.append(artistPanel.$container)
$root.append(albumPanel.$container)
$root.append(tracksPanel.$container)
$root.append(trackPanel.$container)

/* onSearch function is declared at the searchPanel. All panels are cleared and hidden everytime a search is made. searchArtists function is called in logic.js to contact API and get the error or the artists data. If error, the errorPanel shows the error. If data is obtained, the data is sent to function artists to be properly displayed and the artistPanel is shown */

searchPanel.onSearch = function (query) {
    artistPanel.clear()
    albumPanel.clear()
    tracksPanel.clear()
    trackPanel.clear()
    searchPanel.errorClear()

    artistPanel.hide()
    albumPanel.hide()
    tracksPanel.hide()
    trackPanel.hide()
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

/* onArtistSelected function is declared at the artistPanel. retrieveAlbums function is called in logic.js to contact API and get the error or the albums data. If error, the errorPanel shows the error. If data is obtained, the data is sent to function albums to be properly displayed and the albumPanel is shown */

artistPanel.onArtistSelected = function(artistId) {
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

/* onAlbumSelected function is declared at the albumPanel. retrieveTracks function is called in logic.js to contact API and get the error or the albums data. If error, the errorPanel shows the error. If data is obtained, the data is sent to function tracks to be properly displayed and the tracksPanel is shown */

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

/* onBackToArtists function is declared at the albumPanel. This function is activated when clicking on the back button. The albumPanel is cleared */

albumPanel.onBackToArtists = function() {
    albumPanel.hide()
    albumPanel.clear()

    artistPanel.show()
}

/* onTrackelected function is declared at the tracksPanel. retrieveTrack function is called in logic.js to contact API and get the error or the albums data. If error, the errorPanel shows the error. If data is obtained, the data is sent to function track to be properly displayed and the trackPanel is shown */

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

/* onBackToAlbums function is declared at the tracksPanel. This function is activated when clicking on the back button. The tracksPanel is cleared */

tracksPanel.onBackToAlbums = function() {
    tracksPanel.hide()
    tracksPanel.clear()

    albumPanel.show()
}

/* onBackToTracks function is declared at the trackPanel. This function is activated when clicking on the back button. The trackPanel is cleared */

trackPanel.onBackToTracks = function() {
    trackPanel.hide()
    trackPanel.clear()

    tracksPanel.show()
}