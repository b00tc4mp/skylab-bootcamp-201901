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

    updateUser(id, data = {}) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'data', value: data, type: 'object' }
        ])

        return userData.retrieve(id)
            .then(user => {
                if (!user) throw new LogicError(`user with id "${id}" does not exist`)

                return userData.update(id, data)
            })
    },

    deleteUser(id, email, password) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        return userData.retrieve(id)
            .then(user => {
                if (!user) throw new LogicError(`user with id "${id}" does not exist`)

                if (user.email !== email) throw new LogicError('wrong credentials')

                if (user.password !== password) throw new LogicError('wrong credentials')

                return userData.delete(id)
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

    addToCart(id, duckId) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'duckId', value: duckId, type: 'string', notEmpty: true }
        ])

        return userData.retrieve(id)
            .then(user => {
                const { cart = [] } = user

                const index = cart.findIndex(({ id }) => id === duckId)

                if (index < 0) cart.push({ id: duckId, qty: 1})
                else cart[index].qty++

                return userData.update(id, { cart })
                    .then(() => { })
            })
    },

    updateItemCart(id, duckId, qty) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'duckId', value: duckId, type: 'string', notEmpty: true },
            { name: 'qty', value: qty, type: 'number', notEmpty: true }

        ])

        return userData.retrieve(id)
            .then(user => {
                const { cart = [] } = user
                
                if(cart.length) {
                    if(qty <= 0) {
                        const index = cart.indexOf(item => item.id === duckId)
                        
                        cart.splice(index, 1)
                    } else {
                        const item = cart.find(item => item.id === duckId)

                        item.qty = qty
                    }
                } 
            })
    },

    deleteToCart(id, duckId) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'duckId', value: duckId, type: 'string', notEmpty: true }
        ])

        return userData.retrieve(id)
            .then(user => {
                const { cart = [] } = user

                if(cart.length) {
                    const index = cart.indexOf(item => item.id === duckId)
                    cart.splice(index, 1)
                } 
            })
    },

    retrieveCartItems(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])

        return userData.retrieve(id)
            .then(user => {
                const { cart = [] } = user

                if (cart.length) {
                    const calls = cart.map(item => duckApi.retrieveDuck(item.id))
                    return Promise.all(calls)
                        .then(items => {
                            items = items.map((item, i) => {
                                let { title, price, imageUrl } = item
                                price = Number(price.split(' ')[0])
                                return { ...cart[i], title, price, imageUrl}
                            })
                            return items
                        })
                } else return cart
            })
    },

    checkoutCart(id, cart) {
        //TODO
    },
}

module.exports = logic