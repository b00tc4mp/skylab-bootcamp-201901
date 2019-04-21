'use strict'

const logic = {
    loginUser(username, password) {
        return username === 'admin' && password === 'admin'
    },

    retrieveUser() {
        return { name: 'Peter', surname: 'Seller', email: 'peterseller@mail.com' }
    }
}