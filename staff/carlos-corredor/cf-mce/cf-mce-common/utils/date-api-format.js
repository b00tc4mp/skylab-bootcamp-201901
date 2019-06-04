const validate = require('../validate')

const dateApi = {
    createDate(date) {
        if(date) {
            validate.date(date)
            if(typeof date === 'boolean') return date = new Date
            else return date = new Date(date)
        }
    }
}

module.exports = dateApi