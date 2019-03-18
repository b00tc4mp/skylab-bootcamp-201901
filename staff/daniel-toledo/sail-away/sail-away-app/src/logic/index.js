'use strict'

import sailAwayApi from '../sail-away-api'
// import seaData from '../sea-data'
import { data } from 'sail-away-data'

const logic = {

    __userToken__: null,

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

        //TODO kind

        return sailAwayApi.registerUser(name, surname, email, password, passwordConfirm, kind)
    },

    login(email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string');
        if (!email.trim().length) throw Error('email cannot be empty');

        if (typeof password !== 'string') throw TypeError(password + ' is not a string');
        if (!password.trim().length) throw Error('password cannot be empty');

        return sailAwayApi.authenticateUser(email, password)
            .then(({ token }) => this.__userToken__ = token)
    },

    retrieveUserLogged(){
        let token= this.__userToken__
        
        if (typeof token !== 'string') throw TypeError(token + ' is not a string');
        if (!token.trim().length) throw Error('token cannot be empty');
     
        return sailAwayApi.retrieveUserLogged(token)
     },

    retrieveUser(id){
        if (typeof id !== 'string') throw TypeError(id + ' is not a string');
        if (!id.trim().length) throw Error('id cannot be empty');
     
        return sailAwayApi.retrieveUser(id)
     },

    searchUseres(talents, languages){
        //TODO

        return sailAwayApi.searchUser(talents, languages)
     },

    updateUser(pictures, name, surname, gender, nationality, birthday, description, boats, talents, experience, languages){
        //TODO

        let token= this.__userToken__
        
        if (typeof token !== 'string') throw TypeError(token + ' is not a string');
        if (!token.trim().length) throw Error('token cannot be empty');


        return sailAwayApi.updateUser(token, pictures, name, surname, gender, nationality, birthday, description, boats, talents, experience, languages)
    },

    updateBoat(boat){
        debugger
        let token= this.__userToken__
        
        if (typeof token !== 'string') throw TypeError(token + ' is not a string');
        if (!token.trim().length) throw Error('token cannot be empty');

        if (boat.constructor !== Object) throw TypeError(boat + ' is not an Array')
        if (!Object.keys(boat).length) throw Error('boat cannot be empty')

        return sailAwayApi.updateBoat(token, boat)

    },

    updatePicture(picture) {

        if (!picture) throw Error('picture is empty')
        if (!(picture instanceof Blob)) throw TypeError(`${picture} is not a blob`)

        let token= this.__userToken__
        
        if (typeof token !== 'string') throw TypeError(token + ' is not a string');
        if (!token.trim().length) throw Error('token cannot be empty');

        return sailAwayApi.updatePicture(token, picture)

    },

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


    get isUserLoggedIn() {
        return !!this.__userToken__
    },

    logOutUser() {
        this.__userToken__ = null
    },

    generateJourney(title, seaId, route, dates, description, userId, boat, talents, experience, sailingTitles, languages) {

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

    listJourneys() {
        return sailAwayApi.listJourneys()
    },

    searchBySea(query) {
        if (typeof query !== 'string') throw TypeError(query + ' is not a string')
        if (!query.trim().length) throw Error('query cannot be empty')

        return sailAwayApi.searchBySea(query)
    },

    findSeaId(seaName) {
        if (typeof seaName !== 'string') throw TypeError(seaName + ' is not a string')
        if (!seaName.trim().length) throw Error('seaName cannot be empty')

        let sea = data.seas.find(sea => {
            if (sea.name === seaName) return sea
        })
        if (sea) return sea.id
        else throw Error('sea not found')
    },

    retrieveSea(seaId) {
        if (typeof seaId !== 'string') throw TypeError(seaId + ' is not a string')
        if (!seaId.trim().length) throw Error('seaId cannot be empty')

        let sea = data.seas.find(sea => {
            if (sea.id === seaId) return sea
        })
        if (sea) return sea
        else throw Error('sea not found')
    },

    retrieveJourney(id) {
        if (typeof id !== 'string') throw TypeError(id + ' is not a string')
        if (!id.trim().length) throw Error('id cannot be empty')

        return sailAwayApi.retrieveJourney(id)
    },

    retrieveMyJourneys(){
        let token= this.__userToken__
        
        if (typeof token !== 'string') throw TypeError(token + ' is not a string');
        if (!token.trim().length) throw Error('token cannot be empty');
     
        return sailAwayApi.retrieveJourneysByUserId(token)

    },

    updateJourney(id, title, seaId, route, dates, description, userId, boat, talents, experience, sailingTitles, languages) {
     

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
            sailingTitles,
            languages
        }


        return sailAwayApi.updateJourney(id, title, seaId, route, dates, description, userId, boat, lookingFor)

    },

    toggleJourneyFavorite(journeyId){
        let token= this.__userToken__
        
        if (typeof token !== 'string') throw TypeError(token + ' is not a string');
        if (!token.trim().length) throw Error('token cannot be empty');


        if (typeof journeyId !== 'string') throw TypeError(journeyId + ' is not a string')
        if (!journeyId.trim().length) throw Error('journeyId cannot be empty')
     
        return sailAwayApi.toggleJourneyFavorite(token, journeyId)
    },

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