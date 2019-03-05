'use strict'

const logic = {
    unixtime : timestamp => new Date(timestamp).getTime(),
    
    parsetime : timestamp => {
        const date = new Date(timestamp)
        
        return {
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds()
        }
    }
    
}

module.exports=logic