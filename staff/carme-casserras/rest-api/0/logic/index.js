const validate = require('../common/validate')
const userApi = require('../data/user-api')
const duckApi = require('../data/duck-api')
const { LogicError } = require('../common/errors')
const token = require('../common/token')

// TODO move to single object in memory (logic)

const logic =  { 


    registerUser(name, surname, email, password) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return userApi.create(email, password, { name, surname })
            .then(response => {
                if (response.status === 'OK') return

                throw new LogicError(response.error)
            })
    },

    authenticateUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return userApi.authenticate(email, password)
            .then(response => {
                if (response.status === 'OK') {
                    const { data: { token, id } } = response

                    return token
                } else throw new LogicError(response.error)
            })
    },

    retrieveUser() {
        return userApi.retrieve(userId, userToken)
            .then(response => {
                if (response.status === 'OK') {
                    const { data: { name, surname, username: email } } = response

                    return { name, surname, email }
                } else throw new LogicError(response.error)
            })
    },

    logoutUser() {
        // ?
    },


    searchDucks(token, query) {
        validate.arguments([
            { name: 'query', value: query, type: 'string' }
        ])

        return duckApi.searchDucks(query)
            .then(ducks => ducks instanceof Array ? ducks : [])
    },

    retrieveDuck(token, id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string' }
        ])

        return duckApi.retrieveDuck(id)
    },

    toggleFavDuck(token, id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string' }
        ])

        return userApi.retrieve(userId, userToken) // Crec que amb el token és suficient
            .then(response => {
                const { status, data } = response

                if (status === 'OK') {
                    const { favs = [] } = data // NOTE if data.favs === undefined then favs = []

                    const index = favs.indexOf(id)

                    if (index < 0) favs.push(id)
                    else favs.splice(index, 1)

                    return userApi.update(userId, userToken, { favs }) // Crec que amb el token és suficient
                        .then(() => { })
                }

                throw new LogicError(response.error)
            })
    },

    retrieveFavDucks() {
        return userApi.retrieve(userId, userToken) // Crec que amb el token és suficient
            .then(response => {
                const { status, data } = response

                if (status === 'OK') {
                    const { favs = [] } = data

                    if (favs.length) {
                        const calls = favs.map(fav => duckApi.retrieveDuck(fav))

                        return Promise.all(calls)
                    } else return favs
                }

                throw new LogicError(response.error)
            })
    }
}

// module.exports = Logic