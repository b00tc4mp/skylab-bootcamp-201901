'use strict'

const { REACT_APP_API_URL } = process.env 

const arshopApi = {
    url: REACT_APP_API_URL,

    registerUser(name, surname, email, password, passwordConfirm) {
        if (typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (!name.trim().length) throw Error('name is empty')

        if (typeof surname !== 'string') throw TypeError(`${surname} is not a string`)
        if (!surname.trim().length) throw Error('surname is empty')

        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (!email.trim().length) throw Error('email is empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('password is empty')

        if (typeof passwordConfirm !== 'string') throw TypeError(`${passwordConfirm} is not a string`)
        if (!passwordConfirm.trim().length) throw Error('password confirm is empty')

        return fetch(`${this.url}/user`, {
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
                return response.token
            })
    },

    retrieveUser(token) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        return fetch(`${this.url}/user`, {
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

        return fetch(`${this.url}/user/update`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ data })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response
            })
    },

    createProduct(token, product) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (!product) throw Error('product should be defined')
        if (product.constructor !== Object) throw TypeError(`${product} is not an object`)

        return fetch(`${this.url}/add/product`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ product })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response
            })
    },

    retrieveProducts() {

        return fetch(`${this.url}/products`, {
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response
            })
    },

    retrieveProduct(productId) {
        if (typeof productId !== 'string') throw TypeError(`${productId} is not a string`)
        if (!productId.trim().length) throw Error('productId cannot be empty')

        return fetch(`${this.url}//product/${productId}`)
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response
            })
    },

    retrieveUserProducts(token) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token cannot be empty')
        return fetch(`${this.url}/user/products`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw (response.error)

                return response
            })
    },

    updateProduct(token, productId, data) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (typeof productId !== 'string') throw TypeError(`${productId} is not a string`)
        if (!productId.trim().length) throw Error('productId cannot be empty')

        if (data.constructor !== Object) throw TypeError(`${data} is not an object`)

        return fetch(`${this.url}/product/update/${productId}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ data })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response
            })
    },

    toogleSold(token, productId) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (typeof productId !== 'string') throw TypeError(`${productId} is not a string`)
        if (!productId.trim().length) throw Error('productId cannot be empty')

        return fetch(`${this.url}/product/sold/${productId}`, {
            method: 'PUT',
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

    toogleFav(token, productId) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (typeof productId !== 'string') throw TypeError(`${productId} is not a string`)
        if (!productId.trim().length) throw Error('productId cannot be empty')

        return fetch(`${this.url}/fav/product/${productId}`, {
            method: 'POST',
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

    retrieveFavs(token) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        return fetch(`${this.url}/fav/user`, {
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

    searchProducts(q, qcategory, qcity) {
        if (q !== undefined || null) {
            if (typeof q !== 'string') throw TypeError(`${q} is not a string`)
            if (!q.trim().length) throw Error('query cannot be empty')
        }
        if (qcategory !== undefined || null) {
            if (typeof qcategory !== 'string') throw TypeError(`${qcategory} is not a string`)
            if (!qcategory.trim().length) throw Error('category cannot be empty')
        }
        if (qcity !== undefined || null) {
            if (typeof qcity !== 'string') throw TypeError(`${qcity} is not a string`)
            if (!qcity.trim().length) throw Error('city cannot be empty')
        }

        return fetch(`${this.url}/search?q=${q}`)
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response
            })
    },

    uploadProductImg(token, productId, data) {

        if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
        if (!token.trim().length) throw new Error('token is empty')

        if (typeof productId !== 'string') throw TypeError(`${productId} is not a string`)
        if (!productId.trim().length) throw Error('productId cannot be empty')

        if (!data) throw Error('data is empty')
        // if (data.constructor !== Object) throw TypeError(`${data} is not an object`)

        let formData = new FormData()

        formData.append('image', data.image)

        return fetch(`${this.url}/product/photo/${productId}`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
            },
            body: formData
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw new Error(response.error)

                return response
            })
    },

    uploadUserImg(token, data) {

        if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
        if (!token.trim().length) throw new Error('token is empty')

        if (!data) throw Error('data is empty')
        // if (data.constructor !== Object) throw TypeError(`${data} is not an object`)

        let formData = new FormData()

        formData.append('image', data.image)

        return fetch(`${this.url}/user/photo`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
            },
            body: formData
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw new Error(response.error)

                return response
            })
    },

    retrieveUserFromProducts(productId) {

        if (typeof productId !== 'string') throw TypeError(`${productId} is not a string`)
        if (!productId.trim().length) throw Error('productId cannot be empty')

        return fetch(`${this.url}/user/product/${productId}`)

            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response
            })
    },

    retrieveUserWithId(userId) {

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId cannot be empty')

        return fetch(`${this.url}/user/${userId}`)
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response
            })
    },

    retrieveProductsFromUserId(userId) {

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId cannot be empty')

        return fetch(`${this.url}/products/user/${userId}`)
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response
            })
    },

    createChat(token, userId) {

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userid cannot be empty')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token cannot be empty')

        return fetch(`${this.url}/create/chat/${userId}`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response
            })
    },

    sendMessage(token, chatId, text) {

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token cannot be empty')

        if (typeof chatId !== 'string') throw TypeError(`${chatId} is not a string`)
        if (!chatId.trim().length) throw Error('chatId cannot be empty')

        if (typeof text !== 'string') throw TypeError(`${text} is not a string`)
        if (!text.trim().length) throw Error('text cannot be empty')

        return fetch(`${this.url}/send/message/${chatId}`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ text })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response
            })
    },

    retrieveChats(token) {

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token cannot be empty')

        return fetch(`${this.url}/chats`, {
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

    retrieveMessagesFromChat(token, chatId) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token cannot be empty')

        if (typeof chatId !== 'string') throw TypeError(`${chatId} is not a string`)
        if (!chatId.trim().length) throw Error('chatId cannot be empty')

        return fetch(`${this.url}/chat/${chatId}`, {
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

    saveObject3d(token, productId, object3d) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token cannot be empty')

        if (typeof productId !== 'string') throw TypeError(`${productId} is not a string`)
        if (!productId.trim().length) throw Error('productId cannot be empty')

        let formData = new FormData()

        formData.append('image', object3d)

        return fetch(`${this.url}/save/object/${productId}`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
            },
            body: formData
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw new Error(response.error)

                return response
            })
    }

}

export default arshopApi