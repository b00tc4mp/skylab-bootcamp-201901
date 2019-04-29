import validate from '../common/validate'
import normalize from '../common/normalize'
import weatherApi from "../data/weather-api";
import itunesApi from "../data/itunes-api";
import userApi from "../data/user-api";
import { ValueError, LogicError } from '../common/errors';

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
}

export default logic