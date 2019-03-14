const axios = require('axios')

const cleanUpApi = {
    url: 'http://localhost:8000',

    registerUser(name, surname, email, password, passwordConfirm) {

        return fetch(`${this.url}/register`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ name, surname, email, password, passwordConfirm })
        })
            .then(response => response.json())
            .then(({ id, error }) => {
                if (error) throw Error(error)

                return id
            })
    },
    authenticateUser(email, password) {
        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (!email.trim().length) throw Error('email is empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('password is empty')

        return fetch(`${this.url}/user/auth`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)
                return response.data
            })
    },


    retrieveUser(userId, token) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        return fetch(`${this.url}/users/${userId}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response
            })
    },




    updateUser(token, data) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (data.constructor !== Object) throw TypeError(`${data} is not an object`)

        return fetch(`${this.url}/user`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response
            })
    },

    removeUser(token, email, password) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (!email.trim().length) throw Error('email is empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('password is empty')

        return fetch(`${this.url}/user`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response
            })
    },
    listProducts(categoryId) {
        return (async () => {

            return axios.get(`${this.url}/categories/${categoryId}`)
                .then(({ status, data }) => {
                    if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                    return data.data
                })
                .catch(err => {

                    if (err.response) {
                        const { response: { data: { error: message } } } = err

                        throw Error(message)
                    } else throw err
                })
        })()
    },

    listProductsByIds: function listProductsByIds(cart) {
        var _thisbyid = this;

        return (async () => {
            var ids = cart.join(',');

            return axios.get(_thisbyid.url + '/products/?ids=' + ids).then(function (_refbyId) {

            }).catch(function (err) {

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        })();
    },


    getProduct(productId) {
        return (async () => {
            if (!(productId = productId.trim()).length) throw Error('user productId is empty or blank')

            if (typeof productId !== 'string') throw Error('user productId is not a string')

            return axios.get(`${this.url}/categories/products/${productId}`)
                .then(({ status, data }) => {
                    if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                    return data.data
                })
                .catch(err => {

                    if (err.response) {
                        const { response: { data: { error: message } } } = err

                        throw Error(message)
                    } else throw err
                })
        })()
    },

    makeOrder: function makeOrder(status, products, userId, paymentMethod) {
        var _thisorder = this;

        return (async () => {

            return axios.post(_thisorder.url + '/order', { paymentMethod: paymentMethod, status: status, products: products, userId: userId }).then(function (_reforder) {
                var status = _reforder.status,
                    data = _reforder.data;

                if (status !== 201 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return data.data;
            }).catch(function (err) {

                if (err.response) {
                    var message = err.response.data.error;

                    throw Error(message);
                } else throw err;
            });
        })()

    },



    listTheProducts() {
        return (async () => {

            return axios.get(`${this.url}/products`)
                .then(({ status, data }) => {
                    if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                    return data.data
                })
                .catch(err => {
                    if (err.response) {
                        const { response: { data: { error: message } } } = err

                        throw Error(message)
                    } else throw err
                })
        })()
    },

}

export default cleanUpApi;




