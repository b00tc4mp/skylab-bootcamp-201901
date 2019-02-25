'use strict'

const axios = require('axios')

const singingLabApi = {
    url: 'NO-URL',
    
    /**
     * Setter/getter function: 
     * 
     * Sets the token when the function is called with a parameter and get's it when no parameter is introduced  
     * 
     * @param {string} token
     * 
     * @returns {<string>}
    */
    token(token) {
        if (token) {
            this._token = token

            return
        }

        return this._token
    },

    /**
     * 
     * Register user
     * 
     * @param {string} name - user's name
     * @param {string} surname - user's password
     * @param {string} address - an address
     * @param {string} email - a email to log in 
     * @param {string} password - a password to log in
     * 
     * @throws {Error} - If invalid type of input or if user already exists
     * 
     * @returns {Promise<boolean>}
     */
    registerUser(name, surname, address, email, password) {
        return Promise.resolve()
            .then(() => {
                if (typeof name !== 'string') throw Error('user name is not a string')

                if (!(name = name.trim()).length) throw Error('user name is empty or blank')

                if (typeof surname !== 'string') throw Error('user surname is not a string')

                if ((surname = surname.trim()).length === 0) throw Error('user surname is empty or blank')

                if (typeof address !== 'string') throw Error('user address is not a string')

                if ((address = address.trim()).length === 0) throw Error('user address is empty or blank')

                if (typeof email !== 'string') throw Error('user email is not a string')

                if (!(email = email.trim()).length) throw Error('user email is empty or blank')

                if (typeof password !== 'string') throw Error('user password is not a string')

                if ((password = password.trim()).length === 0) throw Error('user password is empty or blank')

                return axios.post(`${this.url}/register`, { name, surname, address, email, password })
                    .then(({ status, data }) => {
                        if (status !== 201 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return true
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            throw Error(message)
                        } else throw err
                    })
            })
    },


    /**
     * 
     * Authenticates an user
     * 
     * @param {string} email - user's email
     * @param {string} password - user's password
     * 
     * @throws {Error} - Throws error on invalid type of input, unexpected response status or unable to reach server
     * 
     * @returns {Promise<string>}
     */
    authenticateUser(email, password) {
        return Promise.resolve()
            .then(() => {
                if (typeof email !== 'string') throw Error('user email is not a string')

                if (!(email = email.trim()).length) throw Error('user email is empty or blank')

                if (typeof password !== 'string') throw Error('user password is not a string')

                if ((password = password.trim()).length === 0) throw Error('user password is empty or blank')

                return axios.post(`${this.url}/auth`, { email, password })
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        const { data: { id, token } } = data

                        this.token(token)

                        return id
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            throw Error(message)
                        } else throw err
                    })
            })
    },


    /**
     *
     * Retrieves an user
     * 
     * @param {string} id - The id of the user
     * 
     * @throws {Error} - If no valid id is found, error on response status or unable to reach the server
     * 
     * @returns {Promise<User>} 
     */
    retrieveUser(id) {
        return Promise.resolve()
            .then(() => {
                if (typeof id !== 'string') throw Error('user id is not a string')

                if (!(id = id.trim()).length) throw Error('user id is empty or blank')

                return axios.get(`${this.url}/users/${id}`, { headers: { authorization: `Bearer ${this.token()}` } })
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return data.data
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            throw Error(message)
                        } else throw err
                    })
            })
    },


    /**
     * 
     * Update user info
     * 
     * @param {string} id 
     * @param {string} name 
     * @param {string} surname 
     * @param {string} phone 
     * @param {string} address 
     * @param {string} email 
     * @param {string} password 
     * @param {string} newEmail 
     * @param {string} newPassword 
     * 
     * @throws {Error} - If invalid type of input, unexpected response of status or unable to reach the server
     * 
     * @returns {Promise<User>}
     */
    updateUser(id, name, surname, phone, address, email, password, newEmail, newPassword) {
        return Promise.resolve()
            .then(() => {
                if (typeof id !== 'string') throw Error('user id is not a string')

                if (!(id = id.trim()).length) throw Error('user id is empty or blank')

                if (typeof name !== 'string') throw Error('user name is not a string')

                if (!(name = name.trim()).length) throw Error('user name is empty or blank')

                if (typeof surname !== 'string') throw Error('user surname is not a string')

                if ((surname = surname.trim()).length === 0) throw Error('user surname is empty or blank')

                if (typeof phone !== 'string') throw Error('user phone is not a string')

                if ((phone = phone.trim()).length === 0) throw Error('user phone is empty or blank')

                if (typeof address !== 'string') throw Error('user address is not a string')

                if ((address = address.trim()).length === 0) throw Error('user address is empty or blank')

                if (typeof email !== 'string') throw Error('user email is not a string')

                if (!(email = email.trim()).length) throw Error('user email is empty or blank')

                if (typeof password !== 'string') throw Error('user password is not a string')

                if ((password = password.trim()).length === 0) throw Error('user password is empty or blank')

                return axios.patch(`${this.url}/users/${id}`, { name, surname, phone, address, email, password, newEmail, newPassword }, { headers: { authorization: `Bearer ${this.token()}` } })
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return true
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            throw Error(message)
                        } else throw err
                    })
            })
    },

    /**
     * 
     * Unregisters a user
     * 
     * @param {string} id 
     * @param {string} email 
     * @param {string} password 
     * 
     * @throws {Error} - If invalid type of input, unexpected response of status or unable to reach the server
     * 
     * @returns {Promise<boolean>}
     */
    unregisterUser(id, email, password) {
        return Promise.resolve()
            .then(() => {
                if (typeof id !== 'string') throw Error('user id is not a string')

                if (!(id = id.trim()).length) throw Error('user id is empty or blank')

                if (typeof email !== 'string') throw Error('user email is not a string')

                if (!(email = email.trim()).length) throw Error('user email is empty or blank')

                if (typeof password !== 'string') throw Error('user password is not a string')

                if ((password = password.trim()).length === 0) throw Error('user password is empty or blank')

                return axios.delete(`${this.url}/users/${id}`, { headers: { authorization: `Bearer ${this.token()}` }, data: { email, password } })
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return true
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            throw Error(message)
                        } else throw err
                    })
            })
    },

    /**
     * 
     * Lists categories
     * 
     * @throws {Error} - If invalid type of input, unexpected response of status or unable to reach the server
     * 
     * @returns {Promise<[Category]>} 
    */
    listCategories() {
        return Promise.resolve()
            .then(() => {

                return axios.get(`${this.url}/categories`)
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return data.data
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            throw Error(message)
                        } else throw err
                    })
            })
    },

    /**
     * 
     * Lists products
     *  
     * @param {string} categoryId
     * 
     * @throws {Error} - If invalid type of input, unexpected response of status or unable to reach the server
     * 
     * @returns {Promise<[Product]>} 
    */
    listProducts(categoryId) {
        return Promise.resolve()
            .then(() => {

                return axios.get(`${this.url}/categories/${categoryId}`)
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return data.data
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            throw Error(message)
                        } else throw err
                    })
            })
    },


    /**
      * Retrieves product
      * 
      * @param {string} productId
      * 
      * @throws {Error} - If invalid type of input, unexpected response of status or unable to reach the server
      * 
      * @returns {Promise<Product>} 
      */
    retrieveProduct(productId) {
        return Promise.resolve()
            .then(() => {
                if (typeof productId !== 'string') throw Error('user productId is not a string')

                if (!(productId = productId.trim()).length) throw Error('user productId is empty or blank')

                return axios.get(`${this.url}/categories/products/${productId}`)
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return data.data
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            throw Error(message)
                        } else throw err
                    })
            })
    },


    /**
     *  
     * Lists all products
     * 
     * @throws {Error} - If invalid type of input, unexpected response of status or unable to reach the server
     * 
     * @returns {Promise<[Product]>} 
    */
    listAllProducts() {
        return Promise.resolve()
            .then(() => {

                return axios.get(`${this.url}/products`)
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return data.data
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            throw Error(message)
                        } else throw err
                    })
            })
    },



    /**
     * 
     * Lists products by id
     * 
     * @param {Array} cart
     * 
     * @throws {Error} - If invalid type of input, unexpected response of status or unable to reach the server
     * 
     * @returns {Promise<[Product]>} 
    */
    listProductsByIds(cart) {
        // TODO GET url?ids=id1,id2,id2,id4

        return Promise.resolve()
            .then(() => {
                const ids = cart.join(',')

                return axios.get(`${this.url}/products/?ids=${ids}`)
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return data.data

                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            throw Error(message)
                        } else throw err
                    })
            })

    },

    /**
     * 
     * Creates an order
     * 
     * @param {string} paymentMethod 
     * @param {string} status 
     * @param {Array} products
     * @param {string} userId
     * @param {string} orderAdress 
     * @param {string} submitDate 
     * 
     * @throws {Error} - If invalid type of input, unexpected response of status or unable to reach the server
     * 
     * @returns {Promise<Order>}
     */
    createOrder(paymentMethod, status, products, userId, orderAdress, submitDate) {
        return Promise.resolve()
            .then(() => {
                if (typeof paymentMethod !== 'string') throw Error('paymentMethod is not a string')

                if (!(paymentMethod = paymentMethod.trim())) throw Error('paymentMethod is empty or blank')

                if (typeof status !== 'string') throw Error('status is not a string')

                if ((status = status.trim()).length === 0) throw Error('status is empty or blank')

                if (!Array.isArray(products)) throw Error('products should be an array')

                if (!products.length) throw Error('no products where found')

                if (orderAdress !== undefined) {
                    if (typeof orderAdress !== 'string') throw Error('orderAdress is not a string')

                    if ((orderAdress = orderAdress.trim()).length === 0) throw Error('orderAdress is empty or blank')
                }

                if (submitDate !== undefined) {
                    if (typeof submitDate !== 'string') throw Error('submitDate is not a string')

                    if (!(submitDate = submitDate.trim()).length) throw Error('submitDate is empty or blank')
                }

                return axios.post(`${this.url}/order`, { paymentMethod, status, products, userId, orderAdress, submitDate })
                    .then(({ status, data }) => {
                        if (status !== 201 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return data.data
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            throw Error(message)
                        } else throw err
                    })
            })
    }
}

module.exports = singingLabApi