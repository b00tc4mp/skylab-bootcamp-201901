'use strict'

const normalize = {
    undefinedOrNull(value) {
        if (value === 'null') return null
        if (value === 'undefined') return undefined
    
        return value
    }
}

//module.exports = normalize
export default normalize