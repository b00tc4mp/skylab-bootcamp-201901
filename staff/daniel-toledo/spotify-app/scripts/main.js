spotifyApi.token = 'BQA2ldT8wBhwPN6FoHbQfGLnd7hcr8AiwU3rUnAbzqfikKgn7qSzFfXtjfk546-_Ciu7XdQeEho6PGwKpyEMahx3gCTaSbT-gqemYB4J-FFmfXxJb6_R1rUNlq9ft92YyMMQ8cwjuQbRL4360QA'

const searchPanel = new SearchPanel
const artistsPanel = new ArtistsPanel
const albumsPanel = new AlbumsPanel
const tracksPanel = new TracksPanel
const playPanel = new PlayPanel
const errorPanel = new ErrorPanel

const $root = $('#root')

artistsPanel.hide()

$root.append(searchPanel.$container)
$root.append(artistsPanel.$container)
$root.append(albumsPanel.$container)
$root.append(tracksPanel.$container)
$root.append(playPanel.$container)
$root.append(errorPanel.$container)


searchPanel.onSearch = function (query) {
    try {
        logic.searchArtists(query, function (error, artists) {
            if (error) searchPanel.error = error
            else {
                artistsPanel.artists = artists

                artistsPanel.show()
            }
        })

    } catch (err) {

    }
}

artistsPanel.onItemSelected = function (id) {
    try {
        logic.retrieveAlbums(id, function (error, albums) {
            if (error) console.error(error) // ?
            else {
                artistsPanel.hide()

                albumsPanel.albums = albums

                albumsPanel.show()
            }
        })
    } catch (err) {
        console.error(err) // ?
    }
}

albumsPanel.onItemSelected = function (id) {
    try {
        logic.retrieveTracks(id, function (error, tracks) {
            if (error) console.error(error) // ?
            else {
                albumsPanel.hide()

                tracksPanel.tracks = tracks

                tracksPanel.show()
            }
        })
    } catch (err) {
        console.error(err) // ?
    }
}

tracksPanel.onItemSelected = function (id) {
    try {
        logic.retrieveSong(id, function (error, song) {
            if (error) console.log(error) //?
            else {
                tracksPanel.hide()

                playPanel.song = song

                playPanel.show()
            }
        })
    } catch (err) {
        console.error(err) // ?
    }
}