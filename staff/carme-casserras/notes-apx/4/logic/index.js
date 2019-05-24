const validate = require('../common/validate')
const { LogicError, FormatError } = require('../common/errors')

const { UserData, Note } = require('../data/models')

const logic = {

    createNote(text, id)  {
        validate.arguments([
            { name: 'text', value: text, type: 'string', notEmpty: true },
            { name: 'id', value: id, type: 'string', notEmpty: true }  
        ])

        return (async () => {
            await Note.create({text, author: id })
        })()
    },

    registerUser(name, surname, email, password) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return (async () => {
            const users = await UserData.find({ email })
            
            if (users.length) throw new LogicError(`user with email "${email}" already exists`)

            await UserData.create({ email, password, name, surname })
        })()
    },

    authenticateUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return (async () => {
            const users = await UserData.find(user => user.email === email)

            if (!users.length) throw new LogicError(`user with email "${email}" does not exist`)

            const [user] = users

            if (user.password !== password) throw new LogicError('wrong credentials')

            return user._id.toString()
        })()
    },

    retrieveUser(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])

        if (!ObjectId.isValid(id)) throw new FormatError('invalid id')

        return (async () => {
            const user = await UserData.retrieve(ObjectId(id))

            if (!user) throw new LogicError(`user with id "${id}" does not exist`)

            const { name, surname, email } = user

            return { name, surname, email }
        })()
    },

    searchDucks(id, query) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'query', value: query, type: 'string' }
        ])

        if (!ObjectId.isValid(id)) throw new FormatError('invalid id')

        return (async () => {
            const user = await UserData.retrieve(ObjectId(id))

            debugger

            if (!user) throw new LogicError(`user with id "${id}" does not exist`)

            const ducks = await duckApi.searchDucks(query)

            return ducks instanceof Array ? ducks : []
        })()
    },

    retrieveDuck(id, duckId) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'duckId', value: duckId, type: 'string', notEmpty: true }
        ])

        if (!ObjectId.isValid(id)) throw new FormatError('invalid id')

        return (async () => {
            const user = await UserData.retrieve(ObjectId(id))

            if (!user) throw new LogicError(`user with id "${id}" does not exist`)

            return duckApi.retrieveDuck(duckId)
        })()
    },

    toggleFavDuck(id, duckId) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'duckId', value: duckId, type: 'string', notEmpty: true }
        ])

        if (!ObjectId.isValid(id)) throw new FormatError('invalid id')

        return (async () => {
            const oid = ObjectId(id)

            const user = await UserData.retrieve(oid)

            const { favs = [] } = user

            const index = favs.indexOf(duckId)

            if (index < 0) favs.push(duckId)
            else favs.splice(index, 1)

            await UserData.update(oid, { favs })
        })()
    },

    retrieveFavDucks(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])

        if (!ObjectId.isValid(id)) throw new FormatError('invalid id')

        return (async () => {
            const user = await UserData.retrieve(ObjectId(id))

            const { favs = [] } = user

            if (favs.length)
                for (let i = 0; i < favs.length; i++)
                    favs[i] = await duckApi.retrieveDuck(favs[i])

            return favs
        })()
    }
}

module.exports = logic