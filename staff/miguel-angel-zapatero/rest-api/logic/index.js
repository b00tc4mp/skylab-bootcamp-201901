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

        return (async () =>{  
            const users = await userData.find(user => user.email === email)
            
            if (users.length) throw new LogicError(`user with email "${email}" already exists`)

            return await userData.create({ email, password, name, surname })
        })()
    },

    authenticateUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return (async () => {
            const users = await userData.find(user => user.email === email)
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

        return (async () => { 
            const user = await userData.retrieve(id)
            
            if (!user) throw new LogicError(`user with id "${id}" does not exist`)

            const { name, surname, email } = user

            return { name, surname, email }
        })()
    },

    updateUser(id, data = {}) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'data', value: data, type: 'object' }
        ])

        return (async () => {
            const user = await userData.retrieve(id)
            
            if (!user) throw new LogicError(`user with id "${id}" does not exist`)

            return userData.update(id, data)
        })()
    },

    deleteUser(id, email, password) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        return (async () => {
            const user = await userData.retrieve(id)
            
            if (!user) throw new LogicError(`user with id "${id}" does not exist`)

            if (user.email !== email) throw new LogicError('wrong credentials')

            if (user.password !== password) throw new LogicError('wrong credentials')

            return await userData.delete(id)
        })()
    },

    searchDucks(id, query) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'query', value: query, type: 'string' }
        ])

        return (async () => {
            const user = await userData.retrieve(id)
           
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

        return (async () => {
            const user = await userData.retrieve(id)
            
            if (!user) throw new LogicError(`user with id "${id}" does not exist`)

            return await duckApi.retrieveDuck(duckId)
        })()
    },

    toggleFavDuck(id, duckId) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'duckId', value: duckId, type: 'string', notEmpty: true }
        ])

        return (async () => {
            const user = await userData.retrieve(id)
            
            const { favs = [] } = user

            const index = favs.indexOf(duckId)

            if (index < 0) favs.push(duckId)
            else favs.splice(index, 1)

            return await userData.update(id, { favs })
        })()
    },

    retrieveFavDucks(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])

        return (async () => {
            const user = await userData.retrieve(id)
            
            const { favs = [] } = user

            if (favs.length) {
                const calls = favs.map(fav => duckApi.retrieveDuck(fav))

                return await Promise.all(calls)
            } else return favs
        })()
    },

    addToCart(id, duckId) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'duckId', value: duckId, type: 'string', notEmpty: true }
        ])

        return (async () => {
            const user = await userData.retrieve(id)
            
            const { cart = [] } = user

            const index = cart.findIndex(({ id }) => id === duckId)

            if (index < 0) cart.push({ id: duckId, qty: 1})
            else cart[index].qty++

            return await userData.update(id, { cart })
        })()
    },

    updateItemCart(id, duckId, qty) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'duckId', value: duckId, type: 'string', notEmpty: true },
            { name: 'qty', value: qty, type: 'number', notEmpty: true }

        ])

        return (async () => {
            const user = await userData.retrieve(id)
            
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
        })()
    },

    deleteToCart(id, duckId) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'duckId', value: duckId, type: 'string', notEmpty: true }
        ])

        return (async () => {
            const user = await userData.retrieve(id)
            
            const { cart = [] } = user

            if(cart.length) {
                const index = cart.indexOf(item => item.id === duckId)
                cart.splice(index, 1)
            } 
        })()
    },

    retrieveCartItems(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])

        return (async () => {
            const user = await userData.retrieve(id)
            
            const { cart = [] } = user

            if (cart.length) {
                const calls = cart.map(item => duckApi.retrieveDuck(item.id))
                let items = await Promise.all(calls)
                items = items.map((item, i) => {
                    let { title, price, imageUrl } = item
                    price = Number(price.split(' ')[0])
                    return { ...cart[i], title, price, imageUrl}
                })
                return items
            } else return cart
        })()
    },

    checkoutCart(id, cart) {
        //TODO
    },
}

module.exports = logic