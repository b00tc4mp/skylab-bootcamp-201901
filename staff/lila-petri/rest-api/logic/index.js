const validate = require('../common/validate')
const userApi = require('../data/user-api')
const duckApi = require('../data/duck-api')
const { LogicError } = require('../common/errors')
const token = require('../common/token')

const logic = { 
    
    // get __userId__() {
    //     if (this.__userToken__) {
    //         const payload = token.payload(this.__userToken__)

    //         return payload.id
    //     }
    // },

    // get isUserLoggedIn() {
    //     return !!this.__userToken__
    // },

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
                    const { data: { token } } = response
                    return token
                } else throw new LogicError(response.error)
            })
    },

    retrieveUser(userToken) {
        validate.arguments([
            { name: 'userToken', value: userToken, type: 'string', notEmpty : true }
        ])

        const payload = token.payload(userToken)
        
        return userApi.retrieve(payload.id, userToken)
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


    searchDucks(userToken, query) {
        validate.arguments([
            { name: 'query', value: query, type: 'string' },
            { name: 'userToken', userToken: query, type: 'string' }
        ])
        const payload = token.payload(userToken)
        return userApi.retrieve(payload.id, userToken)
            .then(response =>{
                const { status } = response
                if(status === 'OK'){

                    return duckApi.searchDucks(query)
                }
            })

            .then(ducks => ducks instanceof Array ? ducks : [])
    },

    retrieveDuck(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string' }
        ])

        return duckApi.retrieveDuck(id)
    },

    toggleFavDuck(userToken, id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty : true  },
            { name: 'userToken', value: userToken, type: 'string', notEmpty : true  }
        ])
        const payload = token.payload(userToken)

        return userApi.retrieve(payload.id, userToken)
            .then(response => {
                const { status, data } = response

                if (status === 'OK') {
                    const { favs = [] } = data // NOTE if data.favs === undefined then favs = []

                    const index = favs.indexOf(id)

                    if (index < 0) favs.push(id)
                    else favs.splice(index, 1)

                    return userApi.update(payload.id, userToken, { favs })
                        .then(() => { })
                }

                throw new LogicError(response.error)
            })
    },

    retrieveFavDucks(userToken) {
        validate.arguments([
            { name: 'userToken', value: userToken, type: 'string', notEmpty : true  }
        ])

        const payload = token.payload(userToken)
        return userApi.retrieve(payload.id, userToken)
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

module.exports = logic