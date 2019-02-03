'use strict'

<<<<<<< HEAD

=======
>>>>>>> feature/tutubo-logic
import userApi from '../user-api'
import youtubeApi from '../youtube-api';

/**
 * Abstraction of business logic.
 */
const logic = {
    __userId__: null,
    __userApiToken__: null,
    __videoId__:null,

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
    },

    /**
     * Logins a user by its credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     */
    loginUser(email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        return userApi.authenticate(email, password)
            .then(({ id, token }) => {
                this.__userId__ = id
                this.__userApiToken__ = token
            })
    },

    retrieveUser() {
        return userApi.retrieve(this.__userId__, this.__userApiToken__)
            .then(({ id, name, surname, username }) => ({
                id,
                name,
                surname,
                email: username
            }))
    },

    /**
     * Updates a users data. 
     * Uses: creating user playlists, to dislike and like a video, comenting, etc.
     * 
     * 
     * @param {object} data 
     */
    updateUser(data) {
        if (data.constructor !== Object) throw TypeError(data + ' is not an object')

        return userApi.update(data, this.__userApiToken__, this.__userId__)
            .then(() => {})  //en este caso no se obtiene respuesta de la api
    },

    /**
     * Deletes all users data from the api.
     * 
     * @param {string} username 
     * @param {string} password 
     */
    removeUser(email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')
        
        return userApi.remove(this.__userId__, this.__userApiToken__, email, password)
            .then(() => {}) //aqui tampoco esperamos respuesta
    },

    //he hecho que para borrar su usuario la parsona tiene que confirmarlo con el email i el password

    
    /**
     * 
     * @param {string} query 
     */
    searchVideo(query) {
        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)

        if (!query.trim().length) throw Error('query is empty')

        return youtubeApi.search(query)
            .then(({ id, snippet: { publishedAt, tittle, description, thumbnails: { default: { url } }, channelTittle } }) => (
                this.__userId__= id,
                {
                    date: publishedAt, 
                    tittle,
                    description,
                    thumbnail: url,
                    channelTittle 
                }
            )) /*no se si es mejor hacer el destructuring aqui o ya directamente en el componente y pillar desde ahi lo que necesitemos.
                tmb lo he hecho sin destructuring, pilla la mejor opcion*/
            
            // .then(items => ({   //opcion sin destructuring
            //     items
            // }))
    },

    popularResults(/*aqui es donde se podria meter lo de cambiar la region de los resultados populares*/) {
        return youtubeApi.mostPopular(/*aqui es donde se podria meter lo de cambiar la region de los resultados populares*/)
            .then(({ id, snippet: { publishedAt, tittle, thumbnails: { default: { url } }, channelTittle } }) => ({
                id,
                date: publishedAt, 
                tittle,
                thumbnail: url,
                channelTittle 
            })) //lo mismo que el search, no se si es mejor con o sin destructuring aqui

        // .then(items => ({   //opcion sin destructuring
        //     items
        // }))
    },

    watchVideo() {
        return youtubeApi.watchVideo(this.__videoId__)
            .then(({ snippet: { publishedAt, /* el channel id no lo ponemos aun porque no se si lo usaremos*/ tittle, description, channelTittle } }) => ({
                date: publishedAt,
                tittle,
                description,
                channelTittle
            }))
    }

}

export default logic