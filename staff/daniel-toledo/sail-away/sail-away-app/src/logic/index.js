'use strict'

import sailAwayApi from '../sail-away-api'
import seaData from '../sea-data'

const  logic = {


    generateJourney(sea, route, dates, description ){
        debugger
     
        if (sea.constructor !== Object) throw TypeError(sea + ' is not an Object')
        if (!Object.keys(sea).length) throw Error('sea cannot be empty')

        if (route.constructor !== Array) throw TypeError(route + ' is not an Array')
        if (!route.length) throw Error('route cannot be empty')

        if (dates.constructor !== Array) throw TypeError(dates + ' is not an Array')
        if (!dates.length) throw Error('dates cannot be empty')

        if (typeof description !== 'string') throw TypeError(description + ' is not a string')
        if (!description.trim().length) throw Error('description cannot be empty')

        return sailAwayApi.createJourney(sea, route, dates, description)
    },

    listJourneys(){
        return sailAwayApi.listJourneys()
    },

    searchBySea(query){
        if (typeof query !== 'string') throw TypeError(query + ' is not a string')
        if (!query.trim().length) throw Error('query cannot be empty')
       
        return sailAwayApi.searchBySea(query)
    },

    findSea(seaName){
        if (typeof seaName !== 'string') throw TypeError(seaName + ' is not a string')
        if (!seaName.trim().length) throw Error('seaName cannot be empty')

        let sea=seaData.find(sea => { 
            if (sea.name === seaName) return sea
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