spotifyApi.token = 'BQD8zTxO9mV-A8Aztkl7hiZmwk85yqmWGB9SoPKe3DcIPD1EAso18uAvwr7xdxWbCWBRbPOr5xcvT2a6pCTZfssYBlPn0Ba3fnbU_3rbal5WMkzXqKY5Q79CGgzJnPkh3v7RQpWPjmoQtw'

const searchPanel = new SearchPanel
const artistsPanel = new ArtistsPanel
const albumPanel = new AlbumPanel
const songPanel = new SongPanel
const mp3Player = new Mp3Player
const errorPanel = new ErrorPanel
const registerPanel = new RegisterPanel
const loginPanel = new LoginPanel
const errorPanelMp3 = new ErrorPanel

const $root = $('#rootsection')
const $rootupper = $('#rootheader')
const $rootbottom = $('#rootsection2')

//Escondemos las instancias de los paneles inferiores
artistsPanel.hide()
albumPanel.hide()
songPanel.hide()
mp3Player.hide()
errorPanel.hide()
searchPanel.hide()
registerPanel.hide()
loginPanel.show()
errorPanelMp3.hide()

//Upper section for login and search
$rootupper.append(loginPanel.$container)
$rootupper.append(searchPanel.$container)
$rootupper.append(errorPanel.$container)
$rootupper.append(registerPanel.$container)
//Main content
$root.append(artistsPanel.$container)
$root.append(albumPanel.$container)
//Down section
$rootbottom.append(songPanel.$container)
$rootbottom.append(mp3Player.$container)
mp3Player.$container.append(errorPanelMp3.$container)
//global variables for storing URL for image and sound to play
let previewURL;
var artistURL;

//login
loginPanel.onLogin = function (email, password) {
    try {
        logic.login(email, password, function (user) {
            loginPanel.hide()
            loginPanel.clear()
            searchPanel.show()
        })
    } catch (err) {
        loginPanel.error = err.message
    }
}

//login --> register
loginPanel.onGoToRegister = function () {
    loginPanel.hide()
    loginPanel.clear()
    registerPanel.show()
}

//Registering
registerPanel.onRegister = function (name, surname, email, password, passwordConfirmation) {
    try {
        logic.register(name, surname, email, password, passwordConfirmation, function () {
            registerPanel.hide()
            registerPanel.clear()

            loginPanel.show()
        })
    } catch (err) {
        registerPanel.error = err.message
    }
}

//back to login

registerPanel.onGoToLogin = function () {
    registerPanel.hide()
    registerPanel.clear()

    loginPanel.show()
}



searchPanel.onLogOut = function(){
    errorPanelMp3.hide()
    searchPanel.hide()
    searchPanel.clear()
    artistsPanel.clear()
    artistsPanel.hide()
    albumPanel.clear()
    albumPanel.hide()
    songPanel.clear()
    songPanel.hide()
    mp3Player.stopAudio()
    mp3Player.hide()
    loginPanel.show()

}


searchPanel.onSearch = function(query) {
    try {
        logic.searchArtists(query, function(error, artists) {
            if (error){
                errorPanelMp3.hide()
                errorPanel.show()
                errorPanel.message = 'Ups something went wrong. The search did not retrieve any result.'
                artistsPanel.clear()
                artistsPanel.hide()
                albumPanel.clear()
                albumPanel.hide()
                songPanel.clear()
                songPanel.hide()
                mp3Player.stopAudio()
                mp3Player.hide()
                
            } 
            else {
                errorPanelMp3.hide()
                console.log(artists)
                console.log(artists[0].genres)
                errorPanel.hide()
                artistsPanel.clear()
                artistsPanel.artists = artists
                artistsPanel.show()
                //limpiamos y escondemos la zona de abajo
                albumPanel.clear()
                albumPanel.hide()
                songPanel.clear()
                songPanel.hide()
                mp3Player.stopAudio()
                mp3Player.hide()
                artistURL = artists
            }
        })
    } catch(err) {
        errorPanel.show()
        errorPanel.message = err.message
    }
}

artistsPanel.onArtistClicked = function(id){
    try {
        errorPanelMp3.hide()
        artistsPanel.clearstyles()
        artistsPanel.focusOnItem(id)                
        logic.retrieveAlbums(id, function(error, albums){
            if(error) console.error(error)
            else {
                albumPanel.clear()
                albumPanel.albums = albums
                albumPanel.show()
                songPanel.clear()
                songPanel.hide()
                console.log(albums)
                mp3Player.stopAudio()
                mp3Player.hide()
                imageURL = artistsPanel.getImageURL(artistURL, id)
            }
        })
    } catch (error) {
        console.error(error)
    }
}

albumPanel.onAlbumClicked =  function(id){
    try {
        errorPanelMp3.hide()
        albumPanel.clearstyles()
        albumPanel.focusOnItem(id)
        logic.retrieveSongs(id, function(error, songs){
            if(error) console.error(error)
            else{
                console.log(songs)
                songPanel.clear()
                songPanel.songs = songs
                songPanel.show()
                //previewURL = songs[0]['previewURL_url']
                previewURL = songs
                console.log(previewURL)
                mp3Player.stopAudio()
                mp3Player.hide()
                

            }
        })
    } catch (error) {
        
    }

}


songPanel.onSongClicked = function(id){
    try {
        errorPanelMp3.hide()
        songPanel.clearstyles()
        songPanel.focusOnItem(id)
        let songURL = songPanel.retrievesongId(previewURL, id)
        mp3Player.show()
        if(songURL !== null){
            mp3Player.Song = songURL
        } else{
            mp3Player.Song = undefined
            errorPanelMp3.message = 'No preview for this song!'
            errorPanelMp3.show()
        }
        mp3Player.setImageAlbum = imageURL

    } catch (error) {
        
    }
}