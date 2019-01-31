/**
 * main.js of the Spotify App
 */

/* Token is set in global scope so that it can always be accesed. Has to be updated every hour */

spotifyApi.token = 'BQAh8WXDmnbGCF7SGk6Y6RdgGjc1xFv6HA7GfdO9bWFe8CTRS3nsRd8CB-iNNo1I40_fJ3CCJQOy9HYyi0BV1GBQEBkOl_dhxYXh4vJKDzB4hx5uj3No9k9-sgQ3w-6vUWmF5_6WX3rcqr2nooM'

/*  All the panels are decalred */

const loginPanel = new LoginPanel
const registerPanel = new RegisterPanel
const searchPanel = new SearchPanel
const artistPanel = new ArtistPanel
const albumPanel = new AlbumPanel
const tracksPanel = new TracksPanel
const trackPanel = new TrackPanel
const errorPanel = new ErrorPanel

/* All panels that need to be hidden at the beginning */

registerPanel.hide()
searchPanel.hide()
artistPanel.hide()
albumPanel.hide()
tracksPanel.hide()
trackPanel.hide()
errorPanel.hide()

/* Panels appended to the root (main of the body) */

const $root = $('#root')

$root.append(loginPanel.$container)
$root.append(registerPanel.$container)
$root.append(searchPanel.$container)
$root.append(artistPanel.$container)
$root.append(albumPanel.$container)
$root.append(tracksPanel.$container)
$root.append(trackPanel.$container)

/* onLogin function is declared at the loginPanel. logins function is called in logic.js to check data and get the error or the user data. If error, the errorPanel shows the error. If data is obtained, the data is sent to set user to be properly displayed and the searchPanel is shown */

loginPanel.onLogin = function (email, password) {
    try {
        logic.login(email, password, function (user) {
            loginPanel.hide()
            loginPanel.clear()

            searchPanel.user = user
            searchPanel.show()
        });
    } catch (err) {
        loginPanel.error = err.message
    }
};

/* onGoToRegister function is declared at the loginPanel. This function is activated when clicking on the register button. The login panel is cleared */

loginPanel.onGoToRegister = function () {
    loginPanel.hide()
    loginPanel.clear()

    registerPanel.show()
};

/* onregisterfunction is declared at the registerPanel. register function is called in logic.js to set data of a new user .If error, the errorPanel shows the error. If all data is ok, the user data is stored and the loginPanel is shown */

registerPanel.onRegister = function (name, surname, email, password, passwordConfirmation) {
    try {
        logic.register(name, surname, email, password, passwordConfirmation, function () {
            registerPanel.hide()
            registerPanel.clear()

            loginPanel.show()
        });
    } catch (err) {
        registerPanel.error = err.message
    }
};

/* onGoToLogin function is declared at the registerPanel. This function is activated when clicking on the login button. The register panel is cleared */

registerPanel.onGoToLogin = function () {
    registerPanel.hide()
    registerPanel.clear()

    loginPanel.show()
};

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
        logic.searchArtists(query, function (error, artists) {
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

/* onLogout function is declared at the searchPanel. This function is activated when clicking on the logout button. The search and login panels are cleared */

searchPanel.onLogout = function () {
    searchPanel.hide();
    searchPanel.errorClear()
    searchPanel.clear()
    artistPanel.clear()
    artistPanel.hide()
    albumPanel.hide()
    albumPanel.clear()
    tracksPanel.hide()
    tracksPanel.clear()
    trackPanel.hide()
    trackPanel.clear()

    loginPanel.clear();
    loginPanel.show();
};

/* onArtistSelected function is declared at the artistPanel. retrieveAlbums function is called in logic.js to contact API and get the error or the albums data. If error, the errorPanel shows the error. If data is obtained, the data is sent to function albums to be properly displayed and the albumPanel is shown */

artistPanel.onArtistSelected = function (artistId) {
    try {
        logic.retrieveAlbums(artistId, function (error, albums) {
            if (error) artistPanel.error = error.message
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
        logic.retrieveTracks(albumId, function (error, tracks) {
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

albumPanel.onBackToArtists = function () {
    albumPanel.hide()
    albumPanel.clear()

    artistPanel.show()
}

/* onTrackelected function is declared at the tracksPanel. retrieveTrack function is called in logic.js to contact API and get the error or the albums data. If error, the errorPanel shows the error. If data is obtained, the data is sent to function track to be properly displayed and the trackPanel is shown */

tracksPanel.onTrackSelected = function (trackId) {
    try {
        logic.retrieveTrack(trackId, function (error, track) {
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

tracksPanel.onBackToAlbums = function () {
    tracksPanel.hide()
    tracksPanel.clear()

    albumPanel.show()
}

/* onBackToTracks function is declared at the trackPanel. This function is activated when clicking on the back button. The trackPanel is cleared */

trackPanel.onBackToTracks = function () {
    trackPanel.hide()
    trackPanel.clear()

    tracksPanel.show()
}

