'use strict'

const userApi = require('../user-api')
const spotifyApi = require('../spotify_Api')
/**
 * Abstraction of business logic.
 */
class Logic {
    constructor(storage = {}) {
        if (typeof storage !== 'object') throw Error(`${storage} is not an Object`)

        this.__storage__ = storage
    }

    /**
    * Registers a user.
    * 
    * @param {string} name 
    * @param {string} surname 
    * @param {string} email 
    * @param {string} password 
    * @param {string} passwordConfirmation 
    */
    registerUser(name, surname, email, password, passwordConfirmation) {
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

        if (password !== passwordConfirmation) throw Error('passwords do not match')

        return userApi.register(name, surname, email, password)
            .then(() => { })
    }

    /**
     * Logs in the user by its credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     */
    logInUser(email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        return userApi.authenticate(email, password)
            .then(({ id, token }) => {
                this.__storage__.userId = id
                this.__storage__.userApiToken = token
            })
    }

    /**
     * Checks user is logged in.
     */
    get isUserLoggedIn() {
        return !!this.__storage__.userId
    }

    /**
     * Logs out the user.
     */
    logOutUser() {
        this.__storage__.userId = null
        this.__storage__.userApiToken = null
    }

    retrieveUser() {
        return userApi.retrieve(this.__storage__.userId, this.__storage__.userApiToken)
            .then(({ id, name, surname, username: email, favoriteArtists = [], favoriteAlbums = [], favoriteTracks = [] }) => ({
                id,
                name,
                surname,
                email,
                favoriteArtists,
                favoriteAlbums,
                favoriteTracks
            }))
    }

    searchArtists(query) {
            
        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)
    
        if (!query.trim().length) throw Error('query is empty')
    
        return spotifyApi.searchArtists(query)
            
    }
        
    retrieveAlbums(artistId) {

        if (typeof artistId !== 'string') throw TypeError(`${artistId} is not a string`)

        if (!artistId.trim().length) throw Error('artistId is empty')

        return spotifyApi.retrieveAlbums(artistId)
    
    }

    retrieveTracks(albumId) {

        if (typeof albumId !== 'string') throw TypeError(`${albumId} is not a string`)

        if (!albumId.trim().length) throw Error('albumId is empty')

        return spotifyApi.retrieveTracks(albumId)           
    }

    retrieveTrack(trackId) {
        debugger
        if (typeof trackId !== 'string') throw TypeError(`${trackId} is not a string`)

        if (!trackId.trim().length) throw Error('trackId is empty')

        return spotifyApi.retrieveTrack(trackId)
    }
}

module.exports = Logic

    // TODO updateUser and removeUser


// module.exports = Logic

// 'use strict'

// const userApi = require('../user-api')
// const spotifyApi = require('../spotify_Api/spotify-api')

// /**
//  * Abstraction of business logic.
//  */
// class Logic {
//     constructor(storage = {}) {
//         if (typeof storage !== 'object') throw Error(`${storage} is not an Object`)

//         this.__storage__ = storage
//     }

//     /**
//     * Registers a user.
//     * 
//     * @param {string} name 
//     * @param {string} surname 
//     * @param {string} email 
//     * @param {string} password 
//     * @param {string} passwordConfirmation 
//     */
//     registerUser(name, surname, email, password, passwordConfirmation) {
//         if (typeof name !== 'string') throw TypeError(name + ' is not a string')

//         if (!name.trim().length) throw Error('name cannot be empty')

//         if (typeof surname !== 'string') throw TypeError(surname + ' is not a string')

//         if (!surname.trim().length) throw Error('surname cannot be empty')

//         if (typeof email !== 'string') throw TypeError(email + ' is not a string')

//         if (!email.trim().length) throw Error('email cannot be empty')

//         if (typeof password !== 'string') throw TypeError(password + ' is not a string')

//         if (!password.trim().length) throw Error('password cannot be empty')

//         if (typeof passwordConfirmation !== 'string') throw TypeError(passwordConfirmation + ' is not a string')

//         if (!passwordConfirmation.trim().length) throw Error('password confirmation cannot be empty')

//         if (password !== passwordConfirmation) throw Error('passwords do not match')

//         return userApi.register(name, surname, email, password)
//             .then(() => { })
//     }

//     /**
//      * Logs in the user by its credentials.
//      * 
//      * @param {string} email 
//      * @param {string} password 
//      */
//     logInUser(email, password) {
//         if (typeof email !== 'string') throw TypeError(email + ' is not a string')

//         if (!email.trim().length) throw Error('email cannot be empty')

//         if (typeof password !== 'string') throw TypeError(password + ' is not a string')

//         if (!password.trim().length) throw Error('password cannot be empty')

//         return userApi.authenticate(email, password)
//             .then(({ id, token }) => {
//                 this.__storage__.userId = id
//                 this.__storage__.userApiToken = token
//             })
//     }

//     /**
//      * Checks user is logged in.
//      */
//     get isUserLoggedIn() {
//         return !!this.__storage__.userId
//     }

//     /**
//      * Logs out the user.
//      */
//     logOutUser() {
//         this.__storage__.userId = null
//         this.__storage__.userApiToken = null
//     }

//     retrieveUser() {
//         return userApi.retrieve(this.__storage__.userId, this.__storage__.userApiToken)
//             .then(({ id, name, surname, username: email, favoriteArtists = [], favoriteAlbums = [], favoriteTracks = [] }) => ({
//                 id,
//                 name,
//                 surname,
//                 email,
//                 favoriteArtists,
//                 favoriteAlbums,
//                 favoriteTracks
//             }))
//     }

//     searchArtists(query) {
//         debugger
       
//         if (typeof query !== 'string') throw TypeError(`${query} is not a string`)

//         if (!query.trim().length) throw Error('query is empty')

//         return spotifyApi.searchArtists(query)


//     // TODO updateUser and removeUser
//     }

//     retrieveAlbums(artistId) {
//         if (typeof artistId !== 'string') throw TypeError(`${artistId} is not a string`)

//         if (!artistId.trim().length) throw Error('artistId is empty')

//         return spotifyApi.retrieveAlbums(artistId)
      
//     }

//     retrieveTracks(albumId) {
//         if (typeof albumId !== 'string') throw TypeError(`${albumId} is not a string`)

//         if (!albumId.trim().length) throw Error('albumId is empty')

//         return spotifyApi.retrieveTracks(albumId)
          
//     }
//     retrieveTrack(trackId) {
//         debugger
//         if (typeof trackId !== 'string') throw TypeError(`${trackId} is not a string`)

//         if (!trackId.trim().length) throw Error('trackId is empty')

//         return spotifyApi.retrieveTrack(trackId)
//     }
// }

// module.exports = Logic













// 'use strict'

// const spotifyApi = require ('../spotify_Api/spotify-api')
// const userApi = require('../user-api')
// /**
//  * Abstraction of business logic.
//  */
// class logic {
//     // __userId__: null,
//     // __userApiToken__: null,

//     constructor(storage = {}) {
//         if (typeof storage !== 'object') throw Error(`${storage} is not an Object`)

//         this.__storage__ = storage
//     }

  
//     /**
//     * Registers a user.
//     * 
//     * @param {string} name 
//     * @param {string} surname 
//     * @param {string} email 
//     * @param {string} password 
//     * @param {string} passwordConfirmation 
//     */
//     registerUser(name, surname, email, password, passwordConfirmation) {
//         if (typeof name !== 'string') throw TypeError(name + ' is not a string')

//         if (!name.trim().length) throw Error('name cannot be empty')

//         if (typeof surname !== 'string') throw TypeError(surname + ' is not a string')

//         if (!surname.trim().length) throw Error('surname cannot be empty')

//         if (typeof email !== 'string') throw TypeError(email + ' is not a string')

//         if (!email.trim().length) throw Error('email cannot be empty')

//         if (typeof password !== 'string') throw TypeError(password + ' is not a string')

//         if (!password.trim().length) throw Error('password cannot be empty')

//         if (typeof passwordConfirmation !== 'string') throw TypeError(passwordConfirmation + ' is not a string')

//         if (!passwordConfirmation.trim().length) throw Error('password confirmation cannot be empty')

//         if (password !== passwordConfirmation) throw Error('passwords do not match')

//         return userApi.register(name, surname, email, password)
//             .then(() => { })
//     }

//     /**
//      * Logins a user by its credentials.
//      * 
//      * @param {string} email 
//      * @param {string} password 
//      */
//     login(email, password) {
//         if (typeof email !== 'string') throw TypeError(email + ' is not a string')

//         if (!email.trim().length) throw Error('email cannot be empty')

//         if (typeof password !== 'string') throw TypeError(password + ' is not a string')

//         if (!password.trim().length) throw Error('password cannot be empty')

//         return userApi.authenticate(email, password)
//             .then(({ id, token }) => {
//                 this.__userId__ = id
//                 this.__userApiToken__ = token
//             })
//     }

//      /**
//      * Checks user is logged in.
//      */

//     get isUserLoggedIn() {
//         return !!this.__storage__.userId
//     }

//     /**
//      * Logs out the user.
//      */

//     logOutUser() {
//         this.__storage__.userId = null
//         this.__storage__.userApiToken = null
//     }


//     retrieveUser() {
//         return userApi.retrieve(this.__userId__, this.__userApiToken__)
//             .then(({ id, name, surname, username }) => ({
//                 id,
//                 name,
//                 surname,
//                 // email: username
//                 email,
//                 favoriteArtists,
//                 favoriteAlbums,
//                 favoriteTracks
//             }))
//     }

//     /**
//      * Search artists.
//      * 
//      * @param {string} query 
//      * @returns {Promise}
//      */
//     searchArtists(query) {
//         if (typeof query !== 'string') throw TypeError(`${query} is not a string`)

//         if (!query.trim().length) throw Error('query is empty')

//         return spotifyApi.searchArtists(query)
//     }

//     /**
//      * Retrieves albums from artist.
//      * 
//      * @param {string} artistId 
//      * @param {function} callback 
//      */

//     retrieveAlbums(artistId, callback) {
//         if (typeof artistId !== 'string') throw TypeError(`${artistId} is not a string`)

//         if (!artistId.trim().length) throw Error('artistId is empty')

//         if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`)

//         spotifyApi.retrieveAlbums(artistId, callback)
//     }

//     /**
//      * Retrieves tracks from album.
//      * 
//      * @param {string} albumId 
//      * @param {function} callback 
//      */
//     retrieveTracks(albumId, callback) {
//         if (typeof albumId !== 'string') throw TypeError(`${albumId} is not a string`)

//         if (!albumId.trim().length) throw Error('albumId is empty')

//         if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`)

//         spotifyApi.retrieveTracks(albumId, callback)
//     }

//     /**
//      * Retrieves track.
//      * 
//      * @param {string} trackId 
//      * @param {function} callback 
//      */
//     retrieveTrack(trackId, callback) {
//         if (typeof trackId !== 'string') throw TypeError(`${trackId} is not a string`)

//         if (!trackId.trim().length) throw Error('trackId is empty')

//         if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`)

//         spotifyApi.retrieveTrack(trackId, callback)
//     }
// }

// module.exports = logic