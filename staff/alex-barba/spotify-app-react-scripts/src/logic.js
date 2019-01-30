import users from './data';
import spotifyApi from './spotify-api-1.0.0';

/**
 * logic.js of the Spotify App
 */

/* All fucntions declared inside a const to narrow the scope and prevent possible duplications. Sends and gets info from the API*/

const logic = {

    /**
     * Logins a user by its credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     * @param {function} callback 
     */

    login: function (email, password, callback) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')
        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')
        if (!password.trim().length) throw Error('password cannot be empty')

        var user = users.find(function (user) {
            return user.email === email
        })

        if (!user) throw Error('user ' + email + ' not found')
        if (user.password !== password) throw Error('wrong password')

        var loggedInUser = {
            name: user.name,
            surname: user.surname,
            email: user.email
        }
        callback(loggedInUser)
    },

    /**
     * Registers a user.
     * 
     * @param {string} name 
     * @param {string} surname 
     * @param {string} email 
     * @param {string} password 
     * @param {string} passwordConfirmation 
     * @param {function} callback 
     */

    register: function (name, surname, email, password, passwordConfirmation, callback) {
        if (typeof name !== 'string') throw TypeError(name + ' is not a string')

        if (!name.trim().length) throw Error('name cannot be empty')

        if (typeof surname !== 'string') throw TypeError(surname + ' is not a string')

        if (!surname.trim().length) throw Error('surname cannot be empty')

        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        if (typeof passwordConfirmation !== 'string') throw TypeError(passwordConfirmation + ' is not a string')

        if (!passwordConfirmation.trim().length) throw Error('password confirmation cannot be empty')

        var user = users.find(function (user) {
            return user.email === email
        })

        if (user) throw Error('user ' + email + ' already exists')

        if (password !== passwordConfirmation) throw Error('passwords do not match')

        users.push({
            name: name,
            surname: surname,
            email: email,
            password: password,
            favourites: []
        })

        callback()
    },

    /* TO COMMENT */

    retrieveFavourites: function ( id, email, callback) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')
        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof id !== 'string') throw TypeError(id + ' is not a string')
        if (!id.trim().length) throw Error('id cannot be empty')

        var user = users.find(function (user) {
            return user.email === email
        })
        console.log(user)

        if (!user) throw Error('user ' + email + ' not found')

        var exists = user.favourites.findIndex(element => element === id)

        if (exists !== -1) {
            user.favourites.splice(exists, 1)
            callback(user.favourites)   
            return false
        } else {
            user.favourites.push(id)
            callback(user.favourites)
            return true
        }
    },

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

        if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`)

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

        if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`)

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

        if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`)

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

        if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`)

        spotifyApi.retrieveTrack(trackId, callback)
    },

}

export default logic;