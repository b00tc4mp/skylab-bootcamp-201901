'user strict'

import finalApi from '../api'

const logic = {
    __userId__: null,
    __userApiToken__: null,

    async registerUser(name, surname, email, password, passwordConfirmation) {

        if (typeof name !== 'string') throw TypeError(name + ' is not a string')
        try {
            const answer = await finalApi.registerUser(name, surname, email, password, passwordConfirmation)
            console.log(answer)
        } catch (error) {
            console.log(error)
        }
    },

    logInUser(email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        return finalApi.authenticateUser(email, password)
            .then(token => this.__userApiToken__ = token)
    },


    get isUserLoggedIn() {
        return !!this.__userApiToken__
    },

    retrieveUser() {
        return finalApi.retrieveUser(this.__userApiToken__)
            .then(({ id, name, surname, email, favoriteArtists = [], favoriteAlbums = [], favoriteTracks = [] }) => ({
                id,
                name,
                surname,
                email,
                favoriteArtists,
                favoriteAlbums,
                favoriteTracks
            }))
    },

    logout() {
        this.__userApiToken__ = null
        window.location.reload()
    },


    listProducts(category) {
        return finalApi.listProducts(category)
            .then(products => {
                return products
            })
    },


    retrieveProduct(productId) {
        return finalApi.retrieveProduct(productId)
            .then(product => product)
    },


    listAllProducts() {
        return finalApi.listAllProducts()
            .then(products => products)
    },


    createOrder(paymentMethod, products, orderAdress) {

        return finalApi.createOrder(paymentMethod, this._orderStatus, products, this.userId(), orderAdress, this.getDateOrder())
    }


}

export default logic





// const logic = {
//     __userId__: null,
//     __userApiToken__: null,

//     registerUser(name, surname, email, password, passwordConfirmation) {
//         if (typeof name !== 'string') throw TypeError(name + ' is not a string')

//               return finalApi.registerUser(name, surname, email, password, passwordConfirmation)
//             .then(() => { })
//     }

// }

// export default logic