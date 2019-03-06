'use strict'

const userApi = {
    register(username, password) {
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (!username.trim().length) throw Error('username is empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('password is empty')

        return fetch('https://skylabcoders.herokuapp.com/api/user', { 
            method: 'POST', 
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(response => response.json())
            .then(response => {
                const { status } = response
                
                if (status === 'OK') return response.data.id
                else throw Error(response.error)
            })
    },


    auth(username, password){
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (!username.trim().length) throw Error('username is empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('password is empty')


        return fetch('https://skylabcoders.herokuapp.com/api/auth', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({username, password})
        })
            .then(response => response.json()) //arrow function that returns response.json(). This is the parameter for the next function
            .then(response =>{
                const {status, data} = response

                if(status == 'OK') return data
                else throw Error(response.error)
            })
    },


    retrieve(id, token){
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw Error('id is empty')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')


        return fetch(`https://skylabcoders.herokuapp.com/api/user/${id}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`
            },
        })
            .then(response => response.json()) //arrow function that returns response.json(). This is the parameter for the next function
            .then(response =>{
                const {status, data} = response

                if(status == 'OK') return data
                else throw Error(response.error)
            })
    },

    update(id, token, properties){
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw Error('id is empty')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if(!(properties instanceof Object)) throw TypeError(`${properties} is not an object`)

        return fetch(`https://skylabcoders.herokuapp.com/api/user/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${token}`
            },
            body: properties
        })

            .then(response => response.json())
            .then(response =>{
                const {status} = response
                if(status == 'OK') return status
                else throw Error(response.error)
            })
    },

    remove(username, password, id, token){
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (!username.trim().length) throw Error('username is empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('password is empty')

        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw Error('id is empty')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        return fetch(`https://skylabcoders.herokuapp.com/api/user/${id}`, { 
            method: 'DELETE', 
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })

            .then(response => response.json())
            .then(response =>{
                const {status} = response
                if(status == "OK") return status
                else throw Error(response.error)
            })
    }
}

export default userApi