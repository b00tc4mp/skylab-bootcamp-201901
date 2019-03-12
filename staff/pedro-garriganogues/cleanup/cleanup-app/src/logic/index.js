'user strict'

// const cleanUpApi = require('../api')
import cleanUpApi from '../api'

const logic = {
    __userId__: null,
    __userApiToken__: null,

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
            .then(token => this.__userApiToken__ = token)
    },


    get isUserLoggedIn() {
        return !!this.__userApiToken__
    },


    logout() {

        sessionStorage.clear()
        window.location.reload()
    },


    listProducts(category) {
        return cleanUpApi.listProducts(category)
            .then(products => {
                return products
            })
    },


    retrieveProduct(productId) {
        return cleanUpApi.retrieveProduct(productId)
            .then(product => product)
    },


    listTheProducts() {

        return cleanUpApi.listTheProducts()
            .then(products => products)
    },

    cart(cart) {
        if (cart !== undefined) {
            this._cart = cart

            return
        }

        return this._cart
    },

    getDateOrder() {
        // let hours = new Date().getHours()
        this._date = Date.now()
        return this._date.toString()

    },



    addProductToCart(productId) {
        return Promise.resolve()
            .then(() => {
                const any = this.cart().some(_productId => _productId === productId)

                if (any) throw Error('product already in cart')

                this.cart().push(productId)

                this.cart(this.cart())

                return true
            })
    },


    removeProductFromCart(productId) {
        return this.cart(this.cart().filter(id => {
            return id !== productId
        }))
    },


    clearCart() {
        this.cart(null)
    },



}

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