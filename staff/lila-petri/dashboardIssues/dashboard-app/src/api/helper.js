const moment = require ('moment')

const helper ={ 

    randomHelper(array){
        let randomIndex = Math.floor(Math.random() * array.length) 
        let randomElement = array[randomIndex]
        return randomElement
    },
    diffBetweenDates(starDate, endDate){
        let first = moment(starDate);
        let second = moment(endDate);
        return second.diff(first, 'days')
    }
}
module.exports=helper