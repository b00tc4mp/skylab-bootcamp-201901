const validate = require('../common/validate')
const duckApi = require('../data/duck-api')
const { LogicError } = require('../common/errors')
const userData = require('../data/user-data')

const logic = {
    registerUser(name, surname, email, password) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return userData.find(user => user.email === email)
            .then(users => {
                if (users.length) throw new LogicError(`user with email "${email}" already exists`)

                return userData.create({ email, password, name, surname })
            })
    },

    authenticateUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return userData.find(user => user.email === email)
            .then(users => {
                if (!users.length) throw new LogicError(`user with email "${email}" does not exist`)

                const [user] = users

                if (user.password !== password) throw new LogicError('wrong credentials')

                return user.id
            })
    },

    retrieveUser(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])

        return userData.retrieve(id)
            .then(user => {
                if (!user) throw new LogicError(`user with id "${id}" does not exist`)

                const { name, surname, email } = user

                return { name, surname, email }
            })
    },

    searchDucks(id, query) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'query', value: query, type: 'string' }
        ])

        return userData.retrieve(id)
            .then(user => {
                if (!user) throw new LogicError(`user with id "${id}" does not exist`)

                return duckApi.searchDucks(query)
            })
            .then(ducks => ducks instanceof Array ? ducks : [])

    },

    retrieveDuck(id, duckId) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'duckId', value: duckId, type: 'string', notEmpty: true }
        ])

        return userData.retrieve(id)
            .then(user => {
                if (!user) throw new LogicError(`user with id "${id}" does not exist`)

                return duckApi.retrieveDuck(duckId)
            })
    },

    toggleFavDuck(id, duckId) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'duckId', value: duckId, type: 'string', notEmpty: true }
        ])

        return userData.retrieve(id)
            .then(user => {
                const { favs = [] } = user

                const index = favs.indexOf(duckId)

                if (index < 0) favs.push(duckId)
                else favs.splice(index, 1)

                return userData.update(id, { favs })
                    .then(() => { })
            })
    },

    duckToCard(id, duckId) {
        validate.arguments([
            {name:'id', value: id, type: 'string', notEmpty:true},
            {name:'duckId', value: duckId, type: 'string', notEmpty: true}
        ])
            
        // .Aqui va yb then buit
        // return userData.retrieve(id)
        //     .then(user => {
        //         const { card = [] } = user
        //         const index = card.indexOf(duckId)

        //         if(index <0 ) card.push(duckId)
        //         else card.splice(index, 1)

        //         return userData.update(id, { favs })
        //             .then(() =>{ })
        //     })
    },

    retrieveFavDucks(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])

        return userData.retrieve(id)
            .then(user => {
                const { favs = [] } = user

                if (favs.length) {
                    const calls = favs.map(fav => duckApi.retrieveDuck(fav))

                    
                    return Promise.all(calls)
                } else return favs
            })
    }

    
    
}

module.exports = logic