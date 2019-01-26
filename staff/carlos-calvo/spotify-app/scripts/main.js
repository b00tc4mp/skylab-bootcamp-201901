spotifyApi.token = 'BQDSnrALp2IY3rHFFT55t25nERzBwtfuSrtz8-MVv-tOEbyAcr_oXt-mcZFU5or_C91Qnstiuqr11PY1rdDMAHcdBfvF3-AL3tkK5uN3m1xX5-RT2Z-koRkU0D0wxItjMG-zhu3L0xBRxw'

const searchPanel = new SearchPanel
const artistsPanel = new ArtistsPanel
const albumPanel = new AlbumPanel
const songPanel = new SongPanel
const mp3Player = new Mp3Player
const errorPanel = new ErrorPanel

const $root = $('#rootsection')
const $rootupper = $('#root')
const $rootbottom = $('#rootsection2')

//Escondemos las instancias de los paneles inferiores
artistsPanel.hide()
albumPanel.hide()
songPanel.hide()
mp3Player.hide()
errorPanel.hide()
//Aunque las añadimos al cntainer principal
$rootupper.append(searchPanel.$container)
$rootupper.append(errorPanel.$container)
$root.append(artistsPanel.$container)
$root.append(albumPanel.$container)
$rootbottom.append(songPanel.$container)
$rootbottom.append(mp3Player.$container)

let previewURL;
var artistURL;

searchPanel.onSearch = function(query) {
    try {
        logic.searchArtists(query, function(error, artists) {
            if (error){
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
        songPanel.clearstyles()
        songPanel.focusOnItem(id)
        let songURL = songPanel.retrievesongId(previewURL, id)
        mp3Player.show()
        mp3Player.Song = songURL
        mp3Player.setImageAlbum = imageURL

    } catch (error) {
        
    }
}