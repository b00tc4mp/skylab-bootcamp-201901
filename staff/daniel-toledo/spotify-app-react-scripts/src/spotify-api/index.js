
/**
 * Duckling API client.
 * 
 * @version 0.0.1
 */
const spotifyApi = {
    token: 'NO_TOKEN',
    /**
     * Searches ducklings.
     * 
     * @param {string} query - The text to match on search.
     * @param {function} callback - The expression to evaluate on response. If error first 
     * argument informs the error message, othwerwise first argument is undefined and second argument provides the matching 
     * results.
     */
    searchArtists(query) {
        return fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${this.token}`
            }
        })
            .then(response => response.json())
            .then(response => {
                if(response.error) throw Error(response.error.message)

                const { artists: { items } } = response

                return items

            })
    },

    retrieveAlbums(artistId) {
        return fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${this.token}`
            }
        })
            .then(response => response.json())
            .then(response => {
                 if(response.error) throw Error(response.error.message)

                const { items } = response

                 return items
            })
    },

    retrieveTracks(albumId){
        fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${this.token}`
            }
        })
             .then(response => response.json())
            .then(response => {
                 if(response.error) throw Error(response.error.message)

                const { items } = response

                 return items
            })
    },

    retrieveSong(songId){
        fetch(`https://api.spotify.com/v1/tracks/${songId}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${this.token}`
            }
        })
            .then(response => response.json())
            .then(response => {
                 if(response.error) throw Error(response.error.message)
                 return  response
            })
    }
}

export default spotifyApi