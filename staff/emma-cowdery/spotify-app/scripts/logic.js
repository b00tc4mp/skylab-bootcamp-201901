const logic = {
    /**
     * Search artists
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
     * Retrieves albums from artists
     * 
     * @param {string} artistId 
     * @param {finction} callback 
     */
    retrieveAlbums(artistId, callback) {
        if (typeof artistId !== 'string') throw TypeError(`${artistId} is not a string`)

        if(!artistId.trim().length) throw Error('artistId is empty')

        if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`)

        spotifyApi.retrieveAlbums(artistId, callback)
    },

    /**
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
     * 
     * @param {string} id 
     * @param {function} callback 
     */
    retrieveTrack(id, callback) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)

        if(!id.trim().length) throw Error('id is empty')

        if (typeof callback !== 'function') throw TypeError(`${callback} is not a finction`)

        spotifyApi.retrieveTrack(id, callback)
    }
}