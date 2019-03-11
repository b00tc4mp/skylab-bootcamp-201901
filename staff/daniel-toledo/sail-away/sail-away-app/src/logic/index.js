'use strict'

import sailAwayApi from '../sail-away-api'
// import seaData from '../sea-data'
import {data} from 'sail-away-data'

const  logic = {


    generateJourney(title, seaId, route, dates, description, userId, boat, talents, experience, sailingTitles, languages){

        if (typeof seaId !== 'string') throw TypeError(seaId + ' is not a string')
        if (!seaId.trim().length) throw Error('seaId cannot be empty')
        
        if (route.constructor !== Array) throw TypeError(route + ' is not an Array')
        if (!route.length) throw Error('route cannot be empty')

        if (dates.constructor !== Array) throw TypeError(dates + ' is not an Array')
        if (!dates.length) throw Error('dates cannot be empty')

        if (typeof description !== 'string') throw TypeError(description + ' is not a string')
        if (!description.trim().length) throw Error('description cannot be empty')

        //TODO

        let lookingFor={
            talents,
            experience,
            sailingTitles: [],
            languages
        }

        return sailAwayApi.createJourney(title, seaId, route, dates, description, userId, boat, lookingFor)
    },

    listJourneys(){
        return sailAwayApi.listJourneys()
    },

    searchBySea(query){
        if (typeof query !== 'string') throw TypeError(query + ' is not a string')
        if (!query.trim().length) throw Error('query cannot be empty')
       
        return sailAwayApi.searchBySea(query)
    },

    findSeaId(seaName){
        if (typeof seaName !== 'string') throw TypeError(seaName + ' is not a string')
        if (!seaName.trim().length) throw Error('seaName cannot be empty')

        let sea=data.seas.find(sea => { 
            if (sea.name === seaName) return sea
        })
        if (sea) return sea.id
        else throw Error('sea not found') 
    },

    retrieveSea(seaId){
        if (typeof seaId !== 'string') throw TypeError(seaId + ' is not a string')
        if (!seaId.trim().length) throw Error('seaId cannot be empty')

        let sea=data.seas.find(sea => { 
            if (sea.id === seaId) return sea
        })
        if (sea) return sea
        else throw Error('sea not found') 
    },

    retrieveJourney(id){
        if (typeof id !== 'string') throw TypeError(id + ' is not a string')
        if (!id.trim().length) throw Error('id cannot be empty')

        return sailAwayApi.retrieveJourney(id)
    },

    updateJourney(id, sea, route, dates, description){
        debugger

        if (typeof id !== 'string') throw TypeError(id + ' is not a string')
        if (!id.trim().length) throw Error('id cannot be empty')
        
        if (sea.constructor !== Object) throw TypeError(sea + ' is not an Object')
        if (!Object.keys(sea).length) throw Error('sea cannot be empty')

        if (route.constructor !== Array) throw TypeError(route + ' is not an Array')
        if (!route.length) throw Error('route cannot be empty')

        if (dates.constructor !== Array) throw TypeError(dates + ' is not an Array')
        if (!dates.length) throw Error('dates cannot be empty')

        if (typeof description !== 'string') throw TypeError(description + ' is not a string')
        if (!description.trim().length) throw Error('description cannot be empty')

        return sailAwayApi.updateJourney(id, sea, route, dates, description)

    }

}

export default logic