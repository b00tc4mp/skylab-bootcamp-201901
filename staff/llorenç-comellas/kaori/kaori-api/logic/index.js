const validate = require('../common/validate')
const { LogicError } = require('../common/errors')
const models = require('../data/models')
const bcrypt = require('bcrypt')

const { User } = models

const logic = {
    registerUser(name, surname, phone, email, password) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'phone', value: phone, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        //TODO LOGIC
        return (async () => {
            const encryptPassword = bcrypt.hashSync(password, 10) 
            await User.create({ name, surname, phone, email, password: encryptPassword })
        })()
    },

    authenticateUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        //TODO LOGIC
        return (async () => {
            const user = await User.findOne({ email })
            if (user.password = password) return user.id
            else throw new LogicError('wrong credentials')

        })()
    },

    retrieveUser(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])
        
        //TODO LOGIC

        return (async () => {
            return await User.findById(id).select('name surname phone email -_id').lean()
        })()

    },

    updateUsr(){
        //TODO
    },

    deleteUser(){
        //TODO
    }

}

module.exports = logic