'use strict'


const { REACT_APP_DB_URL  } = process.env

const homeSwappApi = {
    url: REACT_APP_DB_URL,

    registerUser(username, email, password, passwordConfirm) {

        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (!email.trim().length) throw Error('email is empty')

        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (!username.trim().length) throw Error('username is empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('password is empty')

        if (typeof passwordConfirm !== 'string') throw TypeError(`${passwordConfirm} is not a string`)
        if (!passwordConfirm.trim().length) throw Error('passwordConfirm is empty')

        if (password !== passwordConfirm) throw Error('Password and Password confirmation do not match')




        return fetch(`${this.url}user`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ username, email, password, passwordConfirm })
        })
            .then(response => response.json())
            .then(response => {

                if (response.error) throw Error(response.error)

                return response

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

    updateUser(id, token, data) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw Error('id is empty')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (data.constructor !== Object) throw TypeError(`${data} is not an object`)

        return fetch(`${this.url}/user/${id}`, {
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

    createHouse(token, images, description, info, adress) {

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')
        if (typeof images !== 'object') throw Error(`${images} is not an array`)
        if (images.length == 0) throw Error('There must be at least one image')
        if (typeof description !== 'string') throw Error(`${description} is not a string`)
        if (typeof info !== 'object') throw Error(`${info} is not an object`)
        if (typeof adress !== 'object') throw Error(`${adress} is not an object`)





        return fetch(`${this.url}/user/house`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ images, description, info, adress })
        })
            .then(response => response.json())
            .then(response => {

                if (response.error) throw Error(response.error)

                return response
            })
    },

    retrieveHouse(houseId) {


        if (typeof houseId !== 'string') throw TypeError(`${houseId} is not a string`)
        if (!houseId.trim().length) throw Error('houseId is empty')




        return fetch(`${this.url}/user/house/${houseId}`, {
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
    updateHouse(token, houseId, images, description, info, adress) {


        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')
        if (typeof houseId !== 'string') throw TypeError(`${houseId} is not a string`)
        if (!houseId.trim().length) throw Error('houseId is empty')
        if (typeof images !== 'object') throw Error(`${images} is not an array`)
        if (images.length == 0) throw Error('There must be at least one image')
        if (typeof description !== 'string') throw Error(`${description} is not a string`)
        if (typeof info !== 'object') throw Error(`${info} is not an object`)
        if (typeof adress !== 'object') throw Error(`${adress} is not an object`)


        return fetch(`${this.url}/user/house`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ houseId, images, description, info, adress })
        })
            .then(response => response.json())
            .then(response => {

                if (response.error) throw Error(response.error)

                return response
            })
    },
    deleteHouse(token, houseId) {

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (typeof houseId !== 'string') throw TypeError(`${houseId} is not a string`)
        if (!houseId.trim().length) throw Error('houseId is empty')

        return fetch(`${this.url}/user/house`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ houseId })
        })
            .then(response => response.json())
            .then(response => {

                if (response.error) throw Error(response.error)

                return response
            })
    },

    searchByQuery(query) {


        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)
        if (!query.trim().length) throw Error('query is empty')




        return fetch(`${this.url}/search/${query}`, {
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



    retrieveMyHouses(token) {

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')




        return fetch(`${this.url}/user/retrieveMyHouses`, {
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(response => {

                if (response.error) throw Error(response.error)

                return response
            })
    },

    retrieveFavorites(token) {

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')




        return fetch(`${this.url}/user/retrieveFavs`, {
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(response => {

                if (response.error) throw Error(response.error)

                return response
            })
    },

    toggleFavorite(token, houseId) {

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (typeof houseId !== 'string') throw TypeError(`${houseId} is not a string`)
        if (!houseId.trim().length) throw Error('houseId is empty')


        return fetch(`${this.url}/user/toggleFav`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ houseId })
        })
            .then(response => response.json())
            .then(response => {

                if (response.error) throw Error(response.error)

                return response
            })
    },

    uploadImage(token, image) {

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (!(image instanceof Blob)) throw TypeError(`${image} is not a blob`)

        let formData = new FormData()
        formData.append('image', image)

        return fetch(`${this.url}/house-photo`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
            },
            body: formData
        })
            .then(response => response.json())
            .then(response => {

                if (response.error) throw Error(response.error)

                return response
            })

    },


    sendMessage(token, id, text) {


        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw Error('id is empty')

        if (typeof text !== 'string') throw TypeError(`${text} is not a string`)
        if (!text.trim().length) throw Error('text is empty')

        return fetch(`${this.url}/user/send-message/${id}`, {
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

                return true
            })
    },


    retrieveUserPublicInfo(userId) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('token is empty')


        return fetch(`${this.url}/user/${userId}`, {
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {

                if (response.error) throw Error(response.error)

                return response
            })
    }


}

export default homeSwappApi