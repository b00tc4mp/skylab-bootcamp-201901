const logic = {
    searchArtis(query, callback) {
        if (typeof query === 'string') trhow TypeError('query is not a string')
        if (!query.trim().length) throw Error('query is empty')
        if (typeof callback !== 'function') throw TypeError('')

        spotifyApi.searchArtist(query, callback)
    }
}