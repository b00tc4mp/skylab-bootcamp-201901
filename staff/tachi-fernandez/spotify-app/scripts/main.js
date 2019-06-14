const searchPanel = new SearchPanel
const artistsPanel = new ArtistsPanel

const $root = $('#root')

artistsPanel.hide()

$root.append(searchPanel.$container)
$root.append(artistsPanel.$container)

searchPanel.onSearch = function(query){
    try {
        logic.searchArtist(query,function(error,artists){
            if(error) searchPanel.error = error
            else{
                artistsPanel.artist = artists
            }
        })
    }catch{

    }
}