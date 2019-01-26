spotifyApi.token = 'BQCxEY8it_1s0OsvkzmeAlaDAGVBRTSUaziQU1-du3vo1ssdtaJ1qy45-F4DKCkw5nu7CKlf79fPf4XZe9ZKXZu8F_0eln7PykPypJZczZP-qMV7hwUJvLWfqb35bgjvuAx67YRNhciJrQ'

const searchPanel = new SearchPanel
const artistsPanel = new ArtistsPanel
const albumPanel = new AlbumPanel
const songPanel = new SongPanel
const mp3Player = new Mp3Player

const $root = $('#root')

//Escondemos las instancias de los paneles inferiores
artistsPanel.hide()
albumPanel.hide()
songPanel.hide()
mp3Player.hide()
//Aunque las añadimos al cntainer principal
$root.append(searchPanel.$container)
$root.append(artistsPanel.$container)
$root.append(albumPanel.$container)
$root.append(songPanel.$container)
$root.append(mp3Player.$container)

let preview;

searchPanel.onSearch = function(query) {
    try {
        logic.searchArtists(query, function(error, artists) {
            if (error) searchPanel.error = error.message
            else {
                console.log(artists)
                console.log(artists[0].genres)

                artistsPanel.clear()
                artistsPanel.artists = artists
                artistsPanel.show()
                //limpiamos y escondemos la zona de abajo
                albumPanel.clear()
                albumPanel.hide()
                songPanel.clear()
                songPanel.hide()
                mp3Player.hide()
                mp3Player.stopAudio()
                mp3Player.hide()
            }
        })
    } catch(err) {

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
                imageURL = artistsPanel.getImageURL(albums, id)
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
                //preview = songs[0]['preview_url']
                preview = songs
                console.log(preview)
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
        let songURL = songPanel.retrievesongId(preview, id)
        mp3Player.show()
        mp3Player.Song = songURL

    } catch (error) {
        
    }
}