const validate = require('../common/validate')
const { LogicError, FormatError } = require('../common/errors')

const { UserData } = require ('../data/models')

const logic = {
    registerUser(name, surname, email, password) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return (async () => {
            const users = await UserData.find( {email} )

            if (users.length) throw new LogicError(`user with email "${email}" already exists`)

            try {
                const userCreated = await UserData.create({name, surname, email: email, password })
                return userCreated.id
            } catch (error) {
                console.log('Error create: ' + error)
            }
        })()
    },

    authenticateUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return (async () => {
            const users = await UserData.find({email})

            if (!users.length) throw new LogicError(`user with email "${email}" does not exist`)

            const [user] = users

            if (user.password !== password) throw new LogicError('wrong credentials')

            return user.id
        })()
    },

    retrieveUser(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])

        //if (!ObjectId.isValid(id)) throw new FormatError('invalid id')

        return (async () => {
            debugger
            const user = await UserData.findById(id)
            debugger
            if (!user) throw new LogicError(`user with id "${id}" does not exist`)

            const { name, surname, email } = user

            return { name, surname, email }
        })()
    },


    addPublicNote(userId, text) {
        // TODO validate inputs

        // TODO implement logic

        return (async() => {
            await Note.create({ author: userId, text })
        })()
    },

    removePublicNote(userId, notedId) {
        // TODO validate inputs

        // TODO implement logic
    },

    listPublicNotes(userId) {
        // TODO validate inputs

        // TODO implement logic
    },

    addPrivateNote(userId, text) {
        // TODO validate inputs

        // TODO implement logic
    },

    removePrivateNote(userId, noteId) {
        // TODO validate inputs

        // TODO implement logic
    },

    listPrivateNotes(userId) {
        // TODO validate inputs

        // TODO implement logic
    }

}

module.exports = logic