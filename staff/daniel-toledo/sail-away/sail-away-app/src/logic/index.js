'use strict'

import sailAwayApi from '../sail-away-api'

const  logic = {

    generateJourney(route, dates, description ){
        if (route.constructor !== Array) throw TypeError(route + ' is not an Array');
        if (!route.length) throw Error('route cannot be empty');

        if (dates.constructor !== Array) throw TypeError(dates + ' is not an Array');
        if (!dates.length) throw Error('dates cannot be empty');

        if (typeof description !== 'string') throw TypeError(description + ' is not a string');
        if (!description.trim().length) throw Error('description cannot be empty');

        console.log(route)
        console.log(dates)
        console.log(description)
        return sailAwayApi.createJourney(route, dates, description)
    }

}

export default logic