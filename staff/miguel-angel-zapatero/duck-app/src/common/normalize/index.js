'use strict'

const normalize = {
    undefinedOrNull(value) {
        if (value === 'null') return null
        if (value === 'undefined') return undefined
    
        return value
    }
}

export default normalize