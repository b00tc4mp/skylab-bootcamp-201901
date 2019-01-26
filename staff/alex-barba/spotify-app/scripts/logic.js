/**
 * logic.js of the Spotify App
 */

/* All fucntions declared inside a const to narrow the scope and prevent possible duplications. Sends and gets info from the API*/

const logic = {

    /**
     * Search artists.
     * 
     * @param {string} query 
     * @param {function} callback 
     */
    
    searchArtists(query, callback) {
        if  (typeof query !== 'string') throw TypeError (`${query} is not a string`)
        
        if (query === undefined) throw Error (`No results for ${query}`)

        if (!query.trim().length) throw Error('query is empty')

        if (typeof callback !== 'function') throw TypeErro(`${callback} is not a function`)

        spotifyApi.searchArtists(query, callback)
    },

     /**
     * Search albums from the previous selected artist.
     * 
     * @param {string} artistId
     * @param {function} callback 
     */

    retrieveAlbums(artistId, callback) {
        if  (typeof artistId !== 'string') throw TypeError (`${artistId} is not a string`)
        
        if (!artistId.trim().length) throw Error('artist is empty')

        if (typeof callback !== 'function') throw TypeErro(`${callback} is not a function`)

        spotifyApi.retrieveAlbums(artistId, callback)
    },

     /**
     * Search tracks from the previous selected album.
     * 
     * @param {string} albumId
     * @param {function} callback 
     */

    retrieveTracks(albumId, callback) {
        if  (typeof albumId !== 'string') throw TypeError (`${albumId} is not a string`)
        
        if (!albumId.trim().length) throw Error('album is empty')

        if (typeof callback !== 'function') throw TypeErro(`${callback} is not a function`)

        spotifyApi.retrieveTracks(albumId, callback)
    },

     /**
     * Search track from the previous selected list of tracks.
     * 
     * @param {string} trackId
     * @param {function} callback 
     */

    retrieveTrack(trackId, callback) {
        if  (typeof trackId !== 'string') throw TypeError (`${trackId} is not a string`)
        
        if (!trackId.trim().length) throw Error('track is empty')

        if (typeof callback !== 'function') throw TypeErro(`${callback} is not a function`)

        spotifyApi.retrieveTrack(trackId, callback)
    },
}