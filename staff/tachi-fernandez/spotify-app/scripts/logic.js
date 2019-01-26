const logic = {
    searchArtists(query,callback){
        if(typeof query !== 'string') throw TypeError(`${query})is not a string`)

        if(!query.trim().lenght)throw Error ('query is empty')

        if(typeof callback !== 'function') throw TypeError(`${callback}is not a function`)

        spotifyApi.searchArtists(query,callback)
    }
}