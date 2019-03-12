'use strict'

import { debug } from "util";

const homeSwappApi = {
    url: 'http://localhost:8000/api/',

    registerUser(username, email, password,passwordConfirm) {

        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (!email.trim().length) throw Error('email is empty')

        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (!username.trim().length) throw Error('username is empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('password is empty')

        if (typeof passwordConfirm !== 'string') throw TypeError(`${passwordConfirm} is not a string`)
        if (!passwordConfirm.trim().length) throw Error('passwordConfirm is empty')

        if(password !== passwordConfirm) throw Error ('Password and Password confirmation do not match')




        return fetch(`${this.url}user`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ username, email, password, passwordConfirm })
        })
            .then(response => response.json())
            .then(response => {
                
                if(response.error) throw Error (response.error)

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
                
           if(response.error) throw Error (response.error)

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

           if(response.error) throw Error (response.error)

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

                if(response.error) throw Error (response.error)

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
            body: JSON.stringify({images, description, info, adress})
        })
            .then(response => response.json())
            .then(response => {
              
                if(response.error) throw Error (response.error)

                return response
            })
    },

    retrieveHouse(token, houseId) {

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')
        if (typeof token !== 'string') throw TypeError(`${houseId} is not a string`)
        if (!houseId.trim().length) throw Error('houseId is empty')




        return fetch(`${this.url}/user/house/${houseId}`, {
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(response => {
              
                if(response.error) throw Error (response.error)

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
            body: JSON.stringify({houseId, images, description, info, adress})
        })
            .then(response => response.json())
            .then(response => {
             
                if(response.error) throw Error (response.error)

                return response
            })
    },
    deleteHouse(token,houseId) {
        
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
            body: JSON.stringify({houseId})
        })
            .then(response => response.json())
            .then(response => {
               
                if(response.error) throw Error (response.error)

                return response
            })
    },

    retrieveHouse(token, houseId) {

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')
        if (typeof token !== 'string') throw TypeError(`${houseId} is not a string`)
        if (!houseId.trim().length) throw Error('houseId is empty')




        return fetch(`${this.url}/user/house/${houseId}`, {
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(response => {
              
                if(response.error) throw Error (response.error)

                return response
            })
    },


}

export default homeSwappApi