import normalize from '../common/normalize'
import validate from '../common/validate'
import userApi from '../data/user-api'
import weatherApi from "../data/weather-api";
import itunesApi from "../data/itunes-api";
import { LogicError, ValueError } from '../common/errors'

const logic = {

    set __userId__(id) {
        sessionStorage.userId = id
    },

    get __userId__() {
        return normalize.undefinedOrNull(sessionStorage.userId)
    },

    set __userToken__(token) {
        sessionStorage.userToken = token
    },

    get __userToken__() {
        return normalize.undefinedOrNull(sessionStorage.userToken)
    },

    get isUserLoggedIn() {
        return !!(this.__userId__ && this.__userToken__)
    },

    registerUser(name, surname, email, password, city){
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true },
            { name: 'city', value: city, type: 'string', notEmpty: true }
        ])

        validate.email(email)
        let preferences=[{Thunderstorm:'Classical'}, {Drizzle :'Pop'}, {Rain :'Jazz'}, {Snow :'Christmas'}, {Clear :'Urbano latino'}, {Clouds :'Rock'}, {Default :'Tango'}]
        const app='wtunes'
        return userApi.create(email, password, {name, surname, preferences, city, app})
            .then(response => {
                if(response.status==='OK') return
                else throw new LogicError(response.error)
            })
    },

    loginUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return userApi.authenticate(email, password)
            .then(response => {
                if (response.status === 'OK') {
                    const { data: { id, token } } = response

                    this.__userId__ = id
                    this.__userToken__ = token
                } else throw new LogicError(response.error)
            })
    },
    logoutUser() {
        sessionStorage.clear()
    },

    retrieveUser() {
        return userApi.retrieve(this.__userId__, this.__userToken__)
            .then(response => {
                if (response.status === 'OK') {
                    const { data: { name, surname, username: email } } = response

                    return { name, surname, email }
                } else throw new LogicError(response.error)
            })
    },

    retrieveUserPreferences (){
        return userApi.retrieve(this.__userId__, this.__userToken__)
            .then(response => {
                const { status, data } = response

                if (status === 'OK') {
                    const { preferences } = data
                    return preferences
                }else throw new LogicError(response.error)
            })
    },

    updateUserPreferences(preferences){
        validate.arguments([
            { name: 'preferences', value: preferences, type: 'object', notEmpty: true }
        ])
        return userApi.update(this.__userId__, this.__userToken__, {preferences})
            .then(response =>{
                if(response.status==='OK')return
                else throw new LogicError(response.error)
            })
    },

    updateUserCity(city){
        validate.arguments([
            { name: 'city', value: city, type: 'string', notEmpty: true }
        ])
        return userApi.update(this.__userId__, this.__userToken__, {city})
            .then(response =>{
                if(response.status==='OK')return
                else throw new LogicError(response.error)
            })
    },

    retrieveWeather(city){

        validate.arguments([
            { name: 'city', value: city, type: 'string', notEmpty: true},
        ])

        return weatherApi.retrieve(city)
            .then(response => {
                if (!response.message){
                    const {weather:[{main, icon}], name} = response
                    return [ name, main, icon]
                }
                else throw new ValueError(response.message)
            })
    },

    searchMusic(query){
        validate.arguments([
            { name: 'query', value: query, type: 'string', notEmpty: true},
        ])
        const limit = 20
        return itunesApi.searchMusic(query, 'music', limit)
        .then(response => {
                let resultsArr = []
                const {results} = response
                if (results.length > 0){
                    results.map(element => {
                        const{trackName, previewUrl, artworkUrl100 } = element
                        resultsArr.push({
                            trackName,
                            previewUrl,
                            artWork: artworkUrl100
                        })
                    })
                    return resultsArr
                }else throw new Error ('no results found')
            })
    }
}

export default logic