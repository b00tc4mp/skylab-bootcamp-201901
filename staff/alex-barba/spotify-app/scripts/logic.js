const logic = {
    searchArtists(query, callback) {
        if  (typeof query !== 'string') throw TypeError (`${query} is not a string`)
        
        if (query === undefined) throw Error (`No results for ${query}`)

        if (!query.trim().length) throw Error('query is empty')

        if (typeof callback !== 'function') throw TypeErro(`${callback} is not a function`)

        spotifyApi.searchArtists(query, callback)
    },

    retrieveAlbums(artistId, callback) {
        if  (typeof artistId !== 'string') throw TypeError (`${artistId} is not a string`)
        
        if (!artistId.trim().length) throw Error('artist is empty')

        if (typeof callback !== 'function') throw TypeErro(`${callback} is not a function`)

        spotifyApi.retrieveAlbums(artistId, callback)
    },

    retrieveTracks(albumId, callback) {
        if  (typeof albumId !== 'string') throw TypeError (`${albumId} is not a string`)
        
        if (!albumId.trim().length) throw Error('artist is empty')

        if (typeof callback !== 'function') throw TypeErro(`${callback} is not a function`)

        spotifyApi.retrieveTracks(albumId, callback)
    },

    retrieveTrack(trackId, callback) {
        if  (typeof trackId !== 'string') throw TypeError (`${trackId} is not a string`)
        
        if (!trackId.trim().length) throw Error('artist is empty')

        if (typeof callback !== 'function') throw TypeErro(`${callback} is not a function`)

        spotifyApi.retrieveTrack(trackId, callback)
    },

}