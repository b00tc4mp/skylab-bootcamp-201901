'user strict'

// const cleanUpApi = require('../api')
import cleanUpApi from '../api'

const logic = {
    __userId__: null,
    // __userApiToken__: null,
    __userApiProducts__: null,
    _userId: null,
    _orderStatus: 'paid',


    registerUser(name, surname, email, password, passwordConfirmation) {

        if (typeof name !== 'string') throw TypeError(name + ' is not a string')

        return (async () => {
            try {
                const answer = await cleanUpApi.registerUser(name, surname, email, password, passwordConfirmation)
                console.log(answer)
            } catch (error) {
                console.log(error)
            }
        })()

    },

    logInUser(email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        return cleanUpApi.authenticateUser(email, password)
            .then(({ token, id }) => {
                this.__userApiToken__ = token
                this.__userId__ = id
            })
    },



    get isUserLoggedIn() {
        return !!this.__userApiToken__
    },


    logout() {

        sessionStorage.clear()
        window.location.reload()
    },

    retrieveUser() {
        return cleanUpApi.retrieveUser(this.__userId__, this.__userApiToken__)
            .then(res => res)
    },

    retrieveOrder() {
        return cleanUpApi.retrieveOrder(this.__userId__)
            .then(res => res)
    },

    listProducts(category) {
        return cleanUpApi.listProducts(category)
            .then(products => {
                return products
            })
    },

    listProductsByIds() {
        if (this.__userApiProducts__ !== null) {
            return cleanUpApi.listProductsByIds(this.__userApiProducts__.map(productbyid => productbyid._id))
        } else {
            console.log('QQ')
        }
    },

    getProduct(productId) {
        return cleanUpApi.getProduct(productId)
            .then(product => product)
    },

    listTheProducts() {

        return cleanUpApi.listTheProducts()
            .then(products => products)
    },

    addProductToCart(product) {

        let _products = this.__userApiProducts__ || []

        _products.push(product)

        this.__userApiProducts__ = _products
    },

    getCart() {
        return this.__userApiProducts__ || []
    },

    removeProductFromCart() {
        sessionStorage.removeItem('__userApiProducts__')
        window.location.reload()
    },

    makeOrder(paymentMethod, products) {

        return cleanUpApi.makeOrder(paymentMethod, this._orderStatus, products, this.__userId__)
    },

    clearCart() {
        sessionStorage.removeItem('__userApiProducts__')
    },



};




export default logic





// const logic = {
//     __userId__: null,
//     __userApiToken__: null,

//     registerUser(name, surname, email, password, passwordConfirmation) {
//         if (typeof name !== 'string') throw TypeError(name + ' is not a string')

//               return cleanUpApi.registerUser(name, surname, email, password, passwordConfirmation)
//             .then(() => { })
//     }

// }

// export default logic