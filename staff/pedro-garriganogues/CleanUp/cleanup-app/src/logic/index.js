'user strict'

import cleanUpApi from '../api'

const logic = {
    __userId__: null,
    __userApiToken__: null,

    async registerUser(name, surname, email, password, passwordConfirmation) {

        if (typeof name !== 'string') throw TypeError(name + ' is not a string')
        try {
            const answer = await cleanUpApi.registerUser(name, surname, email, password, passwordConfirmation)
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


    listAllProducts() {
        return cleanUpApi.listAllProducts()
            .then(products => products)
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