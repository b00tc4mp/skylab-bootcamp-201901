'use strict'
import homeSwappApi from '../api'
import geocodeApi from '../geocode-api'

/**
 * Abstraction of business logic.
 */
const logic = {

    __userApiToken__: null,



    setUserApiToken(token) {
        this.__userApiToken__ = token
    },

    getUserApiToken() {
        return this.__userApiToken__
    },

    get userLoggedIn() {
        return !!this.getUserApiToken()
    },

    /**
    * Registers a user.
    * 
    * Register a user in the application
    * 
    * @param {string} name 
    * @param {string} surname 
    * @param {string} email 
    * @param {string} password 
    * @param {string} passwordConfirmation 
    * 
    * @returns {promise} - returns a empty promise
    */
    registerUser(username, email, password, passwordConfirmation) {
        if (typeof username !== 'string') throw TypeError(username + ' is not a string')

        if (!username.trim().length) throw Error('username cannot be empty')

        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (!(/^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/.test(email))) throw Error('Invalid email adress')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        if (typeof passwordConfirmation !== 'string') throw TypeError(passwordConfirmation + ' is not a string')

        if (!passwordConfirmation.trim().length) throw Error('password confirmation cannot be empty')

        if (password !== passwordConfirmation) throw Error('passwords do not match')

        return homeSwappApi.registerUser(username, email, password, passwordConfirmation)
    },

    /**
     * 
     * Login User
     * 
     * Logins a user by its credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     * 
     * @returns {promise} - sets in sessioin storage the token and the id of the user
     */
    loginUser(email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        return homeSwappApi.authenticateUser(email, password)
            .then((token) => {
                this.setUserApiToken(token)
                return token
            })
    },

    logout() {
        this.__userApiToken__ = null;
        sessionStorage.removeItem('homeSwapp-api-token')
    },

    /**
     * Retrieve user
     * 
     * retrieve the information of the logged user
     * 
     * 
     * @returns {promise} - returns the infromation of a user in object format
     * 
     */

    retrieveUser() {
        return homeSwappApi.retrieveUser(this.getUserApiToken())

    },

    /**
     * 
     * update user
     * 
     * updates an user with new information
     * 
     * @param {Object} data 
     * 
     * @returns {promise}
     */

    updateUser(data) {
        if (data.constructor !== Object) throw TypeError(data + 'is not an Object')

        return homeSwappApi.updateUser(this.getUserApiToken(), data)
    },

    createHouse(images, description, info, adress) {

        if (typeof images !== 'object') throw Error(`${images} is not an array`)
        if (images.length == 0) throw Error('There must be at least one image')
        if (typeof description !== 'string') throw Error(`${description} is not a string`)
        if (typeof info !== 'object') throw Error(`${info} is not an object`)
        if (typeof adress !== 'object') throw Error(`${adress} is not an object`)

        return homeSwappApi.createHouse(this.getUserApiToken(), images, description, info, adress)


    },

    retrieveHouse(houseId) {

        if (typeof houseId !== 'string') throw TypeError(`${houseId} is not a string`)
        if (!houseId.trim().length) throw Error('houseId is empty')

        return homeSwappApi.retrieveHouse(houseId)

    },

    updateHouse( houseId, images, description, info, adress) {

        if (typeof houseId !== 'string') throw TypeError(`${houseId} is not a string`)
        if (!houseId.trim().length) throw Error('houseId is empty')
        if (typeof images !== 'object') throw Error(`${images} is not an array`)
        if (images.length == 0) throw Error('There must be at least one image')
        if (typeof description !== 'string') throw Error(`${description} is not a string`)
        if (typeof info !== 'object') throw Error(`${info} is not an object`)
        if (typeof adress !== 'object') throw Error(`${adress} is not an object`)

        return homeSwappApi.updateHouse(this.getUserApiToken(), houseId, images, description, info, adress)

    },

    deleteHouse(houseId) {



        if (typeof houseId !== 'string') throw TypeError(`${houseId} is not a string`)
        if (!houseId.trim().length) throw Error('houseId is empty')


        return homeSwappApi.deleteHouse(this.getUserApiToken(), houseId)
    },


    searchByQuery(query) {

        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)
        if (!query.trim().length) throw Error('query is empty')

        return homeSwappApi.searchByQuery(query)
    },

    retrieveMyHouses() {

        
        return homeSwappApi.retrieveMyHouses(this.getUserApiToken())

    },

    retrieveFavorites() {

        
        return homeSwappApi.retrieveFavorites(this.getUserApiToken())

    },
    
    toggleFavorite(houseId) {
        if (typeof houseId !== 'string') throw TypeError(`${houseId} is not a string`)
        if (!houseId.trim().length) throw Error('houseId is empty')
        
        return homeSwappApi.toggleFavorite(this.getUserApiToken(),houseId)

    },

    retrievePoint(number, street, city, country){

        if (typeof number !== 'string') throw TypeError(`${number} is not a string`)
        if (typeof street !== 'string') throw TypeError(`${street} is not a string`)
        if (typeof city !== 'string') throw TypeError(`${city} is not a string`)
        if (typeof country !== 'string') throw TypeError(`${country} is not a string`)

        return geocodeApi.retrievePoint(number, street, city, country)

    },


    uploadImage(image){

        if( !(image instanceof Blob)) throw TypeError (`${image} is not a blob`)

        return homeSwappApi.uploadImage(this.getUserApiToken(),image)


    },

    sendMessage(interlocutorId,text){

        if (typeof interlocutorId !== 'string') throw TypeError(`${interlocutorId} is not a string`)
        if (typeof text !== 'string') throw TypeError(`${text} is not a string`)


        return homeSwappApi.sendMessage(this.getUserApiToken(),interlocutorId,text)



    },

    retrieveUserPublicInfo(userId){

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)


        return homeSwappApi.retrieveUserPublicInfo(userId)



    }




}

export default logic