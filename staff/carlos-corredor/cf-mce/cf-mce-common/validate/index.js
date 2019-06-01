const { ValueError, RequirementError, FormatError, LogicError } = require('../errors')

const validate = {
    arguments(args) {
        args.forEach(({ name, value, type, notEmpty, optional }) => {
            if (value != undefined) {
                if (typeof value !== type) {
                    if(type[0] === ('a' || 'e' || 'i' || 'o' || 'u')) throw TypeError(`${name} ${value} is not an ${type}`)
                    throw TypeError(`${name} ${value} is not a ${type}`)
                }

                if (notEmpty)
                    if (type === 'string') {
                        if (!value.trim().length) throw new ValueError(`${name} is empty`)
                    } else if (type === 'object')
                        if (!Object.keys(value).length) throw new ValueError(`${name} is empty`)
            } else if (!optional) throw new RequirementError(`${name} is not optional`)
        })
    },

    email(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!re.test(String(email))) throw new FormatError(`${email} is not an e-mail`)
    },

    url(url) {
        const re = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/

        if (!re.test(String(url))) throw new FormatError(`${url} is not a url`)
    },

    category(category) {
        const categories = ['MASTER', 'TECHNICIAN', 'ASSISTANT']
        if(categories.indexOf(category) < 0) throw new LogicError(`${category} is not a valid option for category`)
    },

    idMongodb(id) {
        if(id.length !== 24 ) throw new FormatError(`${id} is not a valid id`)
    },

    status(status) {
        const statusList = ['RECEIVED', 'REVIEWED', 'BUDGETED', 'APPROVED', 'REPAIRED', 'TO-COLLECT', 'DELIVERED', 'COLLECTED']
        if(statusList.indexOf(status) < 0) throw new LogicError(`${status} is not a valid option for status`)
    },

}

module.exports = validate