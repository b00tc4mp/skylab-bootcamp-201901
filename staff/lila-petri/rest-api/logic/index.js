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
    },
    addCartDuck(id, duckId) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'duckId', value: duckId, type: 'string', notEmpty: true }
        ])
        
        return userData.retrieve(id)
            .then(user => {
                const { cart = [] } = user

                cart.push(duckId)
                
                return userData.update(id, { cart })
                    .then(() => { })
            })
    },
    deleteCartDuck(id, duckId) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'duckId', value: duckId, type: 'string', notEmpty: true }
        ])
        
        return userData.retrieve(id)
            .then(user => {
                const { cart = [] } = user

                const index = cart.indexOf(duckId)
                
                if (index < 0) return
                else cart.splice(index, 1)
                
                return userData.update(id, { cart })
                    .then(() => { })
            })
    },
    retrieveCartDucks(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])

        return userData.retrieve(id)
            .then(user => {
                
                const { cart = [] } = user

                if (cart.length) {
                    const calls = cart.map(item => duckApi.retrieveDuck(item))
                    
                    return Promise.all(calls)
                } else return cart
            })
    },
    payment(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])

        return userData.retrieve(id)
            .then(user => {
                
                let { cart = [], orders=[] } = user

                if (cart.length) {
                    
                    orders.push( [{
                        id: '_' + Math.random().toString(36).substr(2, 9),
                        items: cart.slice()
                    }])
                    
                    return userData.update(id, { orders })
                        .then(()=>{
                            cart=[]
                            return userData.update(id, { cart })
                        })
                        .then(() => { })
                } else return cart
            })
    }
}

module.exports = logic