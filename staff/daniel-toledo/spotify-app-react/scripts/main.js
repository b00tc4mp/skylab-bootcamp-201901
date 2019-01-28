spotifyApi.token = 'BQDfom0129BfTDFtJRWNLUGyrAaGC8FbqJpvAfiMKmuQq4YRvimzKJv0ZNsgkse-4DgYREcAkZmjhZUfc7Yd4geV5-YbsnOPx5DlfUxjLORInCoZ35S8ebqaYiB8utaUVNfrXpBwIhbY-PiAccs'
const searchPanel = new SearchPanel
const navPanel = new NavPanel
const artistsPanel = new ArtistsPanel
const albumsPanel = new AlbumsPanel
const tracksPanel = new TracksPanel
const playPanel = new PlayPanel
const welcomePanel = new WelcomePanel
const homePanel = new HomePanel
const loginPanel = new LoginPanel
const errorPanel = new ErrorPanel


const $root = $('#root')

artistsPanel.hide()
albumsPanel.hide()
tracksPanel.hide()
playPanel.hide()
loginPanel.hide()
homePanel.hide()
navPanel.hide()
errorPanel.hide()

$root.append(searchPanel.$container)
$root.append(navPanel.$container)
$root.append(artistsPanel.$container)
$root.append(albumsPanel.$container)
$root.append(playPanel.$container)
$root.append(tracksPanel.$container)
$root.append(errorPanel.$container)
$root.append(welcomePanel.$container)
$root.append(homePanel.$container)
$root.append(loginPanel.$container)



searchPanel.onSearch = function (query) {
    try {
        logic.searchArtists(query, function (error, artists) {
            if (error) searchPanel.error = error
            else {
                artistsPanel.artists = artists
                homePanel.hide()
                artistsPanel.show()
                searchPanel.errorClear()

                // artistsPanel.clear()
                // albumsPanel.clear()
                // tracksPanel.clear()
                // playPanel.clear()
                navPanel.show()
                searchPanel.__$form__.show()

                albumsPanel.hide()
                tracksPanel.hide()
                playPanel.hide()

                navPanel.__$artistLink__.show()
                navPanel.__$albumLink__.hide()
                navPanel.__$trackLink__.hide()

            }
        })

    } catch (err) {
        searchPanel.error=err.message
    }
}

searchPanel.onLogout = function() {
    homePanel.hide()
    albumsPanel.hide()
    albumsPanel.clear()
    tracksPanel.hide()
    tracksPanel.clear()
    artistsPanel.hide()
    artistsPanel.clear()
    playPanel.hide()
    playPanel.clear()
    
    navPanel.hide()
    navPanel.__$artistLink__.hide()
    navPanel.__$albumLink__.hide()
    navPanel.__$trackLink__.hide()

    searchPanel.__$form__.hide()
    searchPanel.__$query__.val('')
    homePanel.__$query__.val('')
    searchPanel.__$logoutButton__.hide()


    loginPanel.clear()
    welcomePanel.show()
};

navPanel.onArtist = function() {
    albumsPanel.hide()
    albumsPanel.clear()
    navPanel.__$albumLink__.hide()

    tracksPanel.hide()
    tracksPanel.clear()
    navPanel.__$trackLink__.hide()

    playPanel.hide()
    playPanel.clear()

    artistsPanel.show()
};

navPanel.onAlbum = function() {
    artistsPanel.hide()

    tracksPanel.hide()
    tracksPanel.clear()
    navPanel.__$trackLink__.hide()

    playPanel.hide()
    playPanel.clear()

    albumsPanel.show()
};

homePanel.onSearch = function (query) {
    try {
        logic.searchArtists(query, function (error, artists) {
            if (error) searchPanel.error = error
            else {
                artistsPanel.artists = artists
                homePanel.hide()
                artistsPanel.show()

                // artistsPanel.clear()
                // albumsPanel.clear()
                // tracksPanel.clear()
                // playPanel.clear()
                searchPanel.__$form__.show()
                navPanel.show()
                navPanel.__$artistLink__.show()

                albumsPanel.hide()
                tracksPanel.hide()
                playPanel.hide()

            }
        })

    } catch (err) {
        homePanel.error=err.message
    }
}

artistsPanel.onItemSelected = function (id) {
    try {
        logic.retrieveAlbums(id, function (error, albums) {
            if (error) console.error(error) // ?
            else {
                artistsPanel.hide()
                navPanel.__$albumLink__.show()

                albumsPanel.albums = albums

                albumsPanel.show()
            }
        })
    } catch (err) {
        artistsPanel.error=err.message
    }
}

albumsPanel.onItemSelected = function (id,image) {
    try {
        logic.retrieveTracks(id, function (error, tracks) {
            if (error) console.error(error) // ?
            else {
                albumsPanel.hide()
                navPanel.__$trackLink__.show()

                tracksPanel.tracks = tracks
                tracksPanel.image=image

                tracksPanel.show()
            }
        })
    } catch (err) {
        albumsPanel.error=err.message
    }
}

tracksPanel.onItemSelected = function (id) {
    try {
        logic.retrieveSong(id, function (error, song) {
            if (error) console.log(error) //?
            else {
                playPanel.clear()
                playPanel.song = song

                playPanel.show()
            }
        })
    } catch (err) {
        tracksPanel.error=err.message
    }
}

welcomePanel.onWelcomeLogin = function(){
    welcomePanel.hide()
    loginPanel.show()
}

loginPanel.onLogin = function(email,password) {
    try {
        logic.login(email, password, function(user){
            welcomePanel.hide()
            loginPanel.clear()
            loginPanel.hide()
            searchPanel.__$logoutButton__.show()
            
            homePanel.user=user
            homePanel.show()   
        })

    } catch(err) {
        loginPanel.error=err.message
    }
}