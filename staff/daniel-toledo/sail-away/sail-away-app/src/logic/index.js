'use strict'

import sailAwayApi from '../sail-away-api'
import data from '../data'

const logic = {

    __userToken__: null,

    /**
     * Register a user
     * 
     * @param {string} name 
     * @param {string} surname 
     * @param {string} email 
     * @param {string} password 
     * @param {string} passwordConfirm 
     * @param {string} kind 
     * 
     * @return {string} id
     */
    register(name, surname, email, password, passwordConfirm, kind) {
        if (typeof name !== 'string') throw TypeError(name + ' is not a string');
        if (!name.trim().length) throw Error('name cannot be empty');

        if (typeof surname !== 'string') throw TypeError(surname + ' is not a string');
        if (!surname.trim().length) throw Error('surname cannot be empty');

        if (typeof email !== 'string') throw TypeError(email + ' is not a string');
        if (!email.trim().length) throw Error('email cannot be empty');

        if (typeof password !== 'string') throw TypeError(password + ' is not a string');
        if (!password.trim().length) throw Error('password cannot be empty');

        if (typeof passwordConfirm !== 'string') throw TypeError(passwordConfirm + ' is not a string');
        if (!passwordConfirm.trim().length) throw Error('password confirmation cannot be empty');

        if (typeof kind !== 'string') throw TypeError(kind + ' is not a string');
        if (!kind.trim().length) throw Error('kind cannot be empty');


        return sailAwayApi.registerUser(name, surname, email, password, passwordConfirm, kind)
    },

    /**
     * loggs in a user
     * 
     * @param {string} email 
     * @param {string} password 
     * 
     * 
     */
    login(email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string');
        if (!email.trim().length) throw Error('email cannot be empty');

        if (typeof password !== 'string') throw TypeError(password + ' is not a string');
        if (!password.trim().length) throw Error('password cannot be empty');

        return sailAwayApi.authenticateUser(email, password)
            .then(({ token }) => this.__userToken__ = token)
    },

    /**
     * return the logged user
     * 
     * @return {Object} the logged user
     */
    retrieveUserLogged(){
        let token= this.__userToken__
        
        if (typeof token !== 'string') throw TypeError(token + ' is not a string');
        if (!token.trim().length) throw Error('token cannot be empty');
     
        return sailAwayApi.retrieveUserLogged(token)
     },

     /**
      * retrieve a user
      * 
      * @param {string} id 
      * 
      * @return {Object} the user
      */
    retrieveUser(id){
        if (typeof id !== 'string') throw TypeError(id + ' is not a string');
        if (!id.trim().length) throw Error('id cannot be empty');
     
        return sailAwayApi.retrieveUser(id)
     },

     /**
     * Search users by its talents and langugaes. At least one talent and one lenguages of the inputs arrays
     * 
     * @param {Array} talents 
     * @param {Array} languages 
     * 
     * 
     * @return {Array} users found
     */
    searchUsers(talents, languages){
        if (talents.constructor !== Array) throw TypeError(`${talents} is not an array`)
        if (languages.constructor !== Array) throw TypeError(`${languages} is not an array`)


        return sailAwayApi.searchUser(talents, languages)
    },

    /**
     * Updates a User
     * 
     * @param {string} name 
     * @param {string} surname 
     * @param {string} gender 
     * @param {string} nationality 
     * @param {string} birthday 
     * @param {string} description 
     * @param {Array} boats 
     * @param {Array} talents 
     * @param {string} experience 
     * @param {Array} languages 
     * 
     * @returns {Object} updated user
     */
    updateUser(name, surname, gender, nationality, birthday, description, boats, talents, experience, languages){
    
        let token= this.__userToken__
        
        if (typeof token !== 'string') throw TypeError(token + ' is not a string');
        if (!token.trim().length) throw Error('token cannot be empty');


        return sailAwayApi.updateUser(token, name, surname, gender, nationality, birthday, description, boats, talents, experience, languages)
    },

    /**
     * Adds or Edit a new Boat from user
     *  
     * @param {Object} boat 
     * 
     * @return {Object} user updated
     */
    updateBoat(boat){
        let token= this.__userToken__
        
        if (typeof token !== 'string') throw TypeError(token + ' is not a string');
        if (!token.trim().length) throw Error('token cannot be empty');

        if (boat.constructor !== Object) throw TypeError(boat + ' is not an Array')
        if (!Object.keys(boat).length) throw Error('boat cannot be empty')

        return sailAwayApi.updateBoat(token, boat)

    },

   /**
     * Updates the profile pictures
     * 
     * @param {string} picture
     *  
     * @return {Object} user updated
     */
    updatePicture(picture) {

        if (!picture) throw Error('picture is empty')
        if (!(picture instanceof Blob)) throw TypeError(`${picture} is not a blob`)

        let token= this.__userToken__
        
        if (typeof token !== 'string') throw TypeError(token + ' is not a string');
        if (!token.trim().length) throw Error('token cannot be empty');

        return sailAwayApi.updatePicture(token, picture)

    },

   /**
     * Updates the pictures of Boat from user
     * 
     * @param {string} boatId 
     * @param {string} picture 
     * 
     * @return {Object} user updated
     */
    updateBoatPicture(picture, boatId) {

        if (!picture) throw Error('picture is empty')
        if (!(picture instanceof Blob)) throw TypeError(`${picture} is not a blob`)

        if (typeof boatId !== 'string') throw TypeError(boatId + ' is not a string');
        if (!boatId.trim().length) throw Error('boatId cannot be empty');


        let token= this.__userToken__
        
        if (typeof token !== 'string') throw TypeError(token + ' is not a string');
        if (!token.trim().length) throw Error('token cannot be empty');

        return sailAwayApi.updateBoatPicture(token, picture, boatId)

    },

    /**
     * return true is user is logged, false if it is not
     */
    get isUserLoggedIn() {
        return !!this.__userToken__
    },

    /**
     * deletes the token from storage
     */
    logOutUser() {
        this.__userToken__ = null
        sessionStorage.removeItem('token')
    },

    /**
     * Adda a journey
     * 
     * @param {string} title 
     * @param {string} seaId 
     * @param {Array} route 
     * @param {Array} dates 
     * @param {string} description 
     * @param {string} userId 
     * @param {Object} boat 
     * @param {Array} talents 
     * @param {string} experience 
     * @param {Array} languages
     * 
     * @return {string} the id of the journey 
     */
    generateJourney(title, seaId, route, dates, description, userId, boat, talents, experience, languages) {

        if (typeof seaId !== 'string') throw TypeError(seaId + ' is not a string')
        if (!seaId.trim().length) throw Error('seaId cannot be empty')

        if (route.constructor !== Array) throw TypeError(route + ' is not an Array')
        if (!route.length) throw Error('route cannot be empty')

        if (dates.constructor !== Array) throw TypeError(dates + ' is not an Array')
        if (!dates.length) throw Error('dates cannot be empty')

        if (typeof description !== 'string') throw TypeError(description + ' is not a string')
        if (!description.trim().length) throw Error('description cannot be empty')

        //TODO

        let lookingFor = {
            talents,
            experience,
            sailingTitles: [],
            languages
        }
        return sailAwayApi.createJourney(title, seaId, route, dates, description, userId, boat, lookingFor)
    },

    /**
     * search by sea
     * 
     * @param {string} query 
     * 
     * @return {Array} the journeys
     */
    searchBySea(query) {
        if (typeof query !== 'string') throw TypeError(query + ' is not a string')
        if (!query.trim().length) throw Error('query cannot be empty')

        return sailAwayApi.searchBySea(query)
    },

    /**
     * gis the id with sea name
     * 
     * @param {string} seaName 
     * 
     * @return {string} id
     */
    findSeaId(seaName) {
        if (typeof seaName !== 'string') throw TypeError(seaName + ' is not a string')
        if (!seaName.trim().length) throw Error('seaName cannot be empty')

        let sea = data.seas.find(sea => {
            if (sea.name === seaName) return sea
        })
        if (sea) return sea.id
        else throw Error('sea not found')
    },

    /**
     * givs name with sea id
     * 
     * @param {string} seaId 
     * 
     * @return {string} name of the sea
     */
    retrieveSea(seaId) {
        if (typeof seaId !== 'string') throw TypeError(seaId + ' is not a string')
        if (!seaId.trim().length) throw Error('seaId cannot be empty')

        let sea = data.seas.find(sea => {
            if (sea.id === seaId) return sea
        })
        if (sea) return sea
        else throw Error('sea not found')
    },

    /**
     * retrieve the journey
     * 
     * @param {string} id 
     * 
     * @return {Object} the journey
     */
    retrieveJourney(id) {
        if (typeof id !== 'string') throw TypeError(id + ' is not a string')
        if (!id.trim().length) throw Error('id cannot be empty')

        return sailAwayApi.retrieveJourney(id)
    },

    /**
     * retrieve the journeys of logged user
     * 
     * @return {Array} the journeys
     */
    retrieveMyJourneys(){
        let token= this.__userToken__
        
        if (typeof token !== 'string') throw TypeError(token + ' is not a string');
        if (!token.trim().length) throw Error('token cannot be empty');
     
        return sailAwayApi.retrieveJourneysByUserId(token)

    },

    /**
     * updates a journey
     * 
     * @param {string} id 
     * @param {string} title 
     * @param {string} seaId 
     * @param {Array} route 
     * @param {Array} dates 
     * @param {string} description 
     * @param {string} userId 
     * @param {Array} boat 
     * @param {Array} talents 
     * @param {string} experience 
     * @param {Array} languages 
     * 
     * @return {Object} updated jurney
     */
    updateJourney(id, title, seaId, route, dates, description, userId, boat, talents, experience, languages) {
     

        if (typeof id !== 'string') throw TypeError(id + ' is not a string')
        if (!id.trim().length) throw Error('id cannot be empty')

        if (typeof seaId !== 'string') throw TypeError(seaId + ' is not a string')
        if (!seaId.trim().length) throw Error('seaId cannot be empty')

        if (route.constructor !== Array) throw TypeError(route + ' is not an Array')
        if (!route.length) throw Error('route cannot be empty')

        if (dates.constructor !== Array) throw TypeError(dates + ' is not an Array')
        if (!dates.length) throw Error('dates cannot be empty')

        if (typeof description !== 'string') throw TypeError(description + ' is not a string')
        if (!description.trim().length) throw Error('description cannot be empty')

        //TO DO

        let lookingFor = {
            talents,
            experience,
            languages
        }


        return sailAwayApi.updateJourney(id, title, seaId, route, dates, description, userId, boat, lookingFor)

    },

    /**
     * add favorite o delete favorite journeys
     * 
     * @param {string} journeyId
     * 
     * @return {Object} the updated user
     */
    toggleJourneyFavorite(journeyId){
        let token= this.__userToken__
        
        if (typeof token !== 'string') throw TypeError(token + ' is not a string');
        if (!token.trim().length) throw Error('token cannot be empty');


        if (typeof journeyId !== 'string') throw TypeError(journeyId + ' is not a string')
        if (!journeyId.trim().length) throw Error('journeyId cannot be empty')
     
        return sailAwayApi.toggleJourneyFavorite(token, journeyId)
    },

   /**
     * add favorite o delete favorite users
     * 
     * @param {string} crewId
     * 
     * @return {Object} the updated user
     */
    toggleCrewFavorite(crewId){
        let token= this.__userToken__
        
        if (typeof token !== 'string') throw TypeError(token + ' is not a string');
        if (!token.trim().length) throw Error('token cannot be empty');

        if (typeof crewId !== 'string') throw TypeError(crewId + ' is not a string')
        if (!crewId.trim().length) throw Error('crewId cannot be empty')
     
        return sailAwayApi.toggleCrewFavorite(token, crewId)
    }

}

export default logic