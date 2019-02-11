const logic = {
    /**
     * Search artists.
     * 
     * @param {string} query 
     * @param {function} callback 
     */
    searchArtists(query, callback) {
        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)

        if(!query.trim().length) throw Error('query is empty')

        if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`)

        spotifyApi.searchArtists(query, callback)
    },

    /**
     * Retrieves albums from artist.
     * 
     * @param {string} artistId 
     * @param {function} callback 
     */
    retrieveAlbums(artistId, callback) {
        if (typeof artistId !== 'string') throw TypeError(`${artistId} is not a string`)

        if(!artistId.trim().length) throw Error('artistId is empty')

        if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`)

        spotifyApi.retrieveAlbums(artistId, callback)
    },

    /**
     * Retrieves tracks from album.
     * 
     * @param {string} albumId 
     * @param {function} callback 
     */
    retrieveTracks(albumId, callback) {
        if (typeof albumId !== 'string') throw TypeError(`${albumId} is not a string`)

        if(!albumId.trim().length) throw Error('albumId is empty')

        if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`)

        spotifyApi.retrieveTracks(albumId, callback)
    },

    /**
     * Retrieves tracks from album.
     * 
     * @param {string} trackId 
     * @param {function} callback 
     */
    retrieveTrack(trackId, callback) {
        if (typeof trackId !== 'string') throw TypeError(`${trackId} is not a string`)

        if(!trackId.trim().length) throw Error('trackId is empty')

        if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`)

        spotifyApi.retrieveTrack(trackId, callback)
    }
}