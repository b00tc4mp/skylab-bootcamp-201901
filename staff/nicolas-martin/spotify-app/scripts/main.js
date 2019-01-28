spotifyApi.token = 'BQDS3HW63570BAaNeKqHxbgVU6FxvdZXN5E-0k4PSSNVAeLstOR-MaLUu81K6mqKruMslNkQRwvldEeJ_unwdzbx_PmL7bD57gasiJBPQ-PdAktZYnjKtxNTyTqJiSA9Wae_nTk0BVuCtg'

const artistsPanel = new ArtistsPanel
const searchPanel = new SearchPanel
const paginationPanel = new PaginationPanel

const $root = $('#root')

$root.append(searchPanel.$container)
$root.append(artistsPanel.$container)

searchPanel.onSearch = function(query) {
    try {
        logic.searchArtists(query, function(error, artists) {
            if (error) searchPanel.error = error.message
            else {
                paginationPanel.hide()
                artistsPanel.__$list__.empty() 
                artistsPanel.artists =  artists 

                //mostramos la navegación únicamente si artists.lentgh > paginationPanel.length
                if (artists.length > paginationPanel.numberResults){
                    // creamos los li dentro de la paginación
                    paginationPanel.createNavBody = artists.length
                    paginationPanel.show()
                    artistsPanel.$container.append(paginationPanel.$container)

                }

                paginationPanel.onClickPage = function (pageClicked) { 
                    paginationPanel.setPage = pageClicked
                    paginationPanel.disablePageActive()

                    artistsPanel.$container.find(`div[data-page]`).removeClass('mostrar esconder')
                    artistsPanel.$container.find(`div[data-page!="${pageClicked}"]`).addClass('esconder')
                    artistsPanel.$container.find(`div[data-page="${pageClicked}"]`).addClass('mostrar')
                } 
            }
        })
    } catch(err) {

    }
}




