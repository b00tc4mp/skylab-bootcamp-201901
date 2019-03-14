'use strict'

const logic = {
    unixtime(timestamp) {
        return new Date(timestamp).getTime()
    },
    
    parsetime(timestamp) {
        const date = new Date(timestamp)
        
        return {
            h: date.getHours(),
            m: date.getMinutes(),
            s: date.getSeconds()
        }
    }
}

module.exports = logic